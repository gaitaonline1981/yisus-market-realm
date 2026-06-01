import { create } from "zustand"
import { persist } from "zustand/middleware"

export type WorldMountMode = "on-foot" | "companion" | "mounted"
export type WorldViewMode = "free-view" | "player"
export type WorldModelMode = "placeholder" | "glb-real"

interface WorldSessionState {
  selectedCharacterId: string
  selectedMountId: string
  activeZoneId: string
  playerPosition: [number, number, number]
  worldMountMode: WorldMountMode
  worldViewMode: WorldViewMode
  worldModelMode: WorldModelMode
  useAnimatedPlayer: boolean

  setSelectedCharacterId: (characterId: string) => void
  setSelectedMountId: (mountId: string) => void
  setActiveZoneId: (zoneId: string) => void
  setPlayerPosition: (position: [number, number, number]) => void
  setWorldMountMode: (mode: WorldMountMode) => void
  setWorldViewMode: (mode: WorldViewMode) => void
  setWorldModelMode: (mode: WorldModelMode) => void
  setUseAnimatedPlayer: (value: boolean) => void
  resetWorldSession: () => void
}

const DEFAULTS = {
  selectedCharacterId: "ticker",
  selectedMountId: "pocket-rocket",
  activeZoneId: "central-hub",
  playerPosition: [0, 0, 0] as [number, number, number],
  worldMountMode: "companion" as WorldMountMode,
  worldViewMode: "free-view" as WorldViewMode,
  worldModelMode: "placeholder" as WorldModelMode,
  useAnimatedPlayer: false,
}

export const useWorldSessionStore = create<WorldSessionState>()(
  persist(
    (set) => ({
      ...DEFAULTS,

      setSelectedCharacterId: (characterId) => set({ selectedCharacterId: characterId }),
      setSelectedMountId: (mountId) => set({ selectedMountId: mountId }),
      setActiveZoneId: (zoneId) => set({ activeZoneId: zoneId }),
      setPlayerPosition: (position) => set({ playerPosition: position }),
      setWorldMountMode: (mode) => set({ worldMountMode: mode }),
      setWorldViewMode: (mode) => set({ worldViewMode: mode }),
      setWorldModelMode: (mode) => set({ worldModelMode: mode }),
      setUseAnimatedPlayer: (value) => set({ useAnimatedPlayer: value }),
      resetWorldSession: () => set(DEFAULTS),
    }),
    {
      name: "yisus-market-realm-world-session",
    }
  )
)
