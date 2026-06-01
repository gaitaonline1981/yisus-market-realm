import type { GraphicsQuality } from "@/stores/useGraphicsSettingsStore"

export function getDprForQuality(quality: GraphicsQuality): [number, number] {
  if (quality === "low") return [1, 1]
  if (quality === "medium") return [1, 1.5]
  return [1, 2]
}

export function getCameraDistanceForQuality(quality: GraphicsQuality): number {
  if (quality === "low") return 9
  if (quality === "medium") return 7
  return 6
}

export function shouldUseEnvironment(quality: GraphicsQuality, showEnvironment: boolean): boolean {
  if (quality === "low") return false
  return showEnvironment
}

export function getMaxVisibleModels(quality: GraphicsQuality, maxVisibleWorldModels: number): number {
  if (quality === "low") return Math.min(maxVisibleWorldModels, 6)
  if (quality === "medium") return Math.min(maxVisibleWorldModels, 12)
  return maxVisibleWorldModels
}
