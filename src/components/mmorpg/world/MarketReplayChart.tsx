"use client"

import type { MarketReplayCandle } from "@/data/mmorpg/marketReplays"

interface Props { candles: MarketReplayCandle[]; currentIndex: number; decisionPointIndexes?: number[]; pendingIndex?: number }

export function MarketReplayChart({ candles = [], currentIndex = 0, decisionPointIndexes, pendingIndex }: Props) {
  const visible = candles.slice(0, Math.min(currentIndex + 1, candles.length))
  const w = 480; const h = 200; const padX = 30; const padY = 10; const chartH = h - 50
  const candleW = Math.max(3, Math.min(8, ((w - padX * 2) / candles.length) * 0.6))
  const maxP = Math.max(...visible.map((c) => c.high)); const minP = Math.min(...visible.map((c) => c.low)); const range = maxP - minP || 1; const maxV = Math.max(...visible.map((c) => c.volume), 1)
  const scaleY = (p: number) => padY + chartH - ((p - minP) / range) * chartH

  return (
    <div style={{ width: "100%", maxWidth: 500, marginBottom: 8 }}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h, background: "rgba(5,5,15,0.6)", borderRadius: 8 }}>
        {visible.map((c) => {
          const x = padX + (c.index / candles.length) * (w - padX * 2)
          const isUp = c.close >= c.open; const color = isUp ? "#10B981" : "#EF4444"
          const isDp = decisionPointIndexes?.includes(c.index)
          const isPend = pendingIndex === c.index
          return (
            <g key={c.index}>
              <line x1={x} y1={scaleY(c.high)} x2={x} y2={scaleY(c.low)} stroke={color} strokeWidth={1} />
              <rect x={x - candleW / 2} y={scaleY(Math.max(c.open, c.close))} width={candleW} height={Math.max(1, scaleY(Math.min(c.open, c.close)) - scaleY(Math.max(c.open, c.close)))} fill={color} rx={1} />
              <rect x={x - candleW / 2} y={h - 30} width={candleW} height={Math.max(2, (c.volume / maxV) * 30)} fill={color} opacity={0.3} rx={1} />
              {isDp && <circle cx={x} cy={padY - 3} r={4} fill={isPend ? "#F59E0B" : "#22D3EE"} />}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
