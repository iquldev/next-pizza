import { cn } from "@/shared/lib/utils"
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
        "sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5",
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
