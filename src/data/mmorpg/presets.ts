import type { EquippedParts, PlayerCharacterConfig } from "@/types/mmorpg"

const STORAGE_KEY = "mmorpg-editor-presets"

export function saveConfig(config: PlayerCharacterConfig): void {
  const existing = loadAllConfigs()
  const idx = existing.findIndex(c => c.characterId === config.characterId)
  if (idx >= 0) {
    existing[idx] = config
  } else {
    existing.push(config)
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
}

export function loadAllConfigs(): PlayerCharacterConfig[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function loadConfig(characterId: string): PlayerCharacterConfig | null {
  return loadAllConfigs().find(c => c.characterId === characterId) ?? null
}

export function exportConfigAsJSON(config: PlayerCharacterConfig): string {
  return JSON.stringify(config, null, 2)
}

export function importConfigFromJSON(json: string): PlayerCharacterConfig | null {
  try {
    const parsed = JSON.parse(json)
    if (!parsed.characterId || !parsed.equippedParts) return null
    return parsed as PlayerCharacterConfig
  } catch {
    return null
  }
}
