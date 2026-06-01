"use client"

import { tradingMasters } from "@/data/mmorpg/tradingMasters"
import { TradingMasterTypeBadge } from "./TradingMasterTypeBadge"

interface Props { masterId?: string | null; onClear?: () => void }

const ZONE_COLORS: Record<string, string> = {
  "central-hub": "#38BDF8", "liquidity-lake": "#22D3EE", "candle-volcano": "#F97316",
  "macro-observatory": "#A78BFA", "mechanic-lab": "#2DD4BF", "risk-citadel": "#FACC15",
}

export function TradingMasterInfoPanel({ masterId, onClear }: Props) {
  if (!masterId) return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center text-[10px] text-zinc-500">
      Seleccioná un maestro para ver su perfil educativo.
    </div>
  )

  const m = tradingMasters.find((x) => x.id === masterId)
  if (!m) return null

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="text-sm font-black text-zinc-100">{m.name}</div>
          <div className="text-[10px] italic text-zinc-500">"{m.alias}"</div>
        </div>
        <button onClick={onClear} className="cursor-pointer border-none bg-transparent p-0 text-lg text-zinc-500 hover:text-zinc-300">✕</button>
      </div>

      <div className="mb-3 flex flex-wrap gap-1">
        <TradingMasterTypeBadge type={m.type} />
        <span className="rounded-md bg-cyan-400/10 px-2 py-0.5 text-[8px] font-bold text-cyan-400">{m.specialty}</span>
        <span className="rounded-md bg-white/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-zinc-500">{m.title}</span>
      </div>

      <p className="mb-2 text-[11px] leading-relaxed text-zinc-400">{m.description}</p>

      <div className="mb-1 text-[10px] leading-relaxed text-cyan-300/80">
        <span className="font-bold text-cyan-400">Concepto:</span> {m.tradingConcept}
      </div>

      <div className="mb-2 text-[10px] leading-relaxed text-violet-300/80">
        <span className="font-bold text-violet-400">Rol:</span> {m.teachingRole}
      </div>

      <div className="mb-2 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2 text-center text-[11px] italic leading-relaxed text-amber-300/80">
        "{m.iconicPhrase}"
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-zinc-500"
          style={{ borderColor: `${ZONE_COLORS[m.zoneId] || "#22D3EE"}40`, color: ZONE_COLORS[m.zoneId] || "#22D3EE" }}
        >
          {m.zoneId}
        </span>
        <span className="rounded-md bg-white/5 px-2 py-0.5 text-[8px] text-zinc-500">{m.buildingId}</span>
      </div>

      {m.relatedQuestIds.length > 0 && (
        <div className="mt-3 border-t border-white/5 pt-2">
          <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-zinc-600">Misiones</p>
          <div className="flex flex-wrap gap-1">
            {m.relatedQuestIds.map((qid) => (
              <span key={qid} className="rounded-md bg-cyan-400/5 px-2 py-0.5 text-[8px] text-cyan-300">{qid}</span>
            ))}
          </div>
        </div>
      )}

      {m.relatedLessonIds.length > 0 && (
        <div className="mt-2 border-t border-white/5 pt-2">
          <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-zinc-600">Lecciones</p>
          <div className="flex flex-wrap gap-1">
            {m.relatedLessonIds.map((lid) => (
              <span key={lid} className="rounded-md bg-violet-400/5 px-2 py-0.5 text-[8px] text-violet-300">{lid}</span>
            ))}
          </div>
        </div>
      )}

      {m.relatedSkillIds.length > 0 && (
        <div className="mt-2 border-t border-white/5 pt-2">
          <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-zinc-600">Skills</p>
          <div className="flex flex-wrap gap-1">
            {m.relatedSkillIds.map((sid) => (
              <span key={sid} className="rounded-md bg-amber-400/5 px-2 py-0.5 text-[8px] text-amber-300">{sid}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
