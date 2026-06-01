import { create } from "zustand"
import { persist } from "zustand/middleware"

interface TradingInventoryState {
  itemIds: string[]
  equippedTitleId?: string
  addItem: (itemId: string) => void
  addItems: (itemIds: string[]) => void
  removeItem: (itemId: string) => void
  hasItem: (itemId: string) => boolean
  equipTitle: (itemId: string) => void
  resetInventory: () => void
}

export const useTradingInventoryStore = create<TradingInventoryState>()(
  persist(
    (set, get) => ({
      itemIds: [],
      equippedTitleId: undefined,
      addItem: (itemId) => {
        const { itemIds } = get()
        if (!itemIds.includes(itemId)) set({ itemIds: [...itemIds, itemId] })
      },
      addItems: (ids) => {
        const { itemIds } = get()
        const newIds = ids.filter((id) => !itemIds.includes(id))
        if (newIds.length > 0) set({ itemIds: [...itemIds, ...newIds] })
      },
      removeItem: (itemId) => set({ itemIds: get().itemIds.filter((id) => id !== itemId) }),
      hasItem: (itemId) => get().itemIds.includes(itemId),
      equipTitle: (itemId) => {
        const { itemIds } = get()
        if (itemIds.includes(itemId)) set({ equippedTitleId: itemId })
      },
      resetInventory: () => set({ itemIds: [], equippedTitleId: undefined }),
    }),
    { name: "yisus-market-realm-trading-inventory" }
  )
)
