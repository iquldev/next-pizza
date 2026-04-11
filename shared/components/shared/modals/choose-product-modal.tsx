"use client"

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import { cn } from "@/shared/lib"
import { useRouter } from "next/navigation"
import { ChooseProductForm } from "../choose-product-form"
import { useState } from "react"
import { ProductWithRelations } from "@/@types/prisma"
import { ChoosePizzaForm } from "../choose-pizza-form"
import { useCartStore } from "@/shared/store/cart"
import { toast } from "sonner"

interface Props {
  product: ProductWithRelations
  className?: string
}

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter()
  const [open, setOpen] = useState(true)

  const firstItem = product.items[0]
  const isPizzaForm = Boolean(firstItem.pizzaType)

  const { addCartItem, loading } = useCartStore()

  const handleOpenChange = () => {
    setOpen(false)
    router.back()
  }

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

      toast.success("Товар добавлен в корзину", { position: "top-center" })
      handleOpenChange()
    } catch (error) {
      console.error(error)
      toast.error("Ошибка при добавлении товара в корзину", {
        position: "top-center",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "min-h-[500px] w-[1060px] max-w-[1060px] overflow-hidden bg-white p-0 sm:max-w-none",
          className
        )}
      >
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            onAddToCart={(productItemId, ingredientsIds) =>
              onSubmit(productItemId, ingredientsIds)
            }
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItem.price}
            onAddToCart={() => onSubmit(firstItem.id)}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
