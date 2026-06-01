import type { CharacterId, CompatibilityMatrix, MountData, Accessory, BodyPart } from './types'
import { CHARACTERS, MOUNTS, ACCESSORIES, BODY_PARTS } from './data'

export function buildCompatibilityMatrix(characterId: CharacterId): CompatibilityMatrix {
  const character = CHARACTERS.find(c => c.id === characterId)
  if (!character) throw new Error(`Character ${characterId} not found`)

  const bodyParts = BODY_PARTS.filter(p => p.characterId === characterId)
  const compatibleAccessories = ACCESSORIES
    .filter(a => a.compatibleCharacters.includes(characterId))
    .map(a => a.id)
  const compatibleMounts = MOUNTS
    .filter(m => m.compatibleCharacters.includes(characterId))
    .map(m => m.id)
  const incompatibleAccessories = ACCESSORIES
    .filter(a => !a.compatibleCharacters.includes(characterId))
    .map(a => a.id)
  const incompatibleMounts = MOUNTS
    .filter(m => !m.compatibleCharacters.includes(characterId))
    .map(m => m.id)

  return {
    characterId,
    bodyParts,
    compatibleAccessories,
    compatibleMounts,
    incompatibleAccessories,
    incompatibleMounts,
  }
}

export function isAccessoryCompatible(accessoryId: string, characterId: CharacterId): boolean {
  const accessory = ACCESSORIES.find(a => a.id === accessoryId)
  return accessory?.compatibleCharacters.includes(characterId) ?? false
}

export function isMountCompatible(mountId: string, characterId: CharacterId): boolean {
  const mount = MOUNTS.find(m => m.id === mountId)
  return mount?.compatibleCharacters.includes(characterId) ?? false
}

export function getCompatibleCharactersForMount(mountId: string): CharacterId[] {
  return MOUNTS.find(m => m.id === mountId)?.compatibleCharacters ?? []
}

export function getSharedMounts(characters: CharacterId[]): MountData[] {
  if (characters.length === 0) return []
  return MOUNTS.filter(m =>
    m.compatibleCharacters.some(c => characters.includes(c))
  )
}

export function getExclusiveMounts(characterId: CharacterId): MountData[] {
  return MOUNTS.filter(m =>
    m.compatibleCharacters.includes(characterId) &&
    m.compatibleCharacters.length <= 2
  )
}

export const COMPATIBILITY_MATRIX: Record<CharacterId, CompatibilityMatrix> = {
  ticker: buildCompatibilityMatrix('ticker'),
  hedgey: buildCompatibilityMatrix('hedgey'),
  slyde: buildCompatibilityMatrix('slyde'),
  maci: buildCompatibilityMatrix('maci'),
  volumax: buildCompatibilityMatrix('volumax'),
  waven: buildCompatibilityMatrix('waven'),
  sproket: buildCompatibilityMatrix('sproket'),
  flipper: buildCompatibilityMatrix('flipper'),
}

export function getMountCompatibilityGrid(): Record<string, CharacterId[]> {
  const grid: Record<string, CharacterId[]> = {}
  for (const mount of MOUNTS) {
    grid[mount.id] = mount.compatibleCharacters
  }
  return grid
}
