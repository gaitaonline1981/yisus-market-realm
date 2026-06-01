"use client"

import { useGraphicsSettingsStore } from "@/stores/useGraphicsSettingsStore"
import { getDprForQuality, getMaxVisibleModels, shouldUseEnvironment } from "@/lib/mmorpg/graphicsQuality"

function btnClasses(active: boolean, color: string): string {
  return active
    ? `rounded-md border px-2.5 py-1 text-[9px] font-bold cursor-pointer transition`
    : `rounded-md border border-white/5 bg-white/[0.02] px-2.5 py-1 text-[9px] font-bold text-zinc-500 cursor-pointer transition hover:bg-white/5`
}

function btnStyle(active: boolean, color: string): React.CSSProperties | undefined {
  if (!active) return undefined
  return { borderColor: `${color}40`, background: `${color}15`, color }
}

export function GraphicsSettingsPanel() {
  const store = useGraphicsSettingsStore()

  const dpr = getDprForQuality(store.quality)
  const envEnabled = shouldUseEnvironment(store.quality, store.showEnvironment)
  const maxModels = getMaxVisibleModels(store.quality, store.maxVisibleWorldModels)

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Configuración gráfica</p>

      <div className="mb-2">
        <p className="mb-1 text-[9px] text-zinc-500">Calidad</p>
        <div className="flex gap-1">
          {(["low", "medium", "high"] as const).map((q) => {
            const active = store.quality === q
            const color = q === "low" ? "#F59E0B" : q === "medium" ? "#22D3EE" : "#10B981"
            return (
              <button key={q} onClick={() => store.setQuality(q)}
                className={btnClasses(active, color)}
                style={btnStyle(active, color)}
              >
                {q === "low" ? "Low" : q === "medium" ? "Medium" : "High"}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mb-2 grid gap-1 text-[10px]">
        <ToggleRow label="Environment" active={envEnabled} color="#22D3EE" onToggle={() => store.setShowEnvironment(!store.showEnvironment)} />
        <ToggleRow label="Shadows" active={store.showShadows} color="#F59E0B" onToggle={() => store.setShowShadows(!store.showShadows)} />
        <ToggleRow label="Grid" active={store.showGrid} color="#A78BFA" onToggle={() => store.setShowGrid(!store.showGrid)} />
        <ToggleRow label="Modelos mundo" active={store.showWorldStaticModels} color="#10B981" onToggle={() => store.setShowWorldStaticModels(!store.showWorldStaticModels)} />
      </div>

      <div className="mb-2 text-[9px] leading-relaxed text-zinc-600">
        DPR: {dpr[0]}x{dpr[1]} · Modelos: {maxModels} · Env: {envEnabled ? "sí" : "no"}
      </div>

      <button onClick={store.resetGraphicsSettings}
        className="w-full rounded-md border border-red-400/20 bg-red-400/5 px-2.5 py-1 text-[9px] font-bold text-red-400 transition hover:bg-red-400/10"
      >
        Reset gráficos
      </button>

      <p className="mt-1.5 text-[8px] italic text-zinc-600">
        Si los GLB cargan lento o el navegador se pone pesado, usá Low o Medium.
      </p>
    </div>
  )
}

function ToggleRow({ label, active, color, onToggle }: { label: string; active: boolean; color: string; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-zinc-400">{label}</span>
      <button onClick={onToggle}
        className="rounded-md border px-2.5 py-1 text-[9px] font-bold cursor-pointer transition"
        style={active ? { borderColor: `${color}40`, background: `${color}15`, color } : { borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", color: "#64748B" }}
      >
        {active ? "ON" : "OFF"}
      </button>
    </div>
  )
}
