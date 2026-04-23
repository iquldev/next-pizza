import { ArrowRight, Package, Percent, Truck } from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/shared/lib/utils"
import { Button } from "../ui"
import { Skeleton } from "../ui/skeleton"
import { CheckoutItemDetails } from "./checkout-item-details"
import { WhiteBlock } from "./white-block"

const VAT = 15
const DELIVERY_PRICE = 250

interface Props {
  totalAmount: number
  loading?: boolean
  className?: string
}

export const CheckoutSidebar = ({ totalAmount, loading, className }: Props) => {
  const t = useTranslations("Checkout")
  const commonT = useTranslations("Common")

  const vatPrice = (totalAmount * VAT) / 100
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice

  return (
    <WhiteBlock className={cn("sticky top-4 p-6", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">{t("total")}:</span>
        {loading ? (
          <Skeleton className="h-11 w-48" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">
            {totalPrice} {commonT("currency")}
          </span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-muted-foreground" />
            {t("cartAmount")}:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${totalAmount} ${commonT("currency")}`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-muted-foreground" />
            {t("taxes")}:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${vatPrice} ${commonT("currency")}`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-muted-foreground" />
            {t("delivery")}:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${DELIVERY_PRICE} ${commonT("currency")}`
          )
        }
      />

      <Button
        loading={loading}
        type="submit"
        className="mt-6 h-14 w-full rounded-2xl text-base font-bold"
      >
        {t("pay")}
        <ArrowRight className="ml-2 w-5" />
      </Button>
    </WhiteBlock>
  )
}
