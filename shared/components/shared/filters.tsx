"use client"

import { cn } from "@/shared/lib"
import { Title } from "./title"
import { Input } from "../ui/input"
import { RangeSlider } from "./range-slider"
import { CheckboxFiltersGroup } from "./checkbox-filters-group"
import { useIngredients, useFilters, useQueryFilters } from "@/shared/hooks"
import { useMemo } from "react"
import { Button } from "../ui"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"
import { Ingredient } from "@prisma/client"

interface Props {
  className?: string
  ingredients?: Ingredient[]
}

export const Filters = ({
  className,
  ingredients: initialIngredients,
}: Props) => {
  const t = useTranslations("Filters")
  const { ingredients, loading } = useIngredients(initialIngredients)
  const filters = useFilters()

  useQueryFilters(filters)

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0])
    filters.setPrices("priceTo", prices[1])
  }

  const items = useMemo(
    () =>
      [...ingredients]
        .map((item) => ({
          text: item.name,
          value: String(item.id),
        }))
        .sort((a, b) => {
          const aSelected = filters.selectedIngredients.has(a.value)
          const bSelected = filters.selectedIngredients.has(b.value)
          if (aSelected && !bSelected) return -1
          if (!aSelected && bSelected) return 1
          return 0
        }),
    [ingredients, filters.selectedIngredients]
  )

  return (
    <div className={cn("", className)}>
      <Title text={t("title")} size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        title={t("doughType")}
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: t("traditional"), value: "1" },
          { text: t("thin"), value: "2" },
        ]}
      />

      <CheckboxFiltersGroup
        title={t("sizesTitle")}
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: t("sizeCm", { cm: 20 }), value: "20" },
          { text: t("sizeCm", { cm: 30 }), value: "30" },
          { text: t("sizeCm", { cm: 40 }), value: "40" },
        ]}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="pb-3 font-bold">{t("priceRange")}</p>
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
          className="cursor-pointer"
        />
      </div>

      <CheckboxFiltersGroup
        title={t("ingredients")}
        className="mt-5"
        limit={5}
        loading={loading}
        defaultItems={items.slice(0, 5)}
        items={items}
        onClickCheckbox={filters.setIngredients}
        selected={filters.selectedIngredients}
        name="ingredients"
      />

      <AnimatePresence>
        {(filters.selectedIngredients.size > 0 ||
          filters.pizzaTypes.size > 0 ||
          filters.sizes.size > 0 ||
          filters.prices.priceFrom ||
          filters.prices.priceTo) && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 20 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-t-neutral-100 pt-5">
              <Button
                className="w-full"
                variant="secondary"
                onClick={filters.resetFilters}
              >
                {t("reset")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
