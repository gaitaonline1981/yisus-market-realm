import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CompletedScenarioResult {
  scenarioId: string
  selectedDecision: string
  correct: boolean
  completedAt: string
}

interface TradingScenarioState {
  completedScenarios: CompletedScenarioResult[]
  activeScenarioId?: string
  startScenario: (scenarioId: string) => void
  completeScenario: (result: CompletedScenarioResult) => void
  getScenarioResult: (scenarioId: string) => CompletedScenarioResult | undefined
  isScenarioCompleted: (scenarioId: string) => boolean
  resetScenarios: () => void
}

export const useTradingScenarioStore = create<TradingScenarioState>()(
  persist(
    (set, get) => ({
      completedScenarios: [],
      activeScenarioId: undefined,
      startScenario: (scenarioId) => set({ activeScenarioId: scenarioId }),
      completeScenario: (result) => {
        const { completedScenarios } = get()
        const existing = completedScenarios.findIndex((s) => s.scenarioId === result.scenarioId)
        if (existing >= 0) {
          const next = [...completedScenarios]
          next[existing] = result
          set({ completedScenarios: next, activeScenarioId: undefined })
        } else {
          set({ completedScenarios: [...completedScenarios, result], activeScenarioId: undefined })
        }
      },
      getScenarioResult: (scenarioId) => get().completedScenarios.find((s) => s.scenarioId === scenarioId),
      isScenarioCompleted: (scenarioId) => get().completedScenarios.some((s) => s.scenarioId === scenarioId && s.correct),
      resetScenarios: () => set({ completedScenarios: [], activeScenarioId: undefined }),
    }),
    { name: "yisus-market-realm-trading-scenarios" }
  )
)
