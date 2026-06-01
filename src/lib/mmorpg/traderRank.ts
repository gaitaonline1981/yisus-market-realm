export type TraderRank =
  | "novice" | "apprentice" | "market_reader" | "risk_operator"
  | "liquidity_hunter" | "strategy_builder" | "funded_challenger"
  | "institutional_mind" | "market_master"

export interface TraderRankInfo {
  id: TraderRank
  name: string
  description: string
  minXp: number
  color: string
}

export const traderRanks: TraderRankInfo[] = [
  { id: "novice", name: "Novato del Mercado", minXp: 0, description: "Está empezando a entender el mapa del mercado.", color: "#94A3B8" },
  { id: "apprentice", name: "Aprendiz Trader", minXp: 100, description: "Ya completó sus primeras misiones y entiende conceptos básicos.", color: "#38BDF8" },
  { id: "market_reader", name: "Lector de Mercado", minXp: 300, description: "Empieza a conectar estructura, zonas y contexto.", color: "#22D3EE" },
  { id: "risk_operator", name: "Operador de Riesgo", minXp: 600, description: "Prioriza supervivencia, drawdown y control de pérdidas.", color: "#FACC15" },
  { id: "liquidity_hunter", name: "Cazador de Liquidez", minXp: 900, description: "Entiende stops, barridos y zonas de manipulación.", color: "#06B6D4" },
  { id: "strategy_builder", name: "Constructor de Estrategias", minXp: 1300, description: "Usa backtesting, filtros y sistemas para mejorar decisiones.", color: "#2DD4BF" },
  { id: "funded_challenger", name: "Aspirante Fondeado", minXp: 1800, description: "Comprende reglas de prop firms y consistencia.", color: "#F59E0B" },
  { id: "institutional_mind", name: "Mente Institucional", minXp: 2500, description: "Piensa en liquidez, riesgo, volumen, macro y proceso.", color: "#A78BFA" },
  { id: "market_master", name: "Maestro del Market Realm", minXp: 3500, description: "Perfil avanzado con dominio integral del mundo trader.", color: "#EC4899" },
]

export function getTraderRankByXp(xp: number): TraderRankInfo {
  let rank = traderRanks[0]
  for (const r of traderRanks) {
    if (xp >= r.minXp) rank = r
  }
  return rank
}

export function getNextTraderRank(xp: number): TraderRankInfo | undefined {
  for (const r of traderRanks) {
    if (xp < r.minXp) return r
  }
  return undefined
}

export function getTraderRankProgress(xp: number): {
  current: TraderRankInfo
  next?: TraderRankInfo
  progressPercent: number
  xpToNext: number
} {
  const current = getTraderRankByXp(xp)
  const next = getNextTraderRank(xp)
  if (!next) return { current, next: undefined, progressPercent: 100, xpToNext: 0 }
  const xpInCurrent = xp - current.minXp
  const xpNeeded = next.minXp - current.minXp
  return { current, next, progressPercent: Math.min(100, Math.round((xpInCurrent / xpNeeded) * 100)), xpToNext: next.minXp - xp }
}
