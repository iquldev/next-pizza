import { PizzaSize, PizzaType } from "@/shared/constants/pizza"
import { mapPizzaType } from "../constants/pizza"
import { CartStateItem } from "./get-cart-details"
export const getCartItemsDetails = (
  pizzaType: PizzaType | undefined,
  pizzaSize: PizzaSize | undefined,
  ingredients: CartStateItem["ingredients"]
): string => {
  const details = []

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType]
    details.push(`${typeName} ${pizzaSize} см`)
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name))
  }

  return details.join(", ")
}
