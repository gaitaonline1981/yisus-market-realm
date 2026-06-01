"use client"

interface Props { label: string; color?: string; size?: "sm" | "md" }

export function SkillBadge({ label, color = "#22D3EE", size = "sm" }: Props) {
  const dims = size === "sm" ? "px-1.5 py-0.5 text-[8px]" : "px-2 py-1 text-[9px]"

  return (
    <span className={`inline-block rounded font-bold uppercase tracking-wider ${dims}`}
      style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
    >
      {label}
    </span>
  )
}
