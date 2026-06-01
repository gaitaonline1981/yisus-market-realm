"use client"

import { useMemo } from "react"
import { tradingMasters } from "@/data/mmorpg/tradingMasters"
import { getMasterAsset } from "@/data/mmorpg/masterAssets"
import { worldZones } from "@/data/mmorpg/worldZones"

const zoneNames: Record<string, string> = {
  "central-hub": "Central Hub",
  "liquidity-lake": "Liquidity Lake",
  "candle-volcano": "Candle Volcano",
  "macro-observatory": "Macro Observatory",
  "mechanic-lab": "Mechanic Lab",
  "risk-citadel": "Risk Citadel",
}

interface TradingMasterLocationPanelProps {
  masterId?: string | null
  onClear?: () => void
}

export function TradingMasterLocationPanel({ masterId, onClear }: TradingMasterLocationPanelProps) {
  const master = useMemo(() => {
    if (!masterId) return null
    return tradingMasters.find((m) => m.id === masterId) || null
  }, [masterId])

  const asset = useMemo(() => {
    if (!masterId) return null
    return getMasterAsset(masterId) || null
  }, [masterId])

  if (!master) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-center text-[11px] text-zinc-600">
          Seleccioná un Maestro del Trading en el mundo para ver su rol educativo.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-violet-400/20 bg-violet-400/[0.03] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-violet-300">{master.name}</h3>
        {onClear && (
          <button onClick={onClear} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] text-zinc-500 hover:text-zinc-300">
            Cerrar
          </button>
        )}
      </div>

      <p className="mb-2 text-[10px] italic text-zinc-500">{master.alias}</p>
      <p className="mb-3 text-[11px] leading-relaxed text-zinc-300">{master.description}</p>

      <div className="space-y-1.5 border-t border-white/5 pt-3 text-[10px]">
        <div className="flex justify-between">
          <span className="text-zinc-500">Especialidad</span>
          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan-300">{master.specialty}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">Zona</span>
          <span className="text-zinc-300">{zoneNames[master.zoneId] || master.zoneId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">Edificio</span>
          <span className="text-zinc-300">{master.buildingId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">Frase</span>
          <span className="max-w-[160px] text-right italic text-amber-300/80">"{master.iconicPhrase}"</span>
        </div>
      </div>

      <div className="mt-3 border-t border-white/5 pt-3">
        <p className="mb-1.5 text-[9px] font-bold uppercase tracking-wider text-zinc-600">Assets</p>
        <div className="space-y-1 text-[9px] font-mono text-zinc-600">
          <p>PNG: {asset?.pngPath || "—"}</p>
          <p>GLB: {asset?.glbPath || "—"}</p>
          <p>Status: <span className={asset?.hasGlb ? "text-emerald-400" : "text-amber-400"}>{asset?.hasGlb ? "GLB listo" : "Placeholder"}</span></p>
        </div>
      </div>
    </div>
  )
}
