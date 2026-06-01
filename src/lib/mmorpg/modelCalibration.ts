import type { ModelCalibration } from "@/data/mmorpg/modelCalibrationDefaults"
import {
  characterCalibrationDefaults,
  defaultModelCalibration,
  masterCalibrationDefaults,
  mountCalibrationDefaults,
} from "@/data/mmorpg/modelCalibrationDefaults"

export function getCharacterCalibration(characterId: string): ModelCalibration {
  return characterCalibrationDefaults[characterId] ?? defaultModelCalibration
}

export function getMountCalibration(mountId: string): ModelCalibration {
  return mountCalibrationDefaults[mountId] ?? defaultModelCalibration
}

export function getMasterCalibration(masterId: string): ModelCalibration {
  return masterCalibrationDefaults[masterId] ?? defaultModelCalibration
}

export function formatCalibrationForData(calibration: ModelCalibration): string {
  const fmt = (v: number) => Number.isInteger(v) ? v.toFixed(1) : parseFloat(v.toFixed(4)).toString()
  return [
    `modelScale: [${calibration.scale.map(fmt).join(", ")}],`,
    `modelPosition: [${calibration.position.map(fmt).join(", ")}],`,
    `modelRotation: [${calibration.rotation.map(fmt).join(", ")}],`,
  ].join("\n")
}

export function formatCalibrationBlock(
  id: string,
  calibration: ModelCalibration,
  entityType: "character" | "mount"
): string {
  const fmt = (v: number) => Number.isInteger(v) ? v.toFixed(1) : parseFloat(v.toFixed(4)).toString()
  const key = entityType === "mount" ? `"${id}"` : id
  return [
    `// Pegar en ${entityType === "character" ? "character" : "mount"}CalibrationDefaults["${id}"]`,
    `${key}: {`,
    `  scale: [${calibration.scale.map(fmt).join(", ")}],`,
    `  position: [${calibration.position.map(fmt).join(", ")}],`,
    `  rotation: [${calibration.rotation.map(fmt).join(", ")}],`,
    `},`,
  ].join("\n")
}
