import { useSearchParams } from "next/navigation"
import { useSet } from "react-use"
import { useCallback, useMemo, useState } from "react"

interface PriceProps {
  priceFrom?: number
  priceTo?: number
}

interface QueryFilters extends PriceProps {
  pizzaTypes: string
  sizes: string
  ingredients: string
  sortBy: string
}

export interface Filters {
  selectedIngredients: Set<string>
  pizzaTypes: Set<string>
  sizes: Set<string>
  prices: PriceProps
  sortBy: string
}

interface ReturnProps extends Filters {
  setIngredients: (value: string) => void
  setSelectedIngredients: (value: string) => void
  setPizzaTypes: (value: string) => void
  setSizes: (value: string) => void
  setPrices: (name: keyof PriceProps, value: number) => void
  setSortBy: (value: string) => void
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(",") || [])
  )

  const [selectedPizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(searchParams.get("pizzaTypes")?.split(",") || [])
  )
  const [selectedSizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.get("sizes")?.split(",") || [])
  )

  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  })

  const [sortBy, setSortBy] = useState<string>(
    searchParams.get("sortBy") || "rating"
  )

  const updatePrice = useCallback((name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  return useMemo(
    () => ({
      setIngredients: toggleIngredients,
      setSelectedIngredients: toggleIngredients,
      setPizzaTypes: togglePizzaTypes,
      setSizes: toggleSizes,
      setPrices: updatePrice,
      setSortBy,
      prices,
      selectedIngredients,
      pizzaTypes: selectedPizzaTypes,
      sizes: selectedSizes,
      sortBy,
    }),
    [
      prices,
      selectedPizzaTypes,
      selectedSizes,
      selectedIngredients,
      sortBy,
      toggleIngredients,
      togglePizzaTypes,
      toggleSizes,
      updatePrice,
    ]
  )
}
