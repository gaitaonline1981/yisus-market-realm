"use client"

import type { TradingAchievement } from "@/data/mmorpg/tradingAchievements"

interface Props { achievement: TradingAchievement; unlocked: boolean; onUnlock: () => void }

export function TradingAchievementCard({ achievement, unlocked, onUnlock }: Props) {
  return (
    <div className="rounded-xl border p-2.5"
      style={{
        borderColor: unlocked ? `${achievement.color}30` : "rgba(255,255,255,0.06)",
        background: unlocked ? `${achievement.color}06` : "rgba(255,255,255,0.02)",
        opacity: unlocked ? 1 : 0.5,
      }}
    >
      <div className="mb-1 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">{unlocked ? "🏆" : "🔒"}</span>
          <div>
            <p className={`text-[10px] font-bold ${unlocked ? "text-zinc-100" : "text-zinc-500"}`}>{achievement.name}</p>
            <p className="text-[8px] text-zinc-600">{achievement.category} · {achievement.difficulty}</p>
          </div>
        </div>
        <span className="text-[9px] font-bold text-amber-400">+{achievement.xpReward} XP</span>
      </div>

      <p className="text-[9px] text-zinc-500">{achievement.description}</p>

      {!unlocked && (
        <button onClick={onUnlock}
          className="mt-1 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[8px] font-bold text-cyan-400 transition hover:bg-cyan-400/20 cursor-pointer"
        >
          Desbloquear
        </button>
      )}
    </div>
  )
}
