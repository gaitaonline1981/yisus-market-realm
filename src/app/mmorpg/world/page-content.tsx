"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { GameHUD, MiniMap, ControlsHelp } from "@/components/hud/GameHUD";

function Lights() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[15, 25, 10]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
      <hemisphereLight args={["#8899cc", "#334455", 0.6]} />
      <pointLight position={[0, 8, 0]} intensity={0.4} color="#2FC7C9" />
    </>
  );
}

function Ground() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>
      <gridHelper args={[300, 60, "#334155", "#1e293b"]} position={[0, 0.01, 0]} />
    </group>
  );
}

function PlayerModel() {
  const ref = useRef<THREE.Group>(null);
  const keys = useRef<Set<string>>(new Set());
  const posRef = useRef([0, 1, 5]);
  const rotRef = useRef(0);
  const { camera } = useThree();

  useEffect(() => {
    const kd = (e: KeyboardEvent) => keys.current.add(e.key.toLowerCase());
    const ku = (e: KeyboardEvent) => keys.current.delete(e.key.toLowerCase());
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    return () => { window.removeEventListener("keydown", kd); window.removeEventListener("keyup", ku); };
  }, []);

  useFrame(() => {
    const k = keys.current;
    const speed = 0.15;
    let dx = 0, dz = 0;
    if (k.has("w")) dz -= speed;
    if (k.has("s")) dz += speed;
    if (k.has("a")) { dx -= speed * 0.7; rotRef.current -= 0.04; }
    if (k.has("d")) { dx += speed * 0.7; rotRef.current += 0.04; }
    if (dx !== 0 || dz !== 0) {
      const cos = Math.cos(rotRef.current), sin = Math.sin(rotRef.current);
      posRef.current = [posRef.current[0] + cos * dz + sin * dx, 1, posRef.current[2] - sin * dz + cos * dx];
    }
    if (ref.current) {
      ref.current.position.set(posRef.current[0], 0, posRef.current[2]);
      ref.current.rotation.y = rotRef.current;
    }
    const t = posRef.current;
    camera.position.set(t[0] - Math.sin(rotRef.current) * 10, 8, t[2] - Math.cos(rotRef.current) * 10);
    camera.lookAt(t[0], 1.5, t[2]);
  });

  return (
    <group ref={ref}>
      {/* Player character */}
      <mesh position={[0, 1, 0]} castShadow>
        <capsuleGeometry args={[0.35, 0.9, 8, 8]} />
        <meshStandardMaterial color="#2FC7C9" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 1.7, 0]} castShadow>
        <sphereGeometry args={[0.28, 8, 8]} />
        <meshStandardMaterial color="#3FE7D9" roughness={0.3} metalness={0.2} />
      </mesh>
    </group>
  );
}

function ZoneAreas() {
  const zones = [
    { pos: [0, 0], color: "#2FC7C9", size: 20 },       // Trader Spawn (cyan)
    { pos: [30, 0], color: "#A78BFA", size: 25 },        // Liquidity Plains (purple)
    { pos: [-30, 0], color: "#10B981", size: 22 },       // Wyckoff Forest (green)
    { pos: [0, -35], color: "#F59E0B", size: 25 },       // Elliott Mountains (amber)
    { pos: [35, -35], color: "#EC4899", size: 22 },       // Prop Firm City (pink)
    { pos: [-35, -35], color: "#EF4444", size: 18 },      // Risk Temple (red)
    { pos: [60, 0], color: "#6366F1", size: 18 },         // Backtest (indigo)
    { pos: [-60, 0], color: "#F97316", size: 20 },        // Scalping Arena (orange)
    { pos: [0, 65], color: "#06B6D4", size: 25 },         // Exchange Port (cyan)
    { pos: [0, -65], color: "#8B5CF6", size: 22 },        // Macro Observatory (violet)
  ];

  return (
    <group>
      {zones.map((z, i) => (
        <mesh key={i} position={[z.pos[0], 0.02, z.pos[1]]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[z.size, z.size]} />
          <meshBasicMaterial color={z.color} transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  );
}

function GameCanvas() {
  return (
    <Canvas camera={{ position: [0, 10, 15], fov: 50 }} style={{ position: "fixed", inset: 0, background: "#0f172a" }}>
      <Lights />
      <Ground />
      <ZoneAreas />
      <PlayerModel />
    </Canvas>
  );
}

export default function MMORPGWorldPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0f172a]">
      <Suspense fallback={null}>
        <GameCanvas />
      </Suspense>
      <GameHUD />
      <MiniMap />
      <ControlsHelp />
    </div>
  );
}
