import { useParams, useNavigate, Link } from "react-router-dom"
import { mounts } from "@/data/mmorpg/mounts"
import { RarityBadge } from "@/components/mmorpg/cards/RarityBadge"
import { ColorPalettePanel } from "@/components/mmorpg/profile/ColorPalettePanel"
import { CompatibleCharactersPanel } from "@/components/mmorpg/profile/CompatibleCharactersPanel"

export function MountProfilePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const mount = mounts.find((m) => m.id === id)

  if (!mount) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="text-center">
          <p className="text-6xl opacity-20">{'\u{1F40E}'}</p>
          <p className="mt-4 text-lg font-semibold text-zinc-500">Montura no encontrada</p>
          <button onClick={() => navigate("/mmorpg/mounts")} className="mt-4 rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/5">
            Volver a monturas
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-4 text-white md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <Link to="/mmorpg/mounts" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-zinc-300">
          &larr; Volver a monturas
        </Link>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900/60 to-black p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-amber-400/10 text-4xl font-black text-amber-300">
                {mount.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-black md:text-3xl">{mount.name}</h1>
                  <RarityBadge rarity={mount.rarity} />
                </div>
                <p className="mt-1 text-sm text-zinc-400">{mount.type}</p>
                <p className="mt-2 max-w-2xl text-xs leading-relaxed text-zinc-500">{mount.description}</p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/mmorpg/editor?mount=${mount.id}`)}
              className="rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-xs font-semibold text-amber-200 transition hover:bg-amber-400/20"
            >
              Usar en editor
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <h2 className="mb-4 text-lg font-bold text-white">Habilidad especial</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-amber-300">{mount.specialAbility.name}</p>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-zinc-400">
                  <p><span className="font-medium text-zinc-300">Efecto visual: </span>{mount.specialAbility.visualEffect}</p>
                  <p><span className="font-medium text-zinc-300">Gameplay: </span>{mount.specialAbility.gameplayEffect}</p>
                  <p><span className="font-medium text-zinc-300">Significado trading: </span>{mount.specialAbility.tradingMeaning}</p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-4">
            <ColorPalettePanel colors={mount.colorPalette} />
            <CompatibleCharactersPanel characterIds={mount.compatibleCharacterIds} />
          </div>
        </div>
      </div>
    </main>
  )
}
