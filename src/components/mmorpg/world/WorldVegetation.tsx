"use client"

import { useMemo, useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

function NeonTree({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  const hue = useMemo(() => {
    const c = new THREE.Color(color)
    return { r: c.r, g: c.g, b: c.b }
  }, [color])

  useFrame((state) => {
    if (!groupRef.current || !glowRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.y = 0.03 + 0.01 * Math.sin(t * 0.4 + position[0])
    const mat = glowRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = 0.08 + 0.04 * Math.sin(t * 0.3 + position[2])
  })

  const h = 0.4 * scale
  const crownR = 0.35 * scale

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, h * 0.4, 0]}>
        <cylinderGeometry args={[0.015 * scale, 0.025 * scale, h * 0.8, 6]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.7} metalness={0.3} />
      </mesh>
      <mesh position={[0, h * 0.85, 0]}>
        <coneGeometry args={[crownR, h * 0.6, 6]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, h * 0.6, 0]}>
        <coneGeometry args={[crownR * 0.75, h * 0.45, 6]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} transparent opacity={0.5} />
      </mesh>
      <mesh ref={glowRef} position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, crownR * 0.8, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  )
}

function CrystalCluster({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = 0.02 + 0.008 * Math.sin(state.clock.elapsedTime * 0.5 + position[0])
  })

  return (
    <group ref={ref} position={position} scale={[scale, scale, scale]}>
      {[0, 1, 2].map((i) => {
        const angle = (i / 3) * Math.PI * 2
        const tilt = 0.2 + Math.random() * 0.2
        return (
          <group key={i} rotation={[0, angle, 0]}>
            <mesh position={[0.06, 0.1, 0]} rotation={[tilt, 0, 0]}>
              <coneGeometry args={[0.015, 0.2, 5]} />
              <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} emissive={color} emissiveIntensity={0.15} />
            </mesh>
          </group>
        )
      })}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 0.08, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  )
}

function generatePositions(count: number, minR: number, maxR: number, exclude: { x: number; z: number; r: number }[]): [number, number, number][] {
  const positions: [number, number, number][] = []
  let attempts = 0
  while (positions.length < count && attempts < count * 20) {
    attempts++
    const angle = Math.random() * Math.PI * 2
    const radius = minR + Math.random() * (maxR - minR)
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const tooClose = exclude.some((e) => Math.sqrt((x - e.x) ** 2 + (z - e.z) ** 2) < e.r)
    const tooCloseToOther = positions.some((p) => Math.sqrt((x - p[0]) ** 2 + (z - p[2]) ** 2) < 1.5)
    if (!tooClose && !tooCloseToOther) positions.push([x, 0, z])
  }
  return positions
}

const TREE_COLORS = ["#22D3EE", "#38BDF8", "#2DD4BF", "#10B981", "#A78BFA", "#06B6D4", "#5EEAD4", "#67E8F9"]
const CRYSTAL_COLORS = ["#F97316", "#FACC15", "#F59E0B", "#A78BFA", "#22D3EE", "#EC4899"]

const ZONE_POSITIONS = [
  { x: 0, z: 0, r: 3.5 },
  { x: -5, z: -3, r: 3 },
  { x: 5, z: -3, r: 3 },
  { x: -5, z: 4, r: 3 },
  { x: 5, z: 4, r: 3 },
  { x: 0, z: 6, r: 3 },
]

function Trees() {
  const positions = useMemo(() => generatePositions(60, 4, 16, ZONE_POSITIONS), [])
  return (
    <group>
      {positions.map((pos, i) => (
        <NeonTree
          key={i}
          position={pos}
          color={TREE_COLORS[i % TREE_COLORS.length]}
          scale={0.6 + Math.random() * 0.6}
        />
      ))}
    </group>
  )
}

function Crystals() {
  const positions = useMemo(() => generatePositions(25, 4, 16, ZONE_POSITIONS), [])
  return (
    <group>
      {positions.map((pos, i) => (
        <CrystalCluster
          key={i}
          position={[pos[0], 0, pos[2]]}
          color={CRYSTAL_COLORS[i % CRYSTAL_COLORS.length]}
          scale={0.5 + Math.random() * 0.5}
        />
      ))}
    </group>
  )
}

function OuterRingTrees() {
  const ringTrees = useMemo(() => {
    const trees: [number, number, number][] = []
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2 + Math.random() * 0.1
      const r = 15 + Math.random() * 2
      trees.push([Math.cos(angle) * r, 0, Math.sin(angle) * r])
    }
    return trees
  }, [])

  return (
    <group>
      {ringTrees.map((pos, i) => (
        <NeonTree
          key={`ring-${i}`}
          position={pos}
          color={TREE_COLORS[i % TREE_COLORS.length]}
          scale={0.7 + Math.random() * 0.7}
        />
      ))}
    </group>
  )
}

export function WorldVegetation({ quality = "high" }: { quality?: string }) {
  const count = quality === "high" ? 1 : quality === "medium" ? 0.6 : 0.3

  return (
    <>
      <Trees />
      {quality !== "low" && <Crystals />}
      <OuterRingTrees />
    </>
  )
}
