"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { GameHUD, MiniMap, ControlsHelp } from "@/components/hud/GameHUD";
import { NPCInteraction } from "@/components/game/NPCInteraction";
import { QuestTracker } from "@/components/game/QuestTracker";
import { InventoryPanel } from "@/components/game/InventoryPanel";
import { AcademyPanel } from "@/components/game/AcademyPanel";
import { SkillTreePanel } from "@/components/game/SkillTreePanel";
import { TradingPanel } from "@/components/game/TradingPanel";
import { FastTravelPanel } from "@/components/game/FastTravelPanel";
import { ChatPanel } from "@/components/game/ChatPanel";
import { ExchangeSettingsPanel } from "@/components/game/ExchangeSettingsPanel";
import { TokenWallet } from "@/components/game/TokenWallet";
import { SaveSystem } from "@/components/game/SaveSystem";
import { AchievementNotifier } from "@/components/game/AchievementNotifier";
import { LevelUpEffect } from "@/components/game/LevelUpEffect";
import { MultiplayerConnector } from "@/components/game/MultiplayerConnector";
import { SoundProvider } from "@/components/game/SoundProvider";
import { TokenEarner } from "@/components/game/TokenEarner";
import { TokenRewards } from "@/components/game/TokenRewards";
import { AudioSystem } from "@/components/game/AudioSystem";
import * as THREE from "three";

// ====== LIGHTING ======
function WorldLighting() {
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const ambRef = useRef<THREE.AmbientLight>(null);

  useFrame(() => {
    const t = Date.now() * 0.00002;
    const day = (Math.sin(t) + 1) / 2;
    const b = 0.5 + day * 0.5; // 50-100% brightness
    if (sunRef.current) {
      sunRef.current.intensity = 0.5 + b * 0.8;
      sunRef.current.position.set(Math.cos(t)*25, 12 + Math.sin(t)*15, Math.sin(t*0.5)*25);
    }
    if (ambRef.current) ambRef.current.intensity = 0.4 + b * 0.4;
  });

  return (
    <>
      <ambientLight ref={ambRef} intensity={0.6} />
      <directionalLight ref={sunRef} position={[15, 20, 10]} intensity={1.2} castShadow shadow-mapSize={[1024,1024]} />
      <hemisphereLight args={["#8899cc","#445544",0.5]} />
    </>
  );
}

// ====== TERRAIN ZONES ======
function ZoneTerrain({ pos, size, type, color }: { pos: [number,number]; size: number; type: string; color: string }) {
  const hw = size / 2;
  const meshRef = useRef<THREE.Mesh>(null);

  // Different ground heights and colors per zone type
  let groundColor = "#1e293b";
  let y = 0;
  if (type === "mountains") { groundColor = "#3a2a1a"; y = 0.3; }
  else if (type === "forest") { groundColor = "#1a2a1a"; }
  else if (type === "plains") { groundColor = "#1a2a2a"; }
  else if (type === "city") { groundColor = "#1a1a2a"; }
  else if (type === "temple") { groundColor = "#2a1a1a"; }
  else if (type === "port") { groundColor = "#1a2a3a"; }
  else if (type === "arena") { groundColor = "#2a1a0a"; }
  else if (type === "observatory") { groundColor = "#0a0a2a"; }
  else if (type === "spawn") { groundColor = "#1a2a1a"; }

  return (
    <group position={[pos[0], 0, pos[1]]}>
      {/* Colored tile */}
      <mesh ref={meshRef} rotation={[-Math.PI/2,0,0]}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} />
      </mesh>
      {/* Ground plane */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI/2,0,0]} receiveShadow>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial color={groundColor} roughness={0.85} />
      </mesh>
    </group>
  );
}

