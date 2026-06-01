"use client"

import { tradingNpcs } from "@/data/mmorpg/worldTradingNpcs"

interface Props { npcId?: string | null; onClear?: () => void; onOpenDialogue?: (npcId: string) => void }

export function TradingNpcInfoPanel({ npcId, onClear, onOpenDialogue }: Props) {
  if (!npcId) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center text-[10px] text-zinc-500">
        Seleccioná un NPC del mundo para ver su rol.
      </div>
    )
  }

  const npc = tradingNpcs.find((n) => n.id === npcId)
  if (!npc) return null

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="mb-2 flex items-start justify-between">
        <div>
          <p className="text-sm font-black text-zinc-100">{npc.name}</p>
          <p className="text-[9px] text-emerald-300">{npc.type}</p>
        </div>
        <button onClick={onClear} className="cursor-pointer border-none bg-transparent p-0 text-lg text-zinc-500 hover:text-zinc-300">✕</button>
      </div>

      <p className="mb-2 text-[10px] leading-relaxed text-zinc-400">{npc.description}</p>
      <p className="mb-2 text-[9px] italic text-zinc-500">🎯 {npc.greeting}</p>

      <div className="flex flex-wrap gap-1 text-[8px]">
        <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 font-bold text-cyan-400">{npc.zoneId}</span>
        <span className="rounded bg-violet-400/10 px-1.5 py-0.5 text-violet-300">Lv.{npc.level}</span>
      </div>

      {onOpenDialogue && (
        <button onClick={() => onOpenDialogue(npc.id)}
          className="mt-2 w-full rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-[9px] font-bold text-cyan-400 transition hover:bg-cyan-400/20 cursor-pointer"
        >
          Hablar con {npc.name}
        </button>
      )}
    </div>
  )
}
