import { useMemo } from "react"
import { calcTotalPizzaPrice } from "./calc-total-pizza-price"
import { Ingredient, ProductItem } from "@prisma/client"
import { PizzaSize, PizzaType } from "../constants/pizza"
import { useTranslations } from "next-intl"

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
  const t = useTranslations("Filters")

  const totalPrice = useMemo(() => {
    return calcTotalPizzaPrice(
      items,
      ingredients,
      selectedIngredients,
      type,
      size
    )
  }, [items, ingredients, selectedIngredients, type, size])

  const typeName = type === 1 ? t("traditional") : t("thin")
  const textDetaills = t("pizzaDescription", {
    size,
    type: typeName.toLowerCase(),
  })

  return {
    totalPrice,
    textDetaills,
  }
}
