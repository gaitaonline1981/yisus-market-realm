export type CharacterAnimationName =
  | "Idle"
  | "Walk"
  | "Run"
  | "Jump"
  | "Wave"
  | "Celebrate"
  | "Analyze"
  | "Skill_01"
  | "Skill_02"
  | "Ultimate"
  | "Mount"
  | "Dismount"

export type MountAnimationName =
  | "Idle"
  | "Walk"
  | "Run"
  | "Jump"
  | "Fly"
  | "Hover"
  | "MountIdle"
  | "Special"
  | "TurnLeft"
  | "TurnRight"

export interface AnimationPreset {
  id: string
  entityId: string
  entityType: "character" | "mount"
  defaultAnimation: string
  availableAnimations: string[]
  riggedModelUrl?: string
  notes?: string
}
