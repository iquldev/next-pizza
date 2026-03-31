"use client"

import { cn } from "@/shared/lib/utils"
import { Button } from "../ui"
import { Title } from "./title"
import { ProductImage } from "./product-image"
import { Ingredient, ProductItem } from "@prisma/client"
import { GroupVariants } from "./group-variants"
import {
  PIZZA_SIZES,
  PIZZA_TYPES,
  PizzaSize,
  PizzaType,
} from "@/shared/constants/pizza"
import { VisuallyHidden } from "radix-ui"
import { DialogTitle } from "../ui/dialog"
import { useState } from "react"
import { IngredientItem } from "./ingredient-item"
import { useSet } from "react-use"
import { mapPizzaType } from "@/shared/constants/pizza"

interface Props {
  imageUrl: string
  name: string
  ingredients: Ingredient[]
  items: ProductItem[]
  loading?: boolean
  className?: string
  onAddToCart: (item: ProductItem) => void
}
export const ChoosePizzaForm = ({
  imageUrl,
  name,
  loading,
  ingredients,
  items,
  className,
  onAddToCart,
}: Props) => {
  const [size, setSize] = useState<PizzaSize>(items[0].size as PizzaSize)
  const [type, setType] = useState<PizzaType>(items[0].pizzaType as PizzaType)

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  )

  const availableSizes = PIZZA_SIZES.map((item) => ({
    ...item,
    disabled: !items.some(
      (pizza) => pizza.pizzaType === type && pizza.size === Number(item.value)
    ),
  }))

  const availableTypes = PIZZA_TYPES.map((item) => ({
    ...item,
    disabled: !items.some(
      (pizza) =>
        pizza.pizzaType === Number(item.value) && pizza.size === Number(size)
    ),
  }))

  const currentPizza = items.find(
    (item) => item.pizzaType === type && item.size === size
  )
  const pizzaPrice = currentPizza?.price || 0

  const ingredientPrice = ingredients.reduce((acc, ingredient) => {
    if (selectedIngredients.has(ingredient.id)) {
      return acc + ingredient.price
    }
    return acc
  }, 0)

  const totalPrice = pizzaPrice + ingredientPrice

  const textDetaills = `${size} см, ${mapPizzaType[type].toLowerCase()} тесто`

  return (
    <div className={cn(className, "flex flex-1")}>
      <ProductImage
        imageUrl={imageUrl}
        size={size}
        alt={name}
        className="w-[55%]"
      />

      <div className="w-[490px] bg-secondary p-7">
        <VisuallyHidden.Root>
          <DialogTitle>{name}</DialogTitle>
        </VisuallyHidden.Root>

        <Title text={name} size="md" className="mb-1 font-extrabold" />

        <p className="text-gray-400">{textDetaills}</p>

        <div className="mt-5 flex flex-col gap-4">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={availableTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="scrollbar mt-5 h-[420px] overflow-auto rounded-md bg-gray-50 p-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          className="mt-10 h-[55px] w-full rounded-[18px] px-10 text-base"
          onClick={() => onAddToCart(currentPizza!)}
        >
          Добавить в корзину за {totalPrice} $
        </Button>
      </div>
    </div>
  )
}
