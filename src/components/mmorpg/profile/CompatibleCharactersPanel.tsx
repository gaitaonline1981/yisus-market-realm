import { useNavigate } from "react-router-dom";
import { characters } from "@/data/mmorpg/characters";

export function CompatibleCharactersPanel({ characterIds }: { characterIds: string[] }) {
  const navigate = useNavigate();
  const filtered = characters.filter((c) => characterIds.includes(c.id));

  return (
    <section className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <h2 className="mb-4 text-lg font-bold text-white">
        Personajes compatibles <span className="text-sm font-normal text-zinc-500">({filtered.length})</span>
      </h2>
      {filtered.length === 0 ? (
        <p className="text-xs italic text-zinc-600">No hay personajes compatibles</p>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {filtered.map((c) => {
            const gradient = `linear-gradient(135deg, ${c.colorPalette[0]}, ${c.colorPalette[1] ?? c.colorPalette[0]})`;
            return (
              <button
                key={c.id}
                onClick={() => navigate(`/mmorpg/characters/${c.id}`)}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-center transition hover:bg-white/5"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-white"
                  style={{ background: gradient }}
                >
                  {c.name[0]}
                </div>
                <p className="text-[11px] font-semibold text-white">{c.name}</p>
                <p className="truncate text-[9px] text-zinc-500">{c.title}</p>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
