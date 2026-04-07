import { axiosInstance } from "./instance"
import { apiRoutes } from "./routes"
import { CartDTO } from "./dto/cart.dto"

export const fetchCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.get<CartDTO>(apiRoutes.CART)
  return data
}

export const updateItemQuantity = async (
  id: number,
  quantity: number
): Promise<CartDTO> => {
  const { data } = await axiosInstance.put<CartDTO>(`${apiRoutes.CART}/${id}`, {
    quantity,
  })
  return data
}

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  const { data } = await axiosInstance.delete<CartDTO>(
    `${apiRoutes.CART}/${id}`
  )
  return data
}

export const addCartItem = async (values: any): Promise<CartDTO> => {
  const { data } = await axiosInstance.post<CartDTO>(apiRoutes.CART, values)
  return data
}
