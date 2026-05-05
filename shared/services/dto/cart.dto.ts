import {
  Cart,
  CartItem,
  Ingredient,
  Product,
  ProductItem,
} from "@/prisma/generated/prisma-client"

export type CartItemDTO = CartItem & {
  productItem: ProductItem & {
    product: Product
  }
  ingredients: Ingredient[]
}

export interface CartDTO extends Cart {
  items: CartItemDTO[]
}

export interface CreateCartItemValues {
  productItemId: number
  ingredientsIds?: number[]
}
