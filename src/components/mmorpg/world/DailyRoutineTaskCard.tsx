"use client"

import type { DailyTask } from "@/stores/useDailyTradingRoutineStore"

interface Props { task: DailyTask; onToggle?: () => void }

const STATUS_STYLES: Record<string, { color: string; label: string }> = {
  pending: { color: "#64748B", label: "Pendiente" },
  completed: { color: "#10B981", label: "✅ Listo" },
  claimed: { color: "#22D3EE", label: "🏆 Reclamado" },
}

export function DailyRoutineTaskCard({ task, onToggle }: Props) {
  const st = STATUS_STYLES[task.status] || STATUS_STYLES.pending

  return (
    <div className="rounded-lg border p-2" style={{ borderColor: `${st.color}20`, background: `${st.color}06` }}>
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[9px] font-bold text-zinc-200">{task.title}</p>
          <p className="text-[8px] text-zinc-500">{task.description}</p>
        </div>
        <span className="shrink-0 text-[8px] font-bold" style={{ color: st.color }}>{st.label}</span>
      </div>
      <p className="mt-0.5 text-[7px] text-zinc-600">+{task.xpReward} XP</p>
    </div>
  )
}
