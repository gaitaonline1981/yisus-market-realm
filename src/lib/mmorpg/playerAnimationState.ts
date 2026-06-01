export type PlayerMovementState = "idle" | "walking" | "running"

export function getAnimationFromMovementState(
  state: PlayerMovementState
): "Idle" | "Walk" | "Run" {
  if (state === "running") return "Run"
  if (state === "walking") return "Walk"
  return "Idle"
}

export function getMovementStateFromInput(params: {
  isMoving: boolean
  isRunning: boolean
}): PlayerMovementState {
  if (!params.isMoving) return "idle"
  if (params.isRunning) return "running"
  return "walking"
}
