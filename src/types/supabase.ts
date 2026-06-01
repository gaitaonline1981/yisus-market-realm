export interface SupabaseProfile {
  id: string
  user_id: string
  display_name: string
  level: number
  xp: number
  energy: number
  reputation: string
  selected_character_id: string | null
  selected_mount_id: string | null
  created_at: string
  updated_at: string
}

export interface SupabaseInventory {
  id: string
  user_id: string
  item_type: "title" | "mount" | "character" | "zone" | "achievement"
  item_id: string
  item_data: Record<string, unknown> | null
  unlocked_at: string
}

export interface SupabaseQuestProgress {
  id: string
  user_id: string
  quest_id: string
  status: "locked" | "available" | "active" | "completed"
  completed_at: string | null
}

export interface SupabasePlayerStats {
  id: string
  user_id: string
  puzzles_solved: number
  missions_completed: number
  zones_unlocked: number
  total_xp_earned: number
  updated_at: string
}

export interface SupabaseTables {
  profiles: SupabaseProfile
  inventory: SupabaseInventory
  quest_progress: SupabaseQuestProgress
  player_stats: SupabasePlayerStats
}
