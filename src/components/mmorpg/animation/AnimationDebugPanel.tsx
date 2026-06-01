"use client"

interface Props { previewMode: string; requestedAnimation?: string; availableAnimations?: string[]; riggedModelUrl?: string | null; staticModelUrl?: string; entityName?: string }

export function AnimationDebugPanel({ previewMode, requestedAnimation, availableAnimations, riggedModelUrl, staticModelUrl, entityName }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Debug Animación</p>
      <div className="space-y-1 text-[9px]">
        <Row label="Entidad" value={entityName || "—"} />
        <Row label="Preview" value={previewMode} />
        <Row label="Animación" value={requestedAnimation || "—"} />
        <Row label="Clips" value={availableAnimations?.join(", ") || "—"} />
        <Row label="Rigged URL" value={riggedModelUrl || "—"} />
        <Row label="Static URL" value={staticModelUrl || "—"} />
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-zinc-500">{label}</span>
      <span className="max-w-[140px] truncate text-right text-zinc-300">{value}</span>
    </div>
  )
}
