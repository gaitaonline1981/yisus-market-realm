"use client"

import { useDailyTradingRoutineStore } from "@/stores/useDailyTradingRoutineStore"
import { DailyRoutineTaskCard } from "./DailyRoutineTaskCard"

export function DailyTradingRoutinePanel() {
  const s = useDailyTradingRoutineStore()
  const tasks = s.tasks || []
  const xpEarned = s.xpEarned || 0
  const claimXp = s.claimXp
  const canClaimXp = s.canClaimXp
  const resetDaily = s.resetDaily

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Rutina diaria</p>
      <p className="mb-3 text-[9px] italic text-zinc-500">Tareas diarias para mantener tu disciplina trader.</p>

      <div className="grid gap-1.5">
        {tasks.map((task) => (
          <DailyRoutineTaskCard key={task.id} task={task} />
        ))}
      </div>

      {canClaimXp && (
        <button onClick={claimXp}
          className="mt-2 w-full rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-1.5 text-[9px] font-bold text-cyan-400 transition hover:bg-cyan-400/20 cursor-pointer"
        >
          Reclamar {xpEarned} XP
        </button>
      )}

      <button onClick={resetDaily}
        className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[8px] text-zinc-500 transition hover:bg-white/10 cursor-pointer"
      >
        Reset diario
      </button>
    </div>
  )
}
