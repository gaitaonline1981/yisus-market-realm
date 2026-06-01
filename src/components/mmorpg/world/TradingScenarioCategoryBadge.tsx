"use client"

import type { TradingScenarioCategory } from "@/data/mmorpg/tradingScenarios"
import { getScenarioCategoryLabel } from "@/lib/mmorpg/tradingScenarioHelpers"

const COLORS: Record<TradingScenarioCategory, string> = {
  risk: "#FACC15", liquidity: "#22D3EE", volume: "#F97316", wyckoff: "#A78BFA",
  elliott: "#C084FC", macro: "#60A5FA", backtesting: "#14B8A6", prop_firm: "#F59E0B", psychology: "#EC4899",
}

interface Props { category: TradingScenarioCategory }

export function TradingScenarioCategoryBadge({ category }: Props) {
  return (
    <span style={{ padding: "1px 8px", borderRadius: 6, fontSize: 8, fontWeight: 700, background: `${COLORS[category]}15`, color: COLORS[category], border: `1px solid ${COLORS[category]}30` }}>
      {getScenarioCategoryLabel(category)}
    </span>
  )
}
