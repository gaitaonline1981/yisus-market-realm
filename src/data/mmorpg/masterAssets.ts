export interface MasterAsset {
  id: string
  pngPath: string
  glbPath: string
  thumbnailPath: string
  hasPng: boolean
  hasGlb: boolean
}

export const masterAssets: Record<string, MasterAsset> = {
  "mentor-wyckoff-master": { id: "mentor-wyckoff-master", pngPath: "/models/mmorpg/masters/mentor-wyckoff/mentor-wyckoff.png", glbPath: "/models/mmorpg/masters/mentor-wyckoff/mentor-wyckoff.glb", thumbnailPath: "/models/mmorpg/masters/mentor-wyckoff/thumbnail.png", hasPng: true, hasGlb: true },
  "elliott-sage-master": { id: "elliott-sage-master", pngPath: "/models/mmorpg/masters/elliott-sage/elliott-sage.png", glbPath: "/models/mmorpg/masters/elliott-sage/elliott-sage.glb", thumbnailPath: "/models/mmorpg/masters/elliott-sage/thumbnail.png", hasPng: true, hasGlb: true },
  "oracle-of-value": { id: "oracle-of-value", pngPath: "/models/mmorpg/masters/oracle-of-value/oracle-of-value.png", glbPath: "/models/mmorpg/masters/oracle-of-value/oracle-of-value.glb", thumbnailPath: "/models/mmorpg/masters/oracle-of-value/thumbnail.png", hasPng: true, hasGlb: true },
  "lord-livermore": { id: "lord-livermore", pngPath: "/models/mmorpg/masters/lord-livermore/lord-livermore.png", glbPath: "/models/mmorpg/masters/lord-livermore/lord-livermore.glb", thumbnailPath: "/models/mmorpg/masters/lord-livermore/thumbnail.png", hasPng: true, hasGlb: true },
  "master-dow": { id: "master-dow", pngPath: "/models/mmorpg/masters/master-dow/master-dow.png", glbPath: "/models/mmorpg/masters/master-dow/master-dow.glb", thumbnailPath: "/models/mmorpg/masters/master-dow/thumbnail.png", hasPng: true, hasGlb: true },
  "macro-bridge-master": { id: "macro-bridge-master", pngPath: "/models/mmorpg/masters/macro-bridge-master/macro-bridge-master.png", glbPath: "/models/mmorpg/masters/macro-bridge-master/macro-bridge-master.glb", thumbnailPath: "/models/mmorpg/masters/macro-bridge-master/thumbnail.png", hasPng: true, hasGlb: true },
  "quant-architect": { id: "quant-architect", pngPath: "/models/mmorpg/masters/quant-architect/quant-architect.png", glbPath: "/models/mmorpg/masters/quant-architect/quant-architect.glb", thumbnailPath: "/models/mmorpg/masters/quant-architect/thumbnail.png", hasPng: true, hasGlb: true },
  "risk-paladin": { id: "risk-paladin", pngPath: "/models/mmorpg/masters/risk-paladin/risk-paladin.png", glbPath: "/models/mmorpg/masters/risk-paladin/risk-paladin.glb", thumbnailPath: "/models/mmorpg/masters/risk-paladin/thumbnail.png", hasPng: true, hasGlb: true },
  "prop-firm-coach-master": { id: "prop-firm-coach-master", pngPath: "/models/mmorpg/masters/prop-firm-coach/prop-firm-coach.png", glbPath: "/models/mmorpg/masters/prop-firm-coach/prop-firm-coach.glb", thumbnailPath: "/models/mmorpg/masters/prop-firm-coach/thumbnail.png", hasPng: true, hasGlb: true },
  "psyche-monk": { id: "psyche-monk", pngPath: "/models/mmorpg/masters/psyche-monk/psyche-monk.png", glbPath: "/models/mmorpg/masters/psyche-monk/psyche-monk.glb", thumbnailPath: "/models/mmorpg/masters/psyche-monk/thumbnail.png", hasPng: true, hasGlb: true },
}

export function getMasterAsset(id: string): MasterAsset | undefined {
  return masterAssets[id]
}
