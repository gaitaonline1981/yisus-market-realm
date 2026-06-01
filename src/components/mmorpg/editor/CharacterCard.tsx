"use client"

interface Props { name: string; title: string; color?: string; onSelect?: () => void }

export function CharacterCard({ name, title, color = "#22D3EE", onSelect }: Props) {
  return (
    <button onClick={onSelect}
      className="flex items-center gap-2 rounded-xl border bg-white/[0.02] px-3 py-2 text-left transition hover:bg-white/5 cursor-pointer"
      style={{ borderColor: `${color}20` }}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-black" style={{ background: `${color}20`, color }}>
        {name[0]}
      </div>
      <div>
        <p className="text-[11px] font-bold text-zinc-200">{name}</p>
        <p className="text-[9px] text-zinc-500">{title}</p>
      </div>
    </button>
  )
}
