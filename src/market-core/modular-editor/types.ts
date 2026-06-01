export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic'

export interface RarityConfig {
  tier: Rarity
  color: string
  label: string
  sortOrder: number
  statMultiplier: number
}

export const RARITY_CONFIG: Record<Rarity, RarityConfig> = {
  common:    { tier: 'common',    color: '#9CA3AF', label: 'Común',         sortOrder: 0, statMultiplier: 1.0 },
  uncommon:  { tier: 'uncommon',  color: '#22C55E', label: 'Poco Común',    sortOrder: 1, statMultiplier: 1.2 },
  rare:      { tier: 'rare',      color: '#3B82F6', label: 'Raro',          sortOrder: 2, statMultiplier: 1.5 },
  epic:      { tier: 'epic',      color: '#8B5CF6', label: 'Épico',         sortOrder: 3, statMultiplier: 2.0 },
  legendary: { tier: 'legendary', color: '#F59E0B', label: 'Legendario',    sortOrder: 4, statMultiplier: 3.0 },
  mythic:    { tier: 'mythic',    color: '#EF4444', label: 'Mítico',        sortOrder: 5, statMultiplier: 5.0 },
}

export type CharacterId =
  | 'ticker' | 'hedgey' | 'slyde' | 'maci'
  | 'volumax' | 'waven' | 'sproket' | 'flipper'

export type BodyPartSlot =
  | 'head' | 'face' | 'ears' | 'hair' | 'eyes'
  | 'torso' | 'arms' | 'hands'
  | 'legs' | 'feet' | 'tail'

export type AccessorySlot =
  | 'headwear' | 'facewear' | 'neckwear' | 'back'
  | 'weapon' | 'shield' | 'pet' | 'emote' | 'aura'

export type MountSlot = 'mount'

export type EquipSlot = BodyPartSlot | AccessorySlot | MountSlot

export interface BodyPart {
  id: string
  name: string
  characterId: CharacterId
  slot: BodyPartSlot
  rarity: Rarity
  modelPath: string
  thumbnail: string
  colors: string[]
  stats: Partial<BodyStats>
  tags: string[]
  unlockCondition?: UnlockCondition
}

export interface Accessory {
  id: string
  name: string
  slot: AccessorySlot
  rarity: Rarity
  modelPath: string
  thumbnail: string
  compatibleCharacters: CharacterId[]
  colors: string[]
  stats?: Partial<BodyStats>
  tags: string[]
  unlockCondition?: UnlockCondition
}

export interface MountData {
  id: string
  name: string
  type: 'ground' | 'flying' | 'hybrid'
  category: 'fantasy' | 'tech' | 'beast'
  rarity: Rarity
  modelPath: string
  thumbnail: string
  compatibleCharacters: CharacterId[]
  speed: number
  specialAbility: string
  colors: string[]
  unlockCondition?: UnlockCondition
  animations: string[]
}

export interface BodyStats {
  speed: number
  strength: number
  defense: number
  agility: number
  luck: number
  trading: number
}

export interface UnlockCondition {
  type: 'level' | 'quest' | 'achievement' | 'collect' | 'trade'
  requirement: string
  value: number | string
  description: string
}

export interface CharacterEquipment {
  characterId: CharacterId
  parts: Partial<Record<BodyPartSlot, string>>
  accessories: Partial<Record<AccessorySlot, string>>
  mount: string | null
}

export interface CharacterState {
  characterId: CharacterId
  level: number
  experience: number
  equipment: CharacterEquipment
  inventory: string[]
  unlockedParts: string[]
  unlockedAccessories: string[]
  unlockedMounts: string[]
  stats: BodyStats
  completedQuests: string[]
  achievements: string[]
}

export interface CharacterTemplate {
  id: CharacterId
  name: string
  title: string
  description: string
  defaultParts: Partial<Record<BodyPartSlot, string>>
  baseStats: BodyStats
  height: number
  scale: number
  compatibleAccessorySlots: AccessorySlot[]
  compatibleMountIds: string[]
  tags: string[]
  personality: string
  colorPalette: string[]
}

export interface CompatibilityMatrix {
  characterId: CharacterId
  bodyParts: BodyPart[]
  compatibleAccessories: string[]
  compatibleMounts: string[]
  incompatibleAccessories: string[]
  incompatibleMounts: string[]
}

export interface InventorySlot {
  slot: EquipSlot
  label: string
  icon: string
  equipped: string | null
  available: string[]
}

export interface EditorState {
  selectedCharacter: CharacterId | null
  selectedPart: EquipSlot | null
  currentEquipment: CharacterEquipment
  availableParts: BodyPart[]
  availableAccessories: Accessory[]
  availableMounts: MountData[]
  previewRotation: number
  previewZoom: number
  showWireframe: boolean
  showGrid: boolean
}

export interface CharacterPartConfig {
  slot: BodyPartSlot
  label: string
  icon: string
  order: number
}

export const BODY_PART_SLOTS: CharacterPartConfig[] = [
  { slot: 'head', label: 'Cabeza', icon: '🧠', order: 0 },
  { slot: 'face', label: 'Rostro', icon: '😊', order: 1 },
  { slot: 'ears', label: 'Orejas', icon: '👂', order: 2 },
  { slot: 'hair', label: 'Cabello/Crin', icon: '💇', order: 3 },
  { slot: 'eyes', label: 'Ojos', icon: '👁️', order: 4 },
  { slot: 'torso', label: 'Torso', icon: '👕', order: 5 },
  { slot: 'arms', label: 'Brazos', icon: '💪', order: 6 },
  { slot: 'hands', label: 'Manos', icon: '✋', order: 7 },
  { slot: 'legs', label: 'Piernas', icon: '🦵', order: 8 },
  { slot: 'feet', label: 'Pies', icon: '🦶', order: 9 },
  { slot: 'tail', label: 'Cola', icon: '🦊', order: 10 },
]

export const ACCESSORY_SLOTS: CharacterPartConfig[] = [
  { slot: 'headwear', label: 'Sombrero', icon: '🎩', order: 0 },
  { slot: 'facewear', label: 'Gafas', icon: '👓', order: 1 },
  { slot: 'neckwear', label: 'Collar', icon: '📿', order: 2 },
  { slot: 'back', label: 'Capa/Mochila', icon: '🎒', order: 3 },
  { slot: 'weapon', label: 'Arma', icon: '⚔️', order: 4 },
  { slot: 'shield', label: 'Escudo', icon: '🛡️', order: 5 },
  { slot: 'pet', label: 'Mascota', icon: '🐾', order: 6 },
  { slot: 'emote', label: 'Emote', icon: '💃', order: 7 },
  { slot: 'aura', label: 'Aura', icon: '✨', order: 8 },
]

export const RARITY_BY_COLOR: Record<string, Rarity> = {
  '#9CA3AF': 'common',
  '#22C55E': 'uncommon',
  '#3B82F6': 'rare',
  '#8B5CF6': 'epic',
  '#F59E0B': 'legendary',
  '#EF4444': 'mythic',
}
