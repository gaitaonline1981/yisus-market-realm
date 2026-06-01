export interface MountOffsetConfig {
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

export const defaultMountOffset: MountOffsetConfig = {
  mountId: "default",
  characterPosition: [0, 0.8, 0],
  characterRotation: [0, 0, 0],
  characterScale: [0.8, 0.8, 0.8],
  mountPosition: [0, 0, 0],
  mountRotation: [0, 0, 0],
  mountScale: [1, 1, 1],
  notes: "Offset default para preview visual estático.",
}

export const mountOffsets: Record<string, MountOffsetConfig> = {
  "noble-steed": {
    mountId: "noble-steed",
    characterPosition: [0, 1.05, 0],
    characterRotation: [0, 0, 0],
    characterScale: [0.75, 0.75, 0.75],
    mountPosition: [0, 0, 0],
    mountRotation: [0, 3.1416, 0],
    mountScale: [1, 1, 1],
    notes: "Caballo fantasy, rotado 180° para mirar como pocket-rocket.",
  },
  "pocket-rocket": {
    mountId: "pocket-rocket",
    characterPosition: [0, 0.75, 0],
    characterRotation: [0, 0, 0],
    characterScale: [0.75, 0.75, 0.75],
    mountPosition: [0, 0, 0],
    mountRotation: [0, 0, 0],
    mountScale: [1, 1, 1],
    notes: "Kart pequeño, jinete sentado. Referencia de orientación correcta.",
  },
  "wind-dasher": {
    mountId: "wind-dasher",
    characterPosition: [0, 0.8, 0],
    characterRotation: [0, 0, 0],
    characterScale: [0.7, 0.7, 0.7],
    mountPosition: [0, 0, 0],
    mountRotation: [0, 0, 0],
    mountScale: [1, 1, 1],
    notes: "Avión steampunk, jinete en cabina.",
  },
  "skyward-talon": {
    mountId: "skyward-talon",
    characterPosition: [0, 0.95, 0],
    characterRotation: [0, 0, 0],
    characterScale: [0.7, 0.7, 0.7],
    mountPosition: [0, 0, 0],
    mountRotation: [0, 3.1416, 0],
    mountScale: [1, 1, 1],
    notes: "Ave gigante, rotada 180° para mirar como pocket-rocket.",
  },
  "liquidity-whale": {
    mountId: "liquidity-whale",
    characterPosition: [0, 1.25, 0],
    characterRotation: [0, 0, 0],
    characterScale: [0.65, 0.65, 0.65],
    mountPosition: [0, 0, 0],
    mountRotation: [0, 3.1416, 0],
    mountScale: [1, 1, 1],
    notes: "Ballena voladora, rotada 180°.",
  },
  "candle-dragon": {
    mountId: "candle-dragon",
    characterPosition: [0, 1.15, 0],
    characterRotation: [0, 0, 0],
    characterScale: [0.7, 0.7, 0.7],
    mountPosition: [0, 0, 0],
    mountRotation: [0, 0, 0],
    mountScale: [1, 1, 1],
    notes: "Dragón de velas, jinete sobre el lomo.",
  },
  "order-block-rhino": {
    mountId: "order-block-rhino",
    characterPosition: [0, 1.15, 0],
    characterRotation: [0, 0, 0],
    characterScale: [0.75, 0.75, 0.75],
    mountPosition: [0, 0, 0],
    mountRotation: [0, 3.1416, 0],
    mountScale: [1, 1, 1],
    notes: "Rinoceronte blindado, rotado 180°.",
  },
  "moon-hopper": {
    mountId: "moon-hopper",
    characterPosition: [0, 1.05, 0],
    characterRotation: [0, 0, 0],
    characterScale: [0.7, 0.7, 0.7],
    mountPosition: [0, 0, 0],
    mountRotation: [0, 3.1416, 0],
    mountScale: [1, 1, 1],
    notes: "Perro mecánico lunar, rotado 180°.",
  },
  "volatility-falcon": {
    mountId: "volatility-falcon",
    characterPosition: [0, 1.1, 0],
    characterRotation: [0, 0, 0],
    characterScale: [0.7, 0.7, 0.7],
    mountPosition: [0, 0, 0],
    mountRotation: [0, 0, 0],
    mountScale: [1, 1, 1],
    notes: "Mantarraya voladora, jinete arriba.",
  },
  "market-rover": {
    mountId: "market-rover",
    characterPosition: [0, 0.9, 0],
    characterRotation: [0, 0, 0],
    characterScale: [0.75, 0.75, 0.75],
    mountPosition: [0, 0, 0],
    mountRotation: [0, 3.1416, 0],
    mountScale: [1, 1, 1],
    notes: "Moto voladora, rotada 180°.",
  },
}
