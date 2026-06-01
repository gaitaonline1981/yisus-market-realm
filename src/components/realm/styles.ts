export const realmTheme = {
  bg: "#020408",
  bgCard: "rgba(255,255,255,0.02)",
  bgCardHover: "rgba(255,255,255,0.04)",
  border: "rgba(255,255,255,0.06)",
  borderHover: "rgba(47,199,201,0.2)",
  text: "#F1F5F9",
  textMuted: "#64748B",
  accent: "#2FC7C9",
  accentDim: "rgba(47,199,201,0.1)",
  purple: "#A78BFA",
  gold: "#F59E0B",
  red: "#EF4444",
  green: "#10B981",
  font: "Inter, system-ui, sans-serif",
  radius: 16,
  radiusSm: 12,
  radiusXs: 8,
}

export const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: `linear-gradient(180deg, ${realmTheme.bg} 0%, #0A0F1A 50%, ${realmTheme.bg} 100%)`,
  color: realmTheme.text,
  fontFamily: realmTheme.font,
}

export const sectionStyle: React.CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "0 24px",
}

export function cardStyle(hover = true): React.CSSProperties {
  return {
    padding: 20,
    borderRadius: realmTheme.radius,
    border: `1px solid ${realmTheme.border}`,
    background: realmTheme.bgCard,
    transition: "all 0.25s",
    cursor: hover ? "pointer" : "default",
  }
}
