"use client"

import { cn } from "@/shared/lib"
import { useCategoryStore } from "@/shared/store/category"
import { Category } from "@prisma/client"

interface Props {
  className?: string
  categories: Category[]
}

export const Categories = ({ className, categories }: Props) => {
  const activeCategoryId = useCategoryStore((state) => state.activeId)
  return (
    <div
      className={cn("inline-flex gap-1 rounded-2xl bg-muted p-1", className)}
    >
      {categories.map((cat) => (
        <a
          key={cat.id}
          href={`#${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
          className={cn(
            "flex h-11 items-center rounded-2xl px-5 font-bold",
            activeCategoryId === cat.id
              ? "bg-background text-primary shadow-md shadow-secondary"
              : ""
          )}
        >
          {cat.name}
        </a>
      ))}
    </div>
  )
}
