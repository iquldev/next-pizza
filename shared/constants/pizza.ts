export const mapSize = {
  20: "Маленькая",
  30: "Средняя",
  40: "Большая",
} as const

export const mapPizzaType = {
  1: "Традиционное",
  2: "Тонкое",
} as const

export const PIZZA_SIZES = Object.entries(mapSize).map(([value, name]) => ({
  value,
  name,
}))

export const PIZZA_TYPES = Object.entries(mapPizzaType).map(
  ([value, name]) => ({
    value,
    name,
  })
)

export type PizzaSize = keyof typeof mapSize
export type PizzaType = keyof typeof mapPizzaType
