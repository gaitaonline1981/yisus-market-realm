"use client"

interface Props { expectedAnimations: string[]; foundAnimations: string[]; riggedModelUrl?: string | null }

export function AnimationValidationPanel({ expectedAnimations, foundAnimations, riggedModelUrl }: Props) {
  const missingCount = expectedAnimations.filter((a) => !foundAnimations.includes(a)).length
  const allFound = missingCount === 0 && foundAnimations.length >= expectedAnimations.length

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Validación</p>
      <p className={`mb-2 text-[9px] font-bold ${allFound ? "text-emerald-400" : "text-amber-400"}`}>
        {allFound ? "✅ Todas las animaciones encontradas" : `⚠️ Faltan ${missingCount} animaciones`}
      </p>
      <div className="space-y-0.5 text-[9px]">
        {expectedAnimations.map((anim) => {
          const found = foundAnimations.includes(anim)
          return (
            <div key={anim} className="flex items-center justify-between">
              <span className="text-zinc-400">{anim}</span>
              <span className={`font-bold ${found ? "text-emerald-400" : "text-red-400"}`}>
                {found ? "✅" : "❌"}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
