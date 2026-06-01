"use client"

import { useMemo, useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { worldZones } from "@/data/mmorpg/worldZones"

const BOUNDARY = 18
const ZONE_COLORS: Record<string, string> = {
  "central-hub": "#38BDF8",
  "liquidity-lake": "#22D3EE",
  "candle-volcano": "#F97316",
  "macro-observatory": "#A78BFA",
  "mechanic-lab": "#2DD4BF",
  "risk-citadel": "#FACC15",
}

function MainGround() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
      <planeGeometry args={[BOUNDARY * 2.2, BOUNDARY * 2.2]} />
      <meshStandardMaterial color="#070714" roughness={0.9} metalness={0.1} />
    </mesh>
  )
}

function ElevatedPlatforms() {
  const zones = useMemo(() => worldZones.filter((z) => z.id !== "unknown"), [])
  return (
    <group>
      {zones.map((zone) => (
        <mesh key={zone.id} position={[zone.position[0], -0.02, zone.position[2]]}>
          <cylinderGeometry args={[zone.radius * 0.9, zone.radius * 1.1, 0.04, 32]} />
          <meshStandardMaterial
            color={ZONE_COLORS[zone.id] || "#22D3EE"}
            transparent
            opacity={0.06}
            roughness={0.6}
            metalness={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}

function BoundaryWall() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const mat = ref.current.material as THREE.MeshBasicMaterial
    mat.opacity = 0.08 + 0.04 * Math.sin(t * 0.2)
  })
  return (
    <mesh ref={ref} position={[0, -0.02, 0]}>
      <ringGeometry args={[BOUNDARY - 0.3, BOUNDARY, 80]} rotation={[-Math.PI / 2, 0, 0]} />
      <meshBasicMaterial color="#22D3EE" transparent opacity={0.1} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  )
}

function ZoneRingGlows() {
  const ref = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const zones = useMemo(() => worldZones.filter((z) => z.id !== "unknown"), [])
  const radii: Record<string, number> = {
    "central-hub": 2.5, "liquidity-lake": 2.2, "candle-volcano": 2.2,
    "macro-observatory": 2.2, "mechanic-lab": 2.2, "risk-citadel": 2.2,
  }
  const geometry = useMemo(() => {
    const g = new THREE.RingGeometry(1, 1.06, 48)
    g.rotateX(-Math.PI / 2)
    return g
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    zones.forEach((zone, i) => {
      const r = radii[zone.id] || 2.2
      const pulse = 1 + 0.02 * Math.sin(t * 0.5 + i * 1.3)
      dummy.position.set(zone.position[0], -0.015, zone.position[2])
      dummy.scale.setScalar(r * pulse)
      dummy.updateMatrix()
      ref.current!.setMatrixAt(i, dummy.matrix)
      ref.current!.setColorAt(i, new THREE.Color(ZONE_COLORS[zone.id] || "#22D3EE"))
    })
    ref.current.instanceMatrix.needsUpdate = true
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[geometry, undefined, zones.length]} frustumCulled={false}>
      <meshBasicMaterial transparent opacity={0.15} side={THREE.DoubleSide} depthWrite={false} />
    </instancedMesh>
  )
}

function PathRoads() {
  const zones = useMemo(() => worldZones.filter((z) => z.id !== "unknown"), [])
  const geometry = useMemo(() => new THREE.PlaneGeometry(0.15, 1), [])

  const { matrices, colors } = useMemo(() => {
    const connected = new Set<string>()
    const pairs: [typeof zones[0], typeof zones[0]][] = []
    const center = zones.find((z) => z.id === "central-hub")
    const others = zones.filter((z) => z.id !== "central-hub")
    if (center) {
      others.forEach((z) => pairs.push([center, z]))
    }
    for (let i = 0; i < others.length; i++) {
      for (let j = i + 1; j < others.length; j++) {
        const dx = others[i].position[0] - others[j].position[0]
        const dz = others[i].position[2] - others[j].position[2]
        if (Math.sqrt(dx * dx + dz * dz) < 12) pairs.push([others[i], others[j]])
      }
    }
    const mats = new Float32Array(pairs.length * 16)
    const cols = new Float32Array(pairs.length * 3)
    const dummy = new THREE.Object3D()
    pairs.forEach(([a, b], i) => {
      const ax = a.position[0], az = a.position[2]
      const bx = b.position[0], bz = b.position[2]
      const mx = (ax + bx) / 2, mz = (az + bz) / 2
      const dist = Math.sqrt((bx - ax) ** 2 + (bz - az) ** 2)
      const angle = Math.atan2(bz - az, bx - ax)
      dummy.position.set(mx, -0.025, mz)
      dummy.scale.set(1, dist, 1)
      dummy.rotation.set(0, -angle + Math.PI / 2, 0)
      dummy.updateMatrix()
      dummy.matrix.toArray(mats, i * 16)
      const c = new THREE.Color(ZONE_COLORS[a.id] || "#22D3EE").lerp(new THREE.Color(ZONE_COLORS[b.id] || "#22D3EE"), 0.5)
      cols[i * 3] = c.r; cols[i * 3 + 1] = c.g; cols[i * 3 + 2] = c.b
    })
    return { matrices: mats, colors: cols }
  }, [zones])

  return (
    <instancedMesh args={[geometry, undefined, matrices.length / 16]} frustumCulled={false}>
      <meshBasicMaterial transparent opacity={0.06} depthWrite={false} side={THREE.DoubleSide} />
      <instancedBufferAttribute attach="instanceMatrix" args={[matrices, 16]} />
      <instancedBufferAttribute attach="instanceColor" args={[colors, 3]} />
    </instancedMesh>
  )
}

export function WorldTerrain(_props: { quality?: string }) {
  return (
    <>
      <MainGround />
      <ElevatedPlatforms />
      <ZoneRingGlows />
      <PathRoads />
      <BoundaryWall />
    </>
  )
}
