import { prisma } from "@/prisma/prisma-client"
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart"
import { getUserSession } from "@/shared/lib/get-user-session"
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount"
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value
    const session = await getUserSession()
    const userId = session?.user.id

    if (!token && !userId) {
      return NextResponse.json({ totalAmount: 0, items: [] })
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        userId: userId || undefined,
        token: !userId ? token : undefined,
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    })

    return NextResponse.json(userCart || { totalAmount: 0, items: [] })
  } catch (error) {
    console.log(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value
    const session = await getUserSession()
    const userId = session?.user.id

    if (!token) {
      token = crypto.randomUUID()
    }

    const userCart = await findOrCreateCart(token, userId)

    const data = (await req.json()) as CreateCartItemValues

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: {
          every: {
            id: {
              in: data.ingredientsIds,
            },
          },
        },
      },
    })

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: {
            connect: data.ingredientsIds?.map((id) => ({ id })),
          },
        },
      })
    }

    const updatedUserCart = await updateCartTotalAmount(token, userId)

    const resp = NextResponse.json(updatedUserCart)
    resp.cookies.set("cartToken", token)

    return resp
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Failed to create cart token" },
      { status: 500 }
    )
  }
}
