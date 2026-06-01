"use client"

import type { TradingMasterType } from "@/data/mmorpg/tradingMasters"

const LABELS: Record<TradingMasterType, string> = { historical_homage: "Homenaje histórico", inspired_archetype: "Arquetipo inspirado", original_teacher: "Maestro original" }
const COLORS: Record<TradingMasterType, string> = { historical_homage: "#F59E0B", inspired_archetype: "#22D3EE", original_teacher: "#A78BFA" }
interface Props { type: TradingMasterType }

export function TradingMasterTypeBadge({ type }: Props) {
  return (
    <span style={{ padding: "2px 8px", borderRadius: 6, fontSize: 8, fontWeight: 700, background: `${COLORS[type]}15`, color: COLORS[type], border: `1px solid ${COLORS[type]}30` }}>
      {LABELS[type]}
    </span>
  )
}
