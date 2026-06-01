"use client"

import { useWorldProgressStore } from "@/stores/useWorldProgressStore"
import { getTraderRankByXp } from "@/lib/mmorpg/traderRank"
import { characters } from "@/data/mmorpg/characters"

function Bar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="relative h-3 w-full overflow-hidden bg-black">
      <div className="h-full transition-all duration-200" style={{ width: `${pct}%`, background: color }} />
      <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">
        {value}
      </span>
    </div>
  )
}

export function PlayerFrame({ selectedCharacterId }: { selectedCharacterId?: string }) {
  const xp = useWorldProgressStore((s) => s.xp) ?? 0
  const rank = getTraderRankByXp(xp)
  const character = characters.find((c) => c.id === selectedCharacterId)
  const level = 1 + Math.floor(xp / 1000)
  const xpInLevel = xp % 1000
  const health = 100
  const mana = 65

  return (
    <div className="w-56">
      {/* Player name + level */}
      <div className="flex items-center justify-between px-1">
        <span className="text-[11px] font-bold text-zinc-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{character?.name || "Trader"}</span>
        <span className="text-[10px] text-zinc-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Lv {level}</span>
      </div>
      {/* Health bar */}
      <Bar value={health} max={100} color="linear-gradient(90deg, #8b0000, #dc2626, #ef4444)" />
      {/* Mana bar */}
      <Bar value={mana} max={100} color="linear-gradient(90deg, #1e3a5f, #2563eb, #3b82f6)" />
      {/* XP bar - thin */}
      <div className="mt-[1px] h-1 overflow-hidden bg-black/80">
        <div className="h-full transition-all" style={{ width: `${(xpInLevel / 1000) * 100}%`, background: "linear-gradient(90deg, #4c1d95, #7c3aed, #8b5cf6)" }} />
      </div>
      {/* Rank */}
      <div className="flex justify-between px-0.5 pt-[1px]">
        <span className="text-[7px] text-zinc-600">{rank?.name || "Novato"}</span>
        <span className="text-[7px] text-zinc-700">{xp} XP</span>
      </div>
    </div>
  )
}

export function TargetFrame({ name, subtitle, health = 100, maxHealth = 100 }: { name?: string; subtitle?: string; health?: number; maxHealth?: number }) {
  if (!name) return null
  return (
    <div className="w-56">
      <div className="flex items-center justify-between px-1">
        <span className="text-[11px] font-bold text-violet-200 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{name}</span>
        <span className="text-[8px] text-emerald-400">NPC</span>
      </div>
      <div className="relative h-3 w-full overflow-hidden bg-black">
        <div className="h-full transition-all" style={{ width: `${(health / maxHealth) * 100}%`, background: "linear-gradient(90deg, #065f46, #059669, #10b981)" }} />
        <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">
          {health}
        </span>
      </div>
      {subtitle && <span className="text-[8px] text-zinc-600 px-0.5">{subtitle}</span>}
    </div>
  )
}
