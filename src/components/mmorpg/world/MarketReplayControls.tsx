"use client"

interface Props { onPlay?: () => void; onPause?: () => void; onReset?: () => void }

export function MarketReplayControls({ onPlay, onPause, onReset }: Props) {
  return (
    <div className="flex gap-1">
      <button onClick={onPlay} className="flex-1 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-[9px] font-bold text-cyan-400 transition hover:bg-cyan-400/20 cursor-pointer">▶ Play</button>
      <button onClick={onPause} className="flex-1 rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-1 text-[9px] font-bold text-amber-400 transition hover:bg-amber-400/20 cursor-pointer">⏸ Pause</button>
      <button onClick={onReset} className="flex-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[9px] text-zinc-400 transition hover:bg-white/10 cursor-pointer">↺ Reset</button>
    </div>
  )
}
