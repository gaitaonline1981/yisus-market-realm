import { create } from "zustand"
import { persist } from "zustand/middleware"

export type GraphicsQuality = "low" | "medium" | "high"

interface GraphicsSettingsState {
  quality: GraphicsQuality
  showEnvironment: boolean
  showShadows: boolean
  showGrid: boolean
  showWorldStaticModels: boolean
  maxVisibleWorldModels: number

  setQuality: (quality: GraphicsQuality) => void
  setShowEnvironment: (value: boolean) => void
  setShowShadows: (value: boolean) => void
  setShowGrid: (value: boolean) => void
  setShowWorldStaticModels: (value: boolean) => void
  setMaxVisibleWorldModels: (value: number) => void
  resetGraphicsSettings: () => void
}

const DEFAULTS = {
  quality: "medium" as GraphicsQuality,
  showEnvironment: true,
  showShadows: true,
  showGrid: true,
  showWorldStaticModels: true,
  maxVisibleWorldModels: 12,
}

export const useGraphicsSettingsStore = create<GraphicsSettingsState>()(
  persist(
    (set) => ({
      ...DEFAULTS,
      setQuality: (quality) => set({ quality }),
      setShowEnvironment: (value) => set({ showEnvironment: value }),
      setShowShadows: (value) => set({ showShadows: value }),
      setShowGrid: (value) => set({ showGrid: value }),
      setShowWorldStaticModels: (value) => set({ showWorldStaticModels: value }),
      setMaxVisibleWorldModels: (value) => set({ maxVisibleWorldModels: value }),
      resetGraphicsSettings: () => set(DEFAULTS),
    }),
    { name: "yisus-market-realm-graphics-settings" }
  )
)
