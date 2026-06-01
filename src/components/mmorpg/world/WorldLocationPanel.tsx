"use client";

import { worldZones } from "@/data/mmorpg/worldZones";

interface WorldLocationPanelProps {
  selectedZone: string;
}

export function WorldLocationPanel({ selectedZone }: WorldLocationPanelProps) {
  const zone = worldZones.find((z) => z.id === selectedZone);

  if (!zone) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center text-xs text-zinc-600">
        Zona desconocida
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4 space-y-3">
      <p className="text-[11px] font-bold uppercase tracking-widest text-cyan-300">{zone.name}</p>
      <p className="text-[10px] text-zinc-400">{zone.description}</p>
      <div className="border-t border-white/5" />
      <div className="space-y-2">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">Funci\u00F3n</p>
          <p className="text-[10px] text-zinc-400">{zone.functionInGame}</p>
        </div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">Trading</p>
          <p className="text-[10px] text-cyan-300/80">{zone.tradingMeaning}</p>
        </div>
        <div className="border-t border-white/5" />
        <div>
          <p className="text-[9px] font-bold uppercase tracking-wider text-violet-400">Misi\u00F3n: {zone.questTitle}</p>
          <p className="text-[10px] text-zinc-400">{zone.questDescription}</p>
        </div>
      </div>
    </div>
  );
}
