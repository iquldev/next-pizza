import useSWR from "swr"
import { Api } from "../services/api-client"
import { Ingredient } from "@/prisma/generated/prisma-client"

export const useIngredients = (initialIngredients: Ingredient[] = []) => {
  const { data, error, isLoading } = useSWR(
    "ingredients",
    Api.Ingredients.getAll,
    {
      fallbackData: initialIngredients,
      revalidateOnFocus: false,
    }
  )

  return { ingredients: data || [], error, loading: isLoading && !data }
}
