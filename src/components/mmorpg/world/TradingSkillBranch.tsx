"use client"

import type { TradingSkillBranch as TBranch } from "@/data/mmorpg/tradingSkillTree"

interface Props { branch: TBranch; children: React.ReactNode }

export function TradingSkillBranch({ branch, children }: Props) {
  return (
    <div className="rounded-xl border bg-white/[0.02] p-2.5" style={{ borderColor: `${branch.color}20` }}>
      <div className="mb-1.5 flex items-center gap-2">
        <span className="rounded px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider" style={{ background: `${branch.color}20`, color: branch.color }}>
          {branch.iconLabel}
        </span>
        <p className="text-[10px] font-bold" style={{ color: branch.color }}>{branch.name}</p>
      </div>
      <p className="mb-2 text-[8px] text-zinc-500">{branch.tradingFocus}</p>
      <div className="grid gap-1">{children}</div>
    </div>
  )
}
