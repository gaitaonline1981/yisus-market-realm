"use client"

import type { TradingSkillNode } from "@/data/mmorpg/tradingSkillTree"

const TIER_COLORS = ["#64748B", "#22D3EE", "#A78BFA", "#F59E0B"]

interface Props { node: TradingSkillNode; unlocked: boolean; canUnlock: boolean; onUnlock: () => void }

export function TradingSkillNodeCard({ node, unlocked, canUnlock, onUnlock }: Props) {
  return (
    <div className="rounded-lg border p-2"
      style={{
        borderColor: unlocked ? `${TIER_COLORS[node.tier - 1] || "#64748B"}30` : "rgba(255,255,255,0.05)",
        background: unlocked ? `${TIER_COLORS[node.tier - 1] || "#64748B"}08` : "rgba(255,255,255,0.02)",
        opacity: unlocked || canUnlock ? 1 : 0.4,
      }}
    >
      <div className="mb-0.5 flex items-center justify-between">
        <p className={`text-[9px] font-bold ${unlocked ? "text-zinc-200" : "text-zinc-500"}`}>{node.name}</p>
        <span className="text-[7px] font-bold uppercase tracking-wider" style={{ color: TIER_COLORS[node.tier - 1] || "#64748B" }}>
          T{node.tier}
        </span>
      </div>
      <p className="text-[8px] text-zinc-600">{node.description}</p>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-[7px] text-zinc-600">{node.tradingConcept}</span>
        {!unlocked && canUnlock && (
          <button onClick={onUnlock} className="rounded border px-1.5 py-0.5 text-[7px] font-bold transition cursor-pointer"
            style={{ borderColor: `${TIER_COLORS[node.tier - 1] || "#64748B"}40`, background: `${TIER_COLORS[node.tier - 1] || "#64748B"}15`, color: TIER_COLORS[node.tier - 1] || "#64748B" }}>
            Desbloquear
          </button>
        )}
      </div>
    </div>
  )
}
