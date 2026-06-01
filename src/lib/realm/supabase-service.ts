// Servicio Supabase para Yisus Market Realm
// Usa fetch() directamente, no requiere @supabase/supabase-js instalado
// Activar cuando se configuren las variables de entorno

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ""
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ""

function headers(sessionToken?: string): Record<string, string> {
  const h: Record<string, string> = {
    "Content-Type": "application/json",
    "apikey": SUPABASE_ANON_KEY,
  }
  if (sessionToken) h["Authorization"] = `Bearer ${sessionToken}`
  return h
}

async function fetchSupabase<T>(
  path: string,
  options: RequestInit = {},
  sessionToken?: string
): Promise<T> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn("[Supabase] No configurado. Seteá VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY")
    return null as T
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: { ...headers(sessionToken), ...options.headers },
  })
  if (!res.ok) throw new Error(`Supabase error: ${res.status} ${res.statusText}`)
  return res.json()
}

// ─── Profile ──────────────────────────────────────────

export interface Profile {
  id: string
  user_id: string
  display_name: string
  level: number
  xp: number
  energy: number
  reputation: string
  selected_character_id: string | null
  selected_mount_id: string | null
}

export async function getProfile(userId: string, token: string): Promise<Profile | null> {
  const profiles = await fetchSupabase<Profile[]>(
    `profiles?user_id=eq.${userId}&select=*`,
    { method: "GET" },
    token
  )
  return profiles?.[0] ?? null
}

export async function upsertProfile(profile: Partial<Profile>, userId: string, token: string): Promise<void> {
  await fetchSupabase(
    `profiles?user_id=eq.${userId}`,
    {
      method: "PATCH",
      body: JSON.stringify(profile),
    },
    token
  )
}

// ─── Inventory ─────────────────────────────────────────

export interface InventoryItem {
  id: string
  user_id: string
  item_type: "title" | "mount" | "character" | "zone" | "achievement"
  item_id: string
  item_data: Record<string, unknown> | null
}

export async function getInventory(userId: string, token: string): Promise<InventoryItem[]> {
  return fetchSupabase<InventoryItem[]>(
    `inventory?user_id=eq.${userId}&select=*`,
    { method: "GET" },
    token
  ) ?? []
}

export async function addInventoryItem(item: {
  user_id: string
  item_type: string
  item_id: string
  item_data?: Record<string, unknown>
}, token: string): Promise<void> {
  await fetchSupabase(
    "inventory",
    {
      method: "POST",
      body: JSON.stringify(item),
    },
    token
  )
}

// ─── Quest Progress ───────────────────────────────────

export interface QuestEntry {
  id: string
  user_id: string
  quest_id: string
  status: "locked" | "available" | "active" | "completed"
}

export async function getQuestProgress(userId: string, token: string): Promise<QuestEntry[]> {
  return fetchSupabase<QuestEntry[]>(
    `quest_progress?user_id=eq.${userId}&select=*`,
    { method: "GET" },
    token
  ) ?? []
}

export async function upsertQuestProgress(quest: {
  user_id: string
  quest_id: string
  status: string
}, token: string): Promise<void> {
  await fetchSupabase(
    `quest_progress?user_id=eq.${quest.user_id}&quest_id=eq.${quest.quest_id}`,
    {
      method: "UPSERT",
      body: JSON.stringify(quest),
    },
    token
  )
}

// ─── Player Stats ──────────────────────────────────────

export interface PlayerStats {
  puzzles_solved: number
  missions_completed: number
  zones_unlocked: number
  total_xp_earned: number
}

export async function getPlayerStats(userId: string, token: string): Promise<PlayerStats | null> {
  const stats = await fetchSupabase<PlayerStats[]>(
    `player_stats?user_id=eq.${userId}&select=*`,
    { method: "GET" },
    token
  )
  return stats?.[0] ?? null
}

export async function updatePlayerStats(stats: Partial<PlayerStats>, userId: string, token: string): Promise<void> {
  await fetchSupabase(
    `player_stats?user_id=eq.${userId}`,
    {
      method: "PATCH",
      body: JSON.stringify(stats),
    },
    token
  )
}
