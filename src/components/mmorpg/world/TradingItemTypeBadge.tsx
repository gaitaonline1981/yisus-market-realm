"use client"

import type { TradingItemType } from "@/data/mmorpg/tradingItems"

const CONFIG: Record<TradingItemType, { label: string; color: string; bg: string; border: string }> = {
  badge: { label: "Badge", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)" },
  title: { label: "Título", color: "#EC4899", bg: "rgba(236,72,153,0.1)", border: "rgba(236,72,153,0.3)" },
  tool: { label: "Herramienta", color: "#22D3EE", bg: "rgba(34,211,238,0.1)", border: "rgba(34,211,238,0.3)" },
  module: { label: "Módulo", color: "#A78BFA", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.3)" },
  key: { label: "Llave", color: "#10B981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)" },
  report: { label: "Reporte", color: "#60A5FA", bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.3)" },
  blueprint: { label: "Blueprint", color: "#14B8A6", bg: "rgba(20,184,166,0.1)", border: "rgba(20,184,166,0.3)" },
  cosmetic: { label: "Cosmético", color: "#EC4899", bg: "rgba(236,72,153,0.1)", border: "rgba(236,72,153,0.3)" },
  access: { label: "Acceso", color: "#FBBF24", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.3)" },
}

interface Props { type: TradingItemType }

export function TradingItemTypeBadge({ type }: Props) {
  const c = CONFIG[type] || CONFIG.badge
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "1px 8px", borderRadius: 6, fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
      {c.label}
    </span>
  )
}
