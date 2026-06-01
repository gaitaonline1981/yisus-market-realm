"use client"

interface Props { foundAnimations: string[] }

const EXPECTED = ["Idle", "Walk", "Run", "Jump", "Wave", "Celebrate", "Analyze", "Skill_01", "Skill_02", "Ultimate"]

export function TickerAnimationChecklist({ foundAnimations }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Checklist Ticker</p>
      <div className="grid grid-cols-2 gap-1 text-[9px]">
        {EXPECTED.map((anim) => {
          const found = foundAnimations.includes(anim)
          return (
            <div key={anim} className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.02] px-2 py-1">
              <span className={`${found ? "text-emerald-400" : "text-zinc-600"}`}>{found ? "✅" : "⏳"}</span>
              <span className={`${found ? "text-zinc-300" : "text-zinc-600"}`}>{anim}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
