"use client"

import { useMemo, useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { worldZones } from "@/data/mmorpg/worldZones"

function BoundaryRing() {
  const ref = useRef<THREE.Mesh>(null)
  const geometry = useMemo(() => {
    const g = new THREE.RingGeometry(9.6, 10, 64)
    g.rotateX(-Math.PI / 2)
    return g
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const mat = ref.current.material as THREE.MeshBasicMaterial
    mat.opacity = 0.15 + 0.05 * Math.sin(t * 0.3)
  })

  return (
    <mesh ref={ref} geometry={geometry} position={[0, -0.01, 0]}>
      <meshBasicMaterial color="#22D3EE" transparent opacity={0.15} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  )
}

function ZoneGlowRings() {
  const ref = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const zones = useMemo(() => worldZones.filter((z) => z.id !== "unknown"), [])
  const zoneColors: Record<string, string> = {
    "central-hub": "#38BDF8",
    "liquidity-lake": "#22D3EE",
    "candle-volcano": "#F97316",
    "macro-observatory": "#A78BFA",
    "mechanic-lab": "#2DD4BF",
    "risk-citadel": "#FACC15",
  }
  const radii: Record<string, number> = {
    "central-hub": 2.8,
    "liquidity-lake": 2.6,
    "candle-volcano": 2.6,
    "macro-observatory": 2.6,
    "mechanic-lab": 2.6,
    "risk-citadel": 2.6,
  }

  const geometry = useMemo(() => {
    const g = new THREE.RingGeometry(1, 1.03, 48)
    g.rotateX(-Math.PI / 2)
    return g
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    zones.forEach((zone, i) => {
      const r = radii[zone.id] || 2.5
      const pulse = 1 + 0.02 * Math.sin(t * 0.5 + i * 1.2)
      dummy.position.set(zone.position[0], -0.005, zone.position[2])
      dummy.scale.setScalar(r * pulse)
      dummy.updateMatrix()
      ref.current!.setMatrixAt(i, dummy.matrix)
      ref.current!.setColorAt(i, new THREE.Color(zoneColors[zone.id] || "#22D3EE"))
    })
    ref.current.instanceMatrix.needsUpdate = true
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[geometry, undefined, zones.length]} frustumCulled={false}>
      <meshBasicMaterial transparent opacity={0.12} side={THREE.DoubleSide} depthWrite={false} />
    </instancedMesh>
  )
}

function GroundGrid() {
  const ref = useRef<THREE.Points>(null)
  const count = 180
  const { positions } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const side = 10
    for (let i = 0; i < count; i++) {
      const edge = Math.floor(i / 45)
      const idx = i % 45
      const t = (idx / 44) * side * 2 - side
      switch (edge) {
        case 0: pos[i * 3] = t; pos[i * 3 + 1] = -0.01; pos[i * 3 + 2] = -side; break
        case 1: pos[i * 3] = side; pos[i * 3 + 1] = -0.01; pos[i * 3 + 2] = t; break
        case 2: pos[i * 3] = t; pos[i * 3 + 1] = -0.01; pos[i * 3 + 2] = side; break
        case 3: pos[i * 3] = -side; pos[i * 3 + 1] = -0.01; pos[i * 3 + 2] = t; break
      }
    }
    return { positions: pos }
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const mat = ref.current.material as THREE.PointsMaterial
    mat.opacity = 0.15 + 0.05 * Math.sin(state.clock.elapsedTime * 0.2)
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#22D3EE" size={0.04} transparent opacity={0.15} depthWrite={false} sizeAttenuation={false} />
    </points>
  )
}

function GroundSectorGlow() {
  const ref = useRef<THREE.Mesh>(null)
  const zones = useMemo(() => worldZones.filter((z) => z.id !== "unknown"), [])
  const zoneColors: Record<string, string> = {
    "central-hub": "#38BDF8",
    "liquidity-lake": "#22D3EE",
    "candle-volcano": "#F97316",
    "macro-observatory": "#A78BFA",
    "mechanic-lab": "#2DD4BF",
    "risk-citadel": "#FACC15",
  }

  useFrame((state) => {
    if (!ref.current) return
    const mat = ref.current.material as THREE.MeshBasicMaterial
    mat.opacity = 0.03 + 0.02 * Math.sin(state.clock.elapsedTime * 0.4)
  })

  return (
    <group>
      {zones.map((zone) => (
        <mesh key={zone.id} position={[zone.position[0], -0.008, zone.position[2]]}>
          <circleGeometry args={[2.2, 32]} />
          <meshBasicMaterial
            color={zoneColors[zone.id] || "#22D3EE"}
            transparent
            opacity={0.04}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

export function WorldEnhancedGround({ quality = "high" }: { quality?: string }) {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial color="#070714" roughness={0.85} metalness={0.15} />
      </mesh>
      <GroundSectorGlow />
      <ZoneGlowRings />
      <BoundaryRing />
      {quality !== "low" && <GroundGrid />}
    </>
  )
}
