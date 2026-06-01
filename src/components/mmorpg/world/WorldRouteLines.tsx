"use client"

import { useMemo } from "react"
import * as THREE from "three"
import { worldZones } from "@/data/mmorpg/worldZones"

const ROUTES: [string, string][] = [
  ["central-hub", "liquidity-lake"],
  ["central-hub", "candle-volcano"],
  ["central-hub", "macro-observatory"],
  ["central-hub", "mechanic-lab"],
  ["central-hub", "risk-citadel"],
  ["liquidity-lake", "macro-observatory"],
  ["candle-volcano", "mechanic-lab"],
  ["macro-observatory", "risk-citadel"],
  ["mechanic-lab", "risk-citadel"],
]

export function WorldRouteLines() {
  const lines = useMemo(() => {
    const zoneMap = new Map(worldZones.map((z) => [z.id, z.position]))
    const result: { start: THREE.Vector3; end: THREE.Vector3; mid: THREE.Vector3; angle: number; distance: number }[] = []

    for (const [a, b] of ROUTES) {
      const pA = zoneMap.get(a)
      const pB = zoneMap.get(b)
      if (!pA || !pB) continue

      const start = new THREE.Vector3(pA[0], 0.03, pA[2])
      const end = new THREE.Vector3(pB[0], 0.03, pB[2])
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
      const distance = start.distanceTo(end)
      const angle = Math.atan2(end.x - start.x, end.z - start.z)

      result.push({ start, end, mid, angle, distance })
    }
    return result
  }, [])

  return (
    <group>
      {lines.map((line, i) => (
        <mesh
          key={i}
          position={[line.mid.x, 0.03, line.mid.z]}
          rotation={[0, -line.angle, 0]}
        >
          <boxGeometry args={[0.04, 0.01, line.distance]} />
          <meshStandardMaterial
            color="#22D3EE"
            transparent
            opacity={0.15}
            emissive="#22D3EE"
            emissiveIntensity={0.05}
          />
        </mesh>
      ))}
    </group>
  )
}
