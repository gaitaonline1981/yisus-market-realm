import React from "react"
import { characters } from "@/data/mmorpg/characters"
import { RARITY_CONFIG } from "@/data/mmorpg/rarities"

type Props = { selectedId: string; onSelect: (id: string) => void }

export function CharacterSelector({ selectedId, onSelect }: Props) {
  return (
    <div>
      <div className="mb-2.5 text-[13px] font-bold uppercase tracking-wider text-zinc-100">Personajes</div>
      <div className="flex flex-col gap-1.5">
        {characters.map((c) => {
          const selected = c.id === selectedId
          const rarityColor = RARITY_CONFIG[c.rarity]?.color ?? "#8B5CF6"
          return (
            <button key={c.id} onClick={() => onSelect(c.id)}
              className="flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left transition cursor-pointer"
              style={{
                borderColor: selected ? `${rarityColor}40` : "rgba(255,255,255,0.06)",
                background: selected ? `${rarityColor}10` : "rgba(255,255,255,0.02)",
              }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md text-xs font-black"
                style={{ background: `${rarityColor}20`, color: rarityColor }}
              >
                {c.name[0]}
              </div>
              <div>
                <p className={`text-[11px] font-bold ${selected ? "text-white" : "text-zinc-300"}`}>{c.name}</p>
                <p className="text-[9px] text-zinc-500">{c.title}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
