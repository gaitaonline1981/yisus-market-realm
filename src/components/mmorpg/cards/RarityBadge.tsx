import type { Rarity } from "@/types/mmorpg";

const RARITY_CONFIG: Record<Rarity, { label: string; color: string }> = {
  common: { label: "Común", color: "zinc" },
  rare: { label: "Raro", color: "sky" },
  epic: { label: "Épico", color: "violet" },
  legendary: { label: "Legendario", color: "amber" },
  mythic: { label: "Mítico", color: "rose" },
  institutional: { label: "Institucional", color: "cyan" },
  lunatic: { label: "Lunático", color: "fuchsia" },
};

const COLOR_MAP: Record<string, string> = {
  zinc: "border-zinc-500/30 bg-zinc-500/10 text-zinc-300",
  sky: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  violet: "border-violet-400/30 bg-violet-400/10 text-violet-300",
  amber: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  rose: "border-rose-400/30 bg-rose-400/10 text-rose-300",
  cyan: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
  fuchsia: "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-300",
};

export function RarityBadge({ rarity }: { rarity: Rarity }) {
  const config = RARITY_CONFIG[rarity];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
        COLOR_MAP[config?.color] ?? "border-zinc-500/30 bg-zinc-500/10 text-zinc-400"
      }`}
    >
      {config?.label ?? rarity}
    </span>
  );
}
