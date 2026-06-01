import { tradingMasters } from "@/data/mmorpg/tradingMasters"
import { MasterCard } from "@/components/mmorpg/cards/MasterCard"

export function MastersPage() {
  return (
    <main className="min-h-screen bg-zinc-950 p-4 text-white md:p-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-violet-300">
            Crypto Lunáticos MMORPG
          </p>
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tight text-white">
            Maestros del Trading
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
            Conocé a los 10 maestros que te enseñarán trading real: Wyckoff, Elliott Wave,
            teoría de Dow, value investing, especulación, macroeconomía, sistemas cuantitativos,
            gestión de riesgo, prop firms y psicología trader.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tradingMasters.map((master) => (
            <MasterCard key={master.id} master={master} />
          ))}
        </div>
      </section>
    </main>
  )
}
