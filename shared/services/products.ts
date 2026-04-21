import { ProductWithRelations } from "@/@types/prisma"
import { axiosInstance } from "./instance"
import { apiRoutes } from "./routes"

export const search = async (query: string): Promise<ProductWithRelations[]> => {
  const { data } = await axiosInstance.get<ProductWithRelations[]>(
    apiRoutes.SEARCH_PRODUCTS,
    {
      params: {
        query,
      },
    }
  )

  return data
}
