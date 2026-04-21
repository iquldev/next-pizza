import { useSearchParams } from "next/navigation"
import { useSet } from "react-use"
import { useCallback, useMemo, useState } from "react"

interface PriceProps {
  priceFrom?: number
  priceTo?: number
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
  setPizzaTypes: (value: string) => void
  setSizes: (value: string) => void
  setPrices: (name: keyof PriceProps, value: number) => void
  setSortBy: (value: string) => void
  resetFilters: () => void
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams()

  const [
    selectedIngredients,
    { toggle: toggleIngredients, clear: clearIngredients },
  ] = useSet(new Set<string>(searchParams.get("ingredients")?.split(",") || []))

  const [
    selectedPizzaTypes,
    { toggle: togglePizzaTypes, clear: clearPizzaTypes },
  ] = useSet(new Set<string>(searchParams.get("pizzaTypes")?.split(",") || []))

  const [selectedSizes, { toggle: toggleSizes, clear: clearSizes }] = useSet(
    new Set<string>(searchParams.get("sizes")?.split(",") || [])
  )

  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: searchParams.get("priceFrom")
      ? Number(searchParams.get("priceFrom"))
      : undefined,
    priceTo: searchParams.get("priceTo")
      ? Number(searchParams.get("priceTo"))
      : undefined,
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

  const resetFilters = useCallback(() => {
    clearIngredients()
    clearPizzaTypes()
    clearSizes()
    setPrices({ priceFrom: undefined, priceTo: undefined })
  }, [clearIngredients, clearPizzaTypes, clearSizes])

  return useMemo(
    () => ({
      setIngredients: toggleIngredients,
      setPizzaTypes: togglePizzaTypes,
      setSizes: toggleSizes,
      setPrices: updatePrice,
      setSortBy,
      resetFilters,
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
      resetFilters,
    ]
  )
}
