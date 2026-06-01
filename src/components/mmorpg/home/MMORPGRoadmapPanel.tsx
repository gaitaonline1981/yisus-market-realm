"use client"

import { useState } from "react"

const ROADMAP = [
  { phase: 1, title: "Fundación visual", items: ["Personajes GLB integrados con PNG y fallback", "Monturas GLB con calibración de altura y rotación", "Showroom 3D por tipo (Personajes/Monturas/Maestros)", "Editor básico de personajes con partes y colores"], status: "done" },
  { phase: 2, title: "Mundo y zonas", items: ["World Scene con cámara, WASD y saltos de zona", "Zonas de trading con edificios, NPCs y rutas", "Mini mapa y panel de ubicación por zona", "Fast travel entre zonas del mundo"], status: "done" },
  { phase: 3, title: "Progreso trader", items: ["Skill tree con 10 ramas de trading real", "Inventario de items de trading coleccionables", "Logros automáticos con recompensas", "Rutina diaria con checklist de trader"], status: "done" },
  { phase: 4, title: "Educación", items: ["Lecciones de trading con requisitos y XP", "Quizzes por categoría con puntuación", "Escenarios simulados con decisiones y feedback", "Market replay con velas históricas"], status: "done" },
  { phase: 5, title: "Maestros NPC", items: ["10 maestros con PNG, GLB y data completa", "Ubicación en el mundo con interacción", "Diálogo con IA usando Gemini API", "Sistema de proximidad y selección"], status: "in_progress" },
  { phase: 6, title: "Multiplayer", items: ["Chat por canales (Global/Trade/Party/Whisper)", "Party system para hacer trading en grupo", "Presencia en mundo y lista de jugadores", "Voice chat con WebRTC"], status: "pending" },
  { phase: 7, title: "Persistencia", items: ["Save slots locales con todo el estado", "Cloud save con Supabase (schema listo)", "Migración entre dispositivos", "Perfil de jugador con rango y reputación"], status: "pending" },
]

const STATUS_LABELS: Record<string, string> = { done: "✅", in_progress: "🔄", pending: "⏳" }
const STATUS_COLORS: Record<string, string> = { done: "#10B981", in_progress: "#F59E0B", pending: "#64748B" }

export function MMORPGRoadmapPanel() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Roadmap</p>
      <p className="mb-3 text-[9px] italic text-zinc-500">Plan de desarrollo del MMORPG educativo.</p>

      <div className="grid gap-2">
        {ROADMAP.map((phase) => {
          const open = expanded === phase.phase
          const color = STATUS_COLORS[phase.status] || "#64748B"
          return (
            <div key={phase.phase} className="rounded-xl border bg-white/[0.02]"
              style={{ borderColor: open ? `${color}30` : "rgba(255,255,255,0.05)" }}
            >
              <button onClick={() => setExpanded(open ? null : phase.phase)}
                className="flex w-full items-center justify-between px-3 py-2 text-left transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold"
                    style={{ background: `${color}20`, color }}
                  >
                    {phase.phase}
                  </span>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-200">{phase.title}</p>
                    <p className="text-[8px] text-zinc-600">{phase.items.length} ítems · {phase.status === "done" ? "Completado" : phase.status === "in_progress" ? "En progreso" : "Pendiente"}</p>
                  </div>
                </div>
                <span className="text-sm">{STATUS_LABELS[phase.status] || "⏳"}</span>
              </button>
              {open && (
                <div className="border-t border-white/5 px-3 py-2">
                  <ul className="list-disc pl-4 text-[9px] text-zinc-400">
                    {phase.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
