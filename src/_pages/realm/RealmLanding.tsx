import { useNavigate } from "react-router-dom"
import { RealmHUD } from "@/components/realm/RealmHUD"
import { CharacterMountPreview } from "@/components/realm/CharacterMountPreview"
import { useRealmStore } from "@/stores/useRealmStore"
import { realmCharacters } from "@/data/realm/characters"
import { realmMounts } from "@/data/realm/mounts"
import { realmWorldZones } from "@/data/realm/world-zones"

const MAIN_FEATURES = [
  { icon: "⚔️", title: "Personajes", desc: "8 héroes del mercado con habilidades únicas, rarezas y lore propio", path: "/realm/characters", color: "#8B5CF6" },
  { icon: "🐉", title: "Monturas", desc: "10 criaturas del Market Realm para desplazarte con estilo", path: "/realm/mounts", color: "#F59E0B" },
  { icon: "🗺️", title: "Mapa del Mundo", desc: "Explorá zonas, descubrí secretos y conquistá el reino", path: "/realm/world", color: "#10B981" },
  { icon: "🧪", title: "Laboratorio IA", desc: "Agentes NPC que te ayudan a analizar, crear y optimizar", path: "/realm/lab", color: "#A78BFA" },
  { icon: "📜", title: "Misiones", desc: "Completá misiones, ganá XP y desbloqueá contenido exclusivo", path: "/realm/missions", color: "#06B6D4" },
  { icon: "🏪", title: "Mercado", desc: "Marketplace interno con skins, monturas e ítems especiales", path: "/realm/market", color: "#F59E0B" },
]

const SECTIONS = [
  { icon: "📊", title: "Trading + Fantasía", desc: "Cada personaje representa una estrategia de trading convertida en héroe del Market Realm." },
  { icon: "🤖", title: "Agentes IA como NPCs", desc: "Los agentes IA son habitantes del mundo. Te guían, analizan y te ayudan a progresar." },
  { icon: "🌐", title: "Comunidad y Progresión", desc: "Nivel, experiencia, logros, misiones y un mercado interno conectado al ecosistema Yisus." },
]

export function RealmLanding() {
  const navigate = useNavigate()
  const { characterId, mountId } = useRealmStore()
  const character = realmCharacters.find((c) => c.id === characterId)
  const mount = realmMounts.find((m) => m.id === mountId)

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <RealmHUD />

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-10 text-center">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300">Crypto Lunáticos</p>
          <h1 className="text-[clamp(2rem,6vw,4rem)] font-black tracking-tight">
            <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">Market Realm</span>
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-zinc-500">
            MMORPG educativo de trading donde los héroes, monturas y tierras están inspirados en los mercados financieros reales.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MAIN_FEATURES.map((f) => (
            <button key={f.title} onClick={() => navigate(f.path)}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.06)] cursor-pointer"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="mx-auto mt-10 h-32 w-32 rounded-full bg-cyan-400/10 blur-[60px]" />
              </div>
              <div className="relative z-10">
                <span className="text-2xl">{f.icon}</span>
                <h3 style={{ color: f.color }} className="mb-1 mt-2 text-sm font-bold">{f.title}</h3>
                <p className="text-xs leading-relaxed text-zinc-500">{f.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {character && mount && (
          <div className="mt-8">
            <CharacterMountPreview character={character} mount={mount} />
          </div>
        )}

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {SECTIONS.map((s) => (
            <div key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
              <span className="text-3xl">{s.icon}</span>
              <h3 className="mb-1 mt-2 text-sm font-bold text-white">{s.title}</h3>
              <p className="text-xs leading-relaxed text-zinc-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
