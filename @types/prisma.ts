import {
  Ingredient,
  Product,
  ProductItem,
} from "@/prisma/generated/prisma-client"

export type ProductWithRelations = Product & {
  items: ProductItem[]
  ingredients: Ingredient[]
}
