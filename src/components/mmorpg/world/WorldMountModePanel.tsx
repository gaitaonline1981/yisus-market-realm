"use client"

interface Props {
  worldMountMode: "on-foot" | "companion" | "mounted"
  onChangeMode: (mode: "on-foot" | "companion" | "mounted") => void
  selectedCharacterName?: string
  selectedMountName?: string
}

const MODES: { id: "on-foot" | "companion" | "mounted"; label: string; icon: string; color: string }[] = [
  { id: "on-foot", label: "A pie", icon: "🚶", color: "#22D3EE" },
  { id: "companion", label: "Compañero", icon: "🐉", color: "#F59E0B" },
  { id: "mounted", label: "Montado", icon: "🧑‍🐉", color: "#A78BFA" },
]

export function WorldMountModePanel({ worldMountMode, onChangeMode, selectedCharacterName, selectedMountName }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Modo montura</p>
      <div className="flex gap-1">
        {MODES.map((mode) => {
          const active = worldMountMode === mode.id
          return (
            <button key={mode.id} onClick={() => onChangeMode(mode.id)}
              className="flex-1 rounded-lg border px-2 py-1.5 text-center text-[9px] font-bold uppercase tracking-wider transition cursor-pointer"
              style={{
                borderColor: active ? `${mode.color}40` : "rgba(255,255,255,0.06)",
                background: active ? `${mode.color}15` : "rgba(255,255,255,0.02)",
                color: active ? mode.color : "#64748B",
              }}
            >
              <span className="text-sm">{mode.icon}</span>
              <span className="block text-[8px]">{mode.label}</span>
            </button>
          )
        })}
      </div>
      <p className="mt-1 text-[8px] text-zinc-600">
        {selectedCharacterName} {worldMountMode !== "on-foot" && selectedMountName ? `+ ${selectedMountName}` : ""}
      </p>
    </div>
  )
}
