import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/prisma/prisma-client"
import { OrderStatus } from "@prisma/client"
import { sendEmail } from "@/shared/lib/send-email"
import { CartItemDTO } from "@/shared/services/dto/cart.dto"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-04-22.dahlia",
})

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )
  } catch (err) {
    console.error("Webhook signature verification failed.", err)
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 })
  }

  try {
    const session = event.data.object as Stripe.Checkout.Session
    const orderId = Number(session.metadata?.orderId)

    if (isNaN(orderId)) {
      return NextResponse.json(
        { error: "Order ID not found in metadata" },
        { status: 400 }
      )
    }

    if (event.type === "checkout.session.completed") {
      const order = await prisma.order.update({
        where: { 
          id: orderId, 
          status: OrderStatus.PENDING,
          paymentId: session.id,
        },
        data: { status: OrderStatus.SUCCEEDED },
      })

      const items = JSON.parse(order.items as string) as CartItemDTO[]

      await sendEmail(
        order.email,
        "Next Pizza | Ваш заказ оплачен",
        `
        <h1>Спасибо за покупку!</h1>
        <p>Ваш заказ #${order.id} успешно оплачен. Мы уже начали его готовить!</p>
        <hr />
        <p>Состав заказа:</p>
        <ul>
          ${items.map((item) => `<li>${item.productItem.product.name} x ${item.quantity}</li>`).join("")}
        </ul>
        `
      )
    }

    if (
      event.type === "checkout.session.async_payment_failed" ||
      event.type === "checkout.session.expired"
    ) {
      await prisma.order.updateMany({
        where: { id: orderId, status: OrderStatus.PENDING },
        data: { status: OrderStatus.CANCELLED },
      })

      console.log(
        `Order #${orderId} was cancelled due to payment failure or timeout.`
      )
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (err) {
    console.error("Error processing webhook:", err)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    )
  }
}
