"use client"

export function WorldQuestPanel({ zoneId, onActivateZone }: { zoneId?: string | null; onActivateZone: (id: string) => void }) {
  return (
    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
      <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-cyan-400">Misión de zona</p>
      <p className="text-[11px] leading-relaxed text-zinc-400">
        {zoneId
          ? `Explorá las misiones disponibles en la zona actual.`
          : `Acercate a una zona del mundo para ver sus misiones.`}
      </p>
    </div>
  )
}
