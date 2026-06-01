"use client"

import { tradingMasters } from "@/data/mmorpg/tradingMasters"
import { getMasterAsset } from "@/data/mmorpg/masterAssets"

const ZONE_COLORS: Record<string, string> = {
  "central-hub": "#38BDF8", "liquidity-lake": "#22D3EE", "candle-volcano": "#F97316",
  "macro-observatory": "#A78BFA", "mechanic-lab": "#2DD4BF", "risk-citadel": "#FACC15",
}

export function TradingMastersPanel() {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Maestros del Trading</p>
      <p className="mb-3 text-[9px] italic text-zinc-500">Los 10 maestros que enseñan trading real en el mundo.</p>
      <div className="grid gap-1">
        {tradingMasters.map((m) => {
          const color = ZONE_COLORS[m.zoneId] || "#22D3EE"
          const asset = getMasterAsset(m.id)
          return (
            <div key={m.id} className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-2 py-1.5">
              <div className="flex h-6 w-6 items-center justify-center rounded text-[8px] font-bold" style={{ background: `${color}20`, color }}>
                {m.name[0]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[9px] font-bold text-zinc-300">{m.name}</p>
                <p className="truncate text-[7px] text-zinc-600">{m.specialty}</p>
              </div>
              <span className={`shrink-0 text-[7px] font-bold uppercase tracking-wider ${asset?.hasGlb ? "text-emerald-400" : "text-amber-400"}`}>
                {asset?.hasGlb ? "GLB" : "PH"}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
