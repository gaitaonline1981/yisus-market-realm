"use client"

import { tradingScenarios } from "@/data/mmorpg/tradingScenarios"
import { useTradingScenarioStore } from "@/stores/useTradingScenarioStore"
import { TradingScenarioCard } from "./TradingScenarioCard"
import { TradingScenarioDecisionPanel } from "./TradingScenarioDecisionPanel"
import { TradingScenarioResultPanel } from "./TradingScenarioResultPanel"

export function TradingScenarioTrainerPanel() {
  const activeScenarioId = useTradingScenarioStore((s) => s.activeScenarioId)
  const completedIds = useTradingScenarioStore((s) => s.completedScenarioIds) || []

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Entrenamiento de escenarios</p>
      <p className="mb-3 text-[9px] italic text-zinc-500">Simulaciones de trading para practicar decisiones.</p>

      {activeScenarioId ? (
        <div className="grid gap-2">
          <TradingScenarioDecisionPanel />
          <TradingScenarioResultPanel />
        </div>
      ) : (
        <div className="grid gap-2">
          {tradingScenarios.map((scenario) => (
            <TradingScenarioCard key={scenario.id} scenario={scenario} completed={completedIds.includes(scenario.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
