"use client"

import { tradingAchievements } from "@/data/mmorpg/tradingAchievements"
import { useTradingAchievementsStore } from "@/stores/useTradingAchievementsStore"
import { TradingAchievementCard } from "./TradingAchievementCard"

const CAT_COLORS: Record<string, string> = {
  wyckoff: "#22D3EE", elliott: "#A78BFA", risk: "#FACC15", macro: "#38BDF8",
  backtesting: "#2DD4BF", psychology: "#EC4899", liquidity: "#22D3EE",
  volume: "#F97316", general: "#64748B",
}

export function TradingAchievementsPanel() {
  const unlockedIds = useTradingAchievementsStore((s) => s.unlockedAchievementIds)
  const unlockAchievement = useTradingAchievementsStore((s) => s.unlockAchievement)

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Logros</p>
      <p className="mb-3 text-[9px] italic text-zinc-500">{unlockedIds.length}/{tradingAchievements.length} desbloqueados.</p>

      <div className="grid gap-2">
        {tradingAchievements.map((ach) => (
          <TradingAchievementCard
            key={ach.id}
            achievement={ach}
            unlocked={unlockedIds.includes(ach.id)}
            onUnlock={() => unlockAchievement(ach.id)}
          />
        ))}
      </div>
    </div>
  )
}
