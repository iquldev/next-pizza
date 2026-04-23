import { cn } from "@/shared/lib/utils"

interface Props {
  className?: string
}

export const CheckoutItemSkeleton = ({ className }: Props) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-5">
        <div className="h-[50px] w-[50px] animate-pulse rounded-full bg-muted" />
        <h2 className="h-5 w-40 animate-pulse rounded bg-muted" />
      </div>
      <div className="h-5 w-10 animate-pulse rounded bg-muted" />
      <div className="h-8 w-[133px] animate-pulse rounded bg-muted" />
    </div>
  )
}
