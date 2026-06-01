import type { CharacterSkill } from "@/types/mmorpg"
import { skills } from "@/data/mmorpg/skills"

const SKILL_MAP: Record<string, string[]> = {
  ticker:   ["scalper-flash"],
  hedgey:   ["risk-barrier"],
  slyde:    ["liquidity-sense"],
  maci:     ["macro-vision"],
  volumax:  ["volume-roar"],
  waven:    ["wave-surf"],
  sproket:  ["quant-analysis"],
  flipper:  ["lucky-find"],
}

export function getCharacterSkills(characterId: string): CharacterSkill[] {
  const skillIds = SKILL_MAP[characterId]
  if (!skillIds) return []
  return skillIds.map((id) => skills.find((s) => s.id === id)).filter(Boolean) as CharacterSkill[]
}
