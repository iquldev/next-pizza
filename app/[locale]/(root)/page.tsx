import { Suspense } from "react"
import {
  Container,
  Title,
  TopBar,
  Filters,
  ProductsGroupList,
  ProductsGroupListSkeleton,
} from "@/shared/components/shared"
import { Skeleton } from "@/shared/components/ui"
import {
  getPizzas,
  getCategories,
  getIngredients,
  GetSearchParams,
} from "@/shared/lib/find-pizzas"
import { getTranslations } from "next-intl/server"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<GetSearchParams>
}) {
  const t = await getTranslations("Home")

  return (
    <>
      <Container className="mt-10">
        <Title text={t("allPizzas")} size="lg" className="font-extrabold" />
      </Container>

      <Suspense
        fallback={
          <div className="sticky top-0 z-10 h-[84px] w-full animate-pulse bg-secondary" />
        }
      >
        <TopBarWrapper />
      </Suspense>

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Suspense
              fallback={
                <div className="flex flex-col gap-6">
                  <Skeleton className="h-8 w-32 rounded-[8px]" />
                  <div className="flex flex-col gap-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        className="h-6 w-full rounded-[8px]"
                      />
                    ))}
                  </div>

                  <Skeleton className="h-8 w-28 rounded-[8px]" />
                  <div className="flex flex-col gap-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        className="h-6 w-full rounded-[8px]"
                      />
                    ))}
                  </div>
                </div>
              }
            >
              <FiltersWrapper />
            </Suspense>
          </div>

          <div className="flex-1">
            <Suspense fallback={<ProductsGroupListSkeleton />}>
              <ProductsList searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </Container>
    </>
  )
}

async function TopBarWrapper() {
  const categories = await getCategories()

  return <TopBar categories={categories} />
}

async function FiltersWrapper() {
  const ingredients = await getIngredients()

  return <Filters ingredients={ingredients} />
}

async function ProductsList({
  searchParams,
}: {
  searchParams: Promise<GetSearchParams>
}) {
  const categories = await getPizzas(searchParams)

  return (
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
  )
}
