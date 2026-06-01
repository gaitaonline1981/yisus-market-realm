"use client"

import { useMemo } from "react"
import { getMountOffset } from "@/lib/mmorpg/mounting"
import { GLBModel } from "./GLBModel"
import { PlaceholderCharacter } from "./PlaceholderCharacter"
import { PlaceholderMount } from "./PlaceholderMount"

interface CustomMountOffset {
  characterPosition: [number, number, number]
  characterRotation: [number, number, number]
  characterScale: [number, number, number]
  mountPosition: [number, number, number]
  mountRotation: [number, number, number]
  mountScale: [number, number, number]
}

interface MountedPreviewProps {
  characterId: string
  mountId?: string
  useRealModels?: boolean
  characterModelUrl?: string
  mountModelUrl?: string
  characterModelScale?: [number, number, number]
  characterModelPosition?: [number, number, number]
  characterModelRotation?: [number, number, number]
  mountModelScale?: [number, number, number]
  mountModelPosition?: [number, number, number]
  mountModelRotation?: [number, number, number]
  customMountOffset?: CustomMountOffset
}

export function MountedPreview({
  characterId,
  mountId,
  useRealModels,
  characterModelUrl,
  mountModelUrl,
  characterModelScale,
  characterModelPosition,
  characterModelRotation,
  mountModelScale,
  mountModelPosition,
  mountModelRotation,
  customMountOffset,
}: MountedPreviewProps) {
  const defaultOffset = useMemo(() => getMountOffset(mountId), [mountId])
  const offset = customMountOffset ?? defaultOffset

  const finalCharScale = characterModelScale ?? offset.characterScale
  const finalCharPos = characterModelPosition ?? offset.characterPosition
  const finalCharRot = characterModelRotation ?? offset.characterRotation
  const finalMountScale = mountModelScale ?? offset.mountScale
  const finalMountPos = mountModelPosition ?? offset.mountPosition
  const finalMountRot = mountModelRotation ?? offset.mountRotation

  return (
    <group position={[0, 0, 0]}>
      {/* Mount */}
      {useRealModels && mountModelUrl ? (
        <GLBModel
          url={mountModelUrl}
          position={finalMountPos}
          scale={finalMountScale}
          rotation={finalMountRot}
        />
      ) : mountId ? (
        <group position={finalMountPos}>
          <PlaceholderMount mountId={mountId} />
        </group>
      ) : null}

      {/* Character on top */}
      {useRealModels && characterModelUrl ? (
        <GLBModel
          url={characterModelUrl}
          position={finalCharPos}
          scale={finalCharScale}
          rotation={finalCharRot}
        />
      ) : (
        <group position={finalCharPos}>
          <PlaceholderCharacter characterId={characterId} />
        </group>
      )}
    </group>
  )
}
