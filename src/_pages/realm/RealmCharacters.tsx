import { useNavigate } from "react-router-dom"
import { RealmHUD } from "@/components/realm/RealmHUD"
import { realmCharacters } from "@/data/realm/characters"

export function RealmCharacters() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <RealmHUD />
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300">Personajes</p>
          <h1 className="text-2xl font-black text-white md:text-3xl">Héroes del Market Realm</h1>
          <p className="mt-1 text-sm text-zinc-500">Cada personaje representa una estrategia de trading.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {realmCharacters.map((c) => (
            <div key={c.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-400/30">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-sm font-black text-cyan-300">{c.name[0]}</div>
                <div>
                  <p className="text-sm font-bold text-white">{c.name}</p>
                  <p className="text-[10px] text-zinc-500">{c.role}</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-zinc-400">{c.description}</p>
            </div>
          ))}
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
