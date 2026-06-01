"use client"

interface Props { code: string; language?: string }

export function CalibrationCodeBlock({ code, language = "typescript" }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-3">
      <div className="mb-1 text-[8px] font-bold uppercase tracking-wider text-zinc-600">{language}</div>
      <pre className="m-0 text-[10px] leading-relaxed text-cyan-300">
        <code>{code}</code>
      </pre>
    </div>
  )
}
