"use client";

import { useEffect, useRef } from "react";
import { useGameStore } from "@/stores/useGameStore";
import { useQuestStore } from "@/stores/useQuestStore";
import { useInventoryStore } from "@/stores/useInventoryStore";
import { useAcademyStore } from "@/stores/useAcademyStore";
import { useTradingStore } from "@/stores/useTradingStore";
import { WORLD_ZONES, QUESTS } from "@/data/worldData";

export function QuestTracker() {
  const playerPos = useGameStore((s) => s.player.position);
  const activeQuests = useQuestStore((s) => s.activeQuests);
  const updateProgress = useQuestStore((s) => s.updateProgress);
  const completeQuest = useQuestStore((s) => s.completeQuest);
  const addXp = useGameStore((s) => s.addXp);
  const addItem = useInventoryStore((s) => s.addItem);
  const completedLessons = useAcademyStore((s) => s.completedLessons);
  const closedTrades = useTradingStore((s) => s.closedTrades);
  const completedRef = useRef<Set<string>>(new Set());

  // Auto-complete quests when progress reaches target
  useEffect(() => {
    for (const aq of activeQuests) {
      if (aq.progress >= aq.target && !completedRef.current.has(aq.questId)) {
        completedRef.current.add(aq.questId);
        completeQuest(aq.questId);
        addXp(150);

        // Give quest reward item
        const quest = QUESTS.find((q) => q.id === aq.questId);
        if (quest?.reward.item) {
          addItem({
            id: quest.reward.item.toLowerCase().replace(/ /g, "-"),
            name: quest.reward.item,
            description: `Recompensa por completar: ${quest.title}`,
            type: "badge",
            rarity: "rare",
          });
        }
      }
    }
  }, [activeQuests, completeQuest, addXp, addItem]);

  // Track education quests
  useEffect(() => {
    for (const aq of activeQuests) {
      if (aq.questId === "backtest-challenge") {
        updateProgress("backtest-challenge", completedLessons.length - (aq.progress || 0));
      }
    }
  }, [completedLessons, activeQuests, updateProgress]);

  // Track trading quests
  useEffect(() => {
    const profitableClosed = closedTrades.filter((t) => (t.pnl ?? 0) > 0).length;
    for (const aq of activeQuests) {
      if (aq.questId === "trader-first-profit" && profitableClosed > 0) {
        updateProgress("trader-first-profit");
      }
    }
  }, [closedTrades, activeQuests, updateProgress]);

  // Track mount quest
  useEffect(() => {
    const zonesVisited = new Set<string>();
    const px = playerPos[0];
    const pz = playerPos[2];
    for (const zone of WORLD_ZONES) {
      const zx = zone.position[0], zz = zone.position[2];
      const halfW = zone.size[0] / 2, halfH = zone.size[1] / 2;
      if (px > zx - halfW && px < zx + halfW && pz > zz - halfH && pz < zz + halfH) {
        zonesVisited.add(zone.id);
      }
    }
    // Need to persist visited zones across renders... simplified for now
  }, [playerPos]);

  // Track exploration: when player enters a zone, update relevant quests
  useEffect(() => {
    const px = playerPos[0];
    const pz = playerPos[2];
    for (const zone of WORLD_ZONES) {
      const zx = zone.position[0];
      const zz = zone.position[2];
      const halfW = zone.size[0] / 2;
      const halfH = zone.size[1] / 2;
      if (px > zx - halfW && px < zx + halfW && pz > zz - halfH && pz < zz + halfH) {
        // Check exploration quests
        for (const aq of activeQuests) {
          if (aq.questId === "explore-wyckoff" && zone.id === "wyckoff-forest") {
            updateProgress("explore-wyckoff");
          }
        }
      }
    }
  }, [playerPos, activeQuests, updateProgress]);

  return null;
}
