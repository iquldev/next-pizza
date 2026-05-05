import { useEffect, useState } from "react"
import { PizzaSize, PizzaType } from "../constants/pizza"
import { Variant } from "../components/shared/group-variants"
import { ProductItem } from "@/prisma/generated/prisma-client"
import { useSet } from "react-use"

import { useAvailablePizzaVariants } from "../lib"

interface ReturnProps {
  size: PizzaSize
  type: PizzaType
  selectedIngredients: Set<number>
  availableSizes: Variant[]
  availableTypes: Variant[]
  currentPizza: ProductItem | undefined
  setSize: (size: PizzaSize) => void
  setType: (type: PizzaType) => void
  addIngredient: (ingredientId: number) => void
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(items[0].size as PizzaSize)
  const [type, setType] = useState<PizzaType>(items[0].pizzaType as PizzaType)

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  )

  const currentPizza = items.find(
    (item) => item.pizzaType === type && item.size === size
  )

  const { availablePizzaSizes, availablePizzaTypes } =
    useAvailablePizzaVariants(type, size, items)

  useEffect(() => {
    const isAvailableSize = availablePizzaSizes.find(
      (item) => Number(item.value) === size && !item.disabled
    )
    const availableSize = availablePizzaSizes.find((item) => !item.disabled)

    if (!isAvailableSize && availableSize) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSize(Number(availableSize.value) as PizzaSize)
    }
  }, [type, size, availablePizzaSizes])

  return {
    size,
    type,
    selectedIngredients,
    availableSizes: availablePizzaSizes,
    availableTypes: availablePizzaTypes,
    currentPizza,
    setSize,
    setType,
    addIngredient,
  }
}
