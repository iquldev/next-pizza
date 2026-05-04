"use server"

import { prisma } from "@/prisma/prisma-client"
import { CheckoutFormValues } from "@/shared/constants/checkout-form-schema"
import { OrderStatus } from "@prisma/client"
import { cookies } from "next/headers"
import { createPayment } from "@/shared/lib/create-payment"
import { sendEmail } from "@/shared/lib/send-email"

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("cartToken")?.value

    if (!token) {
      throw new Error("No token found")
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token,
      },
    })

    if (!userCart) {
      throw new Error("No cart found")
    }

    if (userCart.items.length === 0) {
      throw new Error("Cart is empty")
    }

    const order = await prisma.order.create({
      data: {
        token,
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    })

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    })

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    })

    const paymentSession = await createPayment({
      id: order.id,
      totalAmount: order.totalAmount,
    })

    if (!paymentSession.url) {
      throw new Error("Stripe session URL not found")
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentSession.id,
      },
    })

    await sendEmail(
      data.email,
      "Next Pizza | Оплатите заказ",
      `<h1>Заказ #${order.id} создан!</h1><p>Оплатите заказ на сумму <b>${order.totalAmount} $</b>. Ссылка на оплату: <a href="${paymentSession.url}">оплатить заказ</a></p>`
    )

    return paymentSession.url
  } catch (err) {
    console.log(err)
    throw new Error("Failed to create order")
  }
}
