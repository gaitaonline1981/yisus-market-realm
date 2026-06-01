"use client"

interface Props {
  label: string
  onClick: () => void
  variant?: "default" | "quest" | "close"
}

const VARIANTS: Record<string, { border: string; bg: string; color: string; hoverBg: string }> = {
  default: { border: "rgba(34,211,238,0.3)", bg: "rgba(34,211,238,0.08)", color: "#22D3EE", hoverBg: "rgba(34,211,238,0.15)" },
  quest: { border: "rgba(245,158,11,0.3)", bg: "rgba(245,158,11,0.08)", color: "#F59E0B", hoverBg: "rgba(245,158,11,0.15)" },
  close: { border: "rgba(100,116,139,0.3)", bg: "rgba(100,116,139,0.08)", color: "#64748B", hoverBg: "rgba(100,116,139,0.15)" },
}

export function NpcDialogueChoice({ label, onClick, variant = "default" }: Props) {
  const v = VARIANTS[variant]
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", padding: "8px 14px", borderRadius: 8,
        border: `1px solid ${v.border}`, background: v.bg, color: v.color,
        fontSize: 11, fontWeight: 700, cursor: "pointer", textAlign: "left",
        transition: "all 0.15s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = v.hoverBg }}
      onMouseLeave={(e) => { e.currentTarget.style.background = v.bg }}
    >
      {label}
    </button>
  )
}
