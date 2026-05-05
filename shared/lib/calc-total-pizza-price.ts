import { Ingredient, ProductItem } from "@/prisma/generated/prisma-client"
import { PizzaSize, PizzaType } from "../constants/pizza"

export const calcTotalPizzaPrice = (
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
  type: PizzaType,
  size: PizzaSize
) => {
  const pizzaPrice = items?.reduce((acc, item) => {
    if (item.pizzaType === type && item.size === size) {
      return acc + item.price
    }
    return acc
  }, 0)

  const ingredientPrice = ingredients.reduce((acc, ingredient) => {
    if (selectedIngredients.has(ingredient.id)) {
      return acc + ingredient.price
    }
    return acc
  }, 0)

  return pizzaPrice + ingredientPrice
}
