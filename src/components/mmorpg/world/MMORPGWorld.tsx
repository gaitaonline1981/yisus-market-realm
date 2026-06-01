"use client"

import { useEffect, useState, useCallback } from "react"
import { characters } from "@/data/mmorpg/characters"
import { mounts } from "@/data/mmorpg/mounts"
import { worldZones } from "@/data/mmorpg/worldZones"
import { useWorldSessionStore } from "@/stores/useWorldSessionStore"
import { useWorldProgressStore } from "@/stores/useWorldProgressStore"
import { WorldScene } from "./WorldScene"
import { WorldHUD } from "./WorldHUD"
import { WorldLocationPanel } from "./WorldLocationPanel"
import { WorldQuestPanel } from "./WorldQuestPanel"
import { WorldProgressPanel } from "./WorldProgressPanel"
import { WorldMountModePanel } from "./WorldMountModePanel"
import { WorldFastTravelPanel } from "./WorldFastTravelPanel"
import { getZoneSpawnPosition } from "@/lib/mmorpg/worldTravel"
import { WorldMiniMap } from "./WorldMiniMap"
import { WorldZoneLegend } from "./WorldZoneLegend"
import { WorldSaveSlotsPanel } from "./WorldSaveSlotsPanel"
import type { WorldSaveSlot } from "@/stores/useWorldSaveSlotsStore"
import { CloudSaveStatusPanel } from "@/components/mmorpg/cloud/CloudSaveStatusPanel"
import { GraphicsSettingsPanel } from "@/components/mmorpg/settings/GraphicsSettingsPanel"
import { WorldBlueprintPanel } from "./WorldBlueprintPanel"
import { TradingBuildingInfoPanel } from "./TradingBuildingInfoPanel"
import { TradingNpcInfoPanel } from "./TradingNpcInfoPanel"
import { NpcDialoguePanel } from "./NpcDialoguePanel"
import { TradingMissionBoard } from "./TradingMissionBoard"
import { QuestJournalPanel } from "./QuestJournalPanel"
import { TradingSkillTreePanel } from "./TradingSkillTreePanel"
import { TradingInventoryPanel } from "./TradingInventoryPanel"
import { TraderProfilePanel } from "./TraderProfilePanel"
import { TradingAchievementsPanel } from "./TradingAchievementsPanel"
import { TradingAcademyPanel } from "./TradingAcademyPanel"
import { TradingScenarioTrainerPanel } from "./TradingScenarioTrainerPanel"
import { MarketReplayTrainerPanel } from "./MarketReplayTrainerPanel"
import { DailyTradingRoutinePanel } from "./DailyTradingRoutinePanel"
import { TradingMastersPanel } from "./TradingMastersPanel"
import { TradingMasterLocationPanel } from "./TradingMasterLocationPanel"
import { WorldNavPanel } from "./WorldNavPanel"
import { AiNpcDialoguePanel } from "./AiNpcDialoguePanel"
import { PlayerFrame, TargetFrame } from "./WorldUnitFrames"
import { WorldActionBar } from "./WorldActionBar"
import { WorldChatPanel } from "./WorldChatPanel"
import { tradingNpcs } from "@/data/mmorpg/worldTradingNpcs"
import { tradingMasters } from "@/data/mmorpg/tradingMasters"

function getDistance2D(a: [number, number, number], b: [number, number, number]): number {
  const dx = a[0] - b[0]
  const dz = a[2] - b[2]
  return Math.sqrt(dx * dx + dz * dz)
}

function findNearestZone(pos: [number, number, number]): string | null {
  for (const zone of worldZones) {
    if (getDistance2D(pos, zone.position) <= zone.radius) {
      return zone.id
    }
  }
  return null
}

