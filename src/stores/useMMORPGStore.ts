import { create } from "zustand";
import { characters } from "@/data/mmorpg/characters";
import { mounts } from "@/data/mmorpg/mounts";
import type { EquippedParts, PlayerCharacterConfig } from "@/types/mmorpg";

interface MMORPGState {
  selectedCharacterId: string;
  selectedMountId?: string;
  equippedParts: EquippedParts;
  selectCharacter: (characterId: string) => void;
  selectMount: (mountId: string) => void;
  resetCharacter: () => void;
  exportConfig: () => PlayerCharacterConfig;
}

const defaultCharacter = characters[0];

export const useMMORPGStore = create<MMORPGState>((set, get) => ({
  selectedCharacterId: defaultCharacter?.id ?? "",
  selectedMountId: defaultCharacter?.defaultParts?.mount,
  equippedParts: defaultCharacter?.defaultParts ?? {},

  selectCharacter: (characterId) => {
    const character = characters.find((c) => c.id === characterId);
    if (!character) return;
    set({
      selectedCharacterId: character.id,
      selectedMountId: character.defaultParts.mount,
      equippedParts: character.defaultParts,
    });
  },

  selectMount: (mountId) => {
    const mount = mounts.find((m) => m.id === mountId);
    if (!mount) return;
    const { selectedCharacterId } = get();
    if (!mount.compatibleCharacterIds.includes(selectedCharacterId)) return;
    set({
      selectedMountId: mountId,
      equippedParts: { ...get().equippedParts, mount: mountId },
    });
  },

  resetCharacter: () => {
    const character = characters.find(
      (c) => c.id === get().selectedCharacterId
    );
    if (!character) return;
    set({
      selectedMountId: character.defaultParts.mount,
      equippedParts: character.defaultParts,
    });
  },

  exportConfig: () => {
    const { selectedCharacterId, selectedMountId, equippedParts } = get();
    return {
      characterId: selectedCharacterId,
      displayName: "Mi Personaje",
      level: 1,
      experience: 0,
      equippedParts,
      selectedMountId,
      metadata: {
        world: "Yisus Market Realm",
        brand: "Crypto Lunáticos",
        version: "0.1.0",
      },
      updatedAt: new Date().toISOString(),
    };
  },
}));
