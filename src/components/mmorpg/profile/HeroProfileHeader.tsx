"use client"

interface Props { name: string; title: string; level: number; xp: number; color?: string }

export function HeroProfileHeader({ name, title, level, xp, color = "#22D3EE" }: Props) {
  return (
    <div className="rounded-2xl border bg-white/[0.03] p-4" style={{ borderColor: `${color}30` }}>
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-black" style={{ background: `${color}20`, color }}>
          {name[0]}
        </div>
        <div>
          <p className="text-lg font-black text-white">{name}</p>
          <p className="text-xs text-zinc-500">{title}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-sm font-black" style={{ color }}>Lv.{level}</p>
          <p className="text-[10px] text-zinc-500">{xp} XP</p>
        </div>
      </div>
    </div>
  )
}
