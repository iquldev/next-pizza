import { useEffect } from "react"
import { useCartStore, CartState } from "../store"
import { CartStateItem } from "../lib/get-cart-details"

type ReturnProps = {
  totalAmount: number
  items: CartStateItem[]
  loading: boolean
  updateItemQuantity: (id: number, quantity: number) => void
  removeCartItem: (id: number) => void
}

export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state: CartState) => state)

  useEffect(() => {
    cartState.fetchCartItems()
  }, [cartState.fetchCartItems])

  return cartState
}
