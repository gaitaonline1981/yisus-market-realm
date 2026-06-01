import type { Rarity } from "@/types/mmorpg"

export interface RarityConfig {
  tier: Rarity
  label: string
  color: string
  textColor: string
  sortOrder: number
  statMultiplier: number
}

export const RARITY_CONFIG: Record<Rarity, RarityConfig> = {
  common:        { tier: 'common',        label: 'Común',         color: '#9CA3AF', textColor: '#FFFFFF', sortOrder: 0, statMultiplier: 1.0 },
  rare:          { tier: 'rare',          label: 'Raro',          color: '#3B82F6', textColor: '#FFFFFF', sortOrder: 1, statMultiplier: 1.5 },
  epic:          { tier: 'epic',          label: 'Épico',         color: '#8B5CF6', textColor: '#FFFFFF', sortOrder: 2, statMultiplier: 2.0 },
  legendary:     { tier: 'legendary',     label: 'Legendario',    color: '#F59E0B', textColor: '#000000', sortOrder: 3, statMultiplier: 3.0 },
  mythic:        { tier: 'mythic',        label: 'Mítico',        color: '#EF4444', textColor: '#FFFFFF', sortOrder: 4, statMultiplier: 5.0 },
  institutional: { tier: 'institutional', label: 'Institucional', color: '#1E3A5F', textColor: '#FFFFFF', sortOrder: 5, statMultiplier: 4.0 },
  lunatic:       { tier: 'lunatic',       label: 'Lunático',      color: '#F97316', textColor: '#000000', sortOrder: 6, statMultiplier: 7.0 },
}

export function getRarityLabel(rarity: Rarity): string {
  return RARITY_CONFIG[rarity]?.label ?? rarity
}

export function getRarityColor(rarity: Rarity): string {
  return RARITY_CONFIG[rarity]?.color ?? '#9CA3AF'
}
