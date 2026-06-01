"use client"

import { marketReplays } from "@/data/mmorpg/marketReplays"
import { useMarketReplayStore } from "@/stores/useMarketReplayStore"

export function MarketReplayCard() {
  const selectedId = useMarketReplayStore((s) => s.selectedReplayId)
  const select = useMarketReplayStore((s) => s.selectReplay)

  return (
    <div className="grid gap-1">
      {marketReplays.map((replay) => {
        const active = selectedId === replay.id
        return (
          <button key={replay.id} onClick={() => select(replay.id)}
            className="w-full rounded-lg border px-2 py-1.5 text-left text-[9px] transition cursor-pointer"
            style={{
              borderColor: active ? "rgba(34,211,238,0.3)" : "rgba(255,255,255,0.05)",
              background: active ? "rgba(34,211,238,0.08)" : "rgba(255,255,255,0.02)",
              color: active ? "#22D3EE" : "#64748B",
            }}
          >
            <p className="font-bold">{replay.title}</p>
            <p className="text-[8px]">{replay.symbol} · {replay.timeframe}</p>
          </button>
        )
      })}
    </div>
  )
}
