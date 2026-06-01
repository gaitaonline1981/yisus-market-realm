import { getMasterAsset } from "@/data/mmorpg/masterAssets"
import type { TradingMaster } from "@/data/mmorpg/tradingMasters"

const ZONE_COLORS: Record<string, string> = {
  "central-hub": "#38BDF8", "liquidity-lake": "#22D3EE", "candle-volcano": "#F97316",
  "macro-observatory": "#A78BFA", "mechanic-lab": "#2DD4BF", "risk-citadel": "#FACC15",
}

const ZONE_NAMES: Record<string, string> = {
  "central-hub": "Central Hub", "liquidity-lake": "Liquidity Lake", "candle-volcano": "Candle Volcano",
  "macro-observatory": "Macro Observatory", "mechanic-lab": "Mechanic Lab", "risk-citadel": "Risk Citadel",
}

export function MasterCard({ master }: { master: TradingMaster }) {
  const asset = getMasterAsset(master.id)

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-violet-400/30 hover:shadow-[0_0_30px_rgba(167,139,250,0.06)]">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="mx-auto mt-10 h-32 w-32 rounded-full bg-violet-400/10 blur-[60px]" />
      </div>

      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold text-white">{master.name}</p>
            <p className="truncate text-xs text-violet-300">{master.alias}</p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider text-zinc-500">{master.type === "historical_homage" ? "Histórico" : master.type === "inspired_archetype" ? "Arquetipo" : "Original"}</span>
        </div>

        <div className="flex h-[160px] items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-black/50">
          {asset?.pngPath ? (
            <img src={asset.pngPath} alt={master.name}
              className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : null}
          <div className={`flex h-20 w-20 items-center justify-center rounded-full bg-violet-400/10 text-3xl font-black text-violet-300 ${asset?.pngPath ? "hidden" : ""}`}>
            {master.name[0]}
          </div>
        </div>

        <p className="line-clamp-3 text-xs leading-relaxed text-zinc-500">
          {master.description}
        </p>

        <div className="rounded-2xl border border-white/5 bg-black/20 p-3">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-violet-300">Frase Icónica</p>
          <p className="text-sm font-semibold italic text-violet-200">"{master.iconicPhrase}"</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider" style={{ color: ZONE_COLORS[master.zoneId] || "#22D3EE" }}>
            {ZONE_NAMES[master.zoneId] || master.zoneId}
          </span>
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider text-zinc-500">{master.specialty}</span>
          <span className={`ml-auto text-[8px] font-bold uppercase tracking-wider ${asset?.hasGlb ? "text-emerald-400" : "text-amber-400"}`}>
            {asset?.hasGlb ? "GLB" : "Placeholder"}
          </span>
        </div>
      </div>
    </article>
  )
}
