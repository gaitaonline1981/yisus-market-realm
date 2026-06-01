import { useNavigate } from "react-router-dom"
import { RealmHUD } from "@/components/realm/RealmHUD"

const MISSIONS = [
  { id: "wyckoff-1", title: "Primera estructura", desc: "Identificá acumulación en el gráfico.", zone: "Liquidity Lake", xp: 50, color: "#22D3EE" },
  { id: "elliott-1", title: "Ondas básicas", desc: "Contá 5 ondas en un movimiento.", zone: "Macro Observatory", xp: 50, color: "#A78BFA" },
  { id: "risk-1", title: "Stop loss", desc: "Definí un stop loss antes de operar.", zone: "Risk Citadel", xp: 50, color: "#FACC15" },
  { id: "macro-1", title: "Contexto macro", desc: "Revisá el calendario económico.", zone: "Macro Observatory", xp: 50, color: "#38BDF8" },
]

export function RealmMissions() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <RealmHUD />
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300">Misiones</p>
          <h1 className="text-2xl font-black text-white md:text-3xl">Misiones del Market Realm</h1>
          <p className="mt-1 text-sm text-zinc-500">Completá misiones para ganar XP y desbloquear contenido.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {MISSIONS.map((m) => (
            <div key={m.id} className="rounded-2xl border bg-white/[0.03] p-4" style={{ borderColor: `${m.color}30` }}>
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-sm font-bold text-white">{m.title}</h3>
                <span className="rounded px-2 py-0.5 text-[9px] font-bold" style={{ background: `${m.color}20`, color: m.color }}>+{m.xp} XP</span>
              </div>
              <p className="mb-1 text-xs text-zinc-400">{m.desc}</p>
              <p className="text-[10px] text-zinc-600">📍 {m.zone}</p>
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
