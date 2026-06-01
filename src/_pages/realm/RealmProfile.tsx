import { useNavigate } from "react-router-dom"
import { useRealmStore } from "@/stores/useRealmStore"
import { realmCharacters } from "@/data/realm/characters"
import { realmMounts } from "@/data/realm/mounts"
import { RealmHUD } from "@/components/realm/RealmHUD"
import { CharacterMountPreview } from "@/components/realm/CharacterMountPreview"
import { RealmStatsPanel } from "@/components/realm/RealmStatsPanel"

export function RealmProfile() {
  const navigate = useNavigate()
  const character = useRealmStore((s) => s.character)
  const mount = useRealmStore((s) => s.mount)
  const level = useRealmStore((s) => s.level) || 1
  const xp = useRealmStore((s) => s.xp) || 0
  const reputation = useRealmStore((s) => s.reputation) || {}

  const charData = realmCharacters.find((c) => c.id === character)
  const mountData = realmMounts.find((m) => m.id === mount)

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <RealmHUD />
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300">Perfil de jugador</p>
          <h1 className="text-2xl font-black text-white md:text-3xl">{charData?.name || "Sin personaje"}</h1>
          <p className="mt-1 text-sm text-zinc-500">Nivel {level} · {xp} XP</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Equipo actual</p>
            {charData && mountData && <CharacterMountPreview character={charData} mount={mountData} />}
            {!charData && <p className="text-sm text-zinc-600">No hay personaje seleccionado.</p>}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Estadísticas</p>
            <RealmStatsPanel />
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[9px] font-bold uppercase tracking-wider text-cyan-400">Nivel</p>
            <p className="mt-1 text-2xl font-black text-white">{level}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[9px] font-bold uppercase tracking-wider text-amber-400">Experiencia</p>
            <p className="mt-1 text-2xl font-black text-white">{xp}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[9px] font-bold uppercase tracking-wider text-violet-400">Reputación</p>
            <p className="mt-1 text-2xl font-black text-white">{Object.keys(reputation).length}</p>
          </div>
        </div>

        <button onClick={() => navigate("/realm")}
          className="mt-6 inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-zinc-400 transition hover:bg-white/10 hover:text-white cursor-pointer"
        >
          ← Volver al inicio
        </button>
      </section>
    </main>
  )
}
