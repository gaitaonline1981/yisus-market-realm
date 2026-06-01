"use client"

import { useState } from "react"

interface Props { npcId: string; onClose: () => void }

const DIALOGUES: Record<string, string[]> = {
  mentor: ["Bienvenido, joven trader.", "Observa la estructura antes de operar.", "La acumulación y distribución son la base de todo."],
  trader: ["El mercado siempre tiene razón.", "Gestioná tu riesgo.", "La paciencia es una virtud en el trading."],
}

export function RealmDialoguePanel({ npcId, onClose }: Props) {
  const [step, setStep] = useState(0)
  const lines = DIALOGUES[npcId] || ["Saludos, viajero del Market Realm."]

  return (
    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
      <div className="mb-2 flex items-start justify-between">
        <p className="text-[10px] font-bold text-cyan-400">{npcId}</p>
        <button onClick={onClose} className="cursor-pointer border-none bg-transparent p-0 text-sm text-zinc-500 hover:text-zinc-300">✕</button>
      </div>

      <div className="mb-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2">
        <p className="text-[11px] italic leading-relaxed text-zinc-300">"{lines[step]}"</p>
      </div>

      <div className="flex gap-1">
        {step < lines.length - 1 && (
          <button onClick={() => setStep(step + 1)}
            className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-[9px] font-bold text-cyan-400 transition hover:bg-cyan-400/20 cursor-pointer"
          >
            Siguiente →
          </button>
        )}
        <button onClick={onClose}
          className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[9px] text-zinc-400 transition hover:bg-white/10 cursor-pointer"
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}
