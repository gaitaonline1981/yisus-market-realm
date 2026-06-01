"use client"

import { useState } from "react"
import { worldQuests } from "@/data/mmorpg/worldQuests"
import type { MissionCategory } from "@/data/mmorpg/worldQuests"
import { useWorldProgressStore } from "@/stores/useWorldProgressStore"
import { getCategoryLabel, getDifficultyLabel } from "@/lib/mmorpg/questHelpers"
import { QuestStatusBadge } from "./QuestStatusBadge"

interface Props { onSelectZone?: (zoneId: string) => void }

const CATEGORIES: (MissionCategory | "all")[] = [
  "all", "tutorial", "liquidity", "risk", "breakout", "macro",
  "wyckoff", "elliott", "bot", "backtesting", "prop_firm",
]

function filterBtnClasses(active: boolean): string {
  return active
    ? "rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[8px] font-bold text-cyan-400 cursor-pointer"
    : "rounded-md border border-white/5 bg-white/[0.02] px-2 py-0.5 text-[8px] font-bold text-zinc-500 cursor-pointer hover:bg-white/5"
}

export function TradingMissionBoard({ onSelectZone }: Props) {
  const [filter, setFilter] = useState<MissionCategory | "all">("all")
  const startQuest = useWorldProgressStore((s) => s.startQuest)
  const completeQuest = useWorldProgressStore((s) => s.completeQuest)
  const isCompleted = useWorldProgressStore((s) => s.isQuestCompleted)
  const isActive = useWorldProgressStore((s) => s.isQuestActive)

  const filtered = filter === "all" ? worldQuests : worldQuests.filter((q) => q.category === filter)

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Mission Board de Trading</p>
      <p className="mb-2 text-[9px] italic text-zinc-500">Misiones educativas y jugables del Market Realm.</p>

      <div className="mb-3 flex flex-wrap gap-1">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={filterBtnClasses(filter === c)}>
            {c === "all" ? "Todas" : getCategoryLabel(c)}
          </button>
        ))}
      </div>

      <div className="grid gap-2">
        {filtered.map((quest) => {
          const completed = isCompleted(quest.id)
          const active = isActive(quest.id)
          const borderColor = active ? "border-amber-400/30" : completed ? "border-emerald-400/20" : "border-white/5"
          const bgColor = active ? "bg-amber-400/5" : completed ? "bg-emerald-400/5" : "bg-white/[0.02]"

          return (
            <div key={quest.id} className={`rounded-xl border p-3 ${borderColor} ${bgColor}`} style={{ opacity: completed ? 0.6 : 1 }}>
              <div className="mb-1 flex items-start justify-between">
                <div>
                  <span className={`text-sm font-bold ${active ? "text-amber-400" : "text-zinc-100"}`}>{quest.title}</span>
                  <div className="mt-0.5 flex gap-1">
                    <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[8px] text-cyan-400">{getCategoryLabel(quest.category)}</span>
                    <span className="rounded bg-white/10 px-1.5 py-0.5 text-[8px] text-zinc-500">{getDifficultyLabel(quest.difficulty)}</span>
                  </div>
                </div>
                <QuestStatusBadge status={completed ? "completed" : active ? "active" : "available"} />
              </div>

              <p className="mb-1.5 text-[10px] leading-relaxed text-zinc-400">{quest.description}</p>
              <p className="mb-1.5 text-[9px] italic text-zinc-500">🎯 {quest.objective}</p>

              {quest.steps.length > 0 && (
                <div className="mb-1.5">
                  <p className="mb-0.5 text-[8px] font-bold uppercase text-zinc-500">Pasos:</p>
                  <div className="grid gap-0.5 text-[9px] text-zinc-400">
                    {quest.steps.map((s, i) => (
                      <div key={i} className="flex gap-1">
                        <span className="text-zinc-500">{i + 1}.</span>
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="mb-1.5 text-[9px] font-bold text-amber-400">
                +{quest.reward.xp} XP {quest.reward.title && <span className="text-violet-300">· {quest.reward.title}</span>}
              </p>

              {quest.zoneId && onSelectZone && (
                <button onClick={() => onSelectZone(quest.zoneId!)}
                  className="mr-1.5 rounded-md border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-[9px] font-bold text-cyan-400 cursor-pointer hover:bg-cyan-400/20"
                >
                  Ver zona
                </button>
              )}

              {!completed && !active && (
                <button onClick={() => startQuest(quest.id)}
                  className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[9px] font-bold text-cyan-400 cursor-pointer hover:bg-cyan-400/20"
                >
                  Iniciar
                </button>
              )}
              {active && (
                <button onClick={() => completeQuest(quest.id)}
                  className="rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-bold text-emerald-400 cursor-pointer hover:bg-emerald-400/20"
                >
                  Completar
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
