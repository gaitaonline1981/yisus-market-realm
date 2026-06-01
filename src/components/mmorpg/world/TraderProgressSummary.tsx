"use client"

import { useWorldProgressStore } from "@/stores/useWorldProgressStore"
import { getTraderRankByXp } from "@/lib/mmorpg/traderRank"
import { TraderRankBadge } from "./TraderRankBadge"

export function TraderProgressSummary() {
  const xp = useWorldProgressStore((s) => s.xp)
  const completedQuests = useWorldProgressStore((s) => s.completedQuestIds)
  const titles = useWorldProgressStore((s) => s.titles)
  const rank = getTraderRankByXp(xp)

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Resumen de progreso</p>
      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2">
          <TraderRankBadge rank={rank} />
        </div>
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2">
          <p className="text-[9px] text-zinc-500">XP</p>
          <p className="text-sm font-bold text-cyan-400">{xp}</p>
        </div>
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2">
          <p className="text-[9px] text-zinc-500">Misiones</p>
          <p className="text-sm font-bold text-violet-300">{completedQuests.length}</p>
        </div>
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2">
          <p className="text-[9px] text-zinc-500">Títulos</p>
          <p className="text-sm font-bold text-amber-400">{titles.length}</p>
        </div>
      </div>
    </div>
  )
}
