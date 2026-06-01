import type { WorldSaveSlot } from "@/stores/useWorldSaveSlotsStore"

export function createSaveSlotId(): string {
  return `slot-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
}

export function downloadJson(filename: string, data: unknown): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename.endsWith(".json") ? filename : `${filename}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function parseImportedSave(jsonText: string): WorldSaveSlot | null {
  try {
    const data = JSON.parse(jsonText)
    if (
      typeof data.selectedCharacterId === "string" &&
      typeof data.selectedMountId === "string" &&
      typeof data.activeZoneId === "string" &&
      Array.isArray(data.playerPosition) &&
      data.playerPosition.length === 3
    ) {
      return data as WorldSaveSlot
    }
    return null
  } catch {
    return null
  }
}
