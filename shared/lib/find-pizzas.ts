import { prisma } from "@/prisma/prisma-client"
import { unstable_cache } from "next/cache"

export interface GetSearchParams {
  query?: string
  sortBy?: string
  sizes?: string
  pizzaTypes?: string
  ingredients?: string
  priceFrom?: string
  priceTo?: string
}

export const getIngredients = unstable_cache(
  async () => {
    return await prisma.ingredient.findMany()
  },
  ["ingredients-list"],
  {
    revalidate: 60 * 60 * 24,
    tags: ["ingredients-list"],
  }
)

export const getCategories = unstable_cache(
  async () => {
    return await prisma.category.findMany({
      where: {
        products: {
          some: {},
        },
      },
    })
  },
  ["categories-list"],
  {
    revalidate: 60 * 60 * 24,
    tags: ["categories-list"],
  }
)

export const getPizzas = async (
  params: Promise<GetSearchParams> | GetSearchParams
) => {
  const searchParams = await params

  const sizes = searchParams.sizes?.split(",").map(Number) || []
  const pizzaTypes = searchParams.pizzaTypes?.split(",").map(Number) || []
  const ingredients = searchParams.ingredients?.split(",").map(Number) || []

  const priceFrom = Number(searchParams.priceFrom) || 0
  const priceTo = Number(searchParams.priceTo) || 200

  const sort = Array.isArray(searchParams.sortBy)
    ? searchParams.sortBy[0]
    : searchParams.sortBy

  const cacheKey = JSON.stringify({
    ...searchParams,
    sizes,
    pizzaTypes,
    ingredients,
    priceFrom,
    priceTo,
  })

  const getCategoriesWithProducts = unstable_cache(
    async () => {
      return await prisma.category.findMany({
        include: {
          products: {
            orderBy: {
              id: "desc",
            },
            where: {
              ingredients:
                ingredients.length > 0
                  ? {
                      some: {
                        id: {
                          in: ingredients,
                        },
                      },
                    }
                  : undefined,
              items: {
                some: {
                  size: sizes.length > 0 ? { in: sizes } : undefined,
                  pizzaType:
                    pizzaTypes.length > 0 ? { in: pizzaTypes } : undefined,
                  price: {
                    gte: priceFrom,
                    lte: priceTo,
                  },
                },
              },
            },
            include: {
              items: {
                where: {
                  size: sizes.length > 0 ? { in: sizes } : undefined,
                  pizzaType:
                    pizzaTypes.length > 0 ? { in: pizzaTypes } : undefined,
                  price: {
                    gte: priceFrom,
                    lte: priceTo,
                  },
                },
                orderBy: {
                  price: "asc",
                },
              },
              ingredients: true,
            },
          },
        },
      })
    },
    ["categories-with-products", cacheKey],
    {
      revalidate: 60 * 60 * 24,
      tags: ["categories-with-products"],
    }
  )

  const categories = await getCategoriesWithProducts()

  if (sort === "price" || sort === "-price") {
    return categories.map((category) => ({
      ...category,
      products: [...category.products].sort((a, b) => {
        const priceA = a.items[0]?.price || 0
        const priceB = b.items[0]?.price || 0

        return sort === "price" ? priceA - priceB : priceB - priceA
      }),
    }))
  }

  return categories
}
