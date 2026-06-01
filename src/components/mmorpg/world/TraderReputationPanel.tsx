"use client"

import { useWorldProgressStore } from "@/stores/useWorldProgressStore"

const BRANCH_LABELS: Record<string, string> = {
  wyckoff: "Wyckoff", elliott: "Elliott", risk: "Riesgo", macro: "Macro",
  backtesting: "Backtest", psychology: "Psicología", liquidity: "Liquidez",
  volume: "Volumen", bots: "Bots", prop_firm: "Prop Firms",
}

const BRANCH_COLORS: Record<string, string> = {
  wyckoff: "#22D3EE", elliott: "#A78BFA", risk: "#FACC15", macro: "#38BDF8",
  backtesting: "#2DD4BF", psychology: "#EC4899", liquidity: "#22D3EE",
  volume: "#F97316", bots: "#10B981", prop_firm: "#F59E0B",
}

export function TraderReputationPanel() {
  const reputation = useWorldProgressStore((s) => s.reputation) || {}

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Reputación por rama</p>
      <div className="grid gap-1">
        {Object.entries(reputation).map(([branch, value]) => (
          <div key={branch} className="flex items-center gap-2">
            <span className="w-20 truncate text-[9px] font-medium" style={{ color: BRANCH_COLORS[branch] || "#64748B" }}>
              {BRANCH_LABELS[branch] || branch}
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full transition-all" style={{
                width: `${Math.min(100, value)}%`,
                background: BRANCH_COLORS[branch] || "#64748B",
              }} />
            </div>
            <span className="w-8 text-right text-[8px] text-zinc-500">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
