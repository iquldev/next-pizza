"use client"

import { cn } from "@/shared/lib"

import Image from "next/image"
import { Link } from "@/i18n/routing"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet"
import { Button } from "../ui"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Title } from "./title"
import { useEffect, useState } from "react"
import { CartDrawerItem } from "./cart-drawer-item"
import { getCartItemsDetails } from "@/shared/lib/get-cart-items-details"
import { PizzaSize, PizzaType } from "@/shared/constants/pizza"
import { useCart } from "@/shared/hooks/use-cart"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslations } from "next-intl"

interface Props {
  className?: string
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  const t = useTranslations("Cart")
  const commonT = useTranslations("Common")
  const {
    items,
    totalAmount,
    updateItemQuantity,
    removeCartItem,
    loading,
  } = useCart()

  const [redirecting, setRedirecting] = useState(false)

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1

    updateItemQuantity(id, newQuantity)
  }

  return (
    <div className={cn("", className)}>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="flex flex-col justify-between bg-surface-accent p-0">
          <div
            className={cn(
              "flex h-full flex-col",
              items.length === 0 && "justify-center"
            )}
          >
            <SheetHeader className="px-6 pt-6">
              <SheetTitle className={cn(items.length === 0 && "sr-only")}>
                {t("inCart")}{" "}
                <span className="font-bold">
                  {t("itemsCount", { count: items.length })}
                </span>
              </SheetTitle>
            </SheetHeader>

            {items.length === 0 && (
              <div className="mx-auto flex w-72 flex-col items-center justify-center">
                <Image
                  src="/assets/images/empty-box.png"
                  alt="Empty cart"
                  width={120}
                  height={120}
                />
                <Title
                  size="sm"
                  text={t("emptyTitle")}
                  className="my-2 text-center font-bold"
                />
                <p className="mb-5 text-center text-muted-foreground">
                  {t("emptyText")}
                </p>

                <SheetClose asChild>
                  <Button className="h-12 w-56 text-base" size="lg">
                    <ArrowLeft className="mr-2 w-5" />
                    {commonT("back")}
                  </Button>
                </SheetClose>
              </div>
            )}

            {items.length > 0 && (
              <>
                <div className="mt-5 flex-1 overflow-auto">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="mb-2"
                      >
                        <CartDrawerItem
                          id={item.id}
                          imageUrl={item.imageUrl}
                          details={getCartItemsDetails(
                            item.ingredients,
                            item.pizzaType as PizzaType,
                            item.pizzaSize as PizzaSize
                          )}
                          name={item.name}
                          price={item.price}
                          quantity={item.quantity}
                          disabled={loading}
                          onClickCountButton={(type) =>
                            onClickCountButton(item.id, item.quantity, type)
                          }
                          onClickRemove={() => removeCartItem(item.id)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <SheetFooter className="bg-background p-6">
                  <div className="w-full">
                    <div className="mb-4 flex">
                      <span className="flex flex-1 text-lg text-muted-foreground">
                        {commonT("total")}
                        <div className="relative -top-1 mx-2 flex-1 border-b border-dashed border-b-border" />
                      </span>

                      <span className="text-lg font-bold">
                        {totalAmount} {commonT("currency")}
                      </span>
                    </div>

                    <Link href="/checkout">
                      <Button
                        onClick={() => setRedirecting(true)}
                        loading={redirecting || loading}
                        type="submit"
                        className="h-12 w-full text-base"
                      >
                        {t("checkout")}
                        <ArrowRight className="ml-2 w-5" />
                      </Button>
                    </Link>
                  </div>
                </SheetFooter>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
