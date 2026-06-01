import type { CharacterStats } from "@/types/mmorpg";

const STAT_LABELS: Record<keyof CharacterStats, string> = {
  speed: "Velocidad",
  precision: "Precisión",
  riskControl: "Control de Riesgo",
  liquidityReading: "Lectura de Liquidez",
  macroVision: "Visión Macro",
  volumePower: "Poder de Volumen",
  emotionalControl: "Control Emocional",
  creativity: "Creatividad",
  mobility: "Movilidad",
  resistance: "Resistencia",
};

export function StatsPanel({ stats }: { stats: CharacterStats }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <h2 className="mb-4 text-lg font-bold text-white">Stats</h2>
      <div className="space-y-2.5">
        {(Object.entries(stats) as [keyof CharacterStats, number][]).map(([key, value]) => {
          const pct = Math.min(Math.max(value / 100, 0), 1);
          return (
            <div key={key} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">{STAT_LABELS[key]}</span>
                <span className="font-mono font-semibold text-cyan-300">{value}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-cyan-400 transition-all"
                  style={{ width: `${pct * 100}%`, opacity: 0.3 + pct * 0.7 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
