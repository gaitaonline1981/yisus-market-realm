import { useParams, useNavigate, Link } from "react-router-dom"
import { characters } from "@/data/mmorpg/characters"
import { RarityBadge } from "@/components/mmorpg/cards/RarityBadge"
import { StatsPanel } from "@/components/mmorpg/profile/StatsPanel"
import { ColorPalettePanel } from "@/components/mmorpg/profile/ColorPalettePanel"
import { EquippedPartsPanel } from "@/components/mmorpg/profile/EquippedPartsPanel"
import { CompatibleMountsPanel } from "@/components/mmorpg/profile/CompatibleMountsPanel"

const ROLE_DESCRIPTIONS: Record<string, string> = {
  scalper_pilot: "Entradas rápidas, precisión quirúrgica y cero apego emocional al trade.",
  risk_manager_knight: "Protege el capital, controla el drawdown y opera con defensa.",
  liquidity_hunter: "Caza zonas de liquidez, detecta trampas y opera en los mejores niveles.",
  macro_explorer: "Lee ciclos, noticias, correlaciones y el contexto global del mercado.",
  volume_berserker: "Detecta volumen anormal, rupturas confirmadas y presión compradora/vendedora.",
  wave_reader_mage: "Interpreta ondas, fractales, impulsos y correcciones del mercado.",
  market_mechanic: "Repara bots, ajusta sistemas y optimiza estrategias técnicas.",
  courier_trader: "Entrega señales, mapas, rutas y tokens dentro del Market Realm.",
}

export function CharacterProfilePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const character = characters.find((c) => c.id === id)

  if (!character) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="text-center">
          <p className="text-6xl opacity-20">{'\u{1F9D9}'}</p>
          <p className="mt-4 text-lg font-semibold text-zinc-500">Personaje no encontrado</p>
          <button onClick={() => navigate("/mmorpg/characters")} className="mt-4 rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/5">
            Volver a personajes
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-4 text-white md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <Link to="/mmorpg/characters" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-zinc-300">
          &larr; Volver a personajes
        </Link>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900/60 to-black p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-cyan-400/10 text-4xl font-black text-cyan-300">
                {character.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-black md:text-3xl">{character.name}</h1>
                  <RarityBadge rarity={character.rarity} />
                </div>
                <p className="mt-1 text-sm text-cyan-300">{character.title}</p>
                <p className="mt-2 max-w-2xl text-xs leading-relaxed text-zinc-500">{character.description}</p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/mmorpg/editor?character=${character.id}`)}
              className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-400/20"
            >
              Usar en editor
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <h2 className="mb-4 text-lg font-bold text-white">Identidad</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-zinc-500">Rol: </span>
                  <span className="text-cyan-300">{character.role.replace(/_/g, " ")}</span>
                </div>
                <div>
                  <span className="text-zinc-500">Filosofía: </span>
                  <span className="text-zinc-300">{ROLE_DESCRIPTIONS[character.role] ?? "—"}</span>
                </div>
                <div>
                  <span className="text-zinc-500">Rareza: </span>
                  <span className="capitalize text-zinc-300">{character.rarity}</span>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-4">
            <StatsPanel stats={character.stats} />
            <ColorPalettePanel colors={character.colorPalette} />
            <EquippedPartsPanel parts={character.defaultParts} />
            <CompatibleMountsPanel mountIds={character.compatibleMountIds} />
          </div>
        </div>
      </div>
    </main>
  )
}
