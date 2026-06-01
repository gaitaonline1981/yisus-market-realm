import { worldZones } from "@/data/mmorpg/worldZones"
import type { WorldZone } from "@/data/mmorpg/worldZones"

export function getZoneSpawnPosition(zoneId: string): [number, number, number] {
  const zone = worldZones.find((z) => z.id === zoneId)
  if (zone) {
    return [zone.position[0] + 0.8, 0, zone.position[2] + 0.8]
  }
  return [0, 0, 0]
}

export function getZoneById(zoneId: string): WorldZone | undefined {
  return worldZones.find((z) => z.id === zoneId)
}

export function getAllTravelZones(): WorldZone[] {
  return worldZones
}
