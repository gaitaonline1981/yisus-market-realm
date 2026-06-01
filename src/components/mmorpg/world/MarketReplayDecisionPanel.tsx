"use client"

import { useMarketReplayStore } from "@/stores/useMarketReplayStore"

export function MarketReplayDecisionPanel() {
  const selectedReplayId = useMarketReplayStore((s) => s.selectedReplayId)
  const step = useMarketReplayStore((s) => s.step)
  const setDecision = useMarketReplayStore((s) => s.setDecision)

  if (!selectedReplayId) return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center text-[9px] text-zinc-600">
      Seleccioná un replay para empezar.
    </div>
  )

  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
      <p className="mb-1 text-[9px] font-bold text-zinc-300">Decisión en vela {step.current}</p>
      <p className="mb-2 text-[8px] text-zinc-500">¿Qué harías en este punto?</p>
      <div className="flex gap-1">
        <button onClick={() => setDecision("long")}
          className="flex-1 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-[8px] font-bold text-emerald-400 transition hover:bg-emerald-400/20 cursor-pointer"
        >
          Comprar (Long) 📈
        </button>
        <button onClick={() => setDecision("short")}
          className="flex-1 rounded-md border border-red-400/30 bg-red-400/10 px-2 py-1 text-[8px] font-bold text-red-400 transition hover:bg-red-400/20 cursor-pointer"
        >
          Vender (Short) 📉
        </button>
        <button onClick={() => setDecision("wait")}
          className="flex-1 rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-1 text-[8px] font-bold text-amber-400 transition hover:bg-amber-400/20 cursor-pointer"
        >
          Esperar ⏳
        </button>
      </div>
    </div>
  )
}
