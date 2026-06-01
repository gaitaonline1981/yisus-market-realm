import { create } from "zustand"
import { persist } from "zustand/middleware"

interface TradingAchievementsState {
  unlockedAchievementIds: string[]
  lastUnlockedAchievementId?: string
  unlockAchievement: (achievementId: string) => void
  unlockAchievements: (ids: string[]) => void
  isAchievementUnlocked: (id: string) => boolean
  clearLastUnlockedAchievement: () => void
  resetAchievements: () => void
}

export const useTradingAchievementsStore = create<TradingAchievementsState>()(
  persist(
    (set, get) => ({
      unlockedAchievementIds: [],
      lastUnlockedAchievementId: undefined,
      unlockAchievement: (id) => {
        const { unlockedAchievementIds } = get()
        if (!unlockedAchievementIds.includes(id)) {
          set({ unlockedAchievementIds: [...unlockedAchievementIds, id], lastUnlockedAchievementId: id })
        }
      },
      unlockAchievements: (ids) => {
        const { unlockedAchievementIds } = get()
        const newIds = ids.filter((id) => !unlockedAchievementIds.includes(id))
        if (newIds.length > 0) {
          set({ unlockedAchievementIds: [...unlockedAchievementIds, ...newIds], lastUnlockedAchievementId: newIds[newIds.length - 1] })
        }
      },
      isAchievementUnlocked: (id) => get().unlockedAchievementIds.includes(id),
      clearLastUnlockedAchievement: () => set({ lastUnlockedAchievementId: undefined }),
      resetAchievements: () => set({ unlockedAchievementIds: [], lastUnlockedAchievementId: undefined }),
    }),
    { name: "yisus-market-realm-trading-achievements" }
  )
)
