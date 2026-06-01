"use client"

import { tradingSkillBranches } from "@/data/mmorpg/tradingSkillTree"

const BRANCH_COLORS: Record<string, string> = {
  risk: "#FACC15", liquidity: "#22D3EE", volume: "#EF4444", wyckoff: "#A78BFA",
  elliott: "#C084FC", macro: "#60A5FA", bots: "#2DD4BF", backtesting: "#14B8A6",
  prop_firm: "#F59E0B", psychology: "#EC4899",
}

export function SkillsPanel() {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Ramas de skill</p>
      <div className="grid gap-2">
        {tradingSkillBranches.map((branch) => {
          const color = BRANCH_COLORS[branch.id] || "#22D3EE"
          return (
            <div key={branch.id} className="rounded-xl border bg-white/[0.02] p-2.5"
              style={{ borderColor: `${color}20` }}
            >
              <p className="mb-0.5 text-[10px] font-bold" style={{ color }}>{branch.name}</p>
              <p className="text-[8px] text-zinc-500">{branch.tradingFocus}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
