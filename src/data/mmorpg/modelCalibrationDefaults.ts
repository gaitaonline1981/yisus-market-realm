export interface ModelCalibration {
  scale: [number, number, number]
  position: [number, number, number]
  rotation: [number, number, number]
}

export const defaultModelCalibration: ModelCalibration = {
  scale: [1, 1, 1],
  position: [0, 0, 0],
  rotation: [0, 0, 0],
}

export const characterCalibrationDefaults: Record<string, ModelCalibration> = {
  ticker: { scale: [1, 1, 1], position: [0, 0.5, 0], rotation: [0, 0, 0] },
  hedgey: { scale: [1, 1, 1], position: [0, 0.5, 0], rotation: [0, 0, 0] },
  slyde: { scale: [1, 1, 1], position: [0, 0.5, 0], rotation: [0, 0, 0] },
  maci: { scale: [1, 1, 1], position: [0, 0.5, 0], rotation: [0, 0, 0] },
  volumax: { scale: [1, 1, 1], position: [0, 0.5, 0], rotation: [0, 0, 0] },
  waven: { scale: [1, 1, 1], position: [0, 0.5, 0], rotation: [0, 0, 0] },
  sproket: { scale: [1, 1, 1], position: [0, 0.5, 0], rotation: [0, 0, 0] },
  flipper: { scale: [1, 1, 1], position: [0, 0.5, 0], rotation: [0, 0, 0] },
}

export const masterCalibrationDefaults: Record<string, ModelCalibration> = {
  "mentor-wyckoff-master": { scale: [1, 1, 1], position: [0, 0.5, 0], rotation: [0, 0, 0] },
  "elliott-sage-master": { scale: [1, 1, 1], position: [0, 0.5, 0], rotation: [0, 0, 0] },
  "oracle-of-value": { scale: [1, 1, 1], position: [0, 0.5, 0], rotation: [0, 0, 0] },
  "lord-livermore": { scale: [1, 1, 1], position: [0, 0.5, 0], rotation: [0, 0, 0] },
  "master-dow": { scale: [1, 1, 1], position: [0, 0.5, 0], rotation: [0, 0, 0] },
  "macro-bridge-master": { scale: [1, 1, 1], position: [0, 0.5, 0], rotation: [0, 0, 0] },
  "quant-architect": { scale: [1, 1, 1], position: [0, 0.5, 0], rotation: [0, 0, 0] },
  "risk-paladin": { scale: [1, 1, 1], position: [0, 0.5, 0], rotation: [0, 0, 0] },
  "prop-firm-coach-master": { scale: [1, 1, 1], position: [0, 0.5, 0], rotation: [0, 0, 0] },
  "psyche-monk": { scale: [1, 1, 1], position: [0, 0.5, 0], rotation: [0, 0, 0] },
}

export const mountCalibrationDefaults: Record<string, ModelCalibration> = {
  "noble-steed": { scale: [1, 1, 1], position: [0, 0.446, 0], rotation: [0, 0, 0] },
  "pocket-rocket": { scale: [1, 1, 1], position: [0, 0.337, 0], rotation: [0, 0, 0] },
  "wind-dasher": { scale: [1, 1, 1], position: [0, 0.292, 0], rotation: [0, 0, 0] },
  "skyward-talon": { scale: [1, 1, 1], position: [0, 0.337, 0], rotation: [0, 0, 0] },
  "liquidity-whale": { scale: [1, 1, 1], position: [0, 0.303, 0], rotation: [0, 0, 0] },
  "candle-dragon": { scale: [1, 1, 1], position: [0, 0.288, 0], rotation: [0, 0, 0] },
  "order-block-rhino": { scale: [1, 1, 1], position: [0, 0.44, 0], rotation: [0, 0, 0] },
  "moon-hopper": { scale: [1, 1, 1], position: [0, 0.37, 0], rotation: [0, 0, 0] },
  "volatility-falcon": { scale: [1, 1, 1], position: [0, 0.167, 0], rotation: [0, 0, 0] },
  "market-rover": { scale: [1, 1, 1], position: [0, 0.351, 0], rotation: [0, 0, 0] },
}
