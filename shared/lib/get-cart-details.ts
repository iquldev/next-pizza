import { CartDTO } from "../services/dto/cart.dto"
import { calcCartItemTotalAmount } from "./calc-cart-item-total-amount"

export interface CartStateItem {
  id: number
  name: string
  unitPrice: number
  price: number
  quantity: number
  imageUrl: string
  pizzaSize?: number | null
  type?: number | null
  ingredients?: Array<{ name: string; price: number }>
}

interface ReturnProps {
  items: CartStateItem[]
  totalAmount: number
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = (data.items || []).map((item) => {
    const totalPrice = calcCartItemTotalAmount(item)
    return {
      id: item.id,
      name: item.productItem.product.name,
      unitPrice: totalPrice / item.quantity,
      price: totalPrice,
      quantity: item.quantity,
      imageUrl: item.productItem.product.imageUrl,
      pizzaSize: item.productItem.size,
      type: item.productItem.pizzaType,
      ingredients: item.ingredients.map((ingredient) => ({
        name: ingredient.name,
        price: ingredient.price,
      })),
    }
  })

  return {
    items,
    totalAmount: items.reduce((sum, item) => sum + item.price, 0),
  }
}
