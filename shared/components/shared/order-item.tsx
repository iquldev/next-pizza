import React from "react"
import { cn } from "@/shared/lib/utils"
import { OrderStatus } from "@prisma/client"
import { useTranslations } from "next-intl"

interface Props {
  id: number
  status: OrderStatus
  createdAt: Date
  totalAmount: number
  items: any[]
  className?: string
}

export const OrderItem: React.FC<Props> = ({
  id,
  status,
  createdAt,
  totalAmount,
  items,
  className,
}) => {
  const t = useTranslations("Orders")

  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-background p-7",
        className
      )}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">
            {t("details.number")} {id}
          </span>
          <span className="text-sm text-muted-foreground">
            {createdAt.toLocaleDateString()}{" "}
            {createdAt.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div
          className={cn(
            "rounded-full px-3 py-1 text-sm font-medium",
            status === OrderStatus.PENDING &&
              "bg-status-pending text-status-pending-foreground",
            status === OrderStatus.SUCCEEDED &&
              "bg-status-succeeded text-status-succeeded-foreground",
            status === OrderStatus.CANCELLED &&
              "bg-status-cancelled text-status-cancelled-foreground"
          )}
        >
          {t(`status.${status}`)}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item: any, index: number) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-dashed border-b-border pb-3 last:border-0 last:pb-0"
          >
            <div className="flex flex-col">
              <span className="font-bold">{item.productItem.product.name}</span>
              <span className="text-xs text-muted-foreground">
                {item.quantity} x {item.productItem.price} $
              </span>
            </div>
            <span className="font-bold">
              {item.quantity * item.productItem.price} $
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
        <span className="text-xl text-muted-foreground">
          {t("details.total")}
        </span>
        <span className="text-2xl font-extrabold">{totalAmount} $</span>
      </div>
    </div>
  )
}
