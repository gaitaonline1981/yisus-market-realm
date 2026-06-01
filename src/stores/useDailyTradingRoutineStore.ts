import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface DailyRoutineCompletion {
  date: string
  completedTaskIds: string[]
  journalNote?: string
  completedAt?: string
  rewardClaimed?: boolean
}

interface DailyTradingRoutineState {
  completions: DailyRoutineCompletion[]
  getTodayCompletion: () => DailyRoutineCompletion | undefined
  toggleTaskForToday: (taskId: string) => void
  setTodayJournalNote: (note: string) => void
  markTodayRewardClaimed: () => void
  resetTodayRoutine: () => void
  resetAllRoutines: () => void
}

function getDateKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

export const useDailyTradingRoutineStore = create<DailyTradingRoutineState>()(
  persist(
    (set, get) => ({
      completions: [],

      getTodayCompletion: () => {
        const key = getDateKey()
        return get().completions.find((c) => c.date === key)
      },

      toggleTaskForToday: (taskId) => {
        const key = getDateKey()
        const { completions } = get()
        const today = completions.find((c) => c.date === key)
        if (today) {
          const next = completions.map((c) => {
            if (c.date !== key) return c
            const ids = c.completedTaskIds.includes(taskId)
              ? c.completedTaskIds.filter((id) => id !== taskId)
              : [...c.completedTaskIds, taskId]
            return { ...c, completedTaskIds: ids }
          })
          set({ completions: next })
        } else {
          set({ completions: [...completions, { date: key, completedTaskIds: [taskId] }] })
        }
      },

      setTodayJournalNote: (note) => {
        const key = getDateKey()
        const { completions } = get()
        const today = completions.find((c) => c.date === key)
        if (today) {
          set({ completions: completions.map((c) => c.date === key ? { ...c, journalNote: note } : c) })
        } else {
          set({ completions: [...completions, { date: key, completedTaskIds: [], journalNote: note }] })
        }
      },

      markTodayRewardClaimed: () => {
        const key = getDateKey()
        const { completions } = get()
        const today = completions.find((c) => c.date === key)
        if (today) {
          set({ completions: completions.map((c) => c.date === key ? { ...c, rewardClaimed: true, completedAt: new Date().toISOString() } : c) })
        } else {
          set({ completions: [...completions, { date: key, completedTaskIds: [], rewardClaimed: true, completedAt: new Date().toISOString() }] })
        }
      },

      resetTodayRoutine: () => {
        const key = getDateKey()
        set({ completions: get().completions.filter((c) => c.date !== key) })
      },

      resetAllRoutines: () => set({ completions: [] }),
    }),
    { name: "yisus-market-realm-daily-trading-routine" }
  )
)
