import { mountOffsets, defaultMountOffset, type MountOffsetConfig } from "@/data/mmorpg/mountOffsets"

export function getMountOffset(mountId?: string): MountOffsetConfig {
  if (mountId && mountOffsets[mountId]) {
    return mountOffsets[mountId]
  }
  return defaultMountOffset
}

export function formatMountOffsetForData(config: MountOffsetConfig): string {
  const fmt = (v: number) => Number.isInteger(v) ? v.toFixed(1) : parseFloat(v.toFixed(4)).toString()
  return [
    `"${config.mountId}": {`,
    `  characterPosition: [${config.characterPosition.map(fmt).join(", ")}],`,
    `  characterRotation: [${config.characterRotation.map(fmt).join(", ")}],`,
    `  characterScale: [${config.characterScale.map(fmt).join(", ")}],`,
    `  mountPosition: [${config.mountPosition.map(fmt).join(", ")}],`,
    `  mountRotation: [${config.mountRotation.map(fmt).join(", ")}],`,
    `  mountScale: [${config.mountScale.map(fmt).join(", ")}],`,
    `  notes: "${config.notes || ""}",`,
    `},`,
  ].join("\n")
}
