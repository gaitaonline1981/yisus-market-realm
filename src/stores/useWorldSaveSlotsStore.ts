import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface WorldSaveSlot {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  selectedCharacterId: string
  selectedMountId: string
  activeZoneId: string
  playerPosition: [number, number, number]
  worldMountMode: "on-foot" | "companion" | "mounted"
  worldViewMode: "free-view" | "player"
  worldModelMode: "placeholder" | "glb-real"
  useAnimatedPlayer: boolean
}

interface WorldSaveSlotsState {
  slots: WorldSaveSlot[]
  saveSlot: (slot: WorldSaveSlot) => void
  deleteSlot: (slotId: string) => void
  renameSlot: (slotId: string, name: string) => void
  getSlot: (slotId: string) => WorldSaveSlot | undefined
  clearSlots: () => void
}

export const useWorldSaveSlotsStore = create<WorldSaveSlotsState>()(
  persist(
    (set, get) => ({
      slots: [],

      saveSlot: (slot) => {
        const { slots } = get()
        const existing = slots.findIndex((s) => s.id === slot.id)
        if (existing >= 0) {
          const next = [...slots]
          next[existing] = { ...slot, updatedAt: new Date().toISOString() }
          set({ slots: next })
        } else {
          set({ slots: [...slots, { ...slot, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }] })
        }
      },

      deleteSlot: (slotId) => {
        set({ slots: get().slots.filter((s) => s.id !== slotId) })
      },

      renameSlot: (slotId, name) => {
        set({
          slots: get().slots.map((s) =>
            s.id === slotId ? { ...s, name, updatedAt: new Date().toISOString() } : s
          ),
        })
      },

      getSlot: (slotId) => {
        return get().slots.find((s) => s.id === slotId)
      },

      clearSlots: () => set({ slots: [] }),
    }),
    { name: "yisus-market-realm-save-slots" }
  )
)
