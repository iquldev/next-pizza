"use client"

import { cn } from "@/shared/lib"
import { Title } from "./title"
import { Input } from "../ui/input"
import { RangeSlider } from "./range-slider"
import { CheckboxFiltersGroup } from "./checkbox-filters-group"
import { useIngredients, useFilters, useQueryFilters } from "@/shared/hooks"

interface Props {
  className?: string
}

export const Filters = ({ className }: Props) => {
  const { ingredients, loading } = useIngredients()
  const filters = useFilters()

  useQueryFilters(filters)

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0])
    filters.setPrices("priceTo", prices[1])
  }

  return (
    <div className={cn("", className)}>
      <Title text="Фильтры" size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      />

      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="pb-3 font-bold">Цена от и до:</p>
        <div className="mb-5 flex gap-3">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={200}
            value={String(filters.prices.priceFrom)}
            onChange={(e) =>
              filters.setPrices("priceFrom", Number(e.target.value))
            }
          />
          <Input
            type="number"
            placeholder="200"
            min={100}
            max={200}
            value={String(filters.prices.priceTo)}
            onChange={(e) =>
              filters.setPrices("priceTo", Number(e.target.value))
            }
          />
        </div>

        <RangeSlider
          min={0}
          max={200}
          step={10}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 200]}
          onValueChange={updatePrices}
        />
      </div>

      <CheckboxFiltersGroup
        title="Ингредиенты"
        className="mt-5"
        limit={5}
        loading={loading}
        defaultItems={ingredients.slice(0, 5).map((ingredient) => ({
          text: ingredient.name,
          value: String(ingredient.id),
        }))}
        items={ingredients
          .sort((a, b) => {
            const aSelected = filters.selectedIngredients.has(String(a.id))
            const bSelected = filters.selectedIngredients.has(String(b.id))
            if (aSelected && !bSelected) return -1
            if (!aSelected && bSelected) return 1
            return 0
          })
          .map((ingredient) => ({
            text: ingredient.name,
            value: String(ingredient.id),
          }))}
        onClickCheckbox={filters.setIngredients}
        selected={filters.selectedIngredients}
        name="ingredients"
      />
    </div>
  )
}
