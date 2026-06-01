"use client"

import { useEffect, useState, useCallback } from "react"
import { useSearchParams } from "react-router-dom"
import { characters } from "@/data/mmorpg/characters"
import { mounts } from "@/data/mmorpg/mounts"
import { tradingMasters } from "@/data/mmorpg/tradingMasters"
import { getMasterAsset } from "@/data/mmorpg/masterAssets"
import { getAnimationPreset } from "@/data/mmorpg/animationPresets"
import { masterCalibrationDefaults } from "@/data/mmorpg/modelCalibrationDefaults"
import type { PreviewMode } from "@/components/mmorpg/viewer/CharacterViewer"
import { ShowroomViewer } from "./ShowroomViewer"
import { ShowroomItemSelector } from "./ShowroomItemSelector"
import { ShowroomCalibrationPanel } from "./ShowroomCalibrationPanel"
import { AnimationDebugPanel } from "@/components/mmorpg/animation/AnimationDebugPanel"
import { GraphicsSettingsPanel } from "@/components/mmorpg/settings/GraphicsSettingsPanel"
import { AnimationValidationPanel } from "@/components/mmorpg/animation/AnimationValidationPanel"
import { TickerAnimationChecklist } from "@/components/mmorpg/animation/TickerAnimationChecklist"
import { TickerRiggingPilotPanel } from "@/components/mmorpg/animation/TickerRiggingPilotPanel"

type Vec3 = [number, number, number]
const ANIMATION_OPTIONS = ["Idle", "Walk", "Run", "Jump", "Wave", "Celebrate", "Analyze", "Skill_01", "Skill_02", "Ultimate"]

export function MMORPGShowroom() {
  const [searchParams] = useSearchParams()
  const [selectedType, setSelectedType] = useState<"character" | "mount" | "master">(
    (searchParams.get("type") as "character" | "mount" | "master") || "character"
  )
  const [selectedId, setSelectedId] = useState(searchParams.get("id") || "ticker")
  const [previewMode, setPreviewMode] = useState<PreviewMode>("placeholder")
  const [requestedAnimation, setRequestedAnimation] = useState("Idle")
  const [loadedAnimations, setLoadedAnimations] = useState<string[]>([])
  const [transform, setTransform] = useState<{ scale: Vec3; position: Vec3; rotation: Vec3 }>({ scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0] })

  const item = selectedType === "character" ? characters.find((c) => c.id === selectedId) : selectedType === "mount" ? mounts.find((m) => m.id === selectedId) : tradingMasters.find((m) => m.id === selectedId)
  const masterAsset = selectedType === "master" ? getMasterAsset(selectedId) : undefined
  const animPreset = getAnimationPreset(selectedId)

  useEffect(() => {
    if (selectedType === "master") {
      const cal = masterCalibrationDefaults[selectedId]
      setTransform(cal ? { scale: cal.scale, position: cal.position, rotation: cal.rotation } : { scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0] })
      return
    }
    if (!item) { setTransform({ scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0] }); return }
    setTransform({ scale: item.modelScale ?? [1, 1, 1], position: item.modelPosition ?? [0, 0, 0], rotation: item.modelRotation ?? [0, 0, 0] })
  }, [selectedId, selectedType])

  const modelUrl = selectedType === "master" ? masterAsset?.glbPath : (item as any)?.modelUrl
  const handleAnimationsLoaded = useCallback((names: string[]) => setLoadedAnimations(names), [])

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-black/30 px-4 py-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Yisus Market Realm</p>
          <h1 className="text-lg font-black text-white">3D Showroom</h1>
        </div>
        <div className="flex gap-1">
          {(["placeholder", "static", "animated"] as const).map((mode) => (
            <button key={mode} onClick={() => setPreviewMode(mode)}
              className="rounded border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider transition"
              style={{
                borderColor: previewMode === mode ? "#22D3EE" : "rgba(255,255,255,0.1)",
                color: previewMode === mode ? "#22D3EE" : "#64748B",
                background: previewMode === mode ? "rgba(34,211,238,0.1)" : "transparent",
              }}
            >
              {mode === "placeholder" ? "Placeholder" : mode === "static" ? "GLB" : "Animado"}
            </button>
          ))}
        </div>
      </div>

      {/* Main area */}
      <div className="flex" style={{ height: "calc(100vh - 52px)" }}>
        {/* Left sidebar */}
        <div className="w-56 shrink-0 overflow-y-auto border-r border-white/5 bg-black/20">
          <ShowroomItemSelector selectedType={selectedType} selectedId={selectedId} onSelectType={setSelectedType} onSelectId={setSelectedId} />
          <div className="border-t border-white/5 p-2">
            <AnimationDebugPanel previewMode={previewMode} requestedAnimation={requestedAnimation} availableAnimations={animPreset?.availableAnimations} riggedModelUrl={animPreset?.riggedModelUrl} staticModelUrl={modelUrl} entityName={item?.name} />
          </div>
          {selectedType === "character" && selectedId === "ticker" && previewMode === "animated" && (
            <div className="border-t border-white/5 p-2 space-y-2">
              <AnimationValidationPanel expectedAnimations={animPreset?.availableAnimations || []} foundAnimations={loadedAnimations} riggedModelUrl={animPreset?.riggedModelUrl} />
              <TickerAnimationChecklist foundAnimations={loadedAnimations} />
            </div>
          )}
        </div>

        {/* Center - 3D viewer */}
        <div className="flex-1 p-3">
          <div className="h-full">
            <ShowroomViewer key={`${selectedType}-${selectedId}-${previewMode}`} selectedType={selectedType} selectedId={selectedId} modelUrl={modelUrl} useRealModels={previewMode !== "placeholder"} transform={transform} previewMode={previewMode} riggedModelUrl={animPreset?.riggedModelUrl} animationName={requestedAnimation} onAnimationsLoaded={handleAnimationsLoaded} />
          </div>
        </div>

        {/* Right panel */}
        <div className="w-56 shrink-0 overflow-y-auto border-l border-white/5 bg-black/20 p-2 space-y-2">
          <GraphicsSettingsPanel />
          {item && selectedType === "character" && selectedId === "ticker" && <TickerRiggingPilotPanel />}
          {item && <ShowroomCalibrationPanel transform={transform} onChangeTransform={setTransform} selectedName={item.name} selectedType={selectedType} />}
        </div>
      </div>

      {/* Animation selector */}
      {previewMode === "animated" && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-white/5 bg-black/80 px-4 py-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Animación:</span>
            <select value={requestedAnimation} onChange={(e) => setRequestedAnimation(e.target.value)}
              className="rounded border border-white/10 bg-black/50 px-2 py-1 text-[11px] text-cyan-200 outline-none">
              {ANIMATION_OPTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
            {loadedAnimations.length > 0 && <span className="text-[10px] text-zinc-600">Clips: {loadedAnimations.join(", ")}</span>}
            {!animPreset?.riggedModelUrl && <span className="rounded-full border border-amber-400/20 bg-amber-400/5 px-2 py-0.5 text-[9px] font-bold text-amber-400">Sin modelo riggeado</span>}
          </div>
        </div>
      )}
    </div>
  )
}
