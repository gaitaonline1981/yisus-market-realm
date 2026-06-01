export type Rarity =
  | "common"
  | "rare"
  | "epic"
  | "legendary"
  | "mythic"
  | "institutional"
  | "lunatic"

export type CharacterRole =
  | "scalper_pilot"
  | "risk_manager_knight"
  | "liquidity_hunter"
  | "macro_explorer"
  | "volume_berserker"
  | "wave_reader_mage"
  | "market_mechanic"
  | "courier_trader"

export type PartCategory =
  | "body"
  | "head"
  | "face"
  | "eyes"
  | "hair"
  | "helmet"
  | "torso"
  | "arms"
  | "gloves"
  | "legs"
  | "boots"
  | "back"
  | "weapon"
  | "tool"
  | "aura"
  | "pet"
  | "emblem"
  | "mount"

export type CharacterStats = {
  speed: number
  precision: number
  riskControl: number
  liquidityReading: number
  macroVision: number
  volumePower: number
  emotionalControl: number
  creativity: number
  mobility: number
  resistance: number
}

export type EquippedParts = {
  body?: string
  head?: string
  face?: string
  eyes?: string
  hair?: string
  helmet?: string
  torso?: string
  arms?: string
  gloves?: string
  legs?: string
  boots?: string
  back?: string
  weapon?: string
  tool?: string
  aura?: string
  pet?: string
  emblem?: string
  mount?: string
}

export type Character = {
  id: string
  name: string
  title: string
  role: CharacterRole
  rarity: Rarity
  description: string
  colorPalette: string[]
  stats: CharacterStats
  defaultParts: EquippedParts
  compatibleMountIds: string[]
  modelUrl?: string
  thumbnailUrl?: string
  modelScale?: [number, number, number]
  modelPosition?: [number, number, number]
  modelRotation?: [number, number, number]
  riggedModelUrl?: string
  defaultAnimation?: string
  availableAnimations?: string[]
}

export type Mount = {
  id: string
  name: string
  type: string
  rarity: Rarity
  description: string
  compatibleCharacterIds: string[]
  colorPalette: string[]
  specialAbility: {
    name: string
    visualEffect: string
    gameplayEffect: string
    tradingMeaning: string
  }
  modelUrl?: string
  thumbnailUrl?: string
  modelScale?: [number, number, number]
  modelPosition?: [number, number, number]
  modelRotation?: [number, number, number]
  riggedModelUrl?: string
  defaultAnimation?: string
  availableAnimations?: string[]
}

export type CharacterLore = {
  short: string
  full: string
  origin: string
  tradingPhilosophy: string
  catchphrase: string
}

export type MountLore = {
  short: string
  full: string
  origin: string
  symbolicMeaning: string
}

export type PlayerCharacterConfig = {
  characterId: string
  displayName: string
  level: number
  experience: number
  equippedParts: EquippedParts
  selectedMountId?: string
  metadata: {
    world: string
    brand: string
    version: string
  }
  updatedAt: string
}
