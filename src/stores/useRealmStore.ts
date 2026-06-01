import { create } from "zustand"
import { realmCharacters, getRealmCharacterById } from "@/data/realm/characters"
import { realmMounts, getRealmMountById } from "@/data/realm/mounts"
import { realmWorldZones, getRealmWorldZoneById } from "@/data/realm/world-zones"
import type { RealmCharacter, RealmMount, WorldZone } from "@/types/realm"
import type { Profile } from "@/lib/realm/supabase-service"

interface RealmState {
  selectedCharacterId: string | null
  selectedMountId: string | null
  selectedZoneId: string | null
  character: RealmCharacter | null
  mount: RealmMount | null
  zone: WorldZone | null
  level: number
  xp: number
  energy: number
  reputation: string
  userId: string | null
  sessionToken: string | null
  setCharacter: (id: string) => void
  setMount: (id: string) => void
  setZone: (id: string) => void
  addXp: (amount: number) => void
  syncFromSupabase: (profile: Profile) => void
  toSupabaseProfile: () => Partial<Profile>
  setSession: (userId: string, token: string) => void
  clearSession: () => void
}

export const useRealmStore = create<RealmState>((set, get) => ({
  selectedCharacterId: realmCharacters[0]?.id ?? null,
  selectedMountId: null,
  selectedZoneId: null,
  character: realmCharacters[0] ?? null,
  mount: null,
  zone: null,
  level: 1,
  xp: 0,
  energy: 100,
  reputation: "Novato del Realm",
  userId: null,
  sessionToken: null,

  setCharacter: (id) => {
    const c = getRealmCharacterById(id) || realmCharacters.find((ch) => ch.id === id) || null
    set({ selectedCharacterId: id, character: c, selectedMountId: null, mount: null })
  },

  setMount: (id) => {
    const m = getRealmMountById(id) || realmMounts.find((mo) => mo.id === id) || null
    set({ selectedMountId: id, mount: m })
  },

  setZone: (id) => {
    const z = getRealmWorldZoneById(id) || realmWorldZones.find((zo) => zo.id === id) || null
    set({ selectedZoneId: id, zone: z })
  },

  addXp: (amount) => {
    const { xp, level } = get()
    const newXp = xp + amount
    const xpNeeded = level * 100
    if (newXp >= xpNeeded) {
      set({ xp: newXp - xpNeeded, level: level + 1 })
    } else {
      set({ xp: newXp })
    }
  },

  syncFromSupabase: (profile) => {
    set({
      level: profile.level,
      xp: profile.xp,
      energy: profile.energy,
      reputation: profile.reputation,
      selectedCharacterId: profile.selected_character_id,
      selectedMountId: profile.selected_mount_id,
      character: profile.selected_character_id
        ? getRealmCharacterById(profile.selected_character_id) || null
        : null,
      mount: profile.selected_mount_id
        ? getRealmMountById(profile.selected_mount_id) || null
        : null,
    })
  },

  toSupabaseProfile: () => {
    const { level, xp, energy, reputation, selectedCharacterId, selectedMountId } = get()
    return {
      level,
      xp,
      energy,
      reputation,
      selected_character_id: selectedCharacterId,
      selected_mount_id: selectedMountId,
    }
  },

  setSession: (userId, token) => {
    set({ userId, sessionToken: token })
  },

  clearSession: () => {
    set({ userId: null, sessionToken: null })
  },
}))
