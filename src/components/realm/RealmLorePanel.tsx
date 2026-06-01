"use client"

interface Props { title: string; description: string; origin: string; color?: string }

export function RealmLorePanel({ title, description, origin, color = "#22D3EE" }: Props) {
  return (
    <div className="rounded-2xl border bg-white/[0.03] p-4" style={{ borderColor: `${color}30` }}>
      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color }}>{title}</p>
      <p className="mb-2 text-xs leading-relaxed text-zinc-400">{description}</p>
      <p className="text-[10px] italic text-zinc-600">Origen: {origin}</p>
    </div>
  )
}
