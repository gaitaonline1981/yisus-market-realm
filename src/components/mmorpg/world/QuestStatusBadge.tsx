"use client"

interface Props {
  status: "available" | "active" | "completed"
}

const CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  available: { label: "Disponible", color: "#22D3EE", bg: "rgba(34,211,238,0.1)", border: "rgba(34,211,238,0.3)" },
  active: { label: "Activa", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)" },
  completed: { label: "Completada", color: "#10B981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)" },
}

export function QuestStatusBadge({ status }: Props) {
  const c = CONFIG[status]
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "2px 10px", borderRadius: 999, fontSize: 9, fontWeight: 700,
      textTransform: "uppercase", letterSpacing: 1,
      background: c.bg, color: c.color, border: `1px solid ${c.border}`,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.color }} />
      {c.label}
    </span>
  )
}
