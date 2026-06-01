"use client"

interface Props {
  calibrated: boolean
}

export function CalibrationStatusBadge({ calibrated }: Props) {
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
        background: calibrated ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
        color: calibrated ? "#10B981" : "#F59E0B",
        border: `1px solid ${calibrated ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)"}`,
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: calibrated ? "#10B981" : "#F59E0B",
        }}
      />
      {calibrated ? "Calibrado" : "Pendiente"}
    </span>
  )
}
