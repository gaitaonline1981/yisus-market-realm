import type { CloudWorldSession, CloudSaveSlot, CloudQuestProgress } from "@/types/mmorpgCloud"

export async function syncWorldSessionToCloud(
  _session: Omit<CloudWorldSession, "id" | "createdAt" | "updatedAt">
): Promise<{ ok: boolean; message: string }> {
  return { ok: false, message: "Cloud save todavía no está conectado. Sistema local activo." }
}

export async function loadWorldSessionFromCloud(
  _userId: string
): Promise<CloudWorldSession | null> {
  console.warn("Cloud save pendiente de implementación")
  return null
}

export async function syncSaveSlotToCloud(
  _slot: Omit<CloudSaveSlot, "createdAt" | "updatedAt">
): Promise<{ ok: boolean; message: string }> {
  return { ok: false, message: "Cloud save todavía no está conectado. Slot guardado solo localmente." }
}

export async function loadSaveSlotsFromCloud(
  _userId: string
): Promise<CloudSaveSlot[]> {
  console.warn("Cloud save pendiente de implementación")
  return []
}

export async function syncQuestProgressToCloud(
  _progress: Omit<CloudQuestProgress, "id" | "createdAt" | "updatedAt">
): Promise<{ ok: boolean; message: string }> {
  return { ok: false, message: "Progreso cloud pendiente. Progreso local activo." }
}
