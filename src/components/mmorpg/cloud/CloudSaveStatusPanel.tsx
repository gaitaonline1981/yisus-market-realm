"use client"

export function CloudSaveStatusPanel() {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Cloud Save</p>
      <p className="mb-2 text-[9px] italic text-zinc-500">Persistencia en la nube (próximamente).</p>

      <div className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-zinc-600" />
          <span className="text-[10px] text-zinc-500">Desconectado</span>
        </div>
        <p className="mt-1 text-[8px] text-zinc-600">La sincronización con Supabase estará disponible en futura actualización.</p>
      </div>

      <button disabled
        className="mt-2 w-full rounded-lg border border-white/5 bg-white/[0.02] px-2 py-1.5 text-[9px] text-zinc-600 cursor-not-allowed"
      >
        Conectar Supabase
      </button>
    </div>
  )
}
