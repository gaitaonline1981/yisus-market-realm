import { useNavigate } from "react-router-dom"
import { RealmHUD } from "@/components/realm/RealmHUD"
import { realmMounts } from "@/data/realm/mounts"

export function RealmMounts() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <RealmHUD />
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-amber-300">Monturas</p>
          <h1 className="text-2xl font-black text-white md:text-3xl">Monturas del Market Realm</h1>
          <p className="mt-1 text-sm text-zinc-500">Cada montura está ligada a un estilo de mercado.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {realmMounts.map((m) => (
            <div key={m.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-amber-400/30">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 text-sm font-black text-amber-300">{m.name[0]}</div>
                <div>
                  <p className="text-sm font-bold text-white">{m.name}</p>
                  <p className="text-[10px] text-zinc-500">{m.type}</p>
                </div>
              </div>
              <p className="mb-2 text-xs leading-relaxed text-zinc-400">{m.description}</p>
              <p className="text-[10px] italic text-cyan-300">{m.specialAbility?.tradingMeaning || ""}</p>
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
