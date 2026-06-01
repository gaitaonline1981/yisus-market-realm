"use client"

interface Props { mountId: string; name: string; type: string; description: string; color?: string }

export function MountPreviewPanel({ name, type, description, color = "#F59E0B" }: Props) {
  return (
    <div className="rounded-2xl border bg-white/[0.03] p-4" style={{ borderColor: `${color}30` }}>
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black" style={{ background: `${color}20`, color }}>{name[0]}</div>
        <div>
          <p className="text-sm font-bold text-white">{name}</p>
          <p className="text-[10px] text-zinc-500">{type}</p>
        </div>
      </div>
      <p className="text-xs leading-relaxed text-zinc-400">{description}</p>
    </div>
  )
}
