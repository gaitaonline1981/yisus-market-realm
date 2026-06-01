import { realmTheme } from "@/components/realm/styles"

const RARITY_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  common: { color: "#94A3B8", bg: "#94A3B820", border: "#94A3B840" },
  rare: { color: "#3B82F6", bg: "#3B82F620", border: "#3B82F640" },
  epic: { color: "#8B5CF6", bg: "#8B5CF620", border: "#8B5CF640" },
  legendary: { color: "#F59E0B", bg: "#F59E0B20", border: "#F59E0B40" },
  mythic: { color: "#EF4444", bg: "#EF444420", border: "#EF444440" },
  institutional: { color: "#2FC7C9", bg: "#2FC7C920", border: "#2FC7C940" },
  lunatic: { color: "#EC4899", bg: "#EC489920", border: "#EC489940" },
}

interface Props {
  rarity: string
  size?: "sm" | "md" | "lg"
}

export function RealmRarityBadge({ rarity, size = "sm" }: Props) {
  const cfg = RARITY_CONFIG[rarity] || RARITY_CONFIG.common
  const sizes = {
    sm: { fontSize: 9, padding: "1px 8px" },
    md: { fontSize: 10, padding: "2px 10px" },
    lg: { fontSize: 11, padding: "3px 14px" },
  }
  const s = sizes[size]

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: s.padding,
        borderRadius: 999,
        fontSize: s.fontSize,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 1.2,
        background: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.color }} />
      {rarity}
    </div>
  )
}
