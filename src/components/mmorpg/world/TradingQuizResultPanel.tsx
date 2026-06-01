"use client"

import type { TradingQuiz, QuizAnswer } from "@/data/mmorpg/tradingQuizzes"

interface Props { quiz: TradingQuiz; answers: QuizAnswer[]; onClose: () => void }

export function TradingQuizResultPanel({ quiz, answers, onClose }: Props) {
  const correct = answers.filter((a) => a.isCorrect).length
  const total = quiz.questions.length
  const pct = Math.round((correct / total) * 100)

  return (
    <div className="rounded-2xl border p-4"
      style={{
        borderColor: pct >= 70 ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)",
        background: pct >= 70 ? "rgba(16,185,129,0.05)" : "rgba(239,68,68,0.05)",
      }}
    >
      <p className={`text-base font-black ${pct >= 70 ? "text-emerald-400" : "text-red-400"}`}>
        {pct >= 70 ? "✅ Aprobado" : "❌ Necesitas mejorar"}
      </p>
      <p className="mt-1 text-[11px] text-zinc-400">{correct}/{total} correctas ({pct}%)</p>
      <p className="mt-2 text-[9px] leading-relaxed text-zinc-500">{quiz.summary}</p>
      <button onClick={onClose}
        className="mt-3 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-[9px] font-bold text-cyan-400 transition hover:bg-cyan-400/20 cursor-pointer"
      >
        Volver a quizzes
      </button>
    </div>
  )
}
