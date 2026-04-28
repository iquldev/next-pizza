import Stripe from "stripe"

interface PaymentProps {
  id: number
  totalAmount: number
  description?: string
}

export const createPayment = async (props: PaymentProps) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2026-04-22.dahlia",
  })

  const session = await stripe.checkout.sessions.create({
    metadata: {
      orderId: props.id,
    },
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Next Pizza | Заказ #${props.id}`,
            description: props.description || "Оплата заказа в Next Pizza",
          },
          unit_amount: props.totalAmount * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url:
      process.env.STRIPE_SUCCESS_URL || "http://localhost:3000/?paid",
    cancel_url:
      process.env.STRIPE_CANCEL_URL || "http://localhost:3000/?cancelled",
  })

  return session
}
