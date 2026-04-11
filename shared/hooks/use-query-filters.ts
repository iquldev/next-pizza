import { useRouter } from "next/navigation"
import { useEffect } from "react"
import qs from "qs"
import { Filters } from "./use-filters"

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter()

  useEffect(() => {
    const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
      sortBy: filters.sortBy,
    }

    const queryString = qs.stringify(params, {
      arrayFormat: "comma",
    })

    router.push(`/?${queryString}`, { scroll: false })
  }, [
    filters.pizzaTypes,
    filters.prices,
    filters.selectedIngredients,
    filters.sizes,
    filters.sortBy,
    router,
  ])
}
