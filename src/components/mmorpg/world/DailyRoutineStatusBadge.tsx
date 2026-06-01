"use client"

interface Props { status: "pending" | "completed" | "claimed" }

const STATUS_CONFIG = {
  pending: { label: "Pendiente", color: "#64748B" },
  completed: { label: "Listo", color: "#10B981" },
  claimed: { label: "Reclamado", color: "#22D3EE" },
}

export function DailyRoutineStatusBadge({ status }: Props) {
  const c = STATUS_CONFIG[status]
  return (
    <span className="rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider"
      style={{ background: `${c.color}15`, color: c.color, border: `1px solid ${c.color}30` }}
    >
      {c.label}
    </span>
  )
}
