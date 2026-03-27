import { Api } from "@/services/api-client"
import { Ingredient } from "@prisma/client"
import { useEffect, useState } from "react"

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getIngredients() {
      try {
        setLoading(true)
        const data = await Api.Ingredients.getAll()
        setIngredients(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    getIngredients()
  }, [])

  return {
    ingredients,
    loading,
  }
}
