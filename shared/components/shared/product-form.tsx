"use client"

import { ProductWithRelations } from "@/@types/prisma"
import { ChoosePizzaForm, ChooseProductForm } from "@/shared/components/shared"
import { useCartStore } from "@/shared/store/cart"
import { useRouter } from "@/i18n/routing"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

interface Props {
  product: ProductWithRelations
  className?: string
}

export const ProductForm = ({ product, className }: Props) => {
  const t = useTranslations("Cart")
  const { addCartItem, loading } = useCartStore()
  const router = useRouter()

  const firstItem = product.items[0]
  const isPizzaForm = Boolean(firstItem.pizzaType)

  const onSubmit = async (
    productItemId?: number,
    ingredientsIds?: number[]
  ) => {
    try {
      const itemId = productItemId ?? firstItem.id

      await addCartItem({
        productItemId: itemId,
        ingredientsIds,
      })

      toast.success(t("toastSuccess", { name: product.name }), {
        position: "top-center",
      })
      router.back()
    } catch (error) {
      console.error(error)
      toast.error(t("toastError"), {
        position: "top-center",
      })
    }
  }

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onAddToCart={(productItemId, ingredientsIds) =>
          onSubmit(productItemId, ingredientsIds)
        }
        loading={loading}
        className={className}
      />
    )
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      price={firstItem.price}
      onAddToCart={() => onSubmit(firstItem.id)}
      loading={loading}
      className={className}
    />
  )
}
