import { mounts as mmorpgMounts } from "@/data/mmorpg/mounts"
import type { RealmMount } from "@/types/realm"

export const realmMounts: RealmMount[] = mmorpgMounts.map((m) => ({
  id: m.id,
  name: m.name,
  type: m.type,
  rarity: m.rarity,
  description: m.description,
  modelUrl: m.modelUrl || "",
  thumbnailUrl: m.thumbnailUrl || "",
  compatibleCharacterIds: m.compatibleCharacterIds,
  colorPalette: m.colorPalette,
  specialAbility: { ...m.specialAbility },
  status: "active" as const,
}))

export function getRealmMountById(id: string): RealmMount | undefined {
  return realmMounts.find((m) => m.id === id)
}
