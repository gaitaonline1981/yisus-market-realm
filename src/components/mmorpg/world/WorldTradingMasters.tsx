"use client"

import { useMemo } from "react"
import { TradingMasterModel } from "./TradingMasterModel"
import { getMasterAsset } from "@/data/mmorpg/masterAssets"
import { tradingMasters } from "@/data/mmorpg/tradingMasters"

const MASTER_WORLD_POSITIONS: Record<string, { position: [number, number, number]; rotationY: number; scale: number }> = {
  "mentor-wyckoff-master": { position: [-4.2, 0, -3.25], rotationY: 0.2, scale: 0.75 },
  "elliott-sage-master": { position: [-4.2, 0, 4.1], rotationY: -0.3, scale: 0.75 },
  "master-dow": { position: [-0.9, 0, 2.8], rotationY: 0.1, scale: 0.75 },
  "oracle-of-value": { position: [0.9, 0, 2.8], rotationY: -0.1, scale: 0.75 },
  "lord-livermore": { position: [5.1, 0, -3.3], rotationY: -0.2, scale: 0.75 },
  "macro-bridge-master": { position: [-5.8, 0, 5.75], rotationY: 0.3, scale: 0.75 },
  "quant-architect": { position: [4.2, 0, 4.15], rotationY: -0.15, scale: 0.75 },
  "risk-paladin": { position: [-1.4, 0, 7.75], rotationY: 0, scale: 0.8 },
  "prop-firm-coach-master": { position: [1.4, 0, 7.75], rotationY: 0, scale: 0.78 },
  "psyche-monk": { position: [0, 0, 4.4], rotationY: 0, scale: 0.78 },
}

interface WorldTradingMastersProps {
  activeMasterId?: string | null
  nearMasterId?: string | null
  onSelectMaster?: (masterId: string) => void
}

export function WorldTradingMasters({ activeMasterId, nearMasterId, onSelectMaster }: WorldTradingMastersProps) {
  const masterIds = useMemo(() => tradingMasters.map((m) => m.id), [])

  return (
    <group>
      {masterIds.map((id) => {
        const pos = MASTER_WORLD_POSITIONS[id]
        if (!pos) return null
        return (
          <group
            key={id}
            position={pos.position}
            rotation={[0, pos.rotationY, 0]}
            scale={[pos.scale, pos.scale, pos.scale]}
          >
            <TradingMasterModel
              masterId={id}
              active={activeMasterId === id}
              near={nearMasterId === id}
              onSelect={onSelectMaster}
            />
          </group>
        )
      })}
    </group>
  )
}
