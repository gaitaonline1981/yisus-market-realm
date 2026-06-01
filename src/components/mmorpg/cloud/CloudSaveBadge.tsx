"use client"

interface Props {
  status: "local_only" | "pending_sync" | "synced" | "sync_error"
}

const CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  local_only: { label: "Local only", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)" },
  pending_sync: { label: "Pending sync", color: "#22D3EE", bg: "rgba(34,211,238,0.1)", border: "rgba(34,211,238,0.3)" },
  synced: { label: "Synced", color: "#10B981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)" },
  sync_error: { label: "Sync error", color: "#EF4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)" },
}

export function CloudSaveBadge({ status }: Props) {
  const cfg = CONFIG[status] || CONFIG.local_only
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 10px",
        borderRadius: 999,
        fontSize: 10,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 1,
        background: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.color }} />
      {cfg.label}
    </span>
  )
}