// ====== PROPS ======
function Tree({ position, s = 1 }: { position: [number,number,number]; s?: number }) {
  const v = Math.floor(Math.abs(position[0]*7+position[2]*3)%3);
  return (
    <group position={position} scale={s}>
      <mesh position={[0,1.2,0]} castShadow><cylinderGeometry args={[0.1,0.16,2.2,6]} /><meshStandardMaterial color="#5a3a2a" roughness={0.9} /></mesh>
      {v===0 && <><mesh position={[0,2.2,0]} castShadow><coneGeometry args={[1.3,2.5,8]} /><meshStandardMaterial color="#2a5a2a" roughness={0.8} /></mesh><mesh position={[0,3.4,0]} castShadow><coneGeometry args={[0.9,2,8]} /><meshStandardMaterial color="#3a7a3a" roughness={0.7} /></mesh></>}
      {v===1 && <><mesh position={[0,2,0]} castShadow><sphereGeometry args={[1.1,8,6]} /><meshStandardMaterial color="#1a4a2a" roughness={0.8} /></mesh><mesh position={[0,3,0]} castShadow><sphereGeometry args={[0.8,8,6]} /><meshStandardMaterial color="#2a6a2a" roughness={0.7} /></mesh></>}
      {v===2 && <><mesh position={[0,1.8,0]} castShadow><coneGeometry args={[1.4,2.8,6]} /><meshStandardMaterial color="#234a23" roughness={0.8} /></mesh><mesh position={[0,2.8,0]} castShadow><coneGeometry args={[1,2.2,6]} /><meshStandardMaterial color="#2d6a2d" roughness={0.7} /></mesh><mesh position={[0,3.6,0]} castShadow><coneGeometry args={[0.6,1.5,6]} /><meshStandardMaterial color="#3a8a3a" roughness={0.7} /></mesh></>}
    </group>
  );
}

function Rock({ position, s = 1 }: { position: [number,number,number]; s?: number }) {
  return <mesh position={position} scale={s} castShadow><icosahedronGeometry args={[0.5,0]} /><meshStandardMaterial color="#4a5568" roughness={0.7} flatShading /></mesh>;
}

function Bush({ position }: { position: [number,number,number] }) {
  return (
    <group position={position}>
      <mesh position={[0,0.4,0]} castShadow><sphereGeometry args={[0.5,6,4]} /><meshStandardMaterial color="#2a5a2a" roughness={0.8} /></mesh>
      <mesh position={[0.25,0.45,0.1]} castShadow><sphereGeometry args={[0.35,6,4]} /><meshStandardMaterial color="#3a6a3a" roughness={0.7} /></mesh>
    </group>
  );
}

function Mountain({ position, h = 8 }: { position: [number,number,number]; h?: number }) {
  return (
    <group position={position}>
      <mesh position={[0,h/2,0]} castShadow><coneGeometry args={[h*0.3,h,6]} /><meshStandardMaterial color="#5a4a3a" roughness={0.8} flatShading /></mesh>
      <mesh position={[0,h*0.7,0]} castShadow><coneGeometry args={[h*0.2,h*0.6,6]} /><meshStandardMaterial color="#6a5a4a" roughness={0.7} flatShading /></mesh>
      <mesh position={[0,h,-1]}><sphereGeometry args={[h*0.1,4,4]} /><meshStandardMaterial color="#ffffff" roughness={0.3} /></mesh>
    </group>
  );
}

function Crystal({ position, color = "#8844ff" }: { position: [number,number,number]; color?: string }) {
  return (
    <group position={position}>
      <mesh position={[0,0.6,0]}><coneGeometry args={[0.25,1.2,6]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} roughness={0.3} /></mesh>
      <mesh position={[0.2,0.4,0.1]} rotation={[0,0,0.2]}><coneGeometry args={[0.12,0.8,6]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} roughness={0.3} /></mesh>
    </group>
  );
}

function Lantern({ position }: { position: [number,number,number] }) {
  return (
    <group position={position}>
      <mesh position={[0,1.3,0]}><cylinderGeometry args={[0.05,0.07,2.6,8]} /><meshStandardMaterial color="#4a3728" roughness={0.7} /></mesh>
      <mesh position={[0,2.8,0]}><boxGeometry args={[0.25,0.4,0.25]} /><meshStandardMaterial color="#ffcc66" emissive="#ffcc66" emissiveIntensity={0.5} /></mesh>
      <mesh position={[0,2.8,0]}><sphereGeometry args={[0.12,8,8]} /><meshStandardMaterial color="#ffee88" emissive="#ffee88" emissiveIntensity={0.7} /></mesh>
    </group>
  );
}

function Building({ position, color = "#1e3a5f", h = 5, w = 2 }: { position: [number,number,number]; color?: string; h?: number; w?: number }) {
  return (
    <group position={position}>
      <mesh position={[0,h/2,0]} castShadow><boxGeometry args={[w,0.3,w+1]} /><meshStandardMaterial color="#1a1a2e" /></mesh>
      <mesh position={[0,h/2,0]} castShadow><boxGeometry args={[w-0.2,h,w-0.2]} /><meshStandardMaterial color={color} roughness={0.4} metalness={0.5} /></mesh>
      {Array.from({length:Math.floor(h)}).map((_,i)=>(<mesh key={`w-${i}`} position={[0,i+0.8,w/2]}><planeGeometry args={[w*0.7,0.5]} /><meshStandardMaterial color="#64b5f6" emissive="#64b5f6" emissiveIntensity={0.2} /></mesh>))}
      <mesh position={[0,h+0.8,0]}><coneGeometry args={[w*0.3,1,4]} rotation={[0,Math.PI/4,0]} /><meshStandardMaterial color="#2a2a3e" /></mesh>
    </group>
  );
}

