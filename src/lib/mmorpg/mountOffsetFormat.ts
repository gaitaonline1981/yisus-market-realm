export interface MountOffsetLike {
  mountId: string
  characterPosition: [number, number, number]
  characterRotation: [number, number, number]
  characterScale: [number, number, number]
  mountPosition: [number, number, number]
  mountRotation: [number, number, number]
  mountScale: [number, number, number]
  cameraHint?: [number, number, number]
  notes?: string
}

export function formatMountOffsetForClipboard(offset: MountOffsetLike): string {
  const fmt = (n: number) => parseFloat(n.toFixed(3)).toString()
  const key = offset.mountId === "default" ? "default" : `"${offset.mountId}"`
  return [
    `${key}: {`,
    `  mountId: "${offset.mountId}",`,
    `  characterPosition: [${offset.characterPosition.map(fmt).join(", ")}],`,
    `  characterRotation: [${offset.characterRotation.map(fmt).join(", ")}],`,
    `  characterScale: [${offset.characterScale.map(fmt).join(", ")}],`,
    `  mountPosition: [${offset.mountPosition.map(fmt).join(", ")}],`,
    `  mountRotation: [${offset.mountRotation.map(fmt).join(", ")}],`,
    `  mountScale: [${offset.mountScale.map(fmt).join(", ")}],`,
    `  notes: "Offset calibrado para preview visual estático.",`,
    `},`,
  ].join("\n")
}
