import { worldQuests } from "@/data/mmorpg/worldQuests"
import type { WorldQuest, MissionCategory } from "@/data/mmorpg/worldQuests"

export function getQuestById(questId: string): WorldQuest | undefined {
  return worldQuests.find((q) => q.id === questId)
}

export function getQuestsByZone(zoneId: string): WorldQuest[] {
  return worldQuests.filter((q) => q.zoneId === zoneId)
}

export function getQuestsByNpc(npcId: string): WorldQuest[] {
  return worldQuests.filter((q) => q.npcId === npcId)
}

export function getQuestsByBuilding(buildingId: string): WorldQuest[] {
  return worldQuests.filter((q) => q.buildingId === buildingId)
}

export function getQuestsByCategory(category: MissionCategory): WorldQuest[] {
  return worldQuests.filter((q) => q.category === category)
}

export function getQuestStatus(params: {
  questId: string
  activeQuestId?: string
  completedQuestIds: string[]
}): "available" | "active" | "completed" {
  if (params.completedQuestIds.includes(params.questId)) return "completed"
  if (params.activeQuestId === params.questId) return "active"
  return "available"
}

export function getDifficultyLabel(d: string): string {
  const labels: Record<string, string> = { beginner: "Principiante", intermediate: "Intermedio", advanced: "Avanzado" }
  return labels[d] || d
}

export function getCategoryLabel(c: MissionCategory): string {
  const labels: Record<string, string> = {
    tutorial: "Tutorial", liquidity: "Liquidez", risk: "Riesgo", breakout: "Ruptura",
    macro: "Macro", bot: "Bots", backtesting: "Backtesting", prop_firm: "Prop Firm",
    community: "Comunidad", wyckoff: "Wyckoff", elliott: "Elliott", volume: "Volumen",
  }
  return labels[c] || c
}
