"use client"

import type { TradingItem } from "@/data/mmorpg/tradingItems"
import { TradingItemTypeBadge } from "./TradingItemTypeBadge"

interface Props { item: TradingItem; owned: boolean; equipped?: boolean; onEquipTitle?: (itemId: string) => void }

const RARITY_COLORS: Record<string, string> = { common: "#94A3B8", rare: "#3B82F6", epic: "#8B5CF6", legendary: "#F59E0B", institutional: "#2FC7C9" }

export function TradingInventoryItemCard({ item, owned, equipped, onEquipTitle }: Props) {
  return (
    <div className="rounded-xl border p-2.5"
      style={{
        borderColor: owned ? `${item.color}30` : "rgba(255,255,255,0.06)",
        background: owned ? `${item.color}06` : "rgba(255,255,255,0.02)",
        opacity: owned ? 1 : 0.5,
      }}
    >
      <div className="mb-1 flex items-start justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-base">{owned ? "📦" : "🔒"}</span>
          <div>
            <span className={`text-[11px] font-bold ${owned ? "text-zinc-100" : "text-zinc-500"}`}>{item.name}</span>
            <div className="mt-0.5 flex gap-1">
              <TradingItemTypeBadge type={item.type} />
              <span className="rounded px-1.5 py-0.5 text-[7px] font-bold" style={{ background: `${RARITY_COLORS[item.rarity] || "#64748B"}20`, color: RARITY_COLORS[item.rarity] || "#64748B" }}>{item.rarity}</span>
            </div>
          </div>
        </div>
        {equipped && <span className="text-[8px] font-bold text-cyan-400">✓</span>}
      </div>

      <p className="mb-1 text-[9px] leading-relaxed text-zinc-500">{item.description}</p>
      <p className="text-[8px] text-zinc-600">{item.gameplayEffect}</p>

      {owned && item.type === "title" && onEquipTitle && (
        <button onClick={() => onEquipTitle(item.id)}
          className="mt-1.5 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[8px] font-bold text-cyan-400 transition hover:bg-cyan-400/20 cursor-pointer"
        >
          {equipped ? "Desequipar" : "Equipar título"}
        </button>
      )}
    </div>
  )
}
