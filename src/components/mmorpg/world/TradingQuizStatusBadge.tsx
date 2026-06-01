"use client"

interface Props { status: "not_started" | "passed" | "failed" }

const C: Record<string, { label: string; color: string; bg: string; border: string }> = {
  not_started: { label: "Pendiente", color: "#64748B", bg: "rgba(100,116,139,0.1)", border: "rgba(100,116,139,0.3)" },
  passed: { label: "Aprobado", color: "#10B981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)" },
  failed: { label: "Reintentar", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)" },
}

export function TradingQuizStatusBadge({ status }: Props) {
  const c = C[status]
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 10px", borderRadius: 999, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.color }} />
      {c.label}
    </span>
  )
}
