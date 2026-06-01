"use client"

import { useNavigate } from "react-router-dom"

const COLORS: Record<string, string> = {
  cyan: "#22D3EE", violet: "#A78BFA", amber: "#F59E0B",
  fuchsia: "#EC4899", emerald: "#10B981", zinc: "#64748B",
}

interface Props { title: string; description: string; href: string; status: string; color: string }

export function MMORPGFeatureCard({ title, description, href, status, color }: Props) {
  const navigate = useNavigate()
  const c = COLORS[color] || "#22D3EE"
  const disabled = status === "Próximamente"

  return (
    <button onClick={() => !disabled && navigate(href)}
      className="group relative overflow-hidden rounded-2xl border bg-white/[0.03] p-4 text-left transition hover:shadow-[0_0_30px_rgba(34,211,238,0.06)] cursor-pointer"
      style={{
        borderColor: disabled ? "rgba(255,255,255,0.05)" : `${c}30`,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="mx-auto mt-10 h-32 w-32 rounded-full blur-[60px]" style={{ background: `${c}10` }} />
      </div>
      <div className="relative z-10">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">{title}</h3>
          <span className={`rounded-full px-2 py-0.5 text-[7px] font-bold uppercase tracking-wider ${
            disabled ? "bg-white/5 text-zinc-600" : "text-white"
          }`} style={{ background: disabled ? "" : `${c}20`, color: disabled ? "" : c }}>
            {status}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-zinc-500">{description}</p>
      </div>
    </button>
  )
}
