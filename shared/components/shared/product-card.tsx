"use client"

import { cn } from "@/shared/lib"
import Image from "next/image"
import { Link, useRouter } from "@/i18n/routing"
import { Title } from "./title"
import { Button } from "../ui/button"
import { Pizza, Plus } from "lucide-react"
import { useCartStore } from "@/shared/store/cart"
import { toast } from "sonner"
import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

interface Props {
  className?: string
  name: string
  price: number
  imageUrl: string
  description: string
  id: string
  productItemId?: number
  isPizza?: boolean
}

export const ProductCard = ({
  className,
  name,
  price,
  imageUrl,
  description,
  id,
  productItemId,
  isPizza,
}: Props) => {
  const t = useTranslations("Common")
  const cartT = useTranslations("Cart")
  const addCartItem = useCartStore((state) => state.addCartItem)
  const [adding, setAdding] = useState(false)
  const router = useRouter()

  const onClickAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (isPizza) {
      router.push(`/product/${id}`)
      return
    }

    try {
      if (productItemId) {
        setAdding(true)
        await addCartItem({
          productItemId,
        })
        toast.success(cartT("toastSuccess", { name }))
      }
    } catch (error) {
      console.error(error)
      toast.error(cartT("toastError"))
    } finally {
      setAdding(false)
    }
  }

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: { duration: 0.2 },
        layout: { type: "spring", stiffness: 500, damping: 40 },
      }}
      className={cn("flex flex-col justify-between", className)}
    >
      <Link href={`/product/${id}`} prefetch={true}>
        <div className="flex h-[260px] justify-center rounded-lg bg-secondary p-6">
          <Image width={215} height={215} src={imageUrl} alt={name} />
        </div>

        <Title text={name} size="sm" className="mt-3 mb-1 font-bold" />

        <p className="text-sm text-muted-foreground">{description}</p>
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[20px]">
          {t.rich("priceFrom", {
            price,
            bold: (chunks) => <b>{chunks}</b>,
          })}
        </span>

        <Button
          variant="secondary"
          className="text-base font-bold"
          onClick={onClickAdd}
          loading={adding}
        >
          {isPizza ? (
            <Pizza size={20} className="mr-2" />
          ) : (
            <Plus size={20} className="mr-2" />
          )}

          {isPizza ? t("select") : t("add")}
        </Button>
      </div>
    </motion.div>
  )
}
