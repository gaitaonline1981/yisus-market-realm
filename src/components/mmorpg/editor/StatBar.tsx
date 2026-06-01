type Props = {
  label: string
  value: number
  max?: number
  color?: string
}

export function StatBar({ label, value, max = 100, color = "#2FC7C9" }: Props) {
  const pct = Math.min(Math.max(value / max, 0), 1)
  const alpha = pct > 0.66 ? 1 : pct > 0.33 ? 0.75 : 0.5

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-400">{label}</span>
        <span className="font-mono font-bold" style={{ color }}>
          {value}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${pct * 100}%`,
            backgroundColor: color,
            opacity: alpha,
            boxShadow: `0 0 6px ${color}88`,
          }}
        />
      </div>
    </div>
  )
}
