import { z } from "zod"

const phoneRegex = /^\+?[78][-\s]?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Validation.firstName" }),
  lastName: z
    .string()
    .min(2, { message: "Validation.lastName" }),
  email: z.string().email({ message: "Validation.email" }),
  phone: z.string().regex(phoneRegex, { message: "Validation.phone" }),
  address: z.string().min(5, { message: "Validation.address" }),
  comment: z.string().optional(),
})

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>
