import { Container, ProductsGroupListSkeleton } from "@/shared/components/shared"
import { Skeleton } from "@/shared/components/ui"

export default function Loading() {
  return (
    <>
      <Container className="mt-10">
        <Skeleton className="h-10 w-64 rounded-[8px]" />
      </Container>

      <div className="sticky top-0 z-10 bg-background py-5 shadow-lg shadow-black/5 dark:shadow-black/40">
        <Container className="flex items-center justify-between">
          <div className="flex gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-11 w-24 rounded-[8px]" />
            ))}
          </div>
          <Skeleton className="h-11 w-32 rounded-[8px]" />
        </Container>
      </div>

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <div className="flex flex-col gap-6">
              <Skeleton className="h-8 w-32 rounded-[8px]" />
              <div className="flex flex-col gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full rounded-[8px]" />
                ))}
              </div>

              <Skeleton className="h-8 w-28 rounded-[8px]" />
              <div className="flex flex-col gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full rounded-[8px]" />
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <ProductsGroupListSkeleton />
          </div>
        </div>
      </Container>
    </>
  )
}
