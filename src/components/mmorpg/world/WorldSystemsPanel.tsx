"use client"

import { useWorldSessionStore } from "@/stores/useWorldSessionStore"

export function WorldSystemsPanel() {
  const { worldViewMode, worldModelMode, useAnimatedPlayer, worldMountMode } = useWorldSessionStore()

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Sistemas del mundo</p>
      <div className="grid gap-1 text-[10px]">
        <Row label=" Vista" value={worldViewMode} color="#22D3EE" />
        <Row label=" Modelos" value={worldModelMode} color="#F59E0B" />
        <Row label=" Animado" value={useAnimatedPlayer ? "Sí" : "No"} color="#A78BFA" />
        <Row label=" Montura" value={worldMountMode} color="#10B981" />
      </div>
    </div>
  )
}

function Row({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-zinc-500">{label}</span>
      <span className="font-bold" style={{ color }}>{value}</span>
    </div>
  )
}
