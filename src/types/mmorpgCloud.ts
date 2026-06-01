export type CloudSaveStatus = "local_only" | "pending_sync" | "synced" | "sync_error"

export interface CloudPlayerProfile {
  id: string
  userId: string
  displayName: string
  selectedCharacterId: string
  selectedMountId: string
  createdAt: string
  updatedAt: string
}

export interface CloudWorldSession {
  id: string
  userId: string
  selectedCharacterId: string
  selectedMountId: string
  activeZoneId: string
  playerPosition: [number, number, number]
  worldMountMode: "on-foot" | "companion" | "mounted"
  worldViewMode: "free-view" | "player"
  worldModelMode: "placeholder" | "glb-real"
  useAnimatedPlayer: boolean
  createdAt: string
  updatedAt: string
}

export interface CloudSaveSlot {
  id: string
  userId: string
  name: string
  selectedCharacterId: string
  selectedMountId: string
  activeZoneId: string
  playerPosition: [number, number, number]
  worldMountMode: "on-foot" | "companion" | "mounted"
  worldViewMode: "free-view" | "player"
  worldModelMode: "placeholder" | "glb-real"
  useAnimatedPlayer: boolean
  xp: number
  completedQuestIds: string[]
  titles: string[]
  createdAt: string
  updatedAt: string
}

export interface CloudQuestProgress {
  id: string
  userId: string
  questId: string
  status: "active" | "completed"
  completedAt?: string
  createdAt: string
  updatedAt: string
}

export interface CloudInventoryItem {
  id: string
  userId: string
  itemId: string
  itemType: "character" | "mount" | "skin" | "accessory" | "title" | "badge"
  unlocked: boolean
  equipped: boolean
  createdAt: string
  updatedAt: string
}
