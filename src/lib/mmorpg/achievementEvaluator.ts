import { tradingAchievements } from "@/data/mmorpg/tradingAchievements"
import type { TradingAchievement } from "@/data/mmorpg/tradingAchievements"
import { getTraderRankByXp } from "@/lib/mmorpg/traderRank"

export interface AchievementEvaluationContext {
  xp: number
  completedQuestIds: string[]
  unlockedSkillIds: string[]
  itemIds: string[]
  titles: string[]
  activeZoneId?: string
}

function getRankId(xp: number): string {
  return getTraderRankByXp(xp).id
}

export function isAchievementRequirementMet(
  achievement: TradingAchievement,
  context: AchievementEvaluationContext
): boolean {
  const r = achievement.requirement
  switch (r.type) {
    case "xp":
      return context.xp >= (r.value as number)
    case "quest_completed":
      return context.completedQuestIds.includes(r.value as string)
    case "quests_completed_count":
      return context.completedQuestIds.length >= (r.value as number)
    case "skill_unlocked":
      return context.unlockedSkillIds.includes(r.value as string)
    case "skills_unlocked_count":
      return context.unlockedSkillIds.length >= (r.value as number)
    case "item_owned":
      return context.itemIds.includes(r.value as string)
    case "items_owned_count":
      return context.itemIds.length >= (r.value as number)
    case "rank_reached": {
      const current = getRankId(context.xp)
      const ranks = ["novice", "apprentice", "market_reader", "risk_operator", "liquidity_hunter", "strategy_builder", "funded_challenger", "institutional_mind", "market_master"]
      return ranks.indexOf(current) >= ranks.indexOf(r.value as string)
    }
    case "zone_active":
      return context.activeZoneId === r.value
    case "title_unlocked":
      return context.titles.includes(r.value as string)
    default:
      return false
  }
}

export function evaluateUnlockedAchievements(params: {
  context: AchievementEvaluationContext
  alreadyUnlockedIds: string[]
}): string[] {
  return tradingAchievements
    .filter((a) => !params.alreadyUnlockedIds.includes(a.id))
    .filter((a) => isAchievementRequirementMet(a, params.context))
    .map((a) => a.id)
}
