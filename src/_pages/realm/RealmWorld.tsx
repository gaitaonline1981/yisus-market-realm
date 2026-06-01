import { useNavigate } from "react-router-dom"
import { RealmHUD } from "@/components/realm/RealmHUD"
import { realmWorldZones } from "@/data/realm/world-zones"

const ZONE_COLORS: Record<string, string> = {
  "central-hub": "#38BDF8", "liquidity-lake": "#22D3EE", "candle-volcano": "#F97316",
  "macro-observatory": "#A78BFA", "mechanic-lab": "#2DD4BF", "risk-citadel": "#FACC15",
}

export function RealmWorld() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <RealmHUD />
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-300">Mapa del mundo</p>
          <h1 className="text-2xl font-black text-white md:text-3xl">Market Realm</h1>
          <p className="mt-1 text-sm text-zinc-500">Las 6 zonas del mundo de trading educativo.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {realmWorldZones.filter(z => z.id !== "unknown").map((zone) => {
            const color = ZONE_COLORS[zone.id] || "#22D3EE"
            return (
              <div key={zone.id} className="rounded-2xl border bg-white/[0.03] p-5 transition hover:border-cyan-400/30"
                style={{ borderColor: `${color}30` }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ background: color }} />
                  <h3 className="text-sm font-bold text-white">{zone.name}</h3>
                </div>
                <p className="mb-2 text-xs leading-relaxed text-zinc-400">{zone.description}</p>
                <div className="rounded-xl border border-white/5 bg-black/20 px-3 py-2">
                  <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color }}>NPCs</p>
                  <p className="text-[10px] text-zinc-500">{zone.npcIds?.join(", ") || "—"}</p>
                </div>
              </div>
            )
          })}
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
