import type { Rarity } from "@/types/mmorpg"
import { RARITY_CONFIG } from "@/data/mmorpg/rarities"

export const rarityStyles: Record<Rarity, {
  label: string
  color: string
  border: string
  gradient: string
  glow: string
  accent: string
}> = {
  common: {
    label: "Común",
    color: "#9CA3AF",
    border: `1px solid ${RARITY_CONFIG.common.color}44`,
    gradient: "linear-gradient(180deg, #1E293B, #0F172A)",
    glow: `0 0 20px ${RARITY_CONFIG.common.color}22`,
    accent: "#9CA3AF",
  },
  rare: {
    label: "Raro",
    color: "#3B82F6",
    border: `1px solid ${RARITY_CONFIG.rare.color}44`,
    gradient: "linear-gradient(180deg, #1E293B, #0F172A)",
    glow: `0 0 20px ${RARITY_CONFIG.rare.color}22`,
    accent: "#3B82F6",
  },
  epic: {
    label: "Épico",
    color: "#8B5CF6",
    border: `1px solid ${RARITY_CONFIG.epic.color}44`,
    gradient: "linear-gradient(180deg, #1E1B4B, #0F172A)",
    glow: `0 0 20px ${RARITY_CONFIG.epic.color}22`,
    accent: "#8B5CF6",
  },
  legendary: {
    label: "Legendario",
    color: "#F59E0B",
    border: `1px solid ${RARITY_CONFIG.legendary.color}44`,
    gradient: "linear-gradient(180deg, #1C1917, #0F172A)",
    glow: `0 0 20px ${RARITY_CONFIG.legendary.color}22`,
    accent: "#F59E0B",
  },
  mythic: {
    label: "Mítico",
    color: "#EF4444",
    border: `1px solid ${RARITY_CONFIG.mythic.color}44`,
    gradient: "linear-gradient(180deg, #1F0F0F, #0F172A)",
    glow: `0 0 20px ${RARITY_CONFIG.mythic.color}22`,
    accent: "#EF4444",
  },
  institutional: {
    label: "Institucional",
    color: "#1E3A5F",
    border: `1px solid ${RARITY_CONFIG.institutional.color}44`,
    gradient: "linear-gradient(180deg, #0F172A, #0A0F1A)",
    glow: `0 0 20px ${RARITY_CONFIG.institutional.color}22`,
    accent: "#2563EB",
  },
  lunatic: {
    label: "Lunático",
    color: "#F97316",
    border: `1px solid ${RARITY_CONFIG.lunatic.color}44`,
    gradient: "linear-gradient(180deg, #1C1410, #0F172A)",
    glow: `0 0 20px ${RARITY_CONFIG.lunatic.color}22`,
    accent: "#F97316",
  },
}