// ====== PLAYER ======
function PlayerModel() {
  const ref = useRef<THREE.Group>(null);
  const keys = useRef<Set<string>>(new Set());
  const pos = useRef([0, 0, 5]);
  const rot = useRef(0);
  const { camera } = useThree();

  useEffect(() => {
    const kd = (e: KeyboardEvent) => keys.current.add(e.key.toLowerCase());
    const ku = (e: KeyboardEvent) => keys.current.delete(e.key.toLowerCase());
    window.addEventListener("keydown", kd); window.addEventListener("keyup", ku);
    return () => { window.removeEventListener("keydown", kd); window.removeEventListener("keyup", ku); };
  }, []);

  useFrame(() => {
    const k = keys.current;
    const sp = 0.15;
    let dx = 0, dz = 0;
    if (k.has("w")) dz -= sp;
    if (k.has("s")) dz += sp;
    if (k.has("a")) { dx -= sp*0.7; rot.current -= 0.04; }
    if (k.has("d")) { dx += sp*0.7; rot.current += 0.04; }
    if (dx||dz) {
      const c = Math.cos(rot.current), s = Math.sin(rot.current);
      pos.current = [pos.current[0]+c*dz+s*dx, 0, pos.current[2]-s*dz+c*dx];
    }
    if (ref.current) {
      ref.current.position.set(pos.current[0], 0, pos.current[2]);
      ref.current.rotation.y = rot.current;
    }
    const p = pos.current;
    camera.position.set(p[0]-Math.sin(rot.current)*10, 8, p[2]-Math.cos(rot.current)*10);
    camera.lookAt(p[0], 1.5, p[2]);
  });

  return (
    <group ref={ref}>
      <mesh position={[0,1,0]} castShadow><capsuleGeometry args={[0.35,0.9,8,8]} /><meshStandardMaterial color="#2FC7C9" roughness={0.3} metalness={0.3} /></mesh>
      <mesh position={[0,1.7,0]} castShadow><sphereGeometry args={[0.28,8,8]} /><meshStandardMaterial color="#3FE7D9" roughness={0.3} metalness={0.2} /></mesh>
    </group>
  );
}

// ====== ZONE DEFINITIONS ======
const ZONES = [
  { pos: [0,0] as [number,number], size: 22, type: "spawn", color: "#2FC7C9", name: "Plaza del Trader" },
  { pos: [32,0] as [number,number], size: 26, type: "plains", color: "#A78BFA", name: "Llanuras de Liquidez" },
  { pos: [-32,0] as [number,number], size: 24, type: "forest", color: "#10B981", name: "Bosque de Wyckoff" },
  { pos: [0,-38] as [number,number], size: 28, type: "mountains", color: "#F59E0B", name: "Montañas Elliott" },
  { pos: [38,-38] as [number,number], size: 24, type: "city", color: "#EC4899", name: "Ciudad Prop Firms" },
  { pos: [-38,-38] as [number,number], size: 20, type: "temple", color: "#EF4444", name: "Templo del Riesgo" },
  { pos: [65,0] as [number,number], size: 20, type: "city", color: "#6366F1", name: "Distrito Backtesting" },
  { pos: [-65,0] as [number,number], size: 22, type: "arena", color: "#F97316", name: "Arena de Scalping" },
  { pos: [0,70] as [number,number], size: 28, type: "port", color: "#06B6D4", name: "Puerto Exchanges" },
  { pos: [0,-70] as [number,number], size: 24, type: "observatory", color: "#8B5CF6", name: "Observatorio Macro" },
];

