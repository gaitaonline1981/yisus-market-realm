"use client"

import type { TradingScenario } from "@/data/mmorpg/tradingScenarios"
import { useTradingScenarioStore } from "@/stores/useTradingScenarioStore"

interface Props { scenario: TradingScenario; completed: boolean }

const CAT_COLORS: Record<string, string> = {
  wyckoff: "#22D3EE", elliott: "#A78BFA", risk: "#FACC15", macro: "#38BDF8",
  backtesting: "#2DD4BF", psychology: "#EC4899", volume: "#F97316",
  liquidity: "#22D3EE", prop_firm: "#F59E0B",
}

export function TradingScenarioCard({ scenario, completed }: Props) {
  const setActive = useTradingScenarioStore((s) => s.setActiveScenario)
  const color = CAT_COLORS[scenario.category] || "#22D3EE"

  return (
    <div className="rounded-xl border p-3 transition hover:bg-white/5 cursor-pointer"
      style={{
        borderColor: completed ? `${color}30` : "rgba(255,255,255,0.06)",
        background: completed ? `${color}06` : "rgba(255,255,255,0.02)",
        opacity: completed ? 0.6 : 1,
      }}
      onClick={() => setActive(scenario.id)}
    >
      <div className="mb-1 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold text-zinc-200">{scenario.title}</p>
          <span className="rounded px-1.5 py-0.5 text-[7px] font-bold" style={{ background: `${color}20`, color }}>{scenario.category}</span>
        </div>
        <span className="text-[9px] font-bold text-amber-400">+{scenario.xpReward} XP</span>
      </div>
      <p className="line-clamp-2 text-[9px] text-zinc-500">{scenario.description}</p>
      {completed && <p className="mt-1 text-[8px] text-emerald-400">✅ Completado</p>}
    </div>
  )
}
