import { cn } from "@/lib/utils"
import { Title } from "./title"
import { FilterCheckbox } from "./filter-checkbox"
import { Input } from "../ui/input"
import { RangeSlider } from "./range-slider"
import { CheckboxFiltersGroup } from "./checkbox-filters-group"

interface Props {
  className?: string
}

export const Filters = ({ className }: Props) => {
  return (
    <div className={cn("", className)}>
      <Title text="Фильтры" size="sm" className="mb-5 font-bold" />

      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собрать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="pb-3 font-bold">Цена от и до:</p>
        <div className="mb-5 flex gap-3">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={200}
            defaultValue={0}
          />
          <Input type="number" placeholder="200" min={100} max={200} />
        </div>

        <RangeSlider min={0} max={200} step={10} value={[0, 200]} />
      </div>

      <CheckboxFiltersGroup
        title="Ингредиенты"
        className="mt-5"
        limit={5}
        defaultItems={[
          { text: "Сырный соус", value: "1" },
          { text: "Моцарелла", value: "2" },
          { text: "Чеснок", value: "3" },
          { text: "Соленые огурчики", value: "4" },
          { text: "Красный лук", value: "5" },
        ]}
        items={[
          { text: "Сырный соус", value: "1" },
          { text: "Моцарелла", value: "2" },
          { text: "Чеснок", value: "3" },
          { text: "Соленые огурчики", value: "4" },
          { text: "Красный лук", value: "5" },
          { text: "Томаты", value: "6" },
        ]}
      />
    </div>
  )
}
