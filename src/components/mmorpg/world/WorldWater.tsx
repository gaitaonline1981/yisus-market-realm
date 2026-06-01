"use client"

import { useMemo, useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { worldZones } from "@/data/mmorpg/worldZones"

export function WorldWater() {
  const waterZones = useMemo(() => ["liquidity-lake", "candle-volcano"], [])
  const meshes = useRef<THREE.Mesh[]>([])

  const zoneData = useMemo(() => {
    return worldZones.filter((z) => waterZones.includes(z.id)).map((z) => ({
      x: z.position[0],
      z: z.position[2],
      r: (z.radius || 2.2) * 0.7,
      id: z.id,
    }))
  }, [])

  return (
    <group>
      {zoneData.map((z, i) => (
        <WaterPlane key={z.id} x={z.x} z={z.z} radius={z.r} index={i} />
      ))}
    </group>
  )
}

function WaterPlane({ x, z, radius, index }: { x: number; z: number; radius: number; index: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const geometry = useMemo(() => {
    const g = new THREE.CircleGeometry(radius, 32)
    g.rotateX(-Math.PI / 2)
    return g
  }, [radius])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const mat = ref.current.material as THREE.MeshBasicMaterial
    mat.opacity = 0.15 + 0.05 * Math.sin(t * 0.3 + index * 2)
  })

  return (
    <mesh ref={ref} geometry={geometry} position={[x, -0.015, z]}>
      <meshBasicMaterial
        color={index === 0 ? "#22D3EE" : "#F97316"}
        transparent
        opacity={0.12}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}
