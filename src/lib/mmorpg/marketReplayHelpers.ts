import { marketReplays } from "@/data/mmorpg/marketReplays"
import type { MarketReplayCategory, MarketReplayDecision } from "@/data/mmorpg/marketReplays"

export function getMarketReplayById(id: string) { return marketReplays.find((r) => r.id === id) }
export function getMarketReplaysByCategory(c: MarketReplayCategory) { return marketReplays.filter((r) => r.category === c) }
export function getMarketReplaysByLesson(lessonId: string) { return marketReplays.filter((r) => r.lessonId === lessonId) }
export function getMarketReplaysByQuest(questId: string) { return marketReplays.filter((r) => r.questId === questId) }

export function getMarketReplayStatus(params: { replayId: string; completedReplayIds: string[]; completedLessonIds: string[]; completedQuestIds: string[]; completedScenarioIds: string[]; xp: number }): "locked" | "available" | "completed" {
  const r = getMarketReplayById(params.replayId)
  if (!r) return "locked"
  if (params.completedReplayIds.includes(r.id)) return "completed"
  if (!r.unlockRequirement) return "available"
  const u = r.unlockRequirement
  if (u.type === "lesson_completed" && !params.completedLessonIds.includes(u.value as string)) return "locked"
  if (u.type === "quest_completed" && !params.completedQuestIds.includes(u.value as string)) return "locked"
  if (u.type === "scenario_completed" && !params.completedScenarioIds.includes(u.value as string)) return "locked"
  if (u.type === "xp" && params.xp < (u.value as number)) return "locked"
  return "available"
}

const CAT_LABELS: Record<MarketReplayCategory, string> = { liquidity: "Liquidez", breakout: "Ruptura", risk: "Riesgo", wyckoff: "Wyckoff", macro: "Macro", prop_firm: "Prop Firm", psychology: "Psicología" }
const DECISION_LABELS: Record<MarketReplayDecision, string> = { long: "Long/Compra", short: "Short/Venta", wait: "Esperar", avoid: "Evitar", reduce_risk: "Reducir riesgo" }
const DIFF_LABELS: Record<string, string> = { beginner: "Principiante", intermediate: "Intermedio", advanced: "Avanzado" }

export function getMarketReplayCategoryLabel(c: MarketReplayCategory) { return CAT_LABELS[c] || c }
export function getMarketReplayDecisionLabel(d: MarketReplayDecision) { return DECISION_LABELS[d] || d }
export function getMarketReplayDifficultyLabel(d: string) { return DIFF_LABELS[d] || d }
