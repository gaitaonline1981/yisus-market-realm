"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { GameHUD, MiniMap, ControlsHelp } from "@/components/hud/GameHUD";
import { NPCInteraction } from "@/components/game/NPCInteraction";
import { QuestTracker } from "@/components/game/QuestTracker";
import { InventoryPanel } from "@/components/game/InventoryPanel";
import { AcademyPanel } from "@/components/game/AcademyPanel";
import { SkillTreePanel } from "@/components/game/SkillTreePanel";
import { TradingPanel } from "@/components/game/TradingPanel";
import { SaveSystem } from "@/components/game/SaveSystem";
import { AudioSystem } from "@/components/game/AudioSystem";
import { AchievementNotifier } from "@/components/game/AchievementNotifier";
import { LevelUpEffect } from "@/components/game/LevelUpEffect";
import { FastTravelPanel } from "@/components/game/FastTravelPanel";
import { MultiplayerConnector } from "@/components/game/MultiplayerConnector";
import { ChatPanel } from "@/components/game/ChatPanel";
import { ExchangeSettingsPanel } from "@/components/game/ExchangeSettingsPanel";
import { TokenEarner } from "@/components/game/TokenEarner";
import { TokenRewards } from "@/components/game/TokenRewards";
import { TokenWallet } from "@/components/game/TokenWallet";
import { SoundProvider } from "@/components/game/SoundProvider";
import { OtherPlayers } from "@/game/player/OtherPlayers";
import { WorldScene } from "@/game/world/WorldScene";
import { DayNightCycle } from "@/game/world/DayNightCycle";
import { PlayerCharacter } from "@/game/player/PlayerCharacter";
import { PlayerController } from "@/game/player/PlayerController";

function LoadingScreen() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#020408] z-50">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-cyan-300 text-sm font-mono">Cargando Yisus Market Realm...</p>
      </div>
    </div>
  );
}

function GameCanvas() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 8, 12], fov: 50 }}
      style={{ position: "fixed", inset: 0 }}
    >
      <DayNightCycle />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#2FC7C9" />

      <Suspense fallback={null}>
        <WorldScene />
        <PlayerCharacter />
        <OtherPlayers />
        <PlayerController />
      </Suspense>
    </Canvas>
  );
}

export default function MMORPGWorldPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#020408]">
      <Suspense fallback={<LoadingScreen />}>
        <GameCanvas />
      </Suspense>
      <AudioSystem />
      <GameHUD />
      <MiniMap />
      <ControlsHelp />
      <NPCInteraction />
      <QuestTracker />
      <InventoryPanel />
      <AcademyPanel />
      <SkillTreePanel />
      <TradingPanel />
      <SaveSystem />
      <AchievementNotifier />
      <LevelUpEffect />
      <FastTravelPanel />
      <MultiplayerConnector />
      <ChatPanel />
      <ExchangeSettingsPanel />
      <TokenEarner />
      <TokenRewards />
      <TokenWallet />
      <SoundProvider />
    </div>
  );
}
