import { tradingScenarios } from "@/data/mmorpg/tradingScenarios"
import type { TradingScenarioCategory, TradingScenarioDecision } from "@/data/mmorpg/tradingScenarios"

export function getScenarioById(id: string) { return tradingScenarios.find((s) => s.id === id) }
export function getScenariosByCategory(c: TradingScenarioCategory) { return tradingScenarios.filter((s) => s.category === c) }
export function getScenariosByLesson(lessonId: string) { return tradingScenarios.filter((s) => s.lessonId === lessonId) }
export function getScenariosByQuest(questId: string) { return tradingScenarios.filter((s) => s.questId === questId) }
export function getScenariosByNpc(npcId: string) { return tradingScenarios.filter((s) => s.npcId === npcId) }

export function getScenarioStatus(params: { scenarioId: string; completedScenarioIds: string[]; completedLessonIds: string[]; completedQuestIds: string[]; unlockedSkillIds: string[]; xp: number }): "locked" | "available" | "completed" {
  const s = getScenarioById(params.scenarioId)
  if (!s) return "locked"
  if (params.completedScenarioIds.includes(s.id)) return "completed"
  if (!s.unlockRequirement) return "available"
  const r = s.unlockRequirement
  if (r.type === "lesson_completed" && !params.completedLessonIds.includes(r.value as string)) return "locked"
  if (r.type === "quest_completed" && !params.completedQuestIds.includes(r.value as string)) return "locked"
  if (r.type === "skill_unlocked" && !params.unlockedSkillIds.includes(r.value as string)) return "locked"
  if (r.type === "xp" && params.xp < (r.value as number)) return "locked"
  return "available"
}

const CAT_LABELS: Record<TradingScenarioCategory, string> = { risk: "Riesgo", liquidity: "Liquidez", volume: "Volumen", wyckoff: "Wyckoff", elliott: "Elliott", macro: "Macro", backtesting: "Backtesting", prop_firm: "Prop Firm", psychology: "Psicología" }
const DECISION_LABELS: Record<TradingScenarioDecision, string> = { long: "Long/Compra", short: "Short/Venta", wait: "Esperar", avoid: "Evitar operar", reduce_risk: "Reducir riesgo" }
const DIFF_LABELS: Record<string, string> = { beginner: "Principiante", intermediate: "Intermedio", advanced: "Avanzado" }

export function getScenarioCategoryLabel(c: TradingScenarioCategory) { return CAT_LABELS[c] || c }
export function getScenarioDecisionLabel(d: TradingScenarioDecision) { return DECISION_LABELS[d] || d }
export function getScenarioDifficultyLabel(d: string) { return DIFF_LABELS[d] || d }
