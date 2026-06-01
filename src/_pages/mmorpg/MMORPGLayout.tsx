import React from "react"
import { Link, Outlet, useLocation } from "react-router-dom"

const NAV = [
  { path: "/mmorpg/editor", label: "Editor", color: "#38BDF8" },
  { path: "/mmorpg/characters", label: "Personajes", color: "#22D3EE" },
  { path: "/mmorpg/mounts", label: "Monturas", color: "#F59E0B" },
  { path: "/mmorpg/masters", label: "Maestros", color: "#A78BFA" },
  { path: "/mmorpg/showroom", label: "Showroom", color: "#10B981" },
  { path: "/mmorpg/lab", label: "Lab", color: "#EC4899" },
  { path: "/mmorpg/world", label: "Mundo", color: "#22D3EE" },
]

export function MMORPGLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[#020408] text-[#F1F5F9]">
      <nav className="flex items-center gap-1 border-b border-white/5 bg-black/70 px-4 py-2 shadow-lg backdrop-blur-xl">
        <Link
          to="/mmorpg/editor"
          className="mr-4 text-sm font-black tracking-wider text-cyan-400 no-underline hover:text-cyan-300"
        >
          CRYPTO LUNÁTICOS
        </Link>
        <div className="flex items-center gap-0.5">
          {NAV.map((item) => {
            const active = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className="rounded-lg px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider no-underline transition"
                style={{
                  color: active ? item.color : "#64748B",
                  background: active ? `${item.color}15` : "transparent",
                  boxShadow: active ? `0 0 12px ${item.color}10` : "none",
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/" className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500 no-underline transition hover:bg-white/10 hover:text-zinc-300">
            Terminal
          </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}
