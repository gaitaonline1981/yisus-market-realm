"use client"

import { getTraderRankByXp } from "@/lib/mmorpg/traderRank"

interface Props { xp?: number; rank?: ReturnType<typeof getTraderRankByXp>; size?: "sm" | "md" | "lg" }

export function TraderRankBadge({ xp, rank: propRank, size = "md" }: Props) {
  const rank = propRank || getTraderRankByXp(xp ?? 0)
  if (!rank) return null
  const dims = size === "sm" ? "w-12 h-12 text-[10px]" : size === "md" ? "w-14 h-14 text-xs" : "w-16 h-16 text-sm"

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`${dims} flex items-center justify-center rounded-full border-2 font-black`}
        style={{ borderColor: `${rank.color}40`, background: `${rank.color}15`, color: rank.color }}
      >
        {rank.name[0]}
      </div>
      <p className="text-[8px] font-bold uppercase tracking-wider" style={{ color: rank.color }}>{rank.name}</p>
    </div>
  )
}
