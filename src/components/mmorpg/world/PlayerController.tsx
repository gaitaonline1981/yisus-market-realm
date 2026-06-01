"use client"

import React, { useRef, useEffect, useCallback } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { characters } from "@/data/mmorpg/characters"
import { mounts } from "@/data/mmorpg/mounts"
import { GLBModel } from "@/components/mmorpg/viewer/GLBModel"
import { MountedPreview } from "@/components/mmorpg/viewer/MountedPreview"
import { PlaceholderCharacter } from "@/components/mmorpg/viewer/PlaceholderCharacter"
import { PlaceholderMount } from "@/components/mmorpg/viewer/PlaceholderMount"
import { getMovementSpeeds } from "@/lib/mmorpg/mountSpeed"

type WorldMountMode = "on-foot" | "companion" | "mounted"

interface PlayerControllerProps {
  useRealModels: boolean
  selectedCharacterId: string
  selectedMountId?: string
  worldMountMode?: WorldMountMode
  onPositionChange?: (position: [number, number, number]) => void
  externalPosition?: [number, number, number]
}

const keys: Record<string, boolean> = {}
const BOUNDARY = 18

export function PlayerController({ useRealModels, selectedCharacterId, selectedMountId, worldMountMode = "on-foot", onPositionChange, externalPosition }: PlayerControllerProps) {
  const groupRef = useRef<THREE.Group>(null)

  const notify = useCallback((pos: [number, number, number]) => {
    onPositionChange?.(pos)
  }, [onPositionChange])

  // Teleport when externalPosition changes
  useEffect(() => {
    if (externalPosition && groupRef.current) {
      groupRef.current.position.set(externalPosition[0], externalPosition[1], externalPosition[2])
      notify(externalPosition)
    }
  }, [externalPosition?.[0], externalPosition?.[1], externalPosition?.[2]])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { keys[e.key.toLowerCase()] = true }
    const handleKeyUp = (e: KeyboardEvent) => { keys[e.key.toLowerCase()] = false }
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  const targetRot = useRef(0)
  const currentRot = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const speeds = getMovementSpeeds(selectedMountId, worldMountMode)
    const currentSpeed = keys["shift"] ? speeds.sprint : speeds.walk
    const move = currentSpeed * delta

    let dx = 0, dz = 0
    if (keys["w"] || keys["arrowup"]) dz -= move
    if (keys["s"] || keys["arrowdown"]) dz += move
    if (keys["a"] || keys["arrowleft"]) dx -= move
    if (keys["d"] || keys["arrowright"]) dx += move

    if (dx !== 0 || dz !== 0) {
      groupRef.current.position.x = Math.max(-BOUNDARY, Math.min(BOUNDARY, groupRef.current.position.x + dx))
      groupRef.current.position.z = Math.max(-BOUNDARY, Math.min(BOUNDARY, groupRef.current.position.z + dz))

      targetRot.current = Math.atan2(dx, dz)
      const pos: [number, number, number] = [
        groupRef.current.position.x,
        groupRef.current.position.y,
        groupRef.current.position.z,
      ]
      notify(pos)
    }

    currentRot.current += (targetRot.current - currentRot.current) * Math.min(1, delta * 8)
    groupRef.current.rotation.y = currentRot.current
  })

  const character = characters.find((c) => c.id === selectedCharacterId)
  const mount = mounts.find((m) => m.id === selectedMountId)

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {worldMountMode === "mounted" && selectedMountId ? (
        <MountedPreview
          characterId={selectedCharacterId}
          mountId={selectedMountId}
          useRealModels={useRealModels}
          characterModelUrl={character?.modelUrl}
          mountModelUrl={mount?.modelUrl}
          characterModelScale={character?.modelScale}
          characterModelPosition={character?.modelPosition}
          characterModelRotation={character?.modelRotation}
          mountModelScale={mount?.modelScale}
          mountModelPosition={mount?.modelPosition}
          mountModelRotation={mount?.modelRotation}
        />
      ) : (
        <>
          {useRealModels && character?.modelUrl ? (
            <GLBModel url={character.modelUrl} position={character.modelPosition ?? [0, 0, 0]} scale={character.modelScale ?? [1, 1, 1]} rotation={character.modelRotation ?? [0, 0, 0]} />
          ) : (
            <PlaceholderCharacter characterId={selectedCharacterId} />
          )}
          {worldMountMode === "companion" && (
            useRealModels && mount?.modelUrl ? (
              <GLBModel url={mount.modelUrl} position={[1.4, 0, 0]} scale={mount.modelScale ?? [1, 1, 1]} rotation={mount.modelRotation ?? [0, 0, 0]} />
            ) : selectedMountId ? (
              <group position={[1.4, 0, 0]}>
                <PlaceholderMount mountId={selectedMountId} />
              </group>
            ) : null
          )}
        </>
      )}
    </group>
  )
}
