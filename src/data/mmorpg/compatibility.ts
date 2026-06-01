import { characters } from "@/data/mmorpg/characters"
import { mounts } from "@/data/mmorpg/mounts"

export function canCharacterUseMount(characterId: string, mountId: string): boolean {
  const mount = mounts.find(m => m.id === mountId)
  if (!mount) return false
  return mount.compatibleCharacterIds.includes(characterId)
}

export function getCompatibleMounts(characterId: string) {
  return mounts.filter(m => m.compatibleCharacterIds.includes(characterId))
}

export function getCharacterDefaultMount(characterId: string) {
  const character = characters.find(c => c.id === characterId)
  if (!character?.defaultParts.mount) return null
  return mounts.find(m => m.id === character.defaultParts.mount) ?? null
}

export function getMountCompatibilityGrid(): Record<string, string[]> {
  const grid: Record<string, string[]> = {}
  for (const mount of mounts) {
    grid[mount.id] = mount.compatibleCharacterIds
  }
  return grid
}

export function getCharactersCompatibleWithMount(mountId: string) {
  const mount = mounts.find(m => m.id === mountId)
  if (!mount) return []
  return characters.filter(c => mount.compatibleCharacterIds.includes(c.id))
}
