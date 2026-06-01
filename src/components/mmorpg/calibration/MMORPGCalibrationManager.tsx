"use client"

import { useState } from "react"

const ENTITIES = [
  { id: "ticker", label: "Ticker" },
  { id: "hedgey", label: "Hedgey" },
  { id: "noble-steed", label: "Noble Steed" },
  { id: "pocket-rocket", label: "Pocket Rocket" },
]

export function MMORPGCalibrationManager() {
  const [selected, setSelected] = useState("ticker")

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Calibration Manager</p>
      <p className="mb-3 text-[9px] italic text-zinc-500">Ajustá escala, posición y rotación de los modelos GLB.</p>

      <div className="mb-3 grid grid-cols-2 gap-1">
        {ENTITIES.map((e) => (
          <button key={e.id} onClick={() => setSelected(e.id)}
            className="rounded-lg border px-2 py-1.5 text-[9px] font-bold transition cursor-pointer"
            style={{
              borderColor: selected === e.id ? "rgba(34,211,238,0.3)" : "rgba(255,255,255,0.05)",
              background: selected === e.id ? "rgba(34,211,238,0.08)" : "rgba(255,255,255,0.02)",
              color: selected === e.id ? "#22D3EE" : "#64748B",
            }}
          >
            {e.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
        <p className="mb-1 text-[9px] font-bold text-cyan-400">Parámetros: {selected}</p>
        <div className="space-y-1 text-[9px] text-zinc-500">
          <p>Escala: [1, 1, 1]</p>
          <p>Posición: [0, 0.5, 0]</p>
          <p>Rotación: [0, 0, 0]</p>
        </div>
        <button className="mt-2 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-[8px] font-bold text-cyan-400 transition hover:bg-cyan-400/20 cursor-pointer">
          Guardar calibración
        </button>
      </div>
    </div>
  )
}
