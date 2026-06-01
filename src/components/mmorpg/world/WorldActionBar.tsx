"use client"

import { useTradingSkillTreeStore } from "@/stores/useTradingSkillTreeStore"

const SLOTS = [
  { key: "1", icon: "📈", skill: "wyckoff-basic", color: "#22D3EE" },
  { key: "2", icon: "〰️", skill: "elliott-basic", color: "#A78BFA" },
  { key: "3", icon: "🛡️", skill: "risk-basic", color: "#FACC15" },
  { key: "4", icon: "📊", skill: "macro-basic", color: "#38BDF8" },
  { key: "5", icon: "🔬", skill: "backtest-basic", color: "#2DD4BF" },
  { key: "6", icon: "💬", skill: "", color: "#F97316" },
]

export function WorldActionBar() {
  const unlockedSkillIds = useTradingSkillTreeStore((s) => s.unlockedSkillIds)

  return (
    <div className="flex items-center gap-1 rounded border border-white/5 bg-black/60 px-2 py-1.5 shadow-lg backdrop-blur-sm">
      {SLOTS.map((slot) => {
        const unlocked = !slot.skill || (unlockedSkillIds || []).includes(slot.skill)
        return (
          <div key={slot.key} className="flex flex-col items-center">
            <div className={`flex h-10 w-10 items-center justify-center rounded border text-base transition ${
              unlocked ? "border-white/10 bg-black/60 hover:bg-white/10" : "border-white/5 bg-black/30 opacity-40"
            }`}>
              <span>{slot.icon}</span>
            </div>
            <span className="mt-[1px] text-[7px] font-bold text-zinc-600">{slot.key}</span>
          </div>
        )
      })}
    </div>
  )
}
