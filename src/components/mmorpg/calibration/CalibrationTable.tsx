"use client"

interface Props { headers: string[]; rows: Record<string, string>[] }

export function CalibrationTable({ headers, rows }: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30">
      <table className="w-full text-left text-[10px]">
        <thead>
          <tr className="border-b border-white/5 bg-white/[0.02]">
            {headers.map((h) => (
              <th key={h} className="px-3 py-2 font-bold uppercase tracking-wider text-zinc-500">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5">
              {headers.map((h) => (
                <td key={h} className="px-3 py-1.5 text-zinc-300">{row[h] || "—"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
