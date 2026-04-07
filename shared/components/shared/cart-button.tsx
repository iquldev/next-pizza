"use client"

import { cn } from "@/shared/lib"
import { Button } from "../ui"
import { ArrowRight, ShoppingCart, User } from "lucide-react"
import { CartDrawer } from "./cart-drawer"
import { useCartStore } from "@/shared/store/cart"

type Props = {
  className?: string
}

export const CartButton = ({ className }: Props) => {
  const totalAmount = useCartStore((state) => state.totalAmount)
  const items = useCartStore((state) => state.items)
  const loading = useCartStore((state) => state.loading)
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Button variant="outline" className="flex items-center gap-1">
        <User size={16} />
        Войти
      </Button>

      <div>
        <CartDrawer>
          <Button loading={loading} className="group relative">
            <b>{totalAmount} ₽</b>
            <span className="mx-3 h-full w-px bg-white/30"></span>
            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
              <ShoppingCart size={16} className="relative" strokeWidth={2} />
              <b>{items.length}</b>
            </div>
            <ArrowRight
              size={20}
              className="absolute right-5 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </Button>
        </CartDrawer>
      </div>
    </div>
  )
}
