import { cn } from "@/shared/lib"
import { Skeleton } from "../ui/skeleton"

export const ProductCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex h-[260px] w-full items-center justify-center rounded-lg bg-secondary animate-pulse" />
      <Skeleton className="mt-3 h-6 w-3/4 rounded-[8px] bg-secondary" />
      <Skeleton className="mt-2 h-4 w-full rounded-[8px] bg-secondary" />
      <Skeleton className="mt-1 h-4 w-1/2 rounded-[8px] bg-secondary" />

      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-8 w-24 rounded-[8px] bg-secondary" />
        <Skeleton className="h-10 w-28 rounded-[8px] bg-secondary" />
      </div>
    </div>
  )
}
