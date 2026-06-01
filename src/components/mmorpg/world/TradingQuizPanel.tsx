"use client"

import { useTradingQuizStore } from "@/stores/useTradingQuizStore"
import { TradingQuizQuestionCard } from "./TradingQuizQuestionCard"
import { TradingQuizResultPanel } from "./TradingQuizResultPanel"

const QUIZ_COLORS: Record<string, string> = {
  wyckoff: "#22D3EE", elliott: "#A78BFA", risk: "#FACC15", macro: "#38BDF8",
  backtesting: "#2DD4BF", psychology: "#EC4899",
}

export function TradingQuizPanel() {
  const { quizzes, activeQuizId, setActiveQuiz, answers, completeQuiz } = useTradingQuizStore()
  const activeQuiz = activeQuizId ? quizzes.find((q) => q.id === activeQuizId) : null
  const quizAnswers = activeQuizId ? answers[activeQuizId] || [] : []

  if (activeQuiz && quizAnswers.length === activeQuiz.questions.length) {
    return <TradingQuizResultPanel quiz={activeQuiz} answers={quizAnswers} onClose={() => setActiveQuiz(null)} />
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Quizzes de trading</p>
      <p className="mb-3 text-[9px] italic text-zinc-500">Poné a prueba tu conocimiento.</p>

      {activeQuiz ? (
        <TradingQuizQuestionCard quiz={activeQuiz} />
      ) : (
        <div className="grid gap-1">
          {quizzes.map((quiz) => {
            const color = QUIZ_COLORS[quiz.category] || "#22D3EE"
            const done = (answers[quiz.id] || []).length === quiz.questions.length
            return (
              <button key={quiz.id} onClick={() => setActiveQuiz(quiz.id)}
                className="flex items-center justify-between rounded-lg border px-2 py-1.5 text-left transition cursor-pointer"
                style={{
                  borderColor: done ? `${color}30` : "rgba(255,255,255,0.05)",
                  background: done ? `${color}08` : "rgba(255,255,255,0.02)",
                }}
              >
                <div>
                  <p className="text-[9px] font-bold text-zinc-200">{quiz.title}</p>
                  <span className="rounded px-1.5 py-0.5 text-[7px] font-bold" style={{ background: `${color}20`, color }}>{quiz.category}</span>
                </div>
                {done && <span className="text-[8px] text-emerald-400">✅</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
