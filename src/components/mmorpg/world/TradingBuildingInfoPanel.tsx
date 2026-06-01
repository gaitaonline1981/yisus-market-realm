"use client"

import { tradingBuildings } from "@/data/mmorpg/worldTradingBuildings"

interface Props { buildingId?: string | null; onClear?: () => void }

const STATUS_LABELS: Record<string, string> = { placeholder: "Placeholder 3D", prototype: "Prototipo", "future-glb": "Futuro GLB" }
const STATUS_COLORS: Record<string, string> = { placeholder: "#64748B", prototype: "#F59E0B", "future-glb": "#22D3EE" }

export function TradingBuildingInfoPanel({ buildingId, onClear }: Props) {
  if (!buildingId) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center text-[10px] text-zinc-500">
        Seleccioná un edificio del mundo para ver su función de trading.
      </div>
    )
  }

  const building = tradingBuildings.find((b) => b.id === buildingId)
  if (!building) return null

  const st = STATUS_LABELS[building.status]
  const sc = STATUS_COLORS[building.status]

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="mb-2 flex items-start justify-between">
        <div>
          <p className="text-sm font-black text-zinc-100">{building.name}</p>
          <p className="text-[9px] text-cyan-300">{building.tradingConcept}</p>
        </div>
        <button onClick={onClear} className="cursor-pointer border-none bg-transparent p-0 text-lg text-zinc-500 hover:text-zinc-300">✕</button>
      </div>

      <p className="mb-2 text-[10px] leading-relaxed text-zinc-400">{building.description}</p>
      <p className="mb-2 text-[9px] italic text-zinc-500">🎯 {building.gameplayFunction}</p>

      <div className="flex flex-wrap gap-1 text-[8px]">
        <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 font-bold text-cyan-400">{building.buildingType}</span>
        <span className="rounded bg-violet-400/10 px-1.5 py-0.5 font-bold text-violet-300">{building.zoneId}</span>
        <span className="rounded bg-white/10 px-1.5 py-0.5 text-zinc-400">{building.missionType}</span>
        <span className="rounded px-1.5 py-0.5 font-bold" style={{ background: `${sc}20`, color: sc }}>{st}</span>
      </div>

      {building.npcId && <p className="mt-1 text-[8px] text-zinc-600">NPC: {building.npcId}</p>}
    </div>
  )
}
