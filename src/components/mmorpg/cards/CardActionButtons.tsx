"use client"

interface Props { onAction?: () => void; onSecondary?: () => void; actionLabel?: string; secondaryLabel?: string }

export function CardActionButtons({ onAction, onSecondary, actionLabel = "Ver más", secondaryLabel = "Cerrar" }: Props) {
  return (
    <div className="flex gap-1.5">
      {onAction && (
        <button onClick={onAction} className="flex-1 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-[9px] font-bold text-cyan-300 transition hover:bg-cyan-400/20 cursor-pointer">
          {actionLabel}
        </button>
      )}
      {onSecondary && (
        <button onClick={onSecondary} className="flex-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[9px] text-zinc-400 transition hover:bg-white/10 cursor-pointer">
          {secondaryLabel}
        </button>
      )}
    </div>
  )
}
