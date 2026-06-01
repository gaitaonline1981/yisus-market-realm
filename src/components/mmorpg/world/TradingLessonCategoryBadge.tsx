"use client"

import type { TradingLessonCategory } from "@/data/mmorpg/tradingLessons"
import { getLessonCategoryLabel } from "@/lib/mmorpg/tradingLessonHelpers"

const COLORS: Record<TradingLessonCategory, string> = {
  basics: "#38BDF8", risk: "#FACC15", liquidity: "#22D3EE", volume: "#F97316",
  wyckoff: "#A78BFA", elliott: "#C084FC", macro: "#60A5FA", bots: "#2DD4BF",
  backtesting: "#14B8A6", prop_firm: "#F59E0B", psychology: "#EC4899", community: "#EC4899",
}

interface Props { category: TradingLessonCategory }

export function TradingLessonCategoryBadge({ category }: Props) {
  return (
    <span style={{ padding: "1px 8px", borderRadius: 6, fontSize: 8, fontWeight: 700, background: `${COLORS[category]}15`, color: COLORS[category], border: `1px solid ${COLORS[category]}30` }}>
      {getLessonCategoryLabel(category)}
    </span>
  )
}