export function MMORPGWorld() {
  const {
    selectedCharacterId, setSelectedCharacterId,
    selectedMountId, setSelectedMountId,
    activeZoneId, setActiveZoneId,
    playerPosition, setPlayerPosition,
    worldMountMode, setWorldMountMode,
    worldViewMode, setWorldViewMode,
    worldModelMode, setWorldModelMode,
    useAnimatedPlayer, setUseAnimatedPlayer,
    resetWorldSession,
  } = useWorldSessionStore()

  const playerMode = worldViewMode === "player"
  const useRealModels = worldModelMode === "glb-real"

  const [selectedZone, setSelectedZone] = useState(activeZoneId)
  const [nearZoneId, setNearZoneId] = useState<string | null>(null)
  const [movementState, setMovementState] = useState<"idle" | "walking" | "running">("idle")
  const [playerTeleportPosition, setPlayerTeleportPosition] = useState<[number, number, number] | undefined>(undefined)
  const [activeBuildingId, setActiveBuildingId] = useState<string | null>(null)
  const [activeNpcId, setActiveNpcId] = useState<string | null>(null)
  const [nearNpcId, setNearNpcId] = useState<string | null>(null)
  const [dialogueNpcId, setDialogueNpcId] = useState<string | null>(null)
  const [aiDialogueMasterId, setAiDialogueMasterId] = useState<string | null>(null)
  const [activeMasterId, setActiveMasterId] = useState<string | null>(null)
  const [nearMasterId, setNearMasterId] = useState<string | null>(null)
  const [teleportTarget, setTeleportTarget] = useState<[number, number, number] | undefined>(undefined)

  function loadWorldSlot(slot: WorldSaveSlot) {
    setSelectedCharacterId(slot.selectedCharacterId)
    setSelectedMountId(slot.selectedMountId)
    setActiveZoneId(slot.activeZoneId)
    setPlayerPosition(slot.playerPosition)
    setPlayerTeleportPosition(slot.playerPosition)
    setWorldMountMode(slot.worldMountMode)
    setWorldViewMode(slot.worldViewMode)
    setWorldModelMode(slot.worldModelMode)
    setUseAnimatedPlayer(slot.useAnimatedPlayer)
  }

  function teleportToZone(zoneId: string) {
    const nextPosition = getZoneSpawnPosition(zoneId)
    setPlayerTeleportPosition(nextPosition)
    setPlayerPosition(nextPosition)
    setActiveZoneId(zoneId)
    setSelectedZone(zoneId)
  }

  const handlePlayerPositionChange = useCallback((pos: [number, number, number]) => {
    setPlayerPosition(pos)
    const nearest = findNearestZone(pos)
    setNearZoneId(nearest)
    if (nearest) {
      setSelectedZone(nearest)
    }

    // NPC proximity detection
    let foundNpc: string | null = null
    for (const npc of tradingNpcs) {
      const dx = pos[0] - npc.position[0]
      const dz = pos[2] - npc.position[2]
      if (Math.sqrt(dx * dx + dz * dz) <= 1.3) {
        foundNpc = npc.id
        break
      }
    }
    setNearNpcId(foundNpc)

    // Master proximity detection
    const MASTER_POSITIONS: Record<string, [number, number, number]> = {
      "mentor-wyckoff-master": [-4.2, 0, -3.25],
      "elliott-sage-master": [-4.2, 0, 4.1],
      "master-dow": [-0.9, 0, 2.8],
      "oracle-of-value": [0.9, 0, 2.8],
      "lord-livermore": [5.1, 0, -3.3],
      "macro-bridge-master": [-5.8, 0, 5.75],
      "quant-architect": [4.2, 0, 4.15],
      "risk-paladin": [-1.4, 0, 7.75],
      "prop-firm-coach-master": [1.4, 0, 7.75],
      "psyche-monk": [0, 0, 4.4],
    }
    let foundMaster: string | null = null
    for (const [id, mpos] of Object.entries(MASTER_POSITIONS)) {
      const dx = pos[0] - mpos[0]
      const dz = pos[2] - mpos[2]
      if (Math.sqrt(dx * dx + dz * dz) <= 1.5) {
        foundMaster = id
        break
      }
    }
    setNearMasterId(foundMaster)
  }, [setPlayerPosition])

  const handleTeleport = useCallback((pos: [number, number, number]) => {
    setPlayerPosition(pos)
    setPlayerTeleportPosition(pos)
    setTeleportTarget(pos)
    setTimeout(() => setTeleportTarget(undefined), 100)
  }, [setPlayerPosition, setPlayerTeleportPosition])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && playerMode) {
        setWorldViewMode("free-view")
      }
      if (e.key === "f" && !aiDialogueMasterId && nearMasterId) {
        setAiDialogueMasterId(nearMasterId)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [playerMode, setWorldViewMode, nearMasterId, aiDialogueMasterId])

  const handleCharacterChange = (id: string) => {
    setSelectedCharacterId(id)
    const compatibleMounts = mounts.filter((m) => m.compatibleCharacterIds.includes(id))
    if (!compatibleMounts.some((m) => m.id === selectedMountId)) {
      setSelectedMountId(compatibleMounts[0]?.id ?? "pocket-rocket")
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-4 text-white md:p-6">
      <section className="mx-auto max-w-7xl space-y-6">
        <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-indigo-950/60 to-black p-6 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.08),transparent_60%)] pointer-events-none" />
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black tracking-tight md:text-3xl">
                  <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                    Yisus Market Realm — Open World Prototype
                  </span>
                </h1>
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-300">
                  Static World v0.1
                </span>
              </div>
              <p className="mt-1 text-sm font-semibold tracking-wide text-zinc-400">
                Primera versión visual del mundo abierto para personajes y monturas estáticas.
              </p>
              <p className="mt-1 text-xs text-amber-400/70">
                Los modelos actuales son estáticos: sin rigging, sin animaciones y sin movimiento real.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setWorldModelMode(useRealModels ? "placeholder" : "glb-real")}
                className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${
                  useRealModels
                    ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                    : "border-amber-400/30 bg-amber-400/10 text-amber-300"
                }`}
              >
                <span>{useRealModels ? "GLB Real" : "Placeholder 3D"}</span>
                <span className={`rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase ${useRealModels ? "bg-emerald-400/20 text-emerald-300" : "bg-amber-400/20 text-amber-300"}`}>
                  {useRealModels ? "Activo" : "Fallback"}
                </span>
              </button>
              <button
                onClick={() => setWorldViewMode(playerMode ? "free-view" : "player")}
                className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${
                  playerMode
                    ? "border-violet-400/30 bg-violet-400/10 text-violet-300"
                    : "border-white/10 bg-white/5 text-zinc-400"
                }`}
              >
                <span>{playerMode ? "Modo jugador" : "Vista libre"}</span>
              </button>
              {playerMode && selectedCharacterId === "ticker" && (
                <button
                  onClick={() => setUseAnimatedPlayer(!useAnimatedPlayer)}
                  className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${
                    useAnimatedPlayer
                      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                      : "border-white/10 bg-white/5 text-zinc-400"
                  }`}
                >
                  <span>Anim.Ticker {useAnimatedPlayer ? "ON" : "OFF"}</span>
                </button>
              )}
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <section className="space-y-4">
            {playerMode && (
              <div className="rounded-2xl border border-violet-400/20 bg-violet-400/5 p-3">
                <div className="flex flex-wrap items-center gap-3 text-[10px]">
                  <span className="font-bold uppercase tracking-wider text-violet-300">Jugador activo</span>
                  <select
                    value={selectedCharacterId}
                    onChange={(e) => handleCharacterChange(e.target.value)}
                    className="rounded-lg border border-white/10 bg-black/50 px-2 py-1 text-cyan-200 focus:border-cyan-400/50 focus:outline-none"
                  >
                    {characters.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <span className="text-zinc-600">+</span>
                  <select
                    value={selectedMountId}
                    onChange={(e) => setSelectedMountId(e.target.value)}
                    className="rounded-lg border border-white/10 bg-black/50 px-2 py-1 text-amber-200 focus:border-amber-400/50 focus:outline-none"
                  >
                    {mounts.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                  <span className="text-zinc-600">|</span>
                  <span className="text-zinc-500">WASD mover · Shift correr · Esc salir</span>
                  {useAnimatedPlayer && (
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2 py-0.5 text-[8px] font-bold text-emerald-400">
                      Ticker animado: {movementState === "idle" ? "Idle" : movementState === "walking" ? "Walk" : "Run"}
                    </span>
                  )}
                </div>
              </div>
            )}
            <div className="relative">
              <WorldScene
                useRealModels={useRealModels}
                selectedZone={selectedZone}
                onSelectZone={setSelectedZone}
                playerMode={playerMode}
                selectedCharacterId={selectedCharacterId}
                selectedMountId={selectedMountId}
                playerPosition={playerPosition}
                onPlayerPositionChange={handlePlayerPositionChange}
                nearZoneId={nearZoneId}
                activeZoneId={activeZoneId}
                useAnimatedPlayer={useAnimatedPlayer}
                onMovementStateChange={setMovementState}
                worldMountMode={worldMountMode}
                playerTeleportPosition={playerTeleportPosition}
                activeBuildingId={activeBuildingId}
                activeNpcId={activeNpcId}
                nearNpcId={nearNpcId}
                activeMasterId={activeMasterId}
                nearMasterId={nearMasterId}
                onSelectMaster={setActiveMasterId}
              />
              {/* WoW-style HUD overlay */}
              <div className="pointer-events-none absolute inset-0">
                <div className="pointer-events-auto absolute left-3 top-3">
                  <PlayerFrame selectedCharacterId={selectedCharacterId} />
                </div>
                <div className="pointer-events-auto absolute right-3 top-3">
                  <TargetFrame masterId={activeMasterId} npcId={activeNpcId} />
                </div>
                <div className="pointer-events-auto absolute bottom-3 left-1/2 -translate-x-1/2">
                  <WorldActionBar />
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            {playerMode && (
              <>
                <WorldFastTravelPanel
                  activeZoneId={activeZoneId}
                  nearZoneId={nearZoneId}
                  onTravelToZone={teleportToZone}
                />
                <WorldMountModePanel
                  worldMountMode={worldMountMode}
                  onChangeMode={setWorldMountMode}
                  selectedCharacterName={characters.find((c) => c.id === selectedCharacterId)?.name}
                  selectedMountName={mounts.find((m) => m.id === selectedMountId)?.name}
                />
              </>
            )}
            <WorldMiniMap
              playerPosition={playerPosition}
              activeZoneId={activeZoneId}
              nearZoneId={nearZoneId}
              onSelectZone={setActiveZoneId}
            />
            <WorldZoneLegend
              activeZoneId={activeZoneId}
              nearZoneId={nearZoneId}
              onSelectZone={setActiveZoneId}
            />
            <WorldHUD
              useRealModels={useRealModels}
              selectedZone={selectedZone}
              onSelectZone={setSelectedZone}
              characterCount={characters.length}
              mountCount={mounts.length}
              playerMode={playerMode}
              playerPosition={playerPosition}
              selectedCharacterId={selectedCharacterId}
              selectedMountId={selectedMountId}
              nearZoneId={nearZoneId}
              useAnimatedPlayer={useAnimatedPlayer}
              movementState={movementState}
              worldMountMode={worldMountMode}
              onResetWorldSession={resetWorldSession}
              activeBuildingId={activeBuildingId}
            />
            {playerMode && (
              <WorldQuestPanel
                zoneId={nearZoneId}
                onActivateZone={setActiveZoneId}
              />
            )}
            <WorldNavPanel onTeleport={handleTeleport} />
            <WorldLocationPanel selectedZone={selectedZone} />
            <WorldProgressPanel />
            <GraphicsSettingsPanel />
            <CloudSaveStatusPanel />
            <TradingBuildingInfoPanel
              buildingId={activeBuildingId}
              onClear={() => setActiveBuildingId(null)}
            />
            {dialogueNpcId ? (
              <NpcDialoguePanel
                npcId={dialogueNpcId}
                onClose={() => setDialogueNpcId(null)}
                onStartQuest={(questId) => {
                  useWorldProgressStore.getState().startQuest(questId)
                }}
              />
            ) : (
              <TradingNpcInfoPanel
                npcId={activeNpcId}
                onClear={() => setActiveNpcId(null)}
                onOpenDialogue={setDialogueNpcId}
              />
            )}
            <QuestJournalPanel />
            <TradingSkillTreePanel />
            <TradingInventoryPanel />
            <TraderProfilePanel />
            <TradingAchievementsPanel />
            <DailyTradingRoutinePanel />
            <WorldChatPanel />
            {aiDialogueMasterId ? (
              <AiNpcDialoguePanel masterId={aiDialogueMasterId} onClose={() => setAiDialogueMasterId(null)} />
            ) : null}
            <TradingMasterLocationPanel
              masterId={activeMasterId}
              onClear={() => setActiveMasterId(null)}
            />
            {nearMasterId && !aiDialogueMasterId && (
              <div className="rounded-2xl border border-violet-400/20 bg-violet-400/[0.03] px-3 py-2 text-center">
                <p className="text-[10px] text-violet-300/80">
                  Presiona <span className="rounded border border-violet-400/30 bg-violet-400/10 px-1.5 py-0.5 font-bold text-violet-300">F</span> para hablar con {tradingMasters.find((m) => m.id === nearMasterId)?.name}
                </p>
              </div>
            )}
            <TradingMastersPanel />
            <TradingScenarioTrainerPanel />
            <MarketReplayTrainerPanel />
            <TradingAcademyPanel />
            <TradingMissionBoard onSelectZone={setActiveZoneId} />
            <WorldBlueprintPanel />
            <WorldSaveSlotsPanel
              currentSession={{
                selectedCharacterId,
                selectedMountId,
                activeZoneId,
                playerPosition,
                worldMountMode,
                worldViewMode,
                worldModelMode,
                useAnimatedPlayer,
              }}
              onLoadSlot={loadWorldSlot}
            />
          </aside>
        </div>
      </section>
    </main>
  )
}
