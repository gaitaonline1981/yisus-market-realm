"use client"

import { useWorldProgressStore } from "@/stores/useWorldProgressStore"
import { getQuestById } from "@/data/mmorpg/worldQuests"

export function WorldProgressPanel() {
  const xp = useWorldProgressStore((s) => s.xp)
  const titles = useWorldProgressStore((s) => s.titles)
  const activeQuestId = useWorldProgressStore((s) => s.activeQuestId)
  const completedCount = useWorldProgressStore((s) => s.getCompletedCount())
  const totalQuests = useWorldProgressStore((s) => s.getTotalQuests())
  const resetProgress = useWorldProgressStore((s) => s.resetProgress)

  const activeQuest = activeQuestId ? getQuestById(activeQuestId) : null
  const xpInLevel = xp % 1000
  const xpMax = 1000

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Progreso</p>

      <div className="mb-2 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-all" style={{ width: `${(xpInLevel / xpMax) * 100}%` }} />
      </div>
      <div className="mb-3 flex justify-between text-[9px] text-zinc-500">
        <span>XP {xp}</span>
        <span>{xpInLevel}/{xpMax}</span>
      </div>

      <div className="mb-2 grid grid-cols-2 gap-1 text-[10px]">
        <div className="rounded-lg border border-white/5 bg-white/[0.02] px-2 py-1.5">
          <p className="text-zinc-500">Misiones</p>
          <p className="font-bold text-violet-300">{completedCount}/{totalQuests}</p>
        </div>
        <div className="rounded-lg border border-white/5 bg-white/[0.02] px-2 py-1.5">
          <p className="text-zinc-500">Títulos</p>
          <p className="font-bold text-amber-400">{titles.length}</p>
        </div>
      </div>

      {activeQuest && (
        <div className="mb-2 rounded-lg border border-amber-400/20 bg-amber-400/5 px-2 py-1.5">
          <p className="text-[8px] font-bold uppercase tracking-wider text-amber-400">Misión activa</p>
          <p className="text-[11px] font-bold text-zinc-200">{activeQuest.title}</p>
        </div>
      )}

      <button onClick={resetProgress}
        className="w-full rounded-md border border-red-400/20 bg-red-400/5 px-2 py-1 text-[9px] font-bold text-red-400 transition hover:bg-red-400/10 cursor-pointer"
      >
        Reset progreso
      </button>
    </div>
  )
}
