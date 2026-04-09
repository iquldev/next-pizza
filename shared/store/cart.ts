import { create } from "zustand"
import { Api } from "../services/api-client"
import { getCartDetails, CartStateItem } from "../lib"
import { debounce } from "lodash"
import { CreateCartItemValues } from "../services/dto/cart.dto"

export interface CartState {
  loading: boolean
  error: boolean
  totalAmount: number
  items: CartStateItem[]
  fetchCartItems: () => Promise<void>
  updateItemQuantity: (id: number, quantity: number) => Promise<void>
  addCartItem: (values: CreateCartItemValues) => Promise<void>
  removeCartItem: (id: number) => Promise<void>
}

function calcTotal(items: CartStateItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0)
}

function setItems(
  set: (
    partial: Partial<CartState> | ((s: CartState) => Partial<CartState>)
  ) => void,
  updater: (items: CartStateItem[]) => CartStateItem[]
) {
  set((state) => {
    const items = updater(state.items)
    return { items, totalAmount: calcTotal(items) }
  })
}

const debouncedUpdaters = new Map<number, ReturnType<typeof debounce>>()
const updateVersions = new Map<number, number>()

function getDebouncedUpdater(id: number) {
  if (!debouncedUpdaters.has(id)) {
    const fn = debounce(
      async (
        quantity: number,
        version: number,
        set: (
          partial: Partial<CartState> | ((s: CartState) => Partial<CartState>)
        ) => void
      ) => {
        try {
          const data = await Api.Cart.updateItemQuantity(id, quantity)

          if ((updateVersions.get(id) ?? 0) !== version) return

          const { items: serverItems } = getCartDetails(data)

          setItems(set, (stateItems) =>
            stateItems.map((item) => {
              const serverItem = serverItems.find((s) => s.id === item.id)
              return serverItem ?? item
            })
          )
        } catch (error) {
          console.error(`Failed to update item ${id}:`, error)

          if ((updateVersions.get(id) ?? 0) !== version) return

          try {
            const data = await Api.Cart.fetchCart()
            set(getCartDetails(data))
          } catch {
            set({ error: true })
          }
        }
      },
      250
    )
    debouncedUpdaters.set(id, fn)
  }
  return debouncedUpdaters.get(id)!
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false })
      const data = await Api.Cart.fetchCart()
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set({ loading: false })
    }
  },

  updateItemQuantity: (id: number, quantity: number) => {
    const version = (updateVersions.get(id) ?? 0) + 1
    updateVersions.set(id, version)

    setItems(set, (items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity, price: item.unitPrice * quantity }
          : item
      )
    )

    getDebouncedUpdater(id)(quantity, version, set)
    return Promise.resolve()
  },

  removeCartItem: async (id: number) => {
    const snapshot = get().items

    setItems(set, (items) => items.filter((item) => item.id !== id))

    try {
      const data = await Api.Cart.removeCartItem(id)
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
      setItems(set, () => snapshot)
    }
  },

  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false })
      const data = await Api.Cart.addCartItem(values)
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set({ loading: false })
    }
  },
}))
