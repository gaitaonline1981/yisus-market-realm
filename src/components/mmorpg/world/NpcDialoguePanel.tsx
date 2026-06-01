"use client"

import { useState } from "react"
import { NpcDialogueChoice } from "./NpcDialogueChoice"

interface Props { npcId: string; onClose: () => void; onStartQuest?: (questId: string) => void }

const NPC_GREETINGS: Record<string, string> = {
  "mentor-wyckoff": "Bienvenido, joven trader. ¿Vienes a aprender sobre estructura de mercado?",
  "elliott-sage": "Las ondas del mercado siempre tienen algo que decir... ¿sabes escucharlas?",
  "risk-guardian": "El capital es lo más valioso que tienes. No lo olvides.",
  "liquidity-scout": "La liquidez se mueve en silencio. ¿Puedes sentirla?",
  "volume-blacksmith": "El volumen no miente. ¿Sabes interpretarlo?",
  "macro-oracle": "Los mercados son un reflejo del mundo. El contexto lo es todo.",
  "bot-mechanic": "Los sistemas no fallan si los calibras bien. ¿Quieres aprender?",
  "guild-recruiter": "Bienvenido al Market Realm. El viaje comienza aquí.",
}

export function NpcDialoguePanel({ npcId, onClose, onStartQuest }: Props) {
  const [step, setStep] = useState<"greeting" | "quest">("greeting")
  const greeting = NPC_GREETINGS[npcId] || "Saludos, trader. ¿En qué puedo ayudarte?"

  return (
    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
      <div className="mb-2 flex items-start justify-between">
        <p className="text-[10px] font-bold text-cyan-400">{npcId}</p>
        <button onClick={onClose} className="cursor-pointer border-none bg-transparent p-0 text-sm text-zinc-500 hover:text-zinc-300">✕</button>
      </div>

      <div className="mb-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2">
        <p className="text-[11px] italic leading-relaxed text-zinc-300">"{greeting}"</p>
      </div>

      {step === "greeting" && (
        <div className="flex flex-wrap gap-1">
          <button onClick={() => setStep("quest")}
            className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-[9px] font-bold text-cyan-400 transition hover:bg-cyan-400/20 cursor-pointer"
          >
            📋 Ver misiones
          </button>
          <NpcDialogueChoice label="Despedirse" onClick={onClose} variant="secondary" />
        </div>
      )}

      {step === "quest" && (
        <div className="space-y-1">
          <p className="text-[9px] text-zinc-500">Misiones disponibles:</p>
          <div className="flex flex-wrap gap-1">
            <button onClick={() => { onStartQuest?.("wyckoff-structure-basic"); onClose(); }}
              className="rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-1 text-[9px] font-bold text-amber-400 transition hover:bg-amber-400/20 cursor-pointer"
            >
              Iniciar misión
            </button>
            <NpcDialogueChoice label="Volver" onClick={() => setStep("greeting")} variant="secondary" />
          </div>
        </div>
      )}
    </div>
  )
}
