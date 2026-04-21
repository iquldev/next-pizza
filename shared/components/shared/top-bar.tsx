import { cn } from "@/shared/lib"
import { Container } from "./container"
import { Categories } from "./categories"
import { SortPopup } from "./sort-popup"
import { Category } from "@prisma/client"

interface Props {
  className?: string
  categories: Category[]
}

export const TopBar = ({ className, categories }: Props) => {
  return (
    <div
      className={cn(
        "sticky top-0 z-10 bg-background py-5 shadow-lg shadow-black/5 dark:shadow-black/40",
        className
      )}
    >
      <Container className="flex items-center justify-between">
        <Categories categories={categories} />
        <SortPopup />
      </Container>
    </div>
  )
}
