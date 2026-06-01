"use client"

interface Props { onPrimary?: () => void; onSecondary?: () => void; primaryLabel?: string; secondaryLabel?: string }

export function ProfileActionButtons({ onPrimary, onSecondary, primaryLabel = "Editar", secondaryLabel = "Compartir" }: Props) {
  return (
    <div className="flex gap-1.5">
      {onPrimary && (
        <button onClick={onPrimary} className="flex-1 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-2 py-1.5 text-[9px] font-bold text-cyan-300 transition hover:bg-cyan-400/20 cursor-pointer">
          {primaryLabel}
        </button>
      )}
      {onSecondary && (
        <button onClick={onSecondary} className="flex-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-[9px] text-zinc-400 transition hover:bg-white/10 cursor-pointer">
          {secondaryLabel}
        </button>
      )}
    </div>
  )
}
