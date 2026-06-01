"use client"

import { worldZones } from "@/data/mmorpg/worldZones"

const ZONE_COLORS: Record<string, string> = {
  "central-hub": "#38BDF8", "liquidity-lake": "#22D3EE", "candle-volcano": "#F97316",
  "macro-observatory": "#A78BFA", "mechanic-lab": "#2DD4BF", "risk-citadel": "#FACC15",
}

interface Props { activeZoneId?: string; nearZoneId?: string | null; onTravelToZone: (zoneId: string) => void }

export function WorldFastTravelPanel({ activeZoneId, nearZoneId, onTravelToZone }: Props) {
  const zones = worldZones.filter((z) => z.id !== "unknown")

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Viaje rápido</p>
      <div className="grid gap-1">
        {zones.map((zone) => {
          const isActive = activeZoneId === zone.id
          const isNear = nearZoneId === zone.id
          const color = ZONE_COLORS[zone.id] || "#22D3EE"
          return (
            <button key={zone.id} onClick={() => onTravelToZone(zone.id)}
              className="flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left transition cursor-pointer"
              style={{
                borderColor: isActive ? `${color}40` : "rgba(255,255,255,0.05)",
                background: isActive ? `${color}10` : "rgba(255,255,255,0.02)",
                color: isActive ? color : "#64748B",
              }}
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md text-[9px] font-bold"
                style={{ background: `${color}20`, color }}
              >
                {zone.name[0]}
              </div>
              <div className="min-w-0 flex-1">
                <p className={`truncate text-[10px] font-bold ${isActive ? "text-white" : "text-zinc-300"}`}>{zone.name}</p>
                {isNear && <p className="text-[7px] text-cyan-400">◈ Estás aquí</p>}
              </div>
              <span className="shrink-0 text-[8px] text-zinc-600">{zone.radius}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
