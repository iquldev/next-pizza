import { useTranslations } from "next-intl"

import { WhiteBlock } from "../white-block"
import { CheckoutItem } from "../checkout-item"
import { getCartItemsDetails } from "@/shared/lib"
import { PizzaSize, PizzaType } from "@/shared/constants/pizza"
import { CartStateItem } from "@/shared/lib/get-cart-details"
import { CheckoutItemSkeleton } from "../checkout-item-skeleton"

interface Props {
  items: CartStateItem[]
  onClickCountButton: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void
  removeCartItem: (id: number) => void
  loading?: boolean
  className?: string
}

export const CheckoutCart = ({
  items,
  onClickCountButton,
  removeCartItem,
  loading,
  className,
}: Props) => {
  const t = useTranslations("Checkout")

  return (
    <WhiteBlock title={t("cartTitle")} className={className}>
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(4)].map((_, index) => (
              <CheckoutItemSkeleton key={index} />
            ))
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
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
                disabled={item.disabled}
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)
                }
                onClickRemove={() => removeCartItem(item.id)}
              />
            ))}
      </div>
    </WhiteBlock>
  )
}
