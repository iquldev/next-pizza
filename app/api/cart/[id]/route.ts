import { prisma } from "@/prisma/prisma-client"
import { getUserSession } from "@/shared/lib/get-user-session"
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = (await req.json()) as { quantity: number }
    const token = req.cookies.get("cartToken")?.value
    const session = await getUserSession()
    const userId = session?.user.id

    if (!token && !userId) {
      return NextResponse.json(
        { error: "Cart token not found" },
        { status: 404 }
      )
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(id),
      },
    })

    if (!cartItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      )
    }

    await prisma.cartItem.update({
      where: {
        id: Number(id),
      },
      data: {
        quantity: data.quantity,
      },
    })

    const updatedUserCart = await updateCartTotalAmount(token || "", userId)

    return NextResponse.json(updatedUserCart)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Failed to update cart items" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const token = req.cookies.get("cartToken")?.value
    const session = await getUserSession()
    const userId = session?.user.id

    if (!token && !userId) {
      return NextResponse.json(
        { error: "Cart token not found" },
        { status: 404 }
      )
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(id),
      },
    })

    if (!cartItem) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      )
    }

    await prisma.cartItem.delete({
      where: {
        id: Number(id),
      },
    })

    const updatedUserCart = await updateCartTotalAmount(token || "", userId)

    return NextResponse.json(updatedUserCart)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Failed to delete cart item" },
      { status: 500 }
    )
  }
}
