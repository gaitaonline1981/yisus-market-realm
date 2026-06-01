"use client"

interface Props { characterId: string; name: string; description: string; color?: string }

export function CharacterPreviewPanel({ name, description, color = "#8B5CF6" }: Props) {
  return (
    <div className="rounded-2xl border bg-white/[0.03] p-4" style={{ borderColor: `${color}30` }}>
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black" style={{ background: `${color}20`, color }}>{name[0]}</div>
        <p className="text-sm font-bold text-white">{name}</p>
      </div>
      <p className="text-xs leading-relaxed text-zinc-400">{description}</p>
    </div>
  )
}
