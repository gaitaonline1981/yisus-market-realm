import { create } from "zustand";
import type { PlayerState } from "@/game/core/types";
import { DEFAULT_CHARACTER } from "@/data/characters";

interface GameStore {
  player: PlayerState;
  isMounted: boolean;
  setCharacter: (id: string) => void;
  setMount: (id: string | null) => void;
  moveTo: (pos: [number, number, number]) => void;
  rotate: (angle: number) => void;
  addXp: (amount: number) => void;
  toggleMount: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  player: {
    characterId: DEFAULT_CHARACTER.id,
    mountId: null,
    position: [0, 1, 5],
    rotation: 0,
    xp: 0,
    level: 1,
  },
  isMounted: false,
  setCharacter: (id) =>
    set((s) => ({ player: { ...s.player, characterId: id } })),
  setMount: (id) =>
    set((s) => ({ player: { ...s.player, mountId: id }, isMounted: id !== null })),
  moveTo: (pos) =>
    set((s) => ({ player: { ...s.player, position: pos } })),
  rotate: (angle) =>
    set((s) => ({ player: { ...s.player, rotation: angle } })),
  addXp: (amount) =>
    set((s) => {
      const newXp = s.player.xp + amount;
      const newLevel = Math.floor(newXp / 500) + 1;
      return { player: { ...s.player, xp: newXp, level: newLevel } };
    }),
  toggleMount: () =>
    set((s) => ({ isMounted: !s.isMounted })),
}));
