"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Stars } from "@react-three/drei"
import * as THREE from "three"
import type { PlayerMovementState } from "@/lib/mmorpg/playerAnimationState"
import { useGraphicsSettingsStore } from "@/stores/useGraphicsSettingsStore"
import { getDprForQuality, shouldUseEnvironment } from "@/lib/mmorpg/graphicsQuality"
import { WorldMapZones } from "./WorldMapZones"
import { WorldRouteLines } from "./WorldRouteLines"
import { WorldTradingBuildings } from "./WorldTradingBuildings"
import { WorldTradingNpcs } from "./WorldTradingNpcs"
import { WorldTradingMasters } from "./WorldTradingMasters"
import { WorldStaticModels } from "./WorldStaticModels"
import { WorldVFX } from "./WorldVFX"
import { WorldTerrain } from "./WorldTerrain"
import { WorldVegetation } from "./WorldVegetation"
import { WorldWater } from "./WorldWater"
import { PlayerController } from "./PlayerController"
import { AnimatedPlayerController } from "./AnimatedPlayerController"
import { FollowCamera } from "./FollowCamera"

type WorldMountMode = "on-foot" | "companion" | "mounted"

interface WorldSceneProps {
  useRealModels: boolean
  selectedZone: string
  onSelectZone: (zone: string) => void
  playerMode: boolean
  selectedCharacterId: string
  selectedMountId?: string
  playerPosition: [number, number, number]
  onPlayerPositionChange?: (position: [number, number, number]) => void
  nearZoneId?: string | null
  activeZoneId?: string
  useAnimatedPlayer?: boolean
  onMovementStateChange?: (state: PlayerMovementState) => void
  worldMountMode?: WorldMountMode
  playerTeleportPosition?: [number, number, number]
  activeBuildingId?: string | null
  nearBuildingId?: string | null
  activeNpcId?: string | null
  nearNpcId?: string | null
  activeMasterId?: string | null
  nearMasterId?: string | null
  onSelectMaster?: (masterId: string) => void
}

function SceneContent({ useRealModels, playerMode, selectedCharacterId, selectedMountId, onPlayerPositionChange, nearZoneId, activeZoneId, useAnimatedPlayer, onMovementStateChange, worldMountMode, showGrid: sg, useEnv: ue, showWorldStaticModels: ssm, activeBuildingId, nearBuildingId, activeNpcId, nearNpcId, activeMasterId, nearMasterId, onSelectMaster }: {
  useRealModels: boolean
  playerMode: boolean
  selectedCharacterId: string
  selectedMountId?: string
  onPlayerPositionChange?: (position: [number, number, number]) => void
  nearZoneId?: string | null
  activeZoneId?: string
  useAnimatedPlayer?: boolean
  onMovementStateChange?: (state: PlayerMovementState) => void
  worldMountMode?: "on-foot" | "companion" | "mounted"
  showGrid?: boolean
  useEnv?: boolean
  showWorldStaticModels?: boolean
  activeBuildingId?: string | null
  nearBuildingId?: string | null
  activeNpcId?: string | null
  nearNpcId?: string | null
  activeMasterId?: string | null
  nearMasterId?: string | null
  onSelectMaster?: (masterId: string) => void
}) {
  const qualityVfx = useGraphicsSettingsStore((s) => s.quality)
  const showShadows = useGraphicsSettingsStore((s) => s.showShadows)
  return (
    <>
      <color attach="background" args={["#050510"]} />
      <fog attach="fog" args={["#050510", 20, 45]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[12, 18, 10]} intensity={2} castShadow={showShadows} shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <directionalLight position={[-8, 8, -6]} intensity={0.6} color="#4facfe" />
      <pointLight position={[0, 8, 0]} intensity={1.8} color="#43e9ff" distance={25} decay={2} />
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      {sg && <gridHelper args={[36, 36, "#1a1a2e", "#111122"]} position={[0, -0.01, 0]} />}
      <WorldTerrain quality={qualityVfx} />
      <WorldWater />
      <WorldVegetation quality={qualityVfx} />
      <WorldMapZones nearZoneId={nearZoneId} activeZoneId={activeZoneId} />
      <WorldRouteLines />
      <WorldTradingBuildings activeBuildingId={activeBuildingId} nearBuildingId={nearBuildingId} />
      <WorldTradingNpcs activeNpcId={activeNpcId} nearNpcId={nearNpcId} />
      <WorldTradingMasters activeMasterId={activeMasterId} nearMasterId={nearMasterId} onSelectMaster={onSelectMaster} />
      {ssm !== false && !playerMode && <WorldStaticModels useRealModels={useRealModels} />}
      {ue !== false && <Environment preset="night" resolution={256} />}
      <WorldVFX quality={qualityVfx} />
    </>
  )
}

