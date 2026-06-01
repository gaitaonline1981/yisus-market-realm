import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getMountById } from "@/data/mmorpg/mounts"
import { characters } from "@/data/mmorpg/characters"
import { rarityStyles } from "@/lib/mmorpg/rarityStyles"
import { RarityBadge } from "@/components/mmorpg/cards/RarityBadge"

export function MountDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const mount = getMountById(id ?? "")

  if (!mount) {
    return (
      <div className="p-10 text-center text-zinc-400">
        Montura no encontrada
      </div>
    )
  }

  const compatibleChars = characters.filter((c) => mount.compatibleCharacterIds.includes(c.id))
  const rarityStyle = rarityStyles[mount.rarity] || {}
  if (rarityStyle) {} // used for future styling

  return (
    <main className="min-h-screen bg-zinc-950 p-4 text-white md:p-8">
      <div className="mx-auto max-w-5xl">
        <button onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-zinc-400 transition hover:bg-white/10 hover:text-white cursor-pointer"
        >
          ← Volver
        </button>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <h1 className="text-2xl font-black text-white">{mount.name}</h1>
              <RarityBadge rarity={mount.rarity} />
            </div>
            <p className="mb-2 text-xs text-zinc-500">{mount.type}</p>
            <p className="mb-4 text-sm leading-relaxed text-zinc-400">{mount.description}</p>

            <div className="mb-4 rounded-2xl border border-white/10 bg-black/30 p-4">
              <h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-amber-300">Habilidad especial</h3>
              <p className="mb-1 text-sm font-bold text-white">{mount.specialAbility.name}</p>
              <p className="mb-1 text-xs leading-relaxed text-zinc-400">{mount.specialAbility.visualEffect}</p>
              <p className="text-xs leading-relaxed text-zinc-500">{mount.specialAbility.gameplayEffect}</p>
              <p className="mt-1 text-[10px] italic text-cyan-300">{mount.specialAbility.tradingMeaning}</p>
            </div>

            <div className="mb-4 flex gap-1.5">
              {mount.colorPalette.map((c) => (
                <span key={c} className="h-6 w-6 rounded-full border border-white/10" style={{ backgroundColor: c }} />
              ))}
            </div>

            <div className="mb-4 rounded-2xl border border-white/10 bg-black/30 p-4">
              <h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Compatibilidad</h3>
              <div className="flex flex-wrap gap-2">
                {compatibleChars.map((c) => {
                  const isCompatible = mount.compatibleCharacterIds.includes(c.id)
                  return (
                    <span key={c.id} className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition ${isCompatible ? "bg-emerald-400/10 text-emerald-300" : "bg-white/5 text-zinc-600"}`}>
                      {c.name}
                    </span>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button onClick={() => navigate(`/mmorpg/editor?mount=${mount.id}`)}
                className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-bold text-cyan-300 transition hover:bg-cyan-400/20 cursor-pointer"
              >
                Usar en editor
              </button>
              <button onClick={() => navigate(`/mmorpg/showroom?type=mount&id=${mount.id}`)}
                className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-bold text-amber-300 transition hover:bg-amber-400/20 cursor-pointer"
              >
                Ver en showroom
              </button>
            </div>
          </div>

          <div className="flex items-start justify-center">
            <div className="flex h-[300px] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-black/50 md:h-[400px]">
              {mount.thumbnailUrl ? (
                <img src={mount.thumbnailUrl} alt={mount.name} className="h-full w-full object-contain p-4" />
              ) : (
                <span className="text-4xl font-black text-zinc-700">{mount.name[0]}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
