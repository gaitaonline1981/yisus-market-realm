import { characters as mmorpgCharacters } from "@/data/mmorpg/characters"
import type { RealmCharacter } from "@/types/realm"

export const realmCharacters: RealmCharacter[] = mmorpgCharacters.map((c) => ({
  id: c.id,
  name: c.name,
  title: c.title,
  role: c.role,
  rarity: c.rarity,
  description: c.description,
  colorPalette: c.colorPalette,
  stats: { ...c.stats },
  modelUrl: c.modelUrl || "",
  thumbnailUrl: c.thumbnailUrl || "",
  defaultMountId: c.defaultParts.mount || c.compatibleMountIds[0] || "",
  compatibleMountIds: c.compatibleMountIds,
  status: "active" as const,
}))

export function getRealmCharacterById(id: string): RealmCharacter | undefined {
  return realmCharacters.find((c) => c.id === id)
}
