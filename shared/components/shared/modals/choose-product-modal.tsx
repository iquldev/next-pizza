"use client"

import { Dialog, DialogContent } from "@/shared/components/ui/dialog"
import { cn } from "@/shared/lib"
import { useRouter } from "next/navigation"
import { ChooseProductForm } from "../choose-product-form"
import { useState } from "react"
import { ProductWithRelations } from "@/@types/prisma"
import { ChoosePizzaForm } from "../choose-pizza-form"

interface Props {
  product: ProductWithRelations
  className?: string
}

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter()
  const [open, setOpen] = useState(true)

  const isPizzaForm = Boolean(product.items[0].pizzaType)

  const handleOpenChange = () => {
    setOpen(false)
    router.back()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "min-h-[500px] w-[1060px] max-w-[1060px] overflow-hidden bg-white p-0 sm:max-w-none",
          className
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            onAddToCart={(item) => console.log(item)}
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  )
}
