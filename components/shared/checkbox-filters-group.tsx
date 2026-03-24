"use client"

import { cn } from "@/lib/utils"
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox"
import { Input } from "../ui/input"
import { useState } from "react"

type Item = FilterCheckboxProps

interface Props {
  title: string
  items: Item[]
  defaultItems: Item[]
  limit?: number
  searchInputPlaceholder?: string
  onChange?: (value: string) => void
  defaultValue?: string[]

  className?: string
}

export const CheckboxFiltersGroup = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  onChange,
  defaultValue,
  className,
}: Props) => {
  const [showAll, setShowAll] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : defaultItems

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
            placeholder={searchInputPlaceholder}
            className="border-none bg-gray-50"
          />
        </div>
      ) : null}

      <div className="scrollbar flex max-h-96 flex-col gap-4 overflow-auto pr-2">
        {list.map((item) => (
          <FilterCheckbox
            key={String(item.value)}
            text={item.text}
            value={item.value}
            onCheckedChange={() => {}}
            endAdornment={item.endAdornment}
            checked={false}
          />
        ))}
      </div>

      {items.length > defaultItems.length && (
        <div
          className={showAll ? "mt-4 border-t border-t-neutral-100 pt-4" : ""}
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-3 text-primary"
          >
            {showAll ? "Скрыть" : "+ Показать все"}
          </button>
        </div>
      )}
    </div>
  )
}
