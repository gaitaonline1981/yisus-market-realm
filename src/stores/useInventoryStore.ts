import { create } from "zustand";

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  type: "badge" | "scroll" | "lens" | "mount" | "consumable";
  rarity: "common" | "rare" | "epic" | "legendary";
  quantity: number;
}

interface InventoryStore {
  items: InventoryItem[];
  addItem: (item: Omit<InventoryItem, "quantity">, qty?: number) => void;
  removeItem: (id: string, qty?: number) => void;
  hasItem: (id: string) => boolean;
  getCount: (id: string) => number;
}

export const useInventoryStore = create<InventoryStore>((set, get) => ({
  items: [],
  addItem: (item, qty = 1) =>
    set((s) => {
      const existing = s.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: s.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
          ),
        };
      }
      return { items: [...s.items, { ...item, quantity: qty }] };
    }),
  removeItem: (id, qty = 1) =>
    set((s) => ({
      items: s.items
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - qty } : i))
        .filter((i) => i.quantity > 0),
    })),
  hasItem: (id) => get().items.some((i) => i.id === id),
  getCount: (id) => get().items.find((i) => i.id === id)?.quantity ?? 0,
}));
