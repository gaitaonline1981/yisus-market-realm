import { mounts } from "@/data/mmorpg/mounts";
import { MountCard } from "@/components/mmorpg/cards/MountCard";

export function MountsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 p-4 text-white md:p-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-amber-300">
            Crypto Lunáticos MMORPG
          </p>
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tight text-white">
            Monturas del Market Realm
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
            Diez monturas únicas — desde corceles nobles hasta dragones de velas — cada una
            con habilidades especiales que transforman tu forma de operar.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mounts.map((mount) => (
            <MountCard key={mount.id} mount={mount} />
          ))}
        </div>
      </section>
    </main>
  );
}
