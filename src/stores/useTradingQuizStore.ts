import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CompletedQuizResult {
  quizId: string
  lessonId: string
  score: number
  total: number
  passed: boolean
  completedAt: string
}

interface TradingQuizState {
  completedQuizzes: CompletedQuizResult[]
  completeQuiz: (result: CompletedQuizResult) => void
  getQuizResult: (quizId: string) => CompletedQuizResult | undefined
  isQuizPassed: (quizId: string) => boolean
  resetQuizzes: () => void
}

export const useTradingQuizStore = create<TradingQuizState>()(
  persist(
    (set, get) => ({
      completedQuizzes: [],
      completeQuiz: (result) => {
        const existing = get().completedQuizzes.findIndex((q) => q.quizId === result.quizId)
        if (existing >= 0) {
          const next = [...get().completedQuizzes]
          next[existing] = result
          set({ completedQuizzes: next })
        } else {
          set({ completedQuizzes: [...get().completedQuizzes, result] })
        }
      },
      getQuizResult: (quizId) => get().completedQuizzes.find((q) => q.quizId === quizId),
      isQuizPassed: (quizId) => get().completedQuizzes.find((q) => q.quizId === quizId)?.passed || false,
      resetQuizzes: () => set({ completedQuizzes: [] }),
    }),
    { name: "yisus-market-realm-trading-quizzes" }
  )
)
