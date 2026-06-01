import type { CharacterPart, PartCategory } from "@/types/mmorpg"

export function filterPartsByCategory(parts: CharacterPart[], category: PartCategory): CharacterPart[] {
  return parts.filter(p => p.category === category)
}

export function filterPartsByCharacter(parts: CharacterPart[], characterId: string): CharacterPart[] {
  return parts.filter(p => p.characterIds?.includes(characterId))
}
