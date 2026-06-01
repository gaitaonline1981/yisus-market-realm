"use client"

import { tradingSkillBranches, tradingSkillNodes } from "@/data/mmorpg/tradingSkillTree"
import { useTradingSkillTreeStore } from "@/stores/useTradingSkillTreeStore"
import { TradingSkillNodeCard } from "./TradingSkillNodeCard"

export function TradingSkillTreePanel() {
  const unlockedIds = useTradingSkillTreeStore((s) => s.unlockedSkillIds)
  const unlockSkill = useTradingSkillTreeStore((s) => s.unlockSkill)

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Árbol de habilidades</p>
      <p className="mb-3 text-[9px] italic text-zinc-500">Skills de trading para desbloquear.</p>

      <div className="grid gap-3">
        {tradingSkillBranches.map((branch) => {
          const branchNodes = tradingSkillNodes.filter((n) => n.branchId === branch.id)
          return (
            <div key={branch.id} className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
              <p className="mb-1 text-[10px] font-bold" style={{ color: branch.color }}>{branch.name}</p>
              <div className="grid gap-1">
                {branchNodes.map((node) => (
                  <TradingSkillNodeCard
                    key={node.id}
                    node={node}
                    unlocked={unlockedIds.includes(node.id)}
                    canUnlock={node.requiredQuestIds?.every((req) => unlockedIds.includes(req)) ?? true}
                    onUnlock={() => unlockSkill(node.id)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
