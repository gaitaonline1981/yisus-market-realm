import { tradingLessons } from "@/data/mmorpg/tradingLessons"
import type { TradingLessonCategory, TradingLessonDifficulty } from "@/data/mmorpg/tradingLessons"

export function getLessonById(lessonId: string) { return tradingLessons.find((l) => l.id === lessonId) }
export function getLessonsByCategory(category: TradingLessonCategory) { return tradingLessons.filter((l) => l.category === category) }
export function getLessonsByQuest(questId: string) { return tradingLessons.filter((l) => l.questId === questId) }
export function getLessonsByNpc(npcId: string) { return tradingLessons.filter((l) => l.npcId === npcId) }
export function getLessonsByBuilding(buildingId: string) { return tradingLessons.filter((l) => l.buildingId === buildingId) }
export function getLessonsBySkill(skillId: string) { return tradingLessons.filter((l) => l.skillId === skillId) }

export function getLessonStatus(params: { lessonId: string; completedLessonIds: string[]; xp: number; completedQuestIds: string[]; unlockedSkillIds: string[]; itemIds: string[] }): "locked" | "available" | "completed" {
  const lesson = getLessonById(params.lessonId)
  if (!lesson) return "locked"
  if (params.completedLessonIds.includes(lesson.id)) return "completed"
  if (!lesson.unlockRequirement) return "available"
  const r = lesson.unlockRequirement
  if (r.type === "quest_completed" && !params.completedQuestIds.includes(r.value as string)) return "locked"
  if (r.type === "skill_unlocked" && !params.unlockedSkillIds.includes(r.value as string)) return "locked"
  if (r.type === "item_owned" && !params.itemIds.includes(r.value as string)) return "locked"
  if (r.type === "xp" && params.xp < (r.value as number)) return "locked"
  return "available"
}

const CAT_LABELS: Record<TradingLessonCategory, string> = { basics: "Básico", risk: "Riesgo", liquidity: "Liquidez", volume: "Volumen", wyckoff: "Wyckoff", elliott: "Elliott", macro: "Macro", bots: "Bots", backtesting: "Backtesting", prop_firm: "Prop Firm", psychology: "Psicología", community: "Comunidad" }
const DIFF_LABELS: Record<TradingLessonDifficulty, string> = { beginner: "Principiante", intermediate: "Intermedio", advanced: "Avanzado" }

export function getLessonCategoryLabel(c: TradingLessonCategory) { return CAT_LABELS[c] || c }
export function getLessonDifficultyLabel(d: TradingLessonDifficulty) { return DIFF_LABELS[d] || d }
