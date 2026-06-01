"use client"

import { useMemo, useRef, Suspense } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { getMasterAsset } from "@/data/mmorpg/masterAssets"
import { tradingMasters } from "@/data/mmorpg/tradingMasters"

const MASTER_COLORS: Record<string, string> = {
  "mentor-wyckoff-master": "#8B7355",
  "elliott-sage-master": "#7C3AED",
  "master-dow": "#1E40AF",
  "oracle-of-value": "#059669",
  "lord-livermore": "#047857",
  "macro-bridge-master": "#1D4ED8",
  "quant-architect": "#0D9488",
  "risk-paladin": "#B45309",
  "prop-firm-coach-master": "#1E293B",
  "psyche-monk": "#7C3AED",
}

function MasterPlaceholder({ masterId, color, active, near }: { masterId: string; color: string; active?: boolean; near?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const master = useMemo(() => tradingMasters.find((m) => m.id === masterId), [masterId])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.y = 0.5 + 0.04 * Math.sin(t * 0.6)
    const ring = groupRef.current.getObjectByName("ring") as THREE.Mesh
    if (ring) {
      ring.rotation.z = t * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.2, 0.22, 0.6, 8]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.05, 8]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh name="ring" position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.35, 24]} />
        <meshBasicMaterial color={active ? "#F59E0B" : near ? "#22D3EE" : color} transparent opacity={active ? 0.6 : near ? 0.4 : 0.2} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {active && (
        <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.35, 0.5, 24]} />
          <meshBasicMaterial color="#F59E0B" transparent opacity={0.15} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      )}
    </group>
  )
}

interface TradingMasterModelProps {
  masterId: string
  active?: boolean
  near?: boolean
  onSelect?: (masterId: string) => void
}

function MasterGLB({ masterId, active, near, onSelect }: TradingMasterModelProps) {
  const asset = useMemo(() => getMasterAsset(masterId), [masterId])
  const master = useMemo(() => tradingMasters.find((m) => m.id === masterId), [masterId])
  const color = MASTER_COLORS[masterId] || "#22D3EE"

  if (!asset?.hasGlb) {
    return <MasterPlaceholder masterId={masterId} color={color} active={active} near={near} />
  }

  return (
    <MasterPlaceholder masterId={masterId} color={color} active={active} near={near} />
  )
}

export function TradingMasterModel(props: TradingMasterModelProps) {
  return (
    <Suspense fallback={null}>
      <MasterGLB {...props} />
    </Suspense>
  )
}
