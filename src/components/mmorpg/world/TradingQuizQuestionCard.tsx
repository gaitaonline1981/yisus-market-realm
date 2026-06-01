"use client"

import type { TradingQuiz } from "@/data/mmorpg/tradingQuizzes"
import { useTradingQuizStore } from "@/stores/useTradingQuizStore"

interface Props { quiz: TradingQuiz }

export function TradingQuizQuestionCard({ quiz }: Props) {
  const answerQuestion = useTradingQuizStore((s) => s.answerQuestion)
  const currentAnswers = useTradingQuizStore((s) => s.answers[quiz.id] || [])

  const currentQ = currentAnswers.length
  if (currentQ >= quiz.questions.length) return null

  const question = quiz.questions[currentQ]

  return (
    <div className="rounded-xl border p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[9px] font-bold text-zinc-400">Pregunta {currentQ + 1} de {quiz.questions.length}</p>
        <span className="text-[8px] text-zinc-600">{quiz.category}</span>
      </div>

      <p className="mb-3 text-[11px] font-bold text-zinc-100">{question.question}</p>

      <div className="grid gap-1">
        {question.options.map((opt, i) => (
          <button key={i} onClick={() => answerQuestion({ quizId: quiz.id, questionIndex: currentQ, answer: i })}
            className="w-full rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-left text-[10px] text-zinc-300 transition hover:bg-white/10 hover:text-white cursor-pointer"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
