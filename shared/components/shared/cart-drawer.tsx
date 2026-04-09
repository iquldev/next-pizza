"use client"

import { cn } from "@/shared/lib"

import Image from "next/image"
import Link from "next/link"

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
import { useCartStore } from "@/shared/store/cart"

interface Props {
  className?: string
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  const {
    fetchCartItems,
    items,
    totalAmount,
    updateItemQuantity,
    removeCartItem,
  } = useCartStore()

  useEffect(() => {
    fetchCartItems()
  }, [fetchCartItems])

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
        <SheetContent className="flex flex-col justify-between bg-[#F4F1EE] pb-0">
          <div
            className={cn(
              "flex h-full flex-col",
              items.length === 0 && "justify-center"
            )}
          >
            <SheetHeader>
              <SheetTitle className={cn(items.length === 0 && "sr-only")}>
                В корзине{" "}
                <span className="font-bold">
                  {items.length}{" "}
                  {items.length === 1
                    ? "товар"
                    : items.length >= 2 && items.length <= 4
                      ? "товара"
                      : "товаров"}
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
                  text="Корзина пустая"
                  className="my-2 text-center font-bold"
                />
                <p className="mb-5 text-center text-neutral-500">
                  Добавьте хотя бы одну пиццу, чтобы совершить заказ
                </p>

                <SheetClose asChild>
                  <Button className="h-12 w-56 text-base" size="lg">
                    <ArrowLeft className="mr-2 w-5" />
                    Вернуться назад
                  </Button>
                </SheetClose>
              </div>
            )}

            {items.length > 0 && (
              <>
                <div className="-mx-6 mt-5 flex-1 overflow-auto">
                  {items.map((item) => (
                    <div key={item.id} className="mb-2">
                      <CartDrawerItem
                        id={item.id}
                        imageUrl={item.imageUrl}
                        details={getCartItemsDetails(
                          item.type as PizzaType,
                          item.pizzaSize as PizzaSize,
                          item.ingredients
                        )}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        onClickCountButton={(type) =>
                          onClickCountButton(item.id, item.quantity, type)
                        }
                        onClickRemove={() => removeCartItem(item.id)}
                      />
                    </div>
                  ))}
                </div>

                <SheetFooter className="-mx-6 bg-white p-8">
                  <div className="w-full">
                    <div className="mb-4 flex">
                      <span className="flex flex-1 text-lg text-neutral-500">
                        Итого
                        <div className="relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200" />
                      </span>

                      <span className="text-lg font-bold">{totalAmount} ₽</span>
                    </div>

                    <Link href="/checkout">
                      <Button
                        onClick={() => setRedirecting(true)}
                        loading={redirecting}
                        type="submit"
                        className="h-12 w-full text-base"
                      >
                        Оформить заказ
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
