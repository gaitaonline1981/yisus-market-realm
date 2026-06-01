import { useNavigate } from "react-router-dom";
import { mounts } from "@/data/mmorpg/mounts";

export function CompatibleMountsPanel({ mountIds }: { mountIds: string[] }) {
  const navigate = useNavigate();
  const filtered = mounts.filter((m) => mountIds.includes(m.id));

  return (
    <section className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <h2 className="mb-4 text-lg font-bold text-white">
        Monturas compatibles <span className="text-sm font-normal text-zinc-500">({filtered.length})</span>
      </h2>
      {filtered.length === 0 ? (
        <p className="text-xs italic text-zinc-600">No hay monturas compatibles</p>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {filtered.map((m) => {
            const gradient = `linear-gradient(135deg, ${m.colorPalette[0]}, ${m.colorPalette[1] ?? m.colorPalette[0]})`;
            return (
              <button
                key={m.id}
                onClick={() => navigate(`/mmorpg/mounts/${m.id}`)}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-center transition hover:bg-white/5"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-white"
                  style={{ background: gradient }}
                >
                  {m.name[0]}
                </div>
                <p className="text-[11px] font-semibold text-white">{m.name}</p>
                <p className="truncate text-[9px] text-zinc-500">{m.type}</p>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
