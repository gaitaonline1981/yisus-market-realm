"use client"

import { useMarketReplayStore } from "@/stores/useMarketReplayStore"

export function MarketReplayResultPanel() {
  const decision = useMarketReplayStore((s) => s.decision)
  const feedback = useMarketReplayStore((s) => s.feedback)

  if (!decision || !feedback) return null

  const isCorrect = feedback === "correct"

  return (
    <div className="rounded-xl border p-3"
      style={{
        borderColor: isCorrect ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)",
        background: isCorrect ? "rgba(16,185,129,0.05)" : "rgba(239,68,68,0.05)",
      }}
    >
      <p className={`text-sm font-bold ${isCorrect ? "text-emerald-400" : "text-red-400"}`}>
        {isCorrect ? "✅ Decisión correcta" : "❌ Decisión incorrecta"}
      </p>
      <p className="mt-1 text-[10px] leading-relaxed text-zinc-400">
        {feedback === "correct" ? "Tu análisis fue acertado." : "Revisá el contexto antes de decidir."}
      </p>
    </div>
  )
}
