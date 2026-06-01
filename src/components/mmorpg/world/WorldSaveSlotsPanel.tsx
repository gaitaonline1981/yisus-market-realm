"use client"

import { WorldSaveSlot } from "@/stores/useWorldSaveSlotsStore"

interface Props {
  currentSession: {
    selectedCharacterId: string; selectedMountId?: string; activeZoneId: string
    playerPosition: [number, number, number]; worldMountMode: string
    worldViewMode: string; worldModelMode: string; useAnimatedPlayer: boolean
  }
  onLoadSlot: (slot: WorldSaveSlot) => void
}

export function WorldSaveSlotsPanel({ currentSession, onLoadSlot }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Slots de guardado</p>
      <p className="mb-3 text-[9px] italic text-zinc-500">Guardá y cargá tu progreso local.</p>

      <div className="grid gap-2">
        {[1, 2, 3].map((num) => {
          const slotKey = `slot_${num}`
          return (
            <div
              key={num}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-300">Slot {num}</span>
                <span className="text-[8px] text-zinc-600">Vacío</span>
              </div>
              <p className="text-[8px] text-zinc-600">Guardá tu sesión actual para retomarla después.</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
