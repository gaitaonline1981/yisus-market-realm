"use client"

interface Props { id: string; name: string; role: string; selected: boolean; onSelect: (id: string) => void; color?: string }

export function CharacterSelectorCard({ id, name, role, selected, onSelect, color = "#8B5CF6" }: Props) {
  return (
    <button onClick={() => onSelect(id)}
      className="w-full rounded-xl border p-3 text-left transition cursor-pointer"
      style={{
        borderColor: selected ? `${color}40` : "rgba(255,255,255,0.06)",
        background: selected ? `${color}10` : "rgba(255,255,255,0.02)",
      }}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-black"
          style={{ background: `${color}20`, color }}
        >
          {name[0]}
        </div>
        <div>
          <p className={`text-[11px] font-bold ${selected ? "text-white" : "text-zinc-300"}`}>{name}</p>
          <p className="text-[9px] text-zinc-500">{role}</p>
        </div>
      </div>
    </button>
  )
}
