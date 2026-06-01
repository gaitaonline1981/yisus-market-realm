"use client"

import { useEffect, useRef, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import type { PreviewMode } from "@/components/mmorpg/viewer/CharacterViewer"
import { PlaceholderCharacter } from "@/components/mmorpg/viewer/PlaceholderCharacter"
import { PlaceholderMount } from "@/components/mmorpg/viewer/PlaceholderMount"
import { SafeGLBModel } from "@/components/mmorpg/viewer/SafeGLBModel"
import { SafeAnimatedGLBModel } from "@/components/mmorpg/viewer/SafeAnimatedGLBModel"
import { useGraphicsSettingsStore } from "@/stores/useGraphicsSettingsStore"
import { getDprForQuality, shouldUseEnvironment } from "@/lib/mmorpg/graphicsQuality"

interface ShowroomViewerProps {
  selectedType: "character" | "mount" | "master"
  selectedId: string
  modelUrl?: string
  useRealModels: boolean
  transform: {
    scale: [number, number, number]
    position: [number, number, number]
    rotation: [number, number, number]
  }
  previewMode?: PreviewMode
  riggedModelUrl?: string
  animationName?: string
  onAnimationsLoaded?: (names: string[]) => void
  useEnv?: boolean
}

function SceneContent(props: ShowroomViewerProps) {
  const { selectedType, selectedId, modelUrl, useRealModels, transform, previewMode, riggedModelUrl, animationName, onAnimationsLoaded, useEnv } = props
  const isAnimated = previewMode === "animated"
  const showEnv = useEnv !== false

  return (
    <>
      <color attach="background" args={["#05050f"]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 8, 4]} intensity={2} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <directionalLight position={[-4, 3, -3]} intensity={0.6} color="#4facfe" />
      <pointLight position={[0, 4, 2]} intensity={1.5} color="#43e9ff" distance={10} decay={2} />
      <pointLight position={[-3, 2, -4]} intensity={0.8} color="#a855f7" distance={10} decay={2} />

      <group position={[0, -0.8, 0]}>
        {isAnimated && riggedModelUrl ? (
          <SafeAnimatedGLBModel
            url={riggedModelUrl}
            animationName={animationName}
            position={transform.position}
            scale={transform.scale}
            rotation={transform.rotation}
            onAnimationsLoaded={onAnimationsLoaded}
          />
        ) : useRealModels && modelUrl ? (
          <SafeGLBModel
            url={modelUrl}
            position={transform.position}
            scale={transform.scale}
            rotation={transform.rotation}
            fallback={
              selectedType === "character" ? <PlaceholderCharacter characterId={selectedId} /> :
              selectedType === "mount" ? <PlaceholderMount mountId={selectedId} /> :
              <PlaceholderCharacter characterId="ticker" />
            }
          />
        ) : selectedType === "character" ? (
          <PlaceholderCharacter characterId={selectedId} />
        ) : (
          <PlaceholderMount mountId={selectedId} />
        )}
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]}>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color="#0c0c1e" roughness={0.4} metalness={0.6} />
      </mesh>

      {showEnv && <Environment preset="studio" resolution={512} />}

      <OrbitControls enablePan={false} minDistance={2.5} maxDistance={10} minPolarAngle={Math.PI / 6} maxPolarAngle={Math.PI / 2.2} autoRotate={false} />
    </>
  )
}

export function ShowroomViewer(props: ShowroomViewerProps) {
  const gfxQuality = useGraphicsSettingsStore((s) => s.quality)
  const showEnv = useGraphicsSettingsStore((s) => s.showEnvironment)
  const dpr = getDprForQuality(gfxQuality)
  const useEnv = shouldUseEnvironment(gfxQuality, showEnv)

  useEffect(() => {
    return () => {
      const gltfCache = (useGLTF as any).clear
      if (typeof gltfCache === "function") gltfCache()
    }
  }, [])

  return (
    <div className="relative h-[480px] w-full overflow-hidden rounded-2xl border border-cyan-400/25 bg-[#05050f]">
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center text-zinc-500">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
              <span className="font-mono text-xs">Cargando visor 3D...</span>
              <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            </div>
          </div>
        }
      >
        <Canvas camera={{ position: [4, 3, 6], fov: 45 }} gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0, antialias: true }} shadows dpr={dpr}>
          <SceneContent {...props} useEnv={useEnv} />
        </Canvas>
      </Suspense>
    </div>
  )
}
