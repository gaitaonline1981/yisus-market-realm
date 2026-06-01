"use client"

interface Props { data: any; filename?: string; label?: string }

export function ExportJsonButton({ data, filename = "export.json", label = "Exportar JSON" }: Props) {
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = filename; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button onClick={handleExport}
      className="w-full rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-[10px] font-bold text-cyan-300 transition hover:bg-cyan-400/20 cursor-pointer"
    >
      {label}
    </button>
  )
}