// ====== WORLD CONTENT ======
function WorldDecor() {
  return (
    <group>
      {/* Mountains zone (Elliott) */}
      <Mountain position={[-5,-38,0]} h={10} />
      <Mountain position={[3,-42,0]} h={8} />
      <Mountain position={[8,-36,0]} h={6} />
      {Array.from({length:8}).map((_,i)=>(<Rock key={`mr-${i}`} position={[(-4+Math.random()*16),0,(Math.random()*14-40)]} s={1+Math.random()*2} />))}
      
      {/* Forest zone (Wyckoff) */}
      {Array.from({length:20}).map((_,i)=>(<Tree key={`ft-${i}`} position={[(-38+Math.random()*12),0,(Math.random()*12-6)]} s={0.8+Math.random()*0.7} />))}
      {Array.from({length:10}).map((_,i)=>(<Bush key={`fb-${i}`} position={[(-36+Math.random()*10),0,(Math.random()*10-5)]} />))}
      
      {/* City zone (Prop Firms) */}
      <Building position={[35,-36,0]} color="#EC4899" h={7} w={3} />
      <Building position={[40,-38,0]} color="#EC4899" h={5} w={2.5} />
      <Building position={[38,-40,0]} color="#2FC7C9" h={8} w={2} />
      {Array.from({length:6}).map((_,i)=>(<Lantern key={`pl-${i}`} position={[32+i*2,0,-35]} />))}
      
      {/* Temple zone */}
      <Building position={[-38,-36,0]} color="#EF4444" h={9} w={4} />
      {Array.from({length:8}).map((_,i)=>(<Rock key={`tr-${i}`} position={[(-40+Math.random()*6),0,(-40+Math.random()*6)]} s={1+Math.random()*1.5} />))}
      
      {/* Backtest - tech buildings */}
      <Building position={[63,0,0]} color="#6366F1" h={6} w={2.5} />
      <Building position={[65,3,0]} color="#6366F1" h={4} w={2} />
      
      {/* Arena */}
      <mesh position={[-65,0.5,0]}><cylinderGeometry args={[5,6,1,32,1,true]} /><meshStandardMaterial color="#c4a35a" roughness={0.5} side={THREE.DoubleSide} /></mesh>
      <mesh position={[-65,0,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[4.5,32]} /><meshStandardMaterial color="#8B7355" roughness={0.8} /></mesh>
      
      {/* Exchange Port - water + docks */}
      <Building position={[0,68,0]} color="#06B6D4" h={10} w={3} />
      <Building position={[-6,70,0]} color="#06B6D4" h={8} w={2} />
      <Building position={[6,70,0]} color="#06B6D4" h={9} w={2.5} />
      {Array.from({length:8}).map((_,i)=>(<Lantern key={`el-${i}`} position={[-8+i*2.3,0,66]} />))}
      
      {/* Observatory */}
      <mesh position={[0,-70,2]}><cylinderGeometry args={[2,3,4,8]} /><meshStandardMaterial color="#d0d0d0" roughness={0.3} metalness={0.5} /></mesh>
      <mesh position={[0,-70,4.5]}><sphereGeometry args={[2.5,16,8,0,Math.PI*2,0,Math.PI/2.5]} /><meshStandardMaterial color="#222244" roughness={0.2} metalness={0.6} /></mesh>
      {Array.from({length:6}).map((_,i)=>(<Crystal key={`oc-${i}`} position={[(-4+Math.random()*8),0,(-72-Math.random()*6)]} color="#8844ff" />))}
      
      {/* Scatter across world */}
      {Array.from({length:30}).map((_,i)=>(<Tree key={`st-${i}`} position={[(Math.random()-0.5)*140,0,(Math.random()-0.5)*140]} s={0.5+Math.random()*0.8} />))}
      {Array.from({length:20}).map((_,i)=>(<Rock key={`sr-${i}`} position={[(Math.random()-0.5)*140,0,(Math.random()-0.5)*140]} s={0.4+Math.random()*1.2} />))}
      {Array.from({length:25}).map((_,i)=>(<Bush key={`sb-${i}`} position={[(Math.random()-0.5)*140,0,(Math.random()-0.5)*140]} />))}
    </group>
  );
}

// ====== MAIN SCENE ======
function GameCanvas() {
  return (
    <Canvas camera={{position:[0,12,18],fov:50}} style={{position:"fixed",inset:0,background:"#0f172a"}}>
      <WorldLighting />
      
      {ZONES.map((z,i)=> <ZoneTerrain key={i} pos={z.pos} size={z.size} type={z.type} color={z.color} />)}
      
      <WorldDecor />
      <PlayerModel />

      <fog attach="fog" args={["#0f172a",80,200]} />
    </Canvas>
  );
}

export default function MMORPGWorldPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0f172a]">
      <Suspense fallback={null}><GameCanvas /></Suspense>
      <AudioSystem /><GameHUD /><MiniMap /><ControlsHelp />
      <NPCInteraction /><QuestTracker />
      <InventoryPanel /><AcademyPanel /><SkillTreePanel />
      <TradingPanel /><FastTravelPanel /><ChatPanel />
      <ExchangeSettingsPanel /><TokenWallet />
      <SaveSystem /><AchievementNotifier /><LevelUpEffect />
      <MultiplayerConnector /><SoundProvider />
      <TokenEarner /><TokenRewards />
    </div>
  );
}
