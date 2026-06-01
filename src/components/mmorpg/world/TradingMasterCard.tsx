"use client"

import type { TradingMaster } from "@/data/mmorpg/tradingMasters"

const ZONE_COLORS: Record<string, string> = {
  "central-hub": "#38BDF8", "liquidity-lake": "#22D3EE", "candle-volcano": "#F97316",
  "macro-observatory": "#A78BFA", "mechanic-lab": "#2DD4BF", "risk-citadel": "#FACC15",
}

interface Props { master: TradingMaster; active?: boolean; compact?: boolean }

export function TradingMasterCard({ master, active, compact }: Props) {
  const color = ZONE_COLORS[master.zoneId] || "#22D3EE"

  return (
    <div className="rounded-xl border p-3 transition cursor-pointer hover:bg-white/5"
      style={{
        borderColor: active ? `${color}40` : "rgba(255,255,255,0.06)",
        background: active ? `${color}10` : "rgba(255,255,255,0.02)",
      }}
    >
      <div className="mb-1 flex items-start justify-between">
        <div>
          <p className={`text-[11px] font-bold ${active ? "text-white" : "text-zinc-200"}`}>{master.name}</p>
          <p className="text-[8px] italic text-zinc-500">{master.alias}</p>
        </div>
        <span className="rounded px-1.5 py-0.5 text-[7px] font-bold uppercase" style={{ background: `${color}20`, color }}>{master.specialty}</span>
      </div>

      {!compact && (
        <>
          <p className="mb-1 line-clamp-2 text-[9px] leading-relaxed text-zinc-500">{master.description}</p>
          <p className="mb-1 text-[8px] italic text-amber-300/70">"{master.iconicPhrase}"</p>
        </>
      )}

      <div className="text-[8px] text-zinc-600">
        <span style={{ color }}>{master.zoneId}</span> · {master.buildingId}
      </div>
    </div>
  )
}
