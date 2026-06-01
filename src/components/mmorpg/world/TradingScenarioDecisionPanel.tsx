"use client"

import { useTradingScenarioStore } from "@/stores/useTradingScenarioStore"
import { tradingScenarios } from "@/data/mmorpg/tradingScenarios"

export function TradingScenarioDecisionPanel() {
  const activeId = useTradingScenarioStore((s) => s.activeScenarioId)
  const submitDecision = useTradingScenarioStore((s) => s.submitDecision)
  const scenario = activeId ? tradingScenarios.find((s) => s.id === activeId) : null

  if (!scenario) return null

  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <p className="mb-2 text-[9px] font-bold text-zinc-300">Tomá una decisión</p>
      <div className="grid gap-1">
        {scenario.decisions.map((d, i) => (
          <button key={i} onClick={() => submitDecision(i)}
            className="w-full rounded-lg border border-white/5 bg-white/[0.02] px-2 py-1.5 text-left text-[9px] text-zinc-300 transition hover:bg-white/10 hover:text-white cursor-pointer"
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  )
}
