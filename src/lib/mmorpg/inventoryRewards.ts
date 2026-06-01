import { tradingItems } from "@/data/mmorpg/tradingItems"
import type { TradingItemType } from "@/data/mmorpg/tradingItems"

const QUEST_ITEMS: Record<string, string[]> = {
  "central-plan": ["market-checklist-module", "trader-discipline-title"],
  "liquidity-detect": ["liquidity-map-fragment"],
  "candle-confirm": ["momentum-flame-badge"],
  "macro-context": ["macro-oracle-note"],
  "mechanic-signal": ["bot-filter-chip"],
  "risk-defense": ["risk-shield-badge"],
  "wyckoff-structure-basic": ["wyckoff-structure-scroll"],
  "elliott-cycle-basic": ["elliott-cycle-compass"],
  "backtest-first-strategy": ["backtest-report-template"],
  "prop-firm-rules-basic": ["prop-firm-rulebook", "funded-challenger-access"],
}

export function getRewardItemsForQuest(questId: string): string[] {
  return QUEST_ITEMS[questId] || []
}

export function getTradingItemById(itemId: string) {
  return tradingItems.find((i) => i.id === itemId)
}

export function getTradingItemsByType(type: TradingItemType) {
  return tradingItems.filter((i) => i.type === type)
}
