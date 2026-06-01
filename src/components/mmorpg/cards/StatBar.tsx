export function StatBar({ label, value }: { label: string; value: number }) {
  const pct = Math.min(Math.max(value / 100, 0), 1);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-500">{label}</span>
        <span className="font-mono font-semibold text-cyan-300">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-cyan-400 transition-all duration-300"
          style={{ width: `${pct * 100}%`, opacity: 0.3 + pct * 0.7 }}
        />
      </div>
    </div>
  );
}
