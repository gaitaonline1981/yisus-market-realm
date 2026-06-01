import { tradingSkillNodes } from "@/data/mmorpg/tradingSkillTree"
import type { TradingSkillBranchId } from "@/data/mmorpg/tradingSkillTree"

export function getSkillById(skillId: string) {
  return tradingSkillNodes.find((s) => s.id === skillId)
}

export function getSkillsByBranch(branchId: TradingSkillBranchId) {
  return tradingSkillNodes.filter((s) => s.branchId === branchId)
}

export function getSkillStatus(params: {
  skillId: string
  unlockedSkillIds: string[]
  xp: number
  completedQuestIds: string[]
}): "locked" | "available" | "unlocked" {
  const skill = getSkillById(params.skillId)
  if (!skill) return "locked"
  if (params.unlockedSkillIds.includes(skill.id)) return "unlocked"
  if (skill.requiredXp && params.xp < skill.requiredXp) return "locked"
  if (skill.requiredQuestIds) {
    for (const qId of skill.requiredQuestIds) {
      if (!params.completedQuestIds.includes(qId)) return "locked"
    }
  }
  return "available"
}

export function getBranchProgress(params: {
  branchId: TradingSkillBranchId
  unlockedSkillIds: string[]
}): { total: number; unlocked: number; percent: number } {
  const skills = getSkillsByBranch(params.branchId)
  const unlocked = skills.filter((s) => params.unlockedSkillIds.includes(s.id)).length
  return { total: skills.length, unlocked, percent: skills.length > 0 ? Math.round((unlocked / skills.length) * 100) : 0 }
}
