export function ColorPalettePanel({ colors }: { colors: string[] }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <h2 className="mb-4 text-lg font-bold text-white">Paleta de colores</h2>
      <div className="grid grid-cols-5 gap-3">
        {colors.map((c) => (
          <div key={c} className="flex flex-col items-center gap-1.5">
            <div
              className="h-12 w-full rounded-xl border border-white/10"
              style={{ backgroundColor: c }}
            />
            <span className="font-mono text-[10px] text-zinc-500">{c}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
