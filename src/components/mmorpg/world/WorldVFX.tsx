"use client"

import { useMemo, useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { worldZones } from "@/data/mmorpg/worldZones"

const ZONE_COLORS: Record<string, string> = {
  "central-hub": "#38BDF8",
  "liquidity-lake": "#22D3EE",
  "candle-volcano": "#F97316",
  "macro-observatory": "#A78BFA",
  "mechanic-lab": "#2DD4BF",
  "risk-citadel": "#FACC15",
}

function LightBeams() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const zones = useMemo(() => worldZones.filter((z) => z.id !== "unknown"), [])

  const geom = useMemo(() => {
    const segs = 6
    const shape = new THREE.Shape()
    for (let i = 0; i <= segs; i++) {
      const angle = (i / segs) * Math.PI * 2
      const r = 0.06
      if (i === 0) shape.moveTo(Math.cos(angle) * r, Math.sin(angle) * r)
      else shape.lineTo(Math.cos(angle) * r, Math.sin(angle) * r)
    }
    return new THREE.ExtrudeGeometry(shape, { depth: 0.01, bevelEnabled: false })
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    zones.forEach((zone, i) => {
      const x = zone.position[0]
      const z = zone.position[2]
      dummy.position.set(x, 0.01, z)
      dummy.scale.setScalar(1 + 0.03 * Math.sin(t * 0.8 + i * 2))
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
      meshRef.current!.setColorAt(i, new THREE.Color(ZONE_COLORS[zone.id] || "#22D3EE"))
    })
    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[geom, undefined, zones.length]} frustumCulled={false}>
      <meshBasicMaterial transparent opacity={0.25} depthWrite={false} />
    </instancedMesh>
  )
}

function AtmosphereParticles({ count = 400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const countRef = useRef(count)

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 9
      const angle = Math.random() * Math.PI * 2
      pos[i * 3] = Math.cos(angle) * radius * (0.5 + Math.random() * 0.5)
      pos[i * 3 + 1] = 0.2 + Math.random() * 3.5
      pos[i * 3 + 2] = Math.sin(angle) * radius * (0.5 + Math.random() * 0.5)
      const c = new THREE.Color().setHSL(0.55 + Math.random() * 0.15, 0.6, 0.4 + Math.random() * 0.3)
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col }
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * 0.15
    const posAttr = ref.current.geometry.attributes.position as THREE.BufferAttribute
    const array = posAttr.array as Float32Array
    const c = countRef.current
    for (let i = 0; i < c; i++) {
      const i3 = i * 3
      const baseAngle = (i * 1.7) % (Math.PI * 2)
      const radius = 3 + (i % 9)
      const speed = 0.3 + (i % 7) * 0.04
      const angle = baseAngle + t * speed
      array[i3] = Math.cos(angle) * radius * (0.5 + (i % 5) * 0.1)
      array[i3 + 2] = Math.sin(angle) * radius * (0.5 + (i % 5) * 0.1)
      array[i3 + 1] = 0.2 + Math.sin(t * 0.5 + i) * 0.8 + (i % 10) * 0.15
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

export function WorldVFX({ quality = "high" }: { quality?: string }) {
  return (
    <>
      {quality !== "low" && (
        <>
          <LightBeams />
          <AtmosphereParticles count={quality === "high" ? 500 : 200} />
        </>
      )}
    </>
  )
}
