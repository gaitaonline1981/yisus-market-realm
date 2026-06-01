"use client"

import { useTradingAcademyStore } from "@/stores/useTradingAcademyStore"
import { tradingLessons } from "@/data/mmorpg/tradingLessons"

const CAT_COLORS: Record<string, string> = {
  wyckoff: "#22D3EE", elliott: "#A78BFA", risk: "#FACC15", macro: "#38BDF8",
  backtesting: "#2DD4BF", psychology: "#EC4899", volume: "#F97316", liquidity: "#22D3EE",
  prop_firm: "#F59E0B", bots: "#10B981",
}

export function TradingAcademyPanel() {
  const unlockedLessons = useTradingAcademyStore((s) => s.unlockedLessonIds) || []

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Academia de Trading</p>
      <p className="mb-3 text-[9px] italic text-zinc-500">Lecciones para dominar el mercado.</p>

      <div className="grid gap-2">
        {tradingLessons.map((lesson) => {
          const unlocked = unlockedLessons.includes(lesson.id)
          const color = CAT_COLORS[lesson.category] || "#22D3EE"
          return (
            <div
              key={lesson.id}
              className="rounded-xl border bg-white/[0.02] p-2.5"
              style={{ borderColor: unlocked ? `${color}30` : "rgba(255,255,255,0.05)", opacity: unlocked ? 1 : 0.5 }}
            >
              <div className="mb-1 flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-bold text-zinc-200">{lesson.title}</p>
                  <p className="text-[8px] text-zinc-500">{lesson.category}</p>
                </div>
                <span className="shrink-0 rounded px-1.5 py-0.5 text-[7px] font-bold"
                  style={{ background: `${color}20`, color }}
                >
                  {lesson.difficulty}
                </span>
              </div>
              <p className="mb-1 line-clamp-2 text-[9px] leading-relaxed text-zinc-500">{lesson.summary}</p>
              <p className="text-[8px] text-zinc-600">
                <span className="font-bold text-cyan-400">{lesson.xpReward} XP</span>
                {lesson.requiredLessonId && <span className="ml-2 text-zinc-600">· Requiere: {lesson.requiredLessonId}</span>}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
