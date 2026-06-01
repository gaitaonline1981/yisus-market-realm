import React from "react"

const PARTS = [
  { id: "helmet", label: "Casco" },
  { id: "torso", label: "Torso" },
  { id: "boots", label: "Botas" },
  { id: "back", label: "Espalda" },
]

type Props = { selectedId?: string; onSelect: (partId: string) => void }

export function PartsPanel({ selectedId, onSelect }: Props) {
  return (
    <div>
      <div className="mb-2 text-[13px] font-bold uppercase tracking-wider text-zinc-100">Partes</div>
      <div className="grid grid-cols-2 gap-1.5">
        {PARTS.map((p) => {
          const selected = p.id === selectedId
          return (
            <button key={p.id} onClick={() => onSelect(p.id)}
              className="rounded-lg border px-2 py-2 text-center text-[10px] font-bold transition cursor-pointer"
              style={{
                borderColor: selected ? "rgba(34,211,238,0.3)" : "rgba(255,255,255,0.05)",
                background: selected ? "rgba(34,211,238,0.08)" : "rgba(255,255,255,0.02)",
                color: selected ? "#22D3EE" : "#64748B",
              }}
            >
              {p.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
