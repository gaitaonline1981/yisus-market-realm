"use client";

import { useState, useEffect, useRef } from "react";
import { useGameStore } from "@/stores/useGameStore";
import { WORLD_ZONES } from "@/data/worldData";
import { X, MapPin } from "lucide-react";

export function FastTravelPanel() {
  const [open, setOpen] = useState(false);
  const [visitedZones, setVisitedZones] = useState<Set<string>>(new Set(["trader-spawn"]));
  const playerPos = useGameStore((s) => s.player.position);
  const moveTo = useGameStore((s) => s.moveTo);
  const posRef = useRef(playerPos);

  useEffect(() => {
    posRef.current = playerPos;
    // Track which zones the player has visited
    const px = playerPos[0], pz = playerPos[2];
    for (const zone of WORLD_ZONES) {
      const zx = zone.position[0], zz = zone.position[2];
      const halfW = zone.size[0] / 2, halfH = zone.size[1] / 2;
      if (px > zx - halfW && px < zx + halfW && pz > zz - halfH && pz < zz + halfH) {
        setVisitedZones((v) => new Set(v).add(zone.id));
      }
    }
  }, [playerPos]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "f") setOpen((o) => !o);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  const handleTeleport = (zoneId: string) => {
    const zone = WORLD_ZONES.find((z) => z.id === zoneId);
    if (zone) {
      moveTo([zone.position[0], 0, zone.position[2] + 3]);
      setOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#0a0f1a] border border-white/10 rounded-2xl p-6 w-full max-w-md mx-4 max-h-[70vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <MapPin size={18} className="text-cyan-400" /> Viaje Rápido
          </h2>
          <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-2">
          {WORLD_ZONES.map((zone) => {
            const visited = visitedZones.has(zone.id);
            const isCurrentZone = visited && (() => {
              const dx = playerPos[0] - zone.position[0];
              const dz = playerPos[2] - zone.position[2];
              return Math.sqrt(dx * dx + dz * dz) < zone.size[0] / 2;
            })();

            return (
              <button
                key={zone.id}
                onClick={() => visited && handleTeleport(zone.id)}
                disabled={!visited}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                  visited
                    ? "bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer"
                    : "bg-white/2 border-white/5 opacity-40 cursor-not-allowed"
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: zone.color }}
                />
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-white">{zone.name}</h3>
                  <p className="text-[10px] text-zinc-500">Nivel {zone.difficulty} · {zone.concept}</p>
                </div>
                {!visited ? (
                  <span className="text-[10px] text-zinc-600">No descubierto</span>
                ) : isCurrentZone ? (
                  <span className="text-[10px] text-cyan-400">Actual</span>
                ) : (
                  <span className="text-[10px] text-cyan-400">Viajar</span>
                )}
              </button>
            );
          })}
        </div>

        <p className="text-white/20 text-xs text-center mt-4">Presioná F para cerrar</p>
      </div>
    </div>
  );
}
