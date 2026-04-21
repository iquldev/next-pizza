"use client"

import { cn } from "@/shared/lib"
import { ArrowUpDown } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"
import { useFilters, useQueryFilters } from "@/shared/hooks"
import { useTranslations } from "next-intl"

interface Props {
  className?: string
}

export const SortPopup = ({ className }: Props) => {
  const t = useTranslations("Sort")
  const filters = useFilters()
  const { sortBy, setSortBy } = filters

  useQueryFilters(filters)

  const sortItems = [
    { name: t("rating"), value: "rating" },
    { name: t("priceAsc"), value: "price" },
    { name: t("priceDesc"), value: "-price" },
  ] as const

  const selectedItem = sortItems.find((item) => item.value === sortBy)
  const selectedName = selectedItem ? selectedItem.name : t("rating")

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "inline-flex h-[52px] cursor-pointer items-center gap-1 rounded-2xl bg-muted px-5 transition-all hover:bg-secondary active:translate-y-px",
            className
          )}
        >
          <ArrowUpDown size={16} />
          <b>{t("title")}</b>
          <b className="text-primary lowercase">{selectedName}</b>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-1">
        <ul className="flex flex-col gap-0.5">
          {sortItems.map((item) => (
            <li
              key={item.value}
              onClick={() => setSortBy(item.value)}
              className={cn(
                "flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-primary",
                sortBy === item.value && "bg-muted text-primary"
              )}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
