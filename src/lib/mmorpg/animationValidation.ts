export interface AnimationValidationResult {
  expected: string[]
  found: string[]
  missing: string[]
  extra: string[]
  hasRequiredIdle: boolean
  hasRequiredWalk: boolean
  hasRequiredRun: boolean
  isValidForBasicMovement: boolean
}

export function validateAnimations(
  expectedAnimations: string[],
  foundAnimations: string[]
): AnimationValidationResult {
  const foundSet = new Set(foundAnimations)
  const expectedSet = new Set(expectedAnimations)

  const missing = expectedAnimations.filter((a) => !foundSet.has(a))
  const extra = foundAnimations.filter((a) => !expectedSet.has(a))

  return {
    expected: [...expectedAnimations],
    found: [...foundAnimations],
    missing,
    extra,
    hasRequiredIdle: foundSet.has("Idle"),
    hasRequiredWalk: foundSet.has("Walk"),
    hasRequiredRun: foundSet.has("Run"),
    isValidForBasicMovement:
      foundSet.has("Idle") && foundSet.has("Walk") && foundSet.has("Run"),
  }
}

export function normalizeAnimationName(name: string): string {
  return name.trim()
}
