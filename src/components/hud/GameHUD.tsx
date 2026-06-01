"use client";

import { useGameStore } from "@/stores/useGameStore";
import { useQuestStore } from "@/stores/useQuestStore";
import { CHARACTERS } from "@/data/characters";
import { QUESTS } from "@/data/worldData";

export function GameHUD() {
  const player = useGameStore((s) => s.player);
  const isMounted = useGameStore((s) => s.isMounted);
  const char = CHARACTERS[player.characterId];
  const activeQuests = useQuestStore((s) => s.activeQuests);

  return (
    <>
      {/* Player info card */}
      <div className="fixed top-4 left-4 z-50 space-y-2 pointer-events-none">
        <div className="bg-black/70 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-white min-w-[200px]">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: char?.rarity === "legendary" ? "#F59E0B" : "#2FC7C9" }}
            />
            <span className="font-bold text-sm">
              {char?.name ?? "Unknown"} · Lv.{player.level}
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all"
              style={{ width: `${((player.xp % 500) / 500) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-white/50 mt-1">
            <span>XP: {player.xp}</span>
            <span>{isMounted ? "Montado" : "A pie"}</span>
          </div>
        </div>

        {/* Active quests */}
        {activeQuests.length > 0 && (
          <div className="bg-black/70 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-white min-w-[200px]">
            <h3 className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider mb-2">
              Misiones activas
            </h3>
            {activeQuests.map((aq) => {
              const quest = QUESTS.find((q) => q.id === aq.questId);
              if (!quest) return null;
              return (
                <div key={aq.questId} className="mb-2 last:mb-0">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/80">{quest.title}</span>
                    <span className="text-cyan-300">
                      {aq.progress}/{aq.target}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full bg-cyan-500 rounded-full transition-all"
                      style={{ width: `${(aq.progress / aq.target) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export function MiniMap() {
  const player = useGameStore((s) => s.player);

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[140px] h-[140px] bg-black/70 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden pointer-events-none">
      <div className="relative w-full h-full">
        <div
          className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
          style={{
            left: `${50 + (player.position[0] / 200) * 100}%`,
            top: `${50 + (player.position[2] / 200) * 100}%`,
          }}
        />
        <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[8px] text-white/40">N</span>
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] text-white/40">S</span>
        <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[8px] text-white/40">O</span>
        <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] text-white/40">E</span>
      </div>
    </div>
  );
}

export function ControlsHelp() {
  return (
    <div className="fixed bottom-4 left-4 z-50 pointer-events-none">
      <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 text-white/40 text-[10px] space-y-0.5">
        <div><span className="text-white/70 font-bold">WASD</span> · Mover</div>
        <div><span className="text-white/70 font-bold">A/D</span> · Rotar</div>
        <div><span className="text-white/70 font-bold">E</span> · Hablar NPC</div>
        <div><span className="text-white/70 font-bold">M</span> · Montar</div>
        <div><span className="text-white/70 font-bold">F</span> · Viaje rápido</div>
        <div><span className="text-white/70 font-bold">Enter</span> · Chat</div>
        <div><span className="text-white/70 font-bold">C</span> · Trading</div>
        <div><span className="text-white/70 font-bold">B</span> · $YISUS Wallet</div>
        <div><span className="text-white/70 font-bold">X</span> · Exchanges</div>
        <div><span className="text-white/70 font-bold">T</span> · Academia</div>
        <div><span className="text-white/70 font-bold">K</span> · Skills</div>
        <div><span className="text-white/70 font-bold">I</span> · Inventario</div>
      </div>
    </div>
  );
}
