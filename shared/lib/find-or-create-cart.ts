import { prisma } from "@/prisma/prisma-client"

export const findOrCreateCart = async (token: string, userId?: string) => {
  let userCart = await prisma.cart.findFirst({
    where: {
      userId: userId || undefined,
      token: !userId ? token : undefined,
    },
  })

  if (!userCart && userId) {
    userCart = await prisma.cart.findFirst({
      where: {
        token,
        userId: null,
      },
    })

    if (userCart) {
      userCart = await prisma.cart.update({
        where: {
          id: userCart.id,
        },
        data: {
          userId,
        },
      })
    }
  }

  if (!userCart) {
    userCart = await prisma.cart.create({
      data: {
        token,
        userId,
      },
    })
  }

  return userCart
}
