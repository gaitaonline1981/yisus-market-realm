"use client"

import { characters } from "@/data/mmorpg/characters"
import { mounts } from "@/data/mmorpg/mounts"

interface Props { characterId: string; mountId?: string }

export function LorePanel({ characterId, mountId }: Props) {
  const character = characters.find((c) => c.id === characterId)
  const mount = mounts.find((m) => m.id === mountId)

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      {character && (
        <div className="mb-4">
          <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-cyan-400">Lore del personaje</p>
          <p className="text-[11px] leading-relaxed text-zinc-400">{character.description}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {character.colorPalette.map((c) => (
              <span key={c} className="h-3 w-3 rounded-full border border-white/10" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      )}
      {mount && (
        <div>
          <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-amber-400">Lore de la montura</p>
          <p className="text-[11px] leading-relaxed text-zinc-400">{mount.description}</p>
          <p className="mt-1 text-[9px] italic text-cyan-300">{mount.specialAbility.tradingMeaning}</p>
        </div>
      )}
    </div>
  )
}
