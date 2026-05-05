import { Ingredient } from "@/prisma/generated/prisma-client"
import { axiosInstance } from "./instance"
import { apiRoutes } from "./routes"

export const getAll = async (): Promise<Ingredient[]> => {
  const { data } = await axiosInstance.get<Ingredient[]>(apiRoutes.INGREDIENTS)

  return data
}
