export type RealmRarity =
  | "common"
  | "rare"
  | "epic"
  | "legendary"
  | "mythic"
  | "institutional"
  | "lunatic"

export type RealmCharacterStatus = "active" | "locked" | "coming_soon"

export type RealmCharacter = {
  id: string
  name: string
  title: string
  role: string
  rarity: RealmRarity
  description: string
  colorPalette: string[]
  stats: {
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
  modelUrl: string
  thumbnailUrl: string
  defaultMountId: string
  compatibleMountIds: string[]
  status: RealmCharacterStatus
}

export type RealmMount = {
  id: string
  name: string
  type: string
  rarity: RealmRarity
  description: string
  modelUrl: string
  thumbnailUrl: string
  compatibleCharacterIds: string[]
  colorPalette: string[]
  specialAbility: {
    name: string
    visualEffect: string
    gameplayEffect: string
    tradingMeaning: string
  }
  status: RealmCharacterStatus
}

export type AgentNPC = {
  id: string
  name: string
  role: string
  description: string
  specialty: string[]
  level: number
  rarity: RealmRarity
  icon: string
  status: "active" | "locked" | "coming_soon"
  route: string
  primaryAction: string
}

export type WorldZoneDifficulty = "easy" | "medium" | "hard" | "elite" | "boss"

export type WorldZoneStatus = "unlocked" | "locked" | "coming_soon"

export type WorldZone = {
  id: string
  name: string
  description: string
  type: "city" | "forest" | "mountain" | "tower" | "arena" | "port" | "lab" | "market" | "portal" | "vault"
  difficulty: WorldZoneDifficulty
  unlockLevel: number
  position: { x: number; y: number }
  connectedZones: string[]
  connectedAgents: string[]
  rewards: string[]
  status: WorldZoneStatus
  color: string
  icon: string
}

export type RealmStore = {
  selectedCharacterId: string | null
  selectedMountId: string | null
  selectedZoneId: string | null
  setSelectedCharacter: (id: string) => void
  setSelectedMount: (id: string) => void
  setSelectedZone: (id: string) => void
}
