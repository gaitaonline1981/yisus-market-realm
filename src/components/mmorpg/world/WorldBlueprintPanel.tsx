"use client"

import { useMemo } from "react"
import { worldZones } from "@/data/mmorpg/worldZones"
import { WorldBlueprintStatusBadge } from "./WorldBlueprintStatusBadge"

const ZONE_COLORS: Record<string, string> = {
  "central-hub": "#38BDF8", "liquidity-lake": "#22D3EE", "candle-volcano": "#F97316",
  "macro-observatory": "#A78BFA", "mechanic-lab": "#2DD4BF", "risk-citadel": "#FACC15",
}

export function WorldBlueprintPanel() {
  const zones = useMemo(() => worldZones.filter((z) => z.id !== "unknown"), [])

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Blueprint del mundo</p>
      <div className="grid gap-1">
        {zones.map((zone) => {
          const color = ZONE_COLORS[zone.id] || "#22D3EE"
          return (
            <div key={zone.id} className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-2 py-1.5">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[9px] font-bold text-zinc-300">{zone.name}</p>
                <p className="truncate text-[7px] text-zinc-600">{zone.description}</p>
              </div>
              <WorldBlueprintStatusBadge status="built" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
