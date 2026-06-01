"use client";

import { useEffect, useRef } from "react";
import { getSoundEngine } from "@/game/audio/SoundEngine";
import { useGameStore } from "@/stores/useGameStore";

export function SoundProvider() {
  const level = useGameStore((s) => s.player.level);
  const prevLevel = useRef(level);

  useEffect(() => {
    const snd = getSoundEngine();
    const stepInterval = setInterval(() => {
      const state = useGameStore.getState();
      const p = state.player.position;
      if (Math.abs(p[0]) > 0.1 || Math.abs(p[2] - 5) > 0.1) {
        snd.playFootstep();
      }
    }, 500);
    return () => clearInterval(stepInterval);
  }, []);

  useEffect(() => {
    if (level > prevLevel.current) {
      getSoundEngine().playLevelUp();
    }
    prevLevel.current = level;
  }, [level]);

  return null;
}
