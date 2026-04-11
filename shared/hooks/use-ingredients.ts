import useSWR from "swr"
import { Api } from "../services/api-client"

export const useIngredients = () => {
  const { data, error, isLoading } = useSWR(
    "ingredients",
    Api.Ingredients.getAll,
    {
      revalidateOnFocus: false,
    }
  )

  return { ingredients: data || [], error, loading: isLoading }
}
