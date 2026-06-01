"use client"

import { useWorldProgressStore } from "@/stores/useWorldProgressStore"
import { worldQuests, getQuestById } from "@/data/mmorpg/worldQuests"
import { QuestStatusBadge } from "./QuestStatusBadge"

export function QuestJournalPanel() {
  const activeQuestId = useWorldProgressStore((s) => s.activeQuestId)
  const completedQuests = useWorldProgressStore((s) => s.completedQuestIds)
  const isQuestCompleted = useWorldProgressStore((s) => s.isQuestCompleted)
  const startQuest = useWorldProgressStore((s) => s.startQuest)
  const completeQuest = useWorldProgressStore((s) => s.completeQuest)
  const abandonQuest = useWorldProgressStore((s) => s.abandonQuest)

  const activeQuest = activeQuestId ? getQuestById(activeQuestId) : null
  const available = worldQuests.filter((q) => !completedQuests.includes(q.id) && q.id !== activeQuestId)
  const completed = worldQuests.filter((q) => completedQuests.includes(q.id))

  if (activeQuest) {
    return (
      <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-amber-400">Misión activa</p>
            <p className="text-sm font-bold text-zinc-100">{activeQuest.title}</p>
          </div>
          <span className="rounded bg-amber-400/10 px-1.5 py-0.5 text-[8px] font-bold text-amber-400">{activeQuest.category}</span>
        </div>
        <p className="mb-1 text-[10px] leading-relaxed text-zinc-400">{activeQuest.description}</p>
        <p className="mb-2 text-[9px] italic text-zinc-500">🎯 {activeQuest.objective}</p>
        {activeQuest.steps.length > 0 && (
          <div className="mb-2">
            <p className="mb-0.5 text-[8px] font-bold uppercase text-zinc-500">Pasos:</p>
            <div className="grid gap-0.5 text-[9px]">
              {activeQuest.steps.map((s, i) => (
                <div key={i} className="flex gap-1 text-zinc-400">
                  <span className="w-3 text-zinc-600">{i + 1}.</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <button onClick={() => completeQuest(activeQuest.id)}
            className="rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[9px] font-bold text-emerald-400 transition hover:bg-emerald-400/20 cursor-pointer"
          >
            ✅ Completar
          </button>
          <button onClick={() => abandonQuest(activeQuest.id)}
            className="rounded-md border border-red-400/20 bg-red-400/5 px-2.5 py-1 text-[9px] font-bold text-red-400 transition hover:bg-red-400/10 cursor-pointer"
          >
            Abandonar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Diario de misiones</p>
      <p className="mb-3 text-[9px] italic text-zinc-500">Sin misión activa. Iniciá una desde el Mission Board.</p>

      {available.length > 0 && (
        <div className="mb-3">
          <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-cyan-400">Disponibles</p>
          <div className="grid gap-1">
            {available.slice(0, 5).map((q) => (
              <div key={q.id} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-2 py-1.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10px] font-bold text-zinc-300">{q.title}</p>
                  <span className="text-[8px] text-zinc-600">{q.category}</span>
                </div>
                <button onClick={() => startQuest(q.id)}
                  className="shrink-0 rounded-md border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-[8px] font-bold text-cyan-400 transition hover:bg-cyan-400/20 cursor-pointer"
                >
                  Iniciar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div>
          <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-emerald-400">Completadas</p>
          <div className="grid gap-1">
            {completed.slice(0, 5).map((q) => (
              <div key={q.id} className="flex items-center gap-2 rounded-lg border border-emerald-400/10 bg-emerald-400/5 px-2 py-1">
                <span className="text-emerald-400">✅</span>
                <span className="text-[10px] text-zinc-400">{q.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
