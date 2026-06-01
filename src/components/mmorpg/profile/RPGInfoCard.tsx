"use client"

interface Props { label: string; value: string; color?: string }

export function RPGInfoCard({ label, value, color = "#22D3EE" }: Props) {
  return (
    <div className="rounded-xl border bg-white/[0.02] px-3 py-2" style={{ borderColor: `${color}20` }}>
      <p className="text-[8px] font-bold uppercase tracking-wider text-zinc-600">{label}</p>
      <p className="text-sm font-bold text-white">{value}</p>
    </div>
  )
}
