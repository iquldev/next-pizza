"use client"

import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"

import { Container, Title } from "@/shared/components/shared"
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
} from "@/shared/components/shared/checkout"
import { CheckoutSidebar } from "@/shared/components/shared/checkout-sidebar"
import { useCart } from "@/shared/hooks"
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "@/shared/constants/checkout-form-schema"

export default function CheckoutPage() {
  const t = useTranslations("Checkout")
  const { totalAmount, items, updateItemQuantity, removeCartItem, loading } =
    useCart()

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  })

  const onSubmit = (data: CheckoutFormValues) => {
    console.log(data)
  }

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1
    updateItemQuantity(id, newQuantity)
  }

  return (
    <Container className="mt-10">
      <Title
        text={t("title")}
        className="mb-10 font-extrabold"
        size="lg"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="mb-20 flex flex-1 flex-col gap-10">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />

              <CheckoutPersonalForm
                className={loading ? "pointer-events-none opacity-40" : ""}
              />

              <CheckoutAddressForm
                className={loading ? "pointer-events-none opacity-40" : ""}
              />
            </div>

            <div className="w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || form.formState.isSubmitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}
