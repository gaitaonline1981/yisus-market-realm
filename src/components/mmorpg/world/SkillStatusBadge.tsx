"use client"

interface Props { status: "locked" | "available" | "unlocked" }

const C: Record<string, { label: string; color: string; bg: string; border: string }> = {
  locked: { label: "Bloqueada", color: "#64748B", bg: "rgba(100,116,139,0.1)", border: "rgba(100,116,139,0.3)" },
  available: { label: "Disponible", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)" },
  unlocked: { label: "Desbloqueada", color: "#10B981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)" },
}

export function SkillStatusBadge({ status }: Props) {
  const c = C[status]
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 999, fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
      <span style={{ width: 4, height: 4, borderRadius: "50%", background: c.color }} />
      {c.label}
    </span>
  )
}
