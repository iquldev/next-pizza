import { Suspense } from "react"
import {
  Container,
  Title,
  TopBar,
  Filters,
  ProductsGroupList,
} from "@/shared/components/shared"
import { Skeleton } from "@/shared/components/ui"
import { getPizzas, GetSearchParams } from "@/shared/lib/find-pizzas"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<GetSearchParams>
}) {
  const categories = await getPizzas(searchParams)

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar
        categories={categories.filter((cat) => cat.products.length > 0)}
      />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Suspense
              fallback={
                <div>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} className="mb-4 h-6 rounded-[8px]" />
                  ))}

                  <Skeleton className="mb-4 h-6 w-28 rounded-[8px]" />
                </div>
              }
            >
              <Filters />
            </Suspense>
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      items={category.products}
                      categoryId={category.id}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
