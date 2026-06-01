"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Suspense } from "react"
import { SafeGLBModel } from "./SafeGLBModel"
import { PlaceholderCharacter } from "./PlaceholderCharacter"
import { PlaceholderMount } from "./PlaceholderMount"

export type PreviewMode = "placeholder" | "static" | "animated"

interface Props { characterId: string; mountId?: string; previewMode?: PreviewMode; useRealModels?: boolean; transform?: any }

export function CharacterViewer({ characterId, mountId, previewMode = "placeholder", useRealModels = false, transform }: Props) {
  return (
    <div className="h-[400px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#05050f]">
      <Canvas camera={{ position: [4, 3, 6], fov: 45 }}>
        <color attach="background" args={["#05050f"]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 8, 4]} intensity={2} />
        <Suspense fallback={null}>
          {mountId ? (
            <>
              {useRealModels ? (
                <SafeGLBModel url={`/models/mmorpg/mounts/${mountId}/${mountId}.glb`} position={[0, 0, 0]} />
              ) : (
                <PlaceholderMount mountId={mountId} />
              )}
            </>
          ) : useRealModels ? (
            <SafeGLBModel url={`/models/mmorpg/characters/${characterId}/${characterId}.glb`} />
          ) : (
            <PlaceholderCharacter characterId={characterId} />
          )}
          <Environment preset="studio" />
          <OrbitControls enablePan={false} minDistance={2} maxDistance={8} />
        </Suspense>
      </Canvas>
    </div>
  )
}
