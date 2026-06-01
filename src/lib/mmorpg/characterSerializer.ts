import type { EquippedParts, PlayerCharacterConfig } from "@/types/mmorpg"
import { RARITY_CONFIG } from "@/data/mmorpg/rarities"

export function serializeConfig(config: PlayerCharacterConfig): string {
  return JSON.stringify(config, null, 2)
}

export function deserializeConfig(json: string): PlayerCharacterConfig | null {
  try {
    const parsed = JSON.parse(json)
    if (!parsed.characterId || !parsed.equippedParts) return null
    return parsed as PlayerCharacterConfig
  } catch {
    return null
  }
}

export function getRarityMultiplier(rarity: keyof typeof RARITY_CONFIG): number {
  return RARITY_CONFIG[rarity]?.statMultiplier ?? 1
}
