import { useMemo } from "react"
import {
  PIZZA_SIZES,
  PIZZA_TYPES,
  PizzaSize,
  PizzaType,
} from "../constants/pizza"
import { ProductItem } from "@/prisma/generated/prisma-client"

export const useAvailablePizzaVariants = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[]
) => {
  const availablePizzaSizes = useMemo(
    () =>
      PIZZA_SIZES.map((item) => ({
        ...item,
        disabled: !items.some(
          (pizza) =>
            pizza.pizzaType === type && pizza.size === Number(item.value)
        ),
      })),
    [type, items]
  )

  const availablePizzaTypes = useMemo(
    () =>
      PIZZA_TYPES.map((item) => ({
        ...item,
        disabled: !items.some(
          (pizza) =>
            pizza.pizzaType === Number(item.value) &&
            pizza.size === Number(size)
        ),
      })),
    [size, items]
  )

  return { availablePizzaSizes, availablePizzaTypes }
}
