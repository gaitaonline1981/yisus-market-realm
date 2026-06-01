"use client"

import { useMemo, useState } from "react"
import { tradingMasters } from "@/data/mmorpg/tradingMasters"
import { characters } from "@/data/mmorpg/characters"
import { mounts } from "@/data/mmorpg/mounts"
import { getMasterAsset } from "@/data/mmorpg/masterAssets"

const MASTER_TELEPORT: Record<string, [number, number, number]> = {
  "mentor-wyckoff-master": [-4.2, 0, -3.25],
  "elliott-sage-master": [-4.2, 0, 4.1],
  "master-dow": [-0.9, 0, 2.8],
  "oracle-of-value": [0.9, 0, 2.8],
  "lord-livermore": [5.1, 0, -3.3],
  "macro-bridge-master": [-5.8, 0, 5.75],
  "quant-architect": [4.2, 0, 4.15],
  "risk-paladin": [-1.4, 0, 7.75],
  "prop-firm-coach-master": [1.4, 0, 7.75],
  "psyche-monk": [0, 0, 4.4],
}

const ZONE_TELEPORT: Record<string, [number, number, number]> = {
  "central-hub": [0, 0, 0],
  "liquidity-lake": [-5, 0, -3],
  "candle-volcano": [5, 0, -3],
  "macro-observatory": [-5, 0, 4],
  "mechanic-lab": [5, 0, 4],
  "risk-citadel": [0, 0, 6],
}

type TabType = "zonas" | "maestros" | "personajes" | "monturas"

interface WorldNavPanelProps {
  onTeleport: (pos: [number, number, number]) => void
}

export function WorldNavPanel({ onTeleport }: WorldNavPanelProps) {
  const [tab, setTab] = useState<TabType>("zonas")
  const [open, setOpen] = useState(true)

  const tabs: { id: TabType; label: string; color: string }[] = [
    { id: "zonas", label: "Zonas", color: "#22D3EE" },
    { id: "maestros", label: "Maestros", color: "#A78BFA" },
    { id: "personajes", label: "Personajes", color: "#F59E0B" },
    { id: "monturas", label: "Monturas", color: "#10B981" },
  ]

  const zoneNames: Record<string, string> = {
    "central-hub": "Central Hub",
    "liquidity-lake": "Liquidity Lake",
    "candle-volcano": "Candle Volcano",
    "macro-observatory": "Macro Observatory",
    "mechanic-lab": "Mechanic Lab",
    "risk-citadel": "Risk Citadel",
  }

  const zoneSpecialties: Record<string, string> = {
    "central-hub": "Inicio y educación",
    "liquidity-lake": "Liquidez y Wyckoff",
    "candle-volcano": "Velas y momentum",
    "macro-observatory": "Macro y ciclos",
    "mechanic-lab": "Sistemas y backtest",
    "risk-citadel": "Riesgo y fondeo",
  }

  const zoneColors: Record<string, string> = {
    "central-hub": "#38BDF8",
    "liquidity-lake": "#22D3EE",
    "candle-volcano": "#F97316",
    "macro-observatory": "#A78BFA",
    "mechanic-lab": "#2DD4BF",
    "risk-citadel": "#FACC15",
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-full border border-white/10 bg-black/80 p-2 shadow-lg backdrop-blur hover:bg-white/10"
        title="Abrir navegación"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4m-10-10h4m12 0h4"/></svg>
      </button>
    )
  }

  return (
    <div className="w-56 rounded-2xl border border-white/10 bg-black/90 shadow-2xl backdrop-blur-lg">
      <div className="flex items-center justify-between border-b border-white/5 px-3 py-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Navegación</span>
        <button onClick={() => setOpen(false)} className="text-[10px] text-zinc-600 hover:text-zinc-400">—</button>
      </div>

      <div className="flex border-b border-white/5">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-1 px-1 py-1.5 text-[8px] font-bold uppercase tracking-wider transition ${
              tab === t.id ? "bg-white/5 text-white" : "text-zinc-600 hover:text-zinc-400"
            }`}
            style={tab === t.id ? { borderBottom: `2px solid ${t.color}` } : {}}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="max-h-[280px] space-y-0.5 overflow-y-auto p-1.5">
        {tab === "zonas" && Object.entries(ZONE_TELEPORT).map(([id, pos]) => (
          <button key={id} onClick={() => onTeleport(pos)}
            className="w-full rounded-xl border border-white/5 bg-white/[0.02] px-2.5 py-2 text-left transition hover:bg-white/10"
          >
            <p className="text-[11px] font-bold" style={{ color: zoneColors[id] || "#22D3EE" }}>{zoneNames[id] || id}</p>
            <p className="text-[9px] text-zinc-600">{zoneSpecialties[id] || ""}</p>
          </button>
        ))}

        {tab === "maestros" && tradingMasters.map((m) => {
          const pos = MASTER_TELEPORT[m.id]
          if (!pos) return null
          return (
            <button key={m.id} onClick={() => onTeleport(pos)}
              className="w-full rounded-xl border border-white/5 bg-white/[0.02] px-2.5 py-2 text-left transition hover:bg-white/10"
            >
              <p className="text-[11px] font-bold text-violet-300">{m.name}</p>
              <p className="text-[9px] text-zinc-600">{m.specialty}</p>
            </button>
          )
        })}

        {tab === "personajes" && characters.map((c) => (
          <button key={c.id} onClick={() => onTeleport([0, 0, -2])}
            className="w-full rounded-xl border border-white/5 bg-white/[0.02] px-2.5 py-2 text-left transition hover:bg-white/10"
          >
            <p className="text-[11px] font-bold text-amber-300">{c.name}</p>
            <p className="text-[9px] text-zinc-600">{c.title}</p>
          </button>
        ))}

        {tab === "monturas" && mounts.map((m) => (
          <button key={m.id} onClick={() => onTeleport([0, 0, -2])}
            className="w-full rounded-xl border border-white/5 bg-white/[0.02] px-2.5 py-2 text-left transition hover:bg-white/10"
          >
            <p className="text-[11px] font-bold text-emerald-300">{m.name}</p>
            <p className="text-[9px] text-zinc-600">{m.type}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
