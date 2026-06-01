"use client"

import type { TradingAchievementCategory } from "@/data/mmorpg/tradingAchievements"

const LABELS: Record<TradingAchievementCategory, string> = {
  progress: "Progreso", risk: "Riesgo", liquidity: "Liquidez", volume: "Volumen",
  wyckoff: "Wyckoff", elliott: "Elliott", macro: "Macro", bots: "Bots",
  backtesting: "Backtesting", prop_firm: "Prop Firm", psychology: "Psicología",
  exploration: "Exploración", community: "Comunidad",
}

const COLORS: Record<TradingAchievementCategory, string> = {
  progress: "#38BDF8", risk: "#FACC15", liquidity: "#22D3EE", volume: "#F97316",
  wyckoff: "#A78BFA", elliott: "#C084FC", macro: "#60A5FA", bots: "#2DD4BF",
  backtesting: "#14B8A6", prop_firm: "#F59E0B", psychology: "#EC4899",
  exploration: "#10B981", community: "#EC4899",
}

interface Props { category: TradingAchievementCategory }

export function AchievementCategoryBadge({ category }: Props) {
  return (
    <span style={{ padding: "1px 8px", borderRadius: 6, fontSize: 8, fontWeight: 700, background: `${COLORS[category]}15`, color: COLORS[category], border: `1px solid ${COLORS[category]}30` }}>
      {LABELS[category]}
    </span>
  )
}
