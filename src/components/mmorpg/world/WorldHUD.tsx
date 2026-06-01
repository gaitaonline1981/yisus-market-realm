"use client"

import { worldZones } from "@/data/mmorpg/worldZones"
import { useWorldProgressStore } from "@/stores/useWorldProgressStore"
import { getQuestById } from "@/data/mmorpg/worldQuests"
import { getTraderRankByXp } from "@/lib/mmorpg/traderRank"
import { useTradingAchievementsStore } from "@/stores/useTradingAchievementsStore"

interface WorldHUDProps {
  useRealModels: boolean
  selectedZone: string
  onSelectZone: (id: string) => void
  characterCount: number
  mountCount: number
  playerMode?: boolean
  playerPosition?: [number, number, number]
  selectedCharacterId?: string
  selectedMountId?: string
  nearZoneId?: string | null
  useAnimatedPlayer?: boolean
  movementState?: "idle" | "walking" | "running"
  worldMountMode?: "on-foot" | "companion" | "mounted"
  onResetWorldSession?: () => void
  activeBuildingId?: string | null
  activeNpcId?: string | null
  nearNpcId?: string | null
}

const ZONES = worldZones.map((z) => ({ id: z.id, label: z.name }))

export function WorldHUD({
  useRealModels, selectedZone, onSelectZone, characterCount, mountCount,
  playerMode, playerPosition, selectedCharacterId, selectedMountId, nearZoneId,
  useAnimatedPlayer, movementState, worldMountMode, onResetWorldSession,
  activeBuildingId, activeNpcId, nearNpcId,
}: WorldHUDProps) {
  const nearZone = nearZoneId ? worldZones.find((z) => z.id === nearZoneId) : null
  const xp = useWorldProgressStore((s) => s.xp)
  const completedCount = useWorldProgressStore((s) => s.getCompletedCount())
  const totalQuests = useWorldProgressStore((s) => s.getTotalQuests())
  const activeQuestId = useWorldProgressStore((s) => s.activeQuestId)
  const titles = useWorldProgressStore((s) => s.titles)
  const activeQuest = activeQuestId ? getQuestById(activeQuestId) : null
  const rank = getTraderRankByXp(xp)
  const unlockedAchievements = useTradingAchievementsStore((s) => s.unlockedAchievementIds.length)

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-zinc-500">World HUD</p>

      <div className="space-y-1 text-[10px]">
        <Row label="Modo 3D" color={useRealModels ? "text-cyan-400" : "text-amber-400"}>{useRealModels ? "GLB Real" : "Placeholder 3D"}</Row>
        <Row label="Modo juego" color={playerMode ? "text-violet-300" : "text-zinc-500"}>{playerMode ? "Jugador" : "Vista libre"}</Row>
        <Row label="Personajes" color="text-cyan-400">{characterCount}</Row>
        <Row label="Monturas" color="text-amber-400">{mountCount}</Row>
        <Row label="Zona" color="text-violet-300" truncate>{selectedZone}</Row>
        <Row label="Rango" color={rank.color} truncate>{rank.name}</Row>
        <Divider />
        <Row label="Zona cerca" color={nearZone ? "text-cyan-400" : "text-zinc-600"} truncate>{nearZone ? nearZone.name : "ninguna"}</Row>
        <Row label="XP" color="text-cyan-400" bold>{xp}</Row>
        <Row label="Misiones" color="text-violet-300" bold>{completedCount}/{totalQuests}</Row>
        <Row label="Títulos" color="text-amber-400" bold>{titles.length}</Row>
        <Row label="Logros" color="text-emerald-400" bold>{unlockedAchievements}</Row>
        {activeQuest && (
          <>
            <Divider />
            <Row label="Misión activa" color="text-cyan-400" truncate>{activeQuest.title}</Row>
          </>
        )}
        {useAnimatedPlayer && movementState && selectedCharacterId === "ticker" && (
          <>
            <Divider />
            <Row label="Animación" color={movementState === "idle" ? "text-cyan-400" : movementState === "walking" ? "text-emerald-400" : "text-amber-400"}>
              {movementState === "idle" ? "Idle" : movementState === "walking" ? "Walk 🚶" : "Run 🏃"}
            </Row>
          </>
        )}
        {playerMode && selectedCharacterId !== "ticker" && (
          <>
            <Divider />
            <Row label="Animación" color="text-zinc-500">Pendiente para este personaje</Row>
          </>
        )}
        {worldMountMode && (
          <>
            <Divider />
            <Row label="Modo montura" color={worldMountMode === "mounted" ? "text-violet-300" : worldMountMode === "companion" ? "text-amber-400" : "text-cyan-400"}>
              {worldMountMode === "mounted" ? "Montado 🧑‍🐉" : worldMountMode === "companion" ? "Companion 🐉" : "A pie 🚶"}
            </Row>
          </>
        )}
        {activeBuildingId && (
          <>
            <Divider />
            <Row label="Edificio" color="text-cyan-400" bold truncate>{activeBuildingId}</Row>
          </>
        )}
        {activeNpcId && (
          <>
            <Divider />
            <Row label="NPC activo" color="text-violet-300" bold truncate>{activeNpcId}</Row>
          </>
        )}
        {nearNpcId && !activeNpcId && (
          <>
            <Divider />
            <Row label="NPC cerca" color="text-cyan-400" truncate>{nearNpcId}</Row>
          </>
        )}
      </div>

      {playerMode && playerPosition && (
        <div className="mt-2 border-t border-white/5 pt-2">
          <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-zinc-500">Posición</p>
          <div className="flex gap-2 font-mono text-[9px]">
            <span className="text-zinc-500">X:</span><span className="text-cyan-400">{playerPosition[0].toFixed(1)}</span>
            <span className="text-zinc-500">Y:</span><span className="text-cyan-400">{playerPosition[1].toFixed(1)}</span>
            <span className="text-zinc-500">Z:</span><span className="text-cyan-400">{playerPosition[2].toFixed(1)}</span>
          </div>
        </div>
      )}

      <p className="mt-1 text-[8px] italic text-zinc-600">
        Los logros reconocen progreso trader. Usá Mission Board para avanzar.
      </p>

      <div className="mt-2 border-t border-white/5 pt-2">
        <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-zinc-500">Sesión local</p>
        <p className="mb-1.5 text-[8px] leading-relaxed text-zinc-600">
          Tu personaje, montura, zona y posición se guardan automáticamente. Save slots locales disponibles.
        </p>
        {onResetWorldSession && (
          <button onClick={onResetWorldSession}
            className="w-full rounded-lg border border-red-400/20 bg-red-400/5 px-2.5 py-1 text-[9px] font-bold text-red-400 transition hover:bg-red-400/10"
          >
            Reset sesión local
          </button>
        )}
      </div>

      <div className="mt-2 border-t border-white/5 pt-2">
        <p className="mb-1.5 text-[9px] font-bold uppercase tracking-wider text-zinc-500">Zonas</p>
        <div className="grid gap-1">
          {ZONES.map((z) => {
            const active = selectedZone === z.id
            return (
              <button key={z.id} onClick={() => onSelectZone(z.id)}
                className={`w-full rounded-lg px-2.5 py-1.5 text-left text-[9px] font-bold uppercase tracking-wider transition ${
                  active ? "border border-cyan-400/30 bg-cyan-400/10 text-cyan-400" : "border border-white/5 bg-white/[0.02] text-zinc-500 hover:bg-white/5"
                }`}
              >
                {z.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Row({ label, color, truncate, bold, children }: { label: string; color: string; truncate?: boolean; bold?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-zinc-500">{label}</span>
      <span className={`${color} ${bold ? "font-bold" : ""} ${truncate ? "max-w-[120px] truncate" : ""}`}>{children}</span>
    </div>
  )
}

function Divider() {
  return <div className="border-t border-white/5" />
}