export function WorldScene({ useRealModels, selectedZone, onSelectZone, playerMode, selectedCharacterId, selectedMountId, playerPosition, onPlayerPositionChange, nearZoneId, activeZoneId, useAnimatedPlayer, onMovementStateChange, worldMountMode, playerTeleportPosition, activeBuildingId, nearBuildingId, activeNpcId, nearNpcId, activeMasterId, nearMasterId, onSelectMaster }: WorldSceneProps) {
  const gfxQuality = useGraphicsSettingsStore((s) => s.quality)
  const showGrid = useGraphicsSettingsStore((s) => s.showGrid)
  const showShadows = useGraphicsSettingsStore((s) => s.showShadows)
  const showWorldStaticModels = useGraphicsSettingsStore((s) => s.showWorldStaticModels)
  const showEnv = useGraphicsSettingsStore((s) => s.showEnvironment)
  const dpr = getDprForQuality(gfxQuality)
  const useEnv = shouldUseEnvironment(gfxQuality, showEnv)

  return (
    <div
      style={{
        width: "100%",
        height: 520,
        borderRadius: 24,
        overflow: "hidden",
        border: "1px solid rgba(47, 199, 201, 0.25)",
        background: "#05050f",
        position: "relative",
      }}
    >
      <Suspense
        fallback={
          <div
            style={{
              height: 520,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#64748B",
              fontSize: 13,
              fontFamily: "monospace",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ width: 32, height: 32, border: "2px solid #22d3ee", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            <span>Cargando mundo 3D...</span>
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        }
      >
        <Canvas camera={{ position: [8, 6, 10], fov: 50 }} gl={{ toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0, antialias: true }} dpr={dpr}>
          <SceneContent
            useRealModels={useRealModels}
            playerMode={playerMode}
            selectedCharacterId={selectedCharacterId}
            selectedMountId={selectedMountId}
            onPlayerPositionChange={onPlayerPositionChange}
            nearZoneId={nearZoneId}
            activeZoneId={activeZoneId}
            useAnimatedPlayer={useAnimatedPlayer}
            onMovementStateChange={onMovementStateChange}
            worldMountMode={worldMountMode}
            showGrid={showGrid}
            useEnv={useEnv}
            showWorldStaticModels={showWorldStaticModels}
            activeBuildingId={activeBuildingId}
            nearBuildingId={nearBuildingId}
            activeNpcId={activeNpcId}
            nearNpcId={nearNpcId}
            activeMasterId={activeMasterId}
            nearMasterId={nearMasterId}
            onSelectMaster={onSelectMaster}
          />
          {playerMode && (
            <>
              {useAnimatedPlayer ? (
                <AnimatedPlayerController
                  useRealModels={useRealModels}
                  selectedCharacterId={selectedCharacterId}
                  selectedMountId={selectedMountId}
                  onPositionChange={onPlayerPositionChange}
                  onMovementStateChange={onMovementStateChange}
                  useAnimatedPlayer={true}
                  worldMountMode={worldMountMode}
                  externalPosition={playerTeleportPosition}
                />
              ) : (
                <PlayerController
                  useRealModels={useRealModels}
                  selectedCharacterId={selectedCharacterId}
                  selectedMountId={selectedMountId}
                  onPositionChange={onPlayerPositionChange}
                  worldMountMode={worldMountMode}
                  externalPosition={playerTeleportPosition}
                />
              )}
            </>
          )}
          {playerMode ? (
            <FollowCamera targetPosition={playerPosition} />
          ) : (
            <OrbitControls enablePan enableZoom enableRotate minDistance={3} maxDistance={30} minPolarAngle={0.2} maxPolarAngle={Math.PI / 2.1} />
          )}
        </Canvas>
      </Suspense>
    </div>
  )
}
