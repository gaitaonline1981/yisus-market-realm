import { characters } from "@/data/mmorpg/characters"
import type { PlayerCharacterConfig } from "@/types/mmorpg"

export function createDefaultConfig(characterId: string): PlayerCharacterConfig | null {
  const character = characters.find(c => c.id === characterId)
  if (!character) return null
  return {
    characterId: character.id,
    displayName: character.name,
    level: 1,
    experience: 0,
    equippedParts: character.defaultParts,
    selectedMountId: character.defaultParts.mount,
    unlockedItems: [],
    updatedAt: new Date().toISOString(),
  }
}
