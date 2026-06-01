"use client"

import { useMemo } from "react"
import { mounts } from "@/data/mmorpg/mounts"
import { getMountOffset } from "@/lib/mmorpg/mounting"

interface Props { mountId: string; characterId?: string }

export function MountingPreviewPanel({ mountId, characterId }: Props) {
  const mount = mounts.find((m) => m.id === mountId)
  const offset = useMemo(() => getMountOffset(mountId), [mountId])

  if (!mount) return <div className="text-[10px] text-zinc-600">Montura no encontrada</div>

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Preview: {mount.name}</p>
      <p className="mb-2 text-[9px] text-zinc-500">{mount.type}</p>

      <div className="space-y-1 text-[9px] font-mono">
        <p className="text-zinc-600">Char pos: [{offset.characterPosition.join(", ")}]</p>
        <p className="text-zinc-600">Char scale: [{offset.characterScale.join(", ")}]</p>
        <p className="text-zinc-600">Mount pos: [{offset.mountPosition.join(", ")}]</p>
        <p className="text-zinc-600">Mount scale: [{offset.mountScale.join(", ")}]</p>
      </div>
      {characterId && <p className="mt-1 text-[8px] text-cyan-400">Personaje: {characterId}</p>}
    </div>
  )
}
