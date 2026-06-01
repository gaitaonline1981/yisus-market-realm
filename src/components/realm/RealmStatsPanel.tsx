"use client"

import { useRealmStore } from "@/stores/useRealmStore"

export function RealmStatsPanel() {
  const level = useRealmStore((s) => s.level) || 1
  const xp = useRealmStore((s) => s.xp) || 0
  const reputation = useRealmStore((s) => s.reputation) || {}
  const completed = Object.values(reputation).filter((v) => v > 0).length

  return (
    <div className="space-y-2 text-[10px]">
      <Row label="Nivel" value={level.toString()} color="#22D3EE" />
      <Row label="XP" value={xp.toString()} color="#22D3EE" />
      <Row label="Reputación" value={completed.toString()} color="#F59E0B" />
      <Row label="Estado" value="Activo" color="#10B981" />
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
