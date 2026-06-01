const BASE_SPEED = 3
const SPRINT_MULTIPLIER = 2

const RARITY_SPEED: Record<string, number> = {
  common: 1,
  rare: 1.15,
  epic: 1.3,
  legendary: 1.5,
  institutional: 1.2,
  mythic: 1.6,
  lunatic: 1.8,
}

const MOUNT_SPECIAL_SPEED: Record<string, number> = {
  "pocket-rocket": 1.8,
  "market-rover": 1.5,
  "wind-dasher": 1.6,
  "volatility-falcon": 1.7,
  "candle-dragon": 1.4,
  "skyward-talon": 1.5,
  "moon-hopper": 1.3,
  "noble-steed": 1.2,
  "liquidity-whale": 0.9,
  "order-block-rhino": 1.0,
}

export function getMovementSpeeds(mountId?: string | null, worldMountMode?: "on-foot" | "companion" | "mounted") {
  if (worldMountMode !== "mounted" || !mountId) {
    return { walk: BASE_SPEED, sprint: BASE_SPEED * SPRINT_MULTIPLIER }
  }

  const special = MOUNT_SPECIAL_SPEED[mountId]
  if (special) {
    return { walk: BASE_SPEED * special, sprint: BASE_SPEED * special * SPRINT_MULTIPLIER }
  }

  return { walk: BASE_SPEED * 1.3, sprint: BASE_SPEED * 1.3 * SPRINT_MULTIPLIER }
}
