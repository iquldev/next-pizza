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

interface Props {
  product: ProductWithRelations
  className?: string
}

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter()
  const [open, setOpen] = useState(true)

  const firstItem = product.items[0]
  const isPizzaForm = Boolean(firstItem.pizzaType)

  const { addCartItem } = useCartStore()

  const handleOpenChange = () => {
    setOpen(false)
    router.back()
  }

  const onAddProduct = () => {
    addCartItem({
      productItemId: firstItem.id,
    })
    handleOpenChange()
  }

  const onAddPizza = (productItemId: number, ingredients: number[]) => {
    addCartItem({
      productItemId,
      ingredientsIds: ingredients,
    })
    handleOpenChange()
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
            onAddToCart={onAddPizza}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItem.price}
            onAddToCart={onAddProduct}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
