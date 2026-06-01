import { useNavigate } from "react-router-dom";
import type { Character } from "@/types/mmorpg";
import { RarityBadge } from "./RarityBadge";
import { StatBar } from "./StatBar";

export function CharacterCard({ character }: { character: Character }) {
  const navigate = useNavigate();

  const mainStats = [
    { label: "Velocidad", value: character.stats.speed },
    { label: "Precisión", value: character.stats.precision },
    { label: "Control Riesgo", value: character.stats.riskControl },
  ];

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.06)]">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="mx-auto mt-10 h-32 w-32 rounded-full bg-cyan-400/10 blur-[60px]" />
      </div>

      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold text-white">{character.name}</p>
            <p className="truncate text-xs text-cyan-300">{character.title}</p>
          </div>
          <RarityBadge rarity={character.rarity} />
        </div>

        <div className="flex h-[160px] items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-black/50">
          {character.thumbnailUrl ? (
            <img src={character.thumbnailUrl} alt={character.name}
              className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : null}
          <div className={`flex h-20 w-20 items-center justify-center rounded-full bg-cyan-400/10 text-3xl font-black text-cyan-300 ${character.thumbnailUrl ? "hidden" : ""}`}>
            {character.name[0]}
          </div>
        </div>

        <p className="line-clamp-3 text-xs leading-relaxed text-zinc-500">
          {character.description}
        </p>

        <div className="flex gap-1.5">
          {character.colorPalette.slice(0, 5).map((c) => (
            <span
              key={c}
              className="h-5 w-5 rounded-full border border-white/10"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="space-y-2">
          {mainStats.map((stat) => (
            <StatBar key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate(`/mmorpg/characters/${character.id}`)}
            className="rounded-xl border border-violet-400/30 bg-violet-400/10 px-3 py-2 text-xs font-semibold text-violet-200 transition hover:bg-violet-400/20"
          >
            Ver ficha
          </button>
          <button
            onClick={() => navigate(`/mmorpg/editor?character=${character.id}`)}
            className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-400/20"
          >
            Usar en editor
          </button>
        </div>
      </div>
    </article>
  );
}
