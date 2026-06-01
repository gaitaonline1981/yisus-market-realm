"use client"

interface Props { riggedModelUrl?: string | null; animationClips?: string[] }

export function TickerRiggingPilotPanel({ riggedModelUrl, animationClips }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Rigging Pilot</p>
      <p className="mb-2 text-[9px] italic text-zinc-500">Panel de prueba para el modelo riggeado de Ticker.</p>

      <div className="space-y-1 text-[9px]">
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">Modelo riggeado</span>
          <span className={riggedModelUrl ? "text-emerald-400 font-bold" : "text-amber-400"}>{riggedModelUrl ? "✅ Cargado" : "❌ No encontrado"}</span>
        </div>
        {animationClips && (
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">Clips</span>
            <span className="text-cyan-400">{animationClips.length}</span>
          </div>
        )}
      </div>
    </div>
  )
}
