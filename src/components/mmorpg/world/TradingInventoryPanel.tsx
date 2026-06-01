"use client"

import { tradingItems } from "@/data/mmorpg/tradingItems"
import { useTradingInventoryStore } from "@/stores/useTradingInventoryStore"
import { TradingInventoryItemCard } from "./TradingInventoryItemCard"

export function TradingInventoryPanel() {
  const store = useTradingInventoryStore()
  const items = store.items || []
  const addItem = store.addItem
  const removeItem = store.removeItem

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Inventario</p>
      <p className="mb-3 text-[9px] italic text-zinc-500">Items recolectados en tu viaje de trading.</p>

      <div className="grid gap-2">
        {tradingItems.map((item) => (
          <TradingInventoryItemCard
            key={item.id}
            item={item}
            owned={items.includes(item.id)}
            onAdd={() => addItem(item.id)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </div>
    </div>
  )
}
