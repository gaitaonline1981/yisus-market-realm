"use client"

import type { BlueprintStatus } from "@/data/mmorpg/worldBlueprint"

const CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  planned: { label: "Planificado", color: "#A78BFA", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.3)" },
  prototype: { label: "Prototipo", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)" },
  available: { label: "Disponible", color: "#10B981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)" },
  built: { label: "Construido", color: "#22D3EE", bg: "rgba(34,211,238,0.1)", border: "rgba(34,211,238,0.3)" },
}

export function WorldBlueprintStatusBadge({ status }: { status: BlueprintStatus }) {
  const c = CONFIG[status] || CONFIG.planned
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
      style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}
    >
      <span className="h-1 w-1 rounded-full" style={{ background: c.color }} />
      {c.label}
    </span>
  )
}
