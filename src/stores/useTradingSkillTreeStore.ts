import { create } from "zustand"
import { persist } from "zustand/middleware"

interface TradingSkillTreeState {
  unlockedSkillIds: string[]
  unlockSkill: (skillId: string) => void
  resetSkills: () => void
  isSkillUnlocked: (skillId: string) => boolean
}

export const useTradingSkillTreeStore = create<TradingSkillTreeState>()(
  persist(
    (set, get) => ({
      unlockedSkillIds: [],
      unlockSkill: (skillId) => {
        const { unlockedSkillIds } = get()
        if (!unlockedSkillIds.includes(skillId)) {
          set({ unlockedSkillIds: [...unlockedSkillIds, skillId] })
        }
      },
      resetSkills: () => set({ unlockedSkillIds: [] }),
      isSkillUnlocked: (skillId) => get().unlockedSkillIds.includes(skillId),
    }),
    { name: "yisus-market-realm-trading-skills" }
  )
)
