"use client"

interface Props { name: string; rarity: string; type: string; color?: string }

const RARITY_COLORS: Record<string, string> = { common: "#94A3B8", rare: "#3B82F6", epic: "#8B5CF6", legendary: "#F59E0B", institutional: "#2FC7C9" }

export function ItemCard({ name, rarity, type, color }: Props) {
  const c = color || RARITY_COLORS[rarity] || "#64748B"

  return (
    <div className="rounded-xl border bg-white/[0.02] p-2.5" style={{ borderColor: `${c}30` }}>
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black" style={{ background: `${c}20`, color: c }}>
          {name[0]}
        </div>
        <div>
          <p className="text-[11px] font-bold text-zinc-200">{name}</p>
          <div className="flex gap-1 text-[8px]">
            <span className="font-bold uppercase tracking-wider" style={{ color: c }}>{rarity}</span>
            <span className="text-zinc-600">{type}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
