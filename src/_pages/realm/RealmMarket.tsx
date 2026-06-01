import { useNavigate } from "react-router-dom"
import { RealmHUD } from "@/components/realm/RealmHUD"

const ITEMS = [
  { name: "Poción de Liquidez", price: 50, color: "#22D3EE" },
  { name: "Amuleto del Riesgo", price: 100, color: "#FACC15" },
  { name: "Mapa del Tesoro", price: 200, color: "#F59E0B" },
]

export function RealmMarket() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <RealmHUD />
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-amber-300">Mercado</p>
          <h1 className="text-2xl font-black text-white md:text-3xl">Marketplace del Realm</h1>
          <p className="mt-1 text-sm text-zinc-500">Items, skins y monturas exclusivas.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <div key={item.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-400/30">
              <h3 className="text-sm font-bold text-white">{item.name}</h3>
              <p className="mt-1 text-lg font-black" style={{ color: item.color }}>{item.price} 🪙</p>
              <button className="mt-2 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300 transition hover:bg-cyan-400/20 cursor-pointer">
                Comprar
              </button>
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
