import { useNavigate } from "react-router-dom";
import type { Mount } from "@/types/mmorpg";
import { RarityBadge } from "./RarityBadge";

export function MountCard({ mount }: { mount: Mount }) {
  const navigate = useNavigate();

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-amber-400/30 hover:shadow-[0_0_30px_rgba(251,191,36,0.06)]">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="mx-auto mt-10 h-32 w-32 rounded-full bg-amber-400/10 blur-[60px]" />
      </div>

      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold text-white">{mount.name}</p>
            <p className="truncate text-xs text-zinc-500">{mount.type}</p>
          </div>
          <RarityBadge rarity={mount.rarity} />
        </div>

        <div className="flex h-[160px] items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-black/50">
          {mount.thumbnailUrl ? (
            <img src={mount.thumbnailUrl} alt={mount.name}
              className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : null}
          <div className={`flex h-20 w-20 items-center justify-center rounded-full bg-amber-400/10 text-3xl font-black text-amber-300 ${mount.thumbnailUrl ? "hidden" : ""}`}>
            {mount.name[0]}
          </div>
        </div>

        <p className="line-clamp-3 text-xs leading-relaxed text-zinc-500">
          {mount.description}
        </p>

        <div className="rounded-2xl border border-white/5 bg-black/20 p-3">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-amber-300">
            Habilidad Especial
          </p>
          <p className="text-sm font-semibold text-white">{mount.specialAbility.name}</p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-500">
            {mount.specialAbility.tradingMeaning}
          </p>
        </div>

        <div className="flex gap-1.5">
          {mount.colorPalette.slice(0, 5).map((c) => (
            <span
              key={c}
              className="h-5 w-5 rounded-full border border-white/10"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate(`/mmorpg/mounts/${mount.id}`)}
            className="rounded-xl border border-violet-400/30 bg-violet-400/10 px-3 py-2 text-xs font-semibold text-violet-200 transition hover:bg-violet-400/20"
          >
            Ver ficha
          </button>
          <button
            onClick={() => navigate(`/mmorpg/editor?mount=${mount.id}`)}
            className="rounded-xl border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-xs font-semibold text-amber-200 transition hover:bg-amber-400/20"
          >
            Usar en editor
          </button>
        </div>
      </div>
    </article>
  );
}
