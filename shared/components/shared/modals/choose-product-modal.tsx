"use client"

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import { cn } from "@/shared/lib"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ProductWithRelations } from "@/@types/prisma"
import { ProductForm } from "../product-form"

interface Props {
  product: ProductWithRelations
  className?: string
}

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter()
  const [open, setOpen] = useState(true)

  const handleOpenChange = () => {
    setOpen(false)
    router.back()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "min-h-[500px] w-[1060px] max-w-[1060px] overflow-hidden bg-background p-0 sm:max-w-none",
          className
        )}
      >
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <ProductForm product={product} />
      </DialogContent>
    </Dialog>
  )
}
