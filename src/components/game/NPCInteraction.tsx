"use client";

import { useState, useEffect, useCallback } from "react";
import { useGameStore } from "@/stores/useGameStore";
import { useQuestStore } from "@/stores/useQuestStore";
import { NPCS, type GameNPC } from "@/game/npcs/npcData";
import type { NPCDialogue } from "@/game/npcs/npcData";

const INTERACT_DISTANCE = 5;

export function NPCInteraction() {
  const playerPos = useGameStore((s) => s.player.position);
  const addXp = useGameStore((s) => s.addXp);
  const acceptQuest = useQuestStore((s) => s.acceptQuest);
  const completedQuests = useQuestStore((s) => s.completedQuests);
  const [nearNPC, setNearNPC] = useState<GameNPC | null>(null);
  const [dialogue, setDialogue] = useState<NPCDialogue | null>(null);
  const [showPanel, setShowPanel] = useState(false);

  // Check proximity to NPCs
  useEffect(() => {
    if (showPanel) return;
    let closest: GameNPC | null = null;
    let minDist = INTERACT_DISTANCE;
    for (const npc of NPCS) {
      const dx = playerPos[0] - npc.position[0];
      const dz = playerPos[2] - npc.position[2];
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < minDist) {
        minDist = dist;
        closest = npc;
      }
    }
    setNearNPC(closest);
  }, [playerPos, showPanel]);

  const handleInteract = useCallback(() => {
    if (nearNPC && !showPanel) {
      // Check if player completed this NPC's quest
      const completedHere = nearNPC.questIds.filter((id) => completedQuests.includes(id));
      if (completedHere.length > 0) {
        setDialogue({
          id: "completed",
          text: `¡Excelente trabajo completando la misión! Tu dedicación al trading te llevará lejos.`,
        });
      } else {
        setDialogue(nearNPC.dialogues[0]);
      }
      setShowPanel(true);
    }
  }, [nearNPC, showPanel, completedQuests]);

  const handleResponse = useCallback(
    (resp: NPCDialogue["responses"][number]) => {
      if (resp.acceptQuestId) {
        acceptQuest(resp.acceptQuestId);
        addXp(50);
        setShowPanel(false);
        setDialogue(null);
      } else if (resp.nextDialogueId) {
        const next = nearNPC?.dialogues.find((d) => d.id === resp.nextDialogueId);
        if (next) setDialogue(next);
      } else {
        setShowPanel(false);
        setDialogue(null);
      }
    },
    [nearNPC, addXp]
  );

  // Keyboard shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "e") handleInteract();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleInteract]);

  return (
    <>
      {/* Near NPC indicator */}
      {nearNPC && !showPanel && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div className="bg-black/80 border border-white/20 rounded-xl px-6 py-3 text-center">
            <p className="text-white font-bold text-sm">{nearNPC.name}</p>
            <p className="text-zinc-400 text-xs">{nearNPC.role}</p>
            <p className="text-cyan-300 text-xs mt-1 animate-pulse">Presioná E para hablar</p>
          </div>
        </div>
      )}

      {/* Dialogue panel */}
      {showPanel && dialogue && nearNPC && (
        <div className="fixed inset-0 z-50 flex items-end justify-center pb-24 pointer-events-none">
          <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-lg w-full mx-4 pointer-events-auto">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: nearNPC.color }}
              />
              <h3 className="font-bold text-white">{nearNPC.name}</h3>
              <span className="text-xs text-zinc-500">{nearNPC.role}</span>
            </div>
            <p className="text-zinc-200 text-sm leading-relaxed mb-6">{dialogue.text}</p>
            <div className="space-y-2">
              {dialogue.responses?.map((r, i) => (
                <button
                  key={i}
                  onClick={() => handleResponse(r)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${
                    r.acceptQuestId
                      ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20"
                      : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                  }`}
                >
                  {r.acceptQuestId && "📜 "}
                  {r.text}
                </button>
              ))}
              {!dialogue.responses && (
                <button
                  onClick={() => setShowPanel(false)}
                  className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-zinc-400 text-sm hover:bg-white/10"
                >
                  Cerrar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
