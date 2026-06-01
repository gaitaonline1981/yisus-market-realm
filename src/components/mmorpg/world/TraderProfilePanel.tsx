"use client"

import { useWorldProgressStore } from "@/stores/useWorldProgressStore"
import { TraderRankBadge } from "./TraderRankBadge"
import { TraderProgressSummary } from "./TraderProgressSummary"
import { TraderReputationPanel } from "./TraderReputationPanel"

export function TraderProfilePanel() {
  const xp = useWorldProgressStore((s) => s.xp) ?? 0

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Perfil Trader</p>
      <p className="mb-2 text-[9px] italic text-zinc-500">Identidad y progreso del jugador dentro del Market Realm.</p>

      <div className="grid gap-3">
        <TraderRankBadge xp={xp} />
        <TraderProgressSummary />
        <TraderReputationPanel />
      </div>

      <div className="mt-3 rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-2 text-center text-[9px] text-zinc-500">
        El progreso se gestiona desde Quest Journal, Skill Tree e Inventario.
      </div>
    </div>
  )
}
