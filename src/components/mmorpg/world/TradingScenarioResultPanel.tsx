"use client"

import { useTradingScenarioStore } from "@/stores/useTradingScenarioStore"

export function TradingScenarioResultPanel() {
  const activeResult = useTradingScenarioStore((s) => s.activeResult)
  const clearScenario = useTradingScenarioStore((s) => s.clearScenario)

  if (!activeResult) return null

  return (
    <div className="rounded-xl border p-3"
      style={{
        borderColor: activeResult.correct ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)",
        background: activeResult.correct ? "rgba(16,185,129,0.05)" : "rgba(239,68,68,0.05)",
      }}
    >
      <p className={`text-sm font-bold ${activeResult.correct ? "text-emerald-400" : "text-red-400"}`}>
        {activeResult.correct ? "✅ Decisión correcta" : "❌ Decisión incorrecta"}
      </p>
      <p className="mt-1 text-[10px] leading-relaxed text-zinc-400">{activeResult.feedback}</p>
      <p className="mt-1 text-[9px] font-bold text-amber-400">+{activeResult.xpReward} XP · {activeResult.reputationReward} reputación</p>
      <button onClick={clearScenario}
        className="mt-2 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-[9px] font-bold text-cyan-400 transition hover:bg-cyan-400/20 cursor-pointer"
      >
        Siguiente escenario
      </button>
    </div>
  )
}
