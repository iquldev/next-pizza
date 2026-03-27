import { Product } from "@prisma/client"
import { axiosInstance } from "./instance"
import { apiRoutes } from "./routes"

export const search = async (query: string): Promise<Product[]> => {
  const { data } = await axiosInstance.get<Product[]>(
    apiRoutes.SEARCH_PRODUCTS,
    {
      params: {
        query,
      },
    }
  )

  return data
}
