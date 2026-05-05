import { useEffect } from "react"
import { useCartStore, CartState } from "../store"
import { CartStateItem } from "../lib/get-cart-details"
import { authClient } from "../lib"

type ReturnProps = {
  totalAmount: number
  items: CartStateItem[]
  loading: boolean
  updateItemQuantity: (id: number, quantity: number) => void
  removeCartItem: (id: number) => void
}

export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state: CartState) => state)
  const { data: session } = authClient.useSession()

  useEffect(() => {
    cartState.fetchCartItems()
  }, [cartState.fetchCartItems, session?.user.id])

  return cartState
}
