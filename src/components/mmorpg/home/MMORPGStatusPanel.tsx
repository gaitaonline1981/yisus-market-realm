"use client"

import { tradingMasters } from "@/data/mmorpg/tradingMasters"
import { characters } from "@/data/mmorpg/characters"
import { mounts } from "@/data/mmorpg/mounts"
import { worldZones } from "@/data/mmorpg/worldZones"
import { tradingLessons } from "@/data/mmorpg/tradingLessons"
import { tradingAchievements } from "@/data/mmorpg/tradingAchievements"

const CATS = [
  { label: "Personajes", count: characters.length, color: "#22D3EE", href: "/mmorpg/characters" },
  { label: "Monturas", count: mounts.length, color: "#F59E0B", href: "/mmorpg/mounts" },
  { label: "Maestros", count: tradingMasters.length, color: "#A78BFA", href: "/mmorpg/masters" },
  { label: "Zonas", count: worldZones.filter(z => z.id !== "unknown").length, color: "#38BDF8", href: "/mmorpg/world" },
  { label: "Lecciones", count: tradingLessons.length, color: "#2DD4BF", href: "/mmorpg/lab" },
  { label: "Logros", count: tradingAchievements.length, color: "#10B981", href: "/mmorpg/lab" },
]

export function MMORPGStatusPanel() {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Estado del proyecto</p>
      <div className="grid grid-cols-3 gap-2">
        {CATS.map((cat) => (
          <a key={cat.label} href={cat.href}
            className="flex flex-col items-center gap-1 rounded-xl border border-white/5 bg-white/[0.02] px-2 py-3 text-center transition hover:bg-white/5 no-underline"
          >
            <span className="text-lg font-black" style={{ color: cat.color }}>{cat.count}</span>
            <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-500">{cat.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
