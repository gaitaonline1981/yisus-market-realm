"use client"

import type { MarketReplayCategory } from "@/data/mmorpg/marketReplays"
import { getMarketReplayCategoryLabel } from "@/lib/mmorpg/marketReplayHelpers"

const COLORS: Record<MarketReplayCategory, string> = { liquidity: "#22D3EE", breakout: "#F97316", risk: "#FACC15", wyckoff: "#A78BFA", macro: "#60A5FA", prop_firm: "#F59E0B", psychology: "#EC4899" }
interface Props { category: MarketReplayCategory }

export function MarketReplayCategoryBadge({ category }: Props) {
  return (
    <span style={{ padding: "1px 8px", borderRadius: 6, fontSize: 8, fontWeight: 700, background: `${COLORS[category]}15`, color: COLORS[category], border: `1px solid ${COLORS[category]}30` }}>
      {getMarketReplayCategoryLabel(category)}
    </span>
  )
}
