"use client"

import { cn } from "@/shared/lib"
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox"
import { Input } from "../ui/input"
import { Skeleton } from "../ui/skeleton"
import { useState } from "react"
import { motion, LayoutGroup } from "framer-motion"
import { useTranslations } from "next-intl"

type Item = FilterCheckboxProps

interface Props {
  title: string
  items: Item[]
  defaultItems?: Item[]
  limit?: number
  searchInputPlaceholder?: string
  onClickCheckbox?: (id: string) => void
  defaultValue?: string[]
  loading?: boolean
  selected?: Set<string>
  name?: string

  className?: string
}

export const CheckboxFiltersGroup = ({
  title,
  items,
  defaultItems = items,
  limit = 5,
  searchInputPlaceholder,
  loading,
  onClickCheckbox,
  selected: selectedIds,
  className,
  name,
}: Props) => {
  const t = useTranslations("Filters")
  const [showAll, setShowAll] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : defaultItems.slice(0, limit)

  if (loading) {
    return (
      <div className={className}>
        <p className="mb-3 font-bold">{title}</p>

        {Array.from({ length: limit }).map((_, index) => (
          <Skeleton key={index} className="mb-4 h-6 rounded-[8px]" />
        ))}

        <Skeleton className="mb-4 h-6 w-28 rounded-[8px]" />
      </div>
    )
  }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className={cn("", className)}>
      <p className="mb-3 font-bold">{title}</p>

      {showAll ? (
        <div className="mb-5">
          <Input
            onChange={onChangeSearch}
            placeholder={searchInputPlaceholder || t("searchPlaceholder")}
            className="border-none bg-muted"
          />
        </div>
      ) : null}

      <LayoutGroup>
        <div className="scrollbar flex max-h-96 flex-col gap-4 overflow-auto pr-2">
          {list.map((item) => (
            <motion.div
              layout
              key={String(item.value)}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 40,
                mass: 1,
              }}
            >
              <FilterCheckbox
                text={item.text}
                value={item.value}
                endAdornment={item.endAdornment}
                checked={selectedIds?.has(item.value)}
                onCheckedChange={() => onClickCheckbox?.(item.value)}
                name={name}
              />
            </motion.div>
          ))}
        </div>
      </LayoutGroup>

      {items.length > defaultItems.length && (
        <div
          className={showAll ? "mt-4 border-t border-t-border pt-4" : ""}
        >
          <button
            onClick={() => setShowAll(!showAll)}
            type="button"
            className="mt-3 cursor-pointer text-primary"
          >
            {showAll ? t("hide") : t("showAll")}
          </button>
        </div>
      )}
    </div>
  )
}
