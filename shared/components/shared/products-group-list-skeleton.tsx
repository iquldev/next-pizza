import { cn } from "@/shared/lib"
import { ProductCardSkeleton } from "./product-card-skeleton"
import { Skeleton } from "../ui/skeleton"

interface Props {
  className?: string
}

export const ProductsGroupListSkeleton = ({ className }: Props) => {
  return (
    <div className={cn("flex flex-col gap-16", className)}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="min-h-[400px]">
          <Skeleton className="mb-5 h-10 w-48 rounded-[8px] bg-secondary" />
          <div className="grid grid-cols-3 gap-[50px]">
            {Array.from({ length: 3 }).map((_, j) => (
              <ProductCardSkeleton key={j} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
