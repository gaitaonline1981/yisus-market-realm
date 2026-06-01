export function getSafeAnimationName(
  requestedAnimation: string | undefined,
  availableAnimations: string[] | undefined,
  fallback = "Idle"
): string | undefined {
  if (!availableAnimations || availableAnimations.length === 0) return undefined
  if (requestedAnimation && availableAnimations.includes(requestedAnimation)) return requestedAnimation
  if (availableAnimations.includes(fallback)) return fallback
  return availableAnimations[0]
}

export function hasAnimations(availableAnimations?: string[]): boolean {
  return Array.isArray(availableAnimations) && availableAnimations.length > 0
}

export function formatAnimationNames(names?: string[]): string {
  if (!names || names.length === 0) return "Ninguna"
  return names.join(", ")
}
