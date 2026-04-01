import { useMemo } from "react"
import { calcTotalPizzaPrice } from "./calc-total-pizza-price"
import { mapPizzaType } from "../constants/pizza"
import { Ingredient, ProductItem } from "@prisma/client"
import { PizzaSize, PizzaType } from "../constants/pizza"

interface Props {
  items: ProductItem[]
  ingredients: Ingredient[]
  selectedIngredients: Set<number>
  type: PizzaType
  size: PizzaSize
}

export const usePizzaDetails = ({
  items,
  ingredients,
  selectedIngredients,
  type,
  size,
}: Props) => {
  const totalPrice = useMemo(() => {
    return calcTotalPizzaPrice(
      items,
      ingredients,
      selectedIngredients,
      type,
      size
    )
  }, [items, ingredients, selectedIngredients, type, size])

  const textDetaills = `${size} см, ${mapPizzaType[type].toLowerCase()} тесто`

  return {
    totalPrice,
    textDetaills,
  }
}
