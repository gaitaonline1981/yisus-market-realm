import { create } from "zustand"
import { persist } from "zustand/middleware"
import { getQuestById, worldQuests } from "@/data/mmorpg/worldQuests"
import { getRewardItemsForQuest } from "@/lib/mmorpg/inventoryRewards"

interface WorldProgressState {
  activeQuestId: string | null
  completedQuestIds: string[]
  xp: number
  titles: string[]

  startQuest: (questId: string) => void
  completeQuest: (questId: string) => void
  resetProgress: () => void
  isQuestCompleted: (questId: string) => boolean
  isQuestActive: (questId: string) => boolean
  getTotalQuests: () => number
  getCompletedCount: () => number
  addXp: (amount: number) => void
}

export const useWorldProgressStore = create<WorldProgressState>()(
  persist(
    (set, get) => ({
      activeQuestId: null,
      completedQuestIds: [],
      xp: 0,
      titles: [],

      startQuest: (questId) => {
        const { completedQuestIds } = get()
        if (completedQuestIds.includes(questId)) return
        set({ activeQuestId: questId })
      },

      completeQuest: (questId) => {
        const { completedQuestIds, xp, titles } = get()
        if (completedQuestIds.includes(questId)) return

        const quest = getQuestById(questId)
        if (!quest) return

        const newCompleted = [...completedQuestIds, questId]
        const newXp = xp + quest.reward.xp
        const newTitles = quest.reward.title && !titles.includes(quest.reward.title)
          ? [...titles, quest.reward.title]
          : titles

        // Add inventory items
        const rewardItemIds = getRewardItemsForQuest(questId)
        if (rewardItemIds.length > 0) {
          const { useTradingInventoryStore } = require("@/stores/useTradingInventoryStore")
          useTradingInventoryStore.getState().addItems(rewardItemIds)
        }

        set({
          completedQuestIds: newCompleted,
          xp: newXp,
          titles: newTitles,
          activeQuestId: get().activeQuestId === questId ? null : get().activeQuestId,
        })
      },

      resetProgress: () => {
        set({ activeQuestId: null, completedQuestIds: [], xp: 0, titles: [] })
      },

      isQuestCompleted: (questId) => {
        return get().completedQuestIds.includes(questId)
      },

      isQuestActive: (questId) => {
        return get().activeQuestId === questId
      },

      getTotalQuests: () => worldQuests.length,

      getCompletedCount: () => get().completedQuestIds.length,

      addXp: (amount) => {
        set({ xp: get().xp + amount })
      },
    }),
    {
      name: "yisus-market-realm-world-progress",
    }
  )
)
