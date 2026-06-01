"use client"

import { useNavigate } from "react-router-dom"
import { useRealmStore } from "@/stores/useRealmStore"

const NAV = [
  { path: "/realm", label: "Inicio", color: "#22D3EE" },
  { path: "/realm/characters", label: "Personajes", color: "#8B5CF6" },
  { path: "/realm/mounts", label: "Monturas", color: "#F59E0B" },
  { path: "/realm/world", label: "Mapa", color: "#10B981" },
  { path: "/realm/lab", label: "Lab", color: "#A78BFA" },
  { path: "/realm/missions", label: "Misiones", color: "#06B6D4" },
  { path: "/realm/market", label: "Mercado", color: "#F59E0B" },
  { path: "/realm/profile", label: "Perfil", color: "#EC4899" },
]

export function RealmHUD() {
  const navigate = useNavigate()
  const level = useRealmStore((s) => s.level) || 1
  const xp = useRealmStore((s) => s.xp) || 0

  return (
    <nav className="flex items-center gap-1 border-b border-white/5 bg-black/70 px-4 py-2 shadow-lg backdrop-blur-xl">
      <span className="mr-4 text-sm font-black tracking-wider text-cyan-400">REALM</span>
      <div className="flex items-center gap-0.5">
        {NAV.map((item) => (
          <button key={item.path} onClick={() => navigate(item.path)}
            className="rounded-lg px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500 transition hover:text-white cursor-pointer"
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-2 text-[10px]">
        <span className="text-zinc-600">Lv.{level}</span>
        <span className="text-cyan-400">{xp} XP</span>
        <button onClick={() => navigate("/mmorpg")}
          className="rounded-lg border border-violet-400/20 bg-violet-400/10 px-2 py-1 text-[9px] font-bold text-violet-300 transition hover:bg-violet-400/20 cursor-pointer"
        >
          MMORPG
        </button>
      </div>
    </nav>
  )
}
