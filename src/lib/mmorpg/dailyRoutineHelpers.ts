import { dailyTradingRoutineTasks } from "@/data/mmorpg/dailyTradingRoutine"
import type { DailyRoutineTaskCategory } from "@/data/mmorpg/dailyTradingRoutine"

export function getTodayDateKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

export function getRequiredDailyTaskIds(): string[] {
  return dailyTradingRoutineTasks.filter((t) => t.required).map((t) => t.id)
}

export function getDailyRoutineProgress(completedTaskIds: string[]) {
  const all = dailyTradingRoutineTasks
  const required = all.filter((t) => t.required)
  const completedRequired = required.filter((t) => completedTaskIds.includes(t.id)).length
  const completedTotal = all.filter((t) => completedTaskIds.includes(t.id)).length
  const readyToClaim = required.every((t) => completedTaskIds.includes(t.id))
  return { completedRequired, totalRequired: required.length, completedTotal, totalTasks: all.length, percent: Math.round((completedTotal / all.length) * 100), readyToClaim }
}

export function getDailyRoutineRewardXp(completedTaskIds: string[]): number {
  return dailyTradingRoutineTasks.filter((t) => completedTaskIds.includes(t.id)).reduce((sum, t) => sum + t.rewardXp, 0)
}

const LABELS: Record<DailyRoutineTaskCategory, string> = {
  market_overview: "Overview", watchlist: "Watchlist", macro: "Macro",
  liquidity: "Liquidez", risk: "Riesgo", psychology: "Psicología", journal: "Diario",
}

export function getDailyRoutineCategoryLabel(c: DailyRoutineTaskCategory) { return LABELS[c] || c }
