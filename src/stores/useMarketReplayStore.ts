import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CompletedMarketReplayResult {
  replayId: string
  decisions: { candleIndex: number; selectedDecision: string; correct: boolean }[]
  correctCount: number
  totalDecisionPoints: number
  passed: boolean
  completedAt: string
}

interface MarketReplayState {
  completedReplays: CompletedMarketReplayResult[]
  activeReplayId?: string
  startReplay: (replayId: string) => void
  completeReplay: (result: CompletedMarketReplayResult) => void
  getReplayResult: (replayId: string) => CompletedMarketReplayResult | undefined
  isReplayCompleted: (replayId: string) => boolean
  resetReplays: () => void
}

export const useMarketReplayStore = create<MarketReplayState>()(
  persist(
    (set, get) => ({
      completedReplays: [],
      activeReplayId: undefined,
      startReplay: (replayId) => set({ activeReplayId: replayId }),
      completeReplay: (result) => {
        const { completedReplays } = get()
        const existing = completedReplays.findIndex((r) => r.replayId === result.replayId)
        if (existing >= 0) {
          const next = [...completedReplays]
          next[existing] = result
          set({ completedReplays: next, activeReplayId: undefined })
        } else {
          set({ completedReplays: [...completedReplays, result], activeReplayId: undefined })
        }
      },
      getReplayResult: (replayId) => get().completedReplays.find((r) => r.replayId === replayId),
      isReplayCompleted: (replayId) => {
        const r = get().completedReplays.find((r) => r.replayId === replayId)
        return r ? r.passed : false
      },
      resetReplays: () => set({ completedReplays: [], activeReplayId: undefined }),
    }),
    { name: "yisus-market-realm-market-replays" }
  )
)
