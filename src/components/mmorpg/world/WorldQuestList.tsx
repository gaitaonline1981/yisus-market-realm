"use client"

import { getQuestsByZone } from "@/data/mmorpg/worldQuests"
import { useWorldProgressStore } from "@/stores/useWorldProgressStore"

interface WorldQuestListProps { zoneId: string }

export function WorldQuestList({ zoneId }: WorldQuestListProps) {
  const quests = getQuestsByZone(zoneId)
  const startQuest = useWorldProgressStore((s) => s.startQuest)
  const completeQuest = useWorldProgressStore((s) => s.completeQuest)
  const isCompleted = useWorldProgressStore((s) => s.isQuestCompleted)
  const isActive = useWorldProgressStore((s) => s.isQuestActive)

  if (quests.length === 0) return null

  return (
    <div className="grid gap-2">
      {quests.map((quest) => {
        const completed = isCompleted(quest.id)
        const active = isActive(quest.id)
        const borderColor = active ? "#22D3EE" : completed ? "#10B981" : "rgba(255,255,255,0.06)"
        const bgColor = active ? "rgba(34,211,238,0.05)" : completed ? "rgba(16,185,129,0.05)" : "rgba(255,255,255,0.02)"

        return (
          <div key={quest.id} className="rounded-xl border p-3"
            style={{ borderColor, background: bgColor, opacity: completed ? 0.6 : 1 }}
          >
            <div className="mb-1.5 flex items-start justify-between">
              <div className={`text-sm font-bold ${active ? "text-cyan-400" : completed ? "text-emerald-400" : "text-zinc-100"}`}>
                {quest.title}
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                completed ? "bg-emerald-400/15 text-emerald-400" :
                active ? "bg-cyan-400/15 text-cyan-400" :
                "bg-zinc-400/15 text-zinc-400"
              }`}>
                {completed ? "Completada" : active ? "Activa" : "Disponible"}
              </span>
            </div>

            <p className="mb-1 text-[10px] leading-relaxed text-zinc-400">{quest.description}</p>
            <p className="mb-1 text-[9px] italic text-zinc-500">🎯 {quest.objective}</p>

            {quest.steps.length > 0 && (
              <div className="mb-1.5">
                <p className="mb-0.5 text-[8px] font-bold uppercase text-zinc-500">Pasos:</p>
                <div className="grid gap-0.5 text-[9px] text-zinc-400">
                  {quest.steps.map((s, i) => (
                    <div key={i} className="flex gap-1">
                      <span className="text-zinc-600">{i + 1}.</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="mb-1.5 text-[9px] font-bold text-amber-400">
              +{quest.reward.xp} XP
            </p>

            {!completed && !active && (
              <button onClick={() => startQuest(quest.id)}
                className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[9px] font-bold text-cyan-400 transition hover:bg-cyan-400/20 cursor-pointer"
              >
                Iniciar misión
              </button>
            )}
            {active && (
              <button onClick={() => completeQuest(quest.id)}
                className="rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-bold text-emerald-400 transition hover:bg-emerald-400/20 cursor-pointer"
              >
                ✅ Completar
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
