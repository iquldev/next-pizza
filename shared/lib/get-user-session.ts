import { auth } from "./auth"
import { headers } from "next/headers"

export const getUserSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  })
}
