"use client"

import { worldZones } from "@/data/mmorpg/worldZones"
import { useWorldProgressStore } from "@/stores/useWorldProgressStore"

interface Props { playerPosition: [number, number, number]; activeZoneId: string; nearZoneId?: string | null; onSelectZone?: (zoneId: string) => void }

const ZONE_COLORS: Record<string, string> = {
  "central-hub": "#38BDF8", "liquidity-lake": "#22D3EE", "candle-volcano": "#F97316",
  "macro-observatory": "#A78BFA", "mechanic-lab": "#2DD4BF", "risk-citadel": "#FACC15",
}
const MAP_SIZE = 180

export function WorldMiniMap({ playerPosition, activeZoneId, nearZoneId, onSelectZone }: Props) {
  const xp = useWorldProgressStore((s) => s.xp) ?? 0

  return (
    <div className="rounded border border-white/10 bg-black/70">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-white/5 px-2 py-1">
        <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">Minimapa</span>
        <span className="text-[8px] text-zinc-600">{xp} XP</span>
      </div>
      {/* Map canvas */}
      <div className="relative" style={{ width: MAP_SIZE, height: MAP_SIZE }}>
        {/* Background grid */}
        <div className="absolute inset-0 bg-[#05050f]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`h${i}`} className="absolute left-0 right-0 border-t border-white/[0.02]" style={{ top: `${(i / 8) * 100}%` }} />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`v${i}`} className="absolute top-0 bottom-0 border-l border-white/[0.02]" style={{ left: `${(i / 8) * 100}%` }} />
          ))}
        </div>
        {/* Zone dots */}
        {worldZones.filter(z => z.id !== "unknown").map((zone) => {
          const x = ((zone.position[0] + 10) / 20) * MAP_SIZE
          const y = ((zone.position[2] + 10) / 20) * MAP_SIZE
          const isActive = activeZoneId === zone.id
          const isNear = nearZoneId === zone.id
          const color = ZONE_COLORS[zone.id] || "#22D3EE"
          return (
            <button key={zone.id} onClick={() => onSelectZone?.(zone.id)}
              className="absolute z-10 cursor-pointer"
              style={{ left: x - 5, top: y - 5 }}
              title={zone.name}
            >
              <div className="flex items-center justify-center" style={{ width: 10, height: 10 }}>
                <div className="rounded-full border transition-all" style={{
                  width: isActive ? 8 : isNear ? 6 : 4,
                  height: isActive ? 8 : isNear ? 6 : 4,
                  background: color,
                  borderColor: isActive ? `${color}80` : `${color}30`,
                  boxShadow: isActive ? `0 0 4px ${color}` : "none",
                }} />
              </div>
            </button>
          )
        })}
        {/* Player dot */}
        <div className="absolute z-20" style={{
          left: ((playerPosition[0] + 10) / 20) * MAP_SIZE - 4,
          top: ((playerPosition[2] + 10) / 20) * MAP_SIZE - 4,
        }}>
          <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_4px_rgba(34,211,238,0.8)]" />
        </div>
      </div>
      {/* Zone legend */}
      <div className="border-t border-white/5 p-1.5">
        <div className="flex flex-wrap gap-1">
          {worldZones.filter(z => z.id !== "unknown").map((zone) => {
            const color = ZONE_COLORS[zone.id] || "#22D3EE"
            return (
              <button key={zone.id} onClick={() => onSelectZone?.(zone.id)}
                className="flex items-center gap-1 rounded px-1 py-0.5 text-[7px] transition hover:bg-white/5 cursor-pointer"
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
                <span style={{ color }}>{zone.name}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
