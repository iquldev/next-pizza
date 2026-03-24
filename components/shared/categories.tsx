"use client"

import { cn } from "@/lib/utils"
import { useCategoryStore } from "@/store/category"

interface Props {
  className?: string
}

const cats = [
  { id: 1, name: "Пиццы" },
  { id: 2, name: "Комбо" },
  { id: 3, name: "Закуски" },
  { id: 4, name: "Коктейли" },
  { id: 5, name: "Кофе" },
  { id: 6, name: "Напитки" },
  { id: 7, name: "Десерты" },
]

export const Categories = ({ className }: Props) => {
  const activeCategoryId = useCategoryStore((state) => state.activeId)
  return (
    <div
      className={cn("inline-flex gap-1 rounded-2xl bg-gray-50 p-1", className)}
    >
      {cats.map((cat) => (
        <a
          key={cat.id}
          href={`#${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
          className={cn(
            "flex h-11 items-center rounded-2xl px-5 font-bold",
            activeCategoryId === cat.id
              ? "bg-white text-primary shadow-md shadow-gray-100"
              : ""
          )}
        >
          {cat.name}
        </a>
      ))}
    </div>
  )
}
