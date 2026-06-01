"use client"

import { tradingLessons } from "@/data/mmorpg/tradingLessons"
import { useTradingAcademyStore } from "@/stores/useTradingAcademyStore"

interface Props { lessonId?: string | null; onClose: () => void }

const CAT_COLORS: Record<string, string> = {
  wyckoff: "#22D3EE", elliott: "#A78BFA", risk: "#FACC15", macro: "#38BDF8",
  backtesting: "#2DD4BF", psychology: "#EC4899", volume: "#F97316", liquidity: "#22D3EE",
  prop_firm: "#F59E0B", bots: "#10B981",
}

export function TradingLessonReader({ lessonId, onClose }: Props) {
  const unlockLesson = useTradingAcademyStore((s) => s.unlockLesson)
  const unlockedLessons = useTradingAcademyStore((s) => s.unlockedLessonIds)
  const lesson = lessonId ? tradingLessons.find((l) => l.id === lessonId) : null

  if (!lesson) return null

  const color = CAT_COLORS[lesson.category] || "#22D3EE"
  const unlocked = unlockedLessons.includes(lesson.id)
  const hasPrereq = lesson.requiredLessonId ? unlockedLessons.includes(lesson.requiredLessonId) : true

  return (
    <div className="rounded-2xl border p-4"
      style={{ borderColor: `${color}30`, background: `${color}05` }}
    >
      <div className="mb-3 flex items-start justify-between">
        <div>
          <p className="text-sm font-black text-zinc-100">{lesson.title}</p>
          <p className="text-[9px]" style={{ color }}>{lesson.category} · {lesson.difficulty}</p>
        </div>
        <button onClick={onClose} className="cursor-pointer border-none bg-transparent p-0 text-lg text-zinc-500 hover:text-zinc-300">✕</button>
      </div>

      <p className="mb-3 text-[10px] leading-relaxed text-zinc-400">{lesson.content}</p>

      {lesson.keyTakeaways.length > 0 && (
        <div className="mb-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-cyan-400">Puntos clave</p>
          <ul className="list-disc pl-4 text-[9px] text-zinc-400">
            {lesson.keyTakeaways.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      )}

      {lesson.exercises.length > 0 && (
        <div className="mb-3">
          <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-violet-300">Ejercicios</p>
          <div className="grid gap-1 text-[9px] text-zinc-400">
            {lesson.exercises.map((e, i) => (
              <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] px-2 py-1">
                <span className="font-bold text-amber-400">#{i + 1}</span> {e}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="font-bold text-amber-400 text-[9px]">+{lesson.xpReward} XP</span>
        {!unlocked && hasPrereq && (
          <button onClick={() => unlockLesson(lesson.id)}
            className="rounded-md border px-2 py-1 text-[9px] font-bold transition cursor-pointer"
            style={{
              borderColor: `${color}40`,
              background: `${color}15`,
              color,
            }}
          >
            Desbloquear lección
          </button>
        )}
        {!hasPrereq && (
          <span className="text-[8px] text-zinc-600">Requiere: {lesson.requiredLessonId}</span>
        )}
      </div>
    </div>
  )
}
