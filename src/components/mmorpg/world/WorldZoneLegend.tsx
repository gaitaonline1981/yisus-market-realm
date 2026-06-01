"use client"

import { worldZones } from "@/data/mmorpg/worldZones"

const ZONE_COLORS: Record<string, string> = {
  "central-hub": "#38BDF8", "liquidity-lake": "#22D3EE", "candle-volcano": "#F97316",
  "macro-observatory": "#A78BFA", "mechanic-lab": "#2DD4BF", "risk-citadel": "#FACC15",
}

const ZONE_DESC: Record<string, string> = {
  "central-hub": "Inicio, educación y comunidad",
  "liquidity-lake": "Liquidez, Wyckoff y estructura",
  "candle-volcano": "Velas, momentum y breakout",
  "macro-observatory": "Macro, ciclos y contexto global",
  "mechanic-lab": "Backtest, bots y sistemas",
  "risk-citadel": "Riesgo, drawdown y prop firms",
}

interface Props {
  activeZoneId?: string
  nearZoneId?: string | null
  onSelectZone?: (zoneId: string) => void
}

export function WorldZoneLegend({ activeZoneId, nearZoneId, onSelectZone }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Zonas del mundo</p>
      <div className="grid gap-1">
        {worldZones.filter((z) => z.id !== "unknown").map((zone) => {
          const color = ZONE_COLORS[zone.id] || "#22D3EE"
          const isActive = activeZoneId === zone.id
          const isNear = nearZoneId === zone.id
          return (
            <button key={zone.id} onClick={() => onSelectZone?.(zone.id)}
              className="flex items-center gap-2 rounded-lg border px-2 py-1.5 text-left transition cursor-pointer"
              style={{
                borderColor: isActive ? `${color}40` : isNear ? `${color}20` : "rgba(255,255,255,0.05)",
                background: isActive ? `${color}15` : "rgba(255,255,255,0.02)",
              }}
            >
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: color, boxShadow: isActive ? `0 0 4px ${color}` : "none" }} />
              <div className="min-w-0 flex-1">
                <p className={`truncate text-[10px] font-bold ${isActive ? "text-white" : "text-zinc-300"}`}>{zone.name}</p>
                <p className="truncate text-[8px] text-zinc-600">{ZONE_DESC[zone.id] || ""}</p>
              </div>
              {isNear && <span className="shrink-0 text-[8px] text-cyan-400">◈</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
