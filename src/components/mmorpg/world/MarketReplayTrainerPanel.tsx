"use client"

import { useMarketReplayStore } from "@/stores/useMarketReplayStore"
import { MarketReplayCard } from "./MarketReplayCard"
import { MarketReplayChart } from "./MarketReplayChart"
import { MarketReplayDecisionPanel } from "./MarketReplayDecisionPanel"

export function MarketReplayTrainerPanel() {
  const s = useMarketReplayStore()
  const selectedReplayId = s.selectedReplayId
  const step = s.step || { current: 0, total: 0 }
  const isPlaying = s.isPlaying
  const play = s.play
  const pause = s.pause
  const reset = s.reset
  const setDecision = s.setDecision

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Market Replay</p>
      <p className="mb-3 text-[9px] italic text-zinc-500">Revisá velas históricas y tomá decisiones.</p>

      <div className="grid gap-2">
        <MarketReplayCard />
        <MarketReplayChart />
        <MarketReplayDecisionPanel />

        <div className="flex gap-1">
          <button onClick={play}
            className="flex-1 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-[9px] font-bold text-cyan-400 transition hover:bg-cyan-400/20 cursor-pointer"
          >
            ▶ Reproducir
          </button>
          <button onClick={pause}
            className="flex-1 rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-1 text-[9px] font-bold text-amber-400 transition hover:bg-amber-400/20 cursor-pointer"
          >
            ⏸ Pausa
          </button>
          <button onClick={reset}
            className="flex-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[9px] text-zinc-400 transition hover:bg-white/10 cursor-pointer"
          >
            ↺ Reset
          </button>
        </div>

        <p className="text-center text-[9px] text-zinc-600">
          Vela {step.current}/{step.total}
        </p>
      </div>
    </div>
  )
}
