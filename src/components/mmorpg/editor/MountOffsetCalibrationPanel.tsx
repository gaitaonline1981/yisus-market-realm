"use client"

import { useState } from "react"

interface Props { mountId: string; onSave: (offset: any) => void }

export function MountOffsetCalibrationPanel({ mountId, onSave }: Props) {
  const [offset, setOffset] = useState({ charY: 0.8, charScale: 0.75, mountY: 0, mountScale: 1 })

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Calibración: {mountId}</p>
      <p className="mb-3 text-[9px] italic text-zinc-500">Ajustá la posición del jinete sobre la montura.</p>

      <div className="space-y-2 text-[9px]">
        {(["charY", "charScale", "mountY", "mountScale"] as const).map((field) => (
          <div key={field} className="flex items-center gap-2">
            <span className="w-20 text-zinc-500">{field}</span>
            <input type="range" min={0} max={2} step={0.01} value={offset[field]}
              onChange={(e) => setOffset({ ...offset, [field]: parseFloat(e.target.value) })}
              className="flex-1 accent-cyan-400"
            />
            <span className="w-12 text-right font-mono text-cyan-400">{offset[field].toFixed(2)}</span>
          </div>
        ))}
      </div>

      <button onClick={() => onSave(offset)}
        className="mt-3 w-full rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-1.5 text-[9px] font-bold text-cyan-400 transition hover:bg-cyan-400/20 cursor-pointer"
      >
        Guardar offset
      </button>
    </div>
  )
}
