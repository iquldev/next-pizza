import { cn } from "@/shared/lib"
import { Skeleton } from "../ui/skeleton"

export const ProductFormSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="flex w-[55%] items-center justify-center">
        <Skeleton className="relative h-[350px] w-[350px] rounded-full" />
      </div>

      <div className="w-[490px] bg-secondary p-7">
        <Skeleton className="mb-1 h-10 w-2/3 rounded-[8px]" />
        <Skeleton className="mb-2 h-6 w-full rounded-[8px]" />

        <div className="mt-5 flex flex-col gap-4">
          <Skeleton className="h-10 w-full rounded-[8px]" />
          <Skeleton className="h-10 w-full rounded-[8px]" />
        </div>

        <div className="mt-5 h-[420px] rounded-md bg-muted p-5">
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-[15px]" />
            ))}
          </div>
        </div>

        <Skeleton className="mt-10 h-[55px] w-full rounded-[18px]" />
      </div>
    </div>
  )
}
