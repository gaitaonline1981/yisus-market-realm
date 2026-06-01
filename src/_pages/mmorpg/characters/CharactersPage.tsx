import { characters } from "@/data/mmorpg/characters";
import { CharacterCard } from "@/components/mmorpg/cards/CharacterCard";

export function CharactersPage() {
  return (
    <main className="min-h-screen bg-zinc-950 p-4 text-white md:p-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300">
            Crypto Lunáticos MMORPG
          </p>
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tight text-white">
            Personajes del Market Realm
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
            Explorá los héroes del universo Yisus: scalpers, guardianes de riesgo,
            cazadores de liquidez, magos de ondas, mecánicos del mercado y couriers de señales.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </section>
    </main>
  );
}
