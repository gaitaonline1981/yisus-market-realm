"use client"

import type { TradingLesson } from "@/data/mmorpg/tradingLessons"
import { useTradingAcademyStore } from "@/stores/useTradingAcademyStore"

interface Props { lesson: TradingLesson; unlocked?: boolean }

const CAT_COLORS: Record<string, string> = {
  wyckoff: "#22D3EE", elliott: "#A78BFA", risk: "#FACC15", macro: "#38BDF8",
  backtesting: "#2DD4BF", psychology: "#EC4899", volume: "#F97316",
  liquidity: "#22D3EE", prop_firm: "#F59E0B", bots: "#10B981",
}

export function TradingLessonCard({ lesson }: Props) {
  const unlockedLessons = useTradingAcademyStore((s) => s.unlockedLessonIds)
  const unlockLesson = useTradingAcademyStore((s) => s.unlockLesson)
  const unlocked = unlockedLessons.includes(lesson.id)
  const hasPrereq = lesson.requiredLessonId ? unlockedLessons.includes(lesson.requiredLessonId) : true
  const color = CAT_COLORS[lesson.category] || "#22D3EE"

  return (
    <div className="rounded-xl border p-2.5"
      style={{
        borderColor: unlocked ? `${color}30` : "rgba(255,255,255,0.06)",
        background: unlocked ? `${color}06` : "rgba(255,255,255,0.02)",
        opacity: unlocked ? 1 : 0.5,
      }}
    >
      <div className="mb-1 flex items-start justify-between">
        <div>
          <p className={`text-[10px] font-bold ${unlocked ? "text-zinc-100" : "text-zinc-500"}`}>{lesson.title}</p>
          <p className="text-[8px] text-zinc-600">{lesson.category} · {lesson.difficulty}</p>
        </div>
        <span className="text-[9px] font-bold text-amber-400">+{lesson.xpReward} XP</span>
      </div>

      <p className="mb-1.5 line-clamp-2 text-[9px] text-zinc-500">{lesson.summary}</p>

      {!unlocked && hasPrereq && (
        <button onClick={() => unlockLesson(lesson.id)}
          className="rounded-md border px-2 py-0.5 text-[8px] font-bold transition cursor-pointer"
          style={{ borderColor: `${color}40`, background: `${color}15`, color }}
        >
          Desbloquear
        </button>
      )}
      {!hasPrereq && <span className="text-[8px] text-zinc-600">Requiere: {lesson.requiredLessonId}</span>}
    </div>
  )
}
