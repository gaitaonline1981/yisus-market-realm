"use client"

export function CloudMigrationPanel() {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Migración a la nube</p>
      <p className="mb-2 text-[9px] italic text-zinc-500">Preparación para sincronizar datos con Supabase.</p>
      <div className="space-y-1 text-[9px]">
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">Estado</span>
          <span className="text-amber-400">Pendiente</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">Schema</span>
          <span className="text-emerald-400">✅ Listo</span>
        </div>
      </div>
      <button disabled className="mt-2 w-full rounded-lg border border-white/5 bg-white/[0.02] px-2 py-1.5 text-[9px] text-zinc-600 cursor-not-allowed">
        Iniciar migración
      </button>
    </div>
  )
}
