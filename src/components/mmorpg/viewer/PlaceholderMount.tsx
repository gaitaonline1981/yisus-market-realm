"use client";

import React from "react";

interface PlaceholderMountProps {
  mountId?: string;
}

type Vec3 = [number, number, number];

function Box({ pos, size, color, metalness }: { pos: Vec3; size: Vec3; color: string; metalness?: number }) {
  return (
    <mesh position={pos}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} metalness={metalness ?? 0} roughness={0.5} />
    </mesh>
  );
}

function Sphere({ pos, radius, color, emissive }: { pos: Vec3; radius: number; color: string; emissive?: string }) {
  return (
    <mesh position={pos}>
      <sphereGeometry args={[radius, 12, 12]} />
      <meshStandardMaterial color={color} emissive={emissive ?? color} emissiveIntensity={emissive ? 0.3 : 0} />
    </mesh>
  );
}

function Cylinder({ pos, radius, height, color, emissive }: { pos: Vec3; radius: [number, number]; height: number; color: string; emissive?: string }) {
  return (
    <mesh position={pos}>
      <cylinderGeometry args={[radius[0], radius[1], height, 8]} />
      <meshStandardMaterial color={color} emissive={emissive ?? color} emissiveIntensity={emissive ? 0.3 : 0} />
    </mesh>
  );
}

function Capsule({ pos, radius, length, color }: { pos: Vec3; radius: number; length: number; color: string }) {
  return (
    <mesh position={pos}>
      <capsuleGeometry args={[radius, length, 8, 10]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Cone({ pos, radius, height, color }: { pos: Vec3; radius: number; height: number; color: string }) {
  return (
    <mesh position={pos}>
      <coneGeometry args={[radius, height, 6]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Wheel(pos: Vec3, size: number): React.ReactElement {
  return (
    <mesh key={`wheel-${pos[0]}-${pos[1]}`} position={pos} rotation={[Math.PI / 2, 0, 0] as Vec3}>
      <cylinderGeometry args={[size, size, size * 0.5, 12]} />
      <meshStandardMaterial color="#111827" />
    </mesh>
  );
}

function PocketRocket() {
  return (
    <group>
      <Box pos={[0, 0.15, 0]} size={[0.7, 0.15, 0.4]} color="#D93A32" />
      <Sphere pos={[0, 0.3, 0]} radius={0.15} color="#F4E8D6" />
      <Cylinder pos={[-0.4, 0.1, 0]} radius={[0.04, 0.06]} height={0.1} color="#C99A3E" />
      <Cone pos={[-0.5, 0.1, 0]} radius={0.04} height={0.15} color="#2FC7C9" />
      {[[-0.25, 0, 0.25], [0.25, 0, 0.25], [-0.25, 0, -0.25], [0.25, 0, -0.25]].map((p) => Wheel(p as Vec3, 0.18))}
    </group>
  );
}

function NobleSteed() {
  const legs: Vec3[] = [[-0.3, 0.15, 0.2], [0.3, 0.15, 0.2], [-0.3, 0.15, -0.2], [0.3, 0.15, -0.2]];
  return (
    <group>
      <Capsule pos={[0, 0.45, 0]} radius={0.28} length={0.6} color="#F4E8D6" />
      <mesh position={[0.35, 0.65, 0]} rotation={[0, 0, 0.3] as Vec3}>
        <cylinderGeometry args={[0.1, 0.15, 0.3, 8]} />
        <meshStandardMaterial color="#F4E8D6" />
      </mesh>
      <Sphere pos={[0.6, 0.85, 0]} radius={0.15} color="#F4E8D6" />
      <Cone pos={[0.2, 0.7, 0.1]} radius={0.04} height={0.2} color="#2FC7C9" />
      <Cone pos={[0.22, 0.72, -0.1]} radius={0.04} height={0.2} color="#2FC7C9" />
      {legs.map((p) => <Cylinder key={p[0]} pos={p} radius={[0.06, 0.08]} height={0.3} color="#7A4E2D" />)}
    </group>
  );
}

function WindDasher() {
  return (
    <group>
      <Capsule pos={[0, 0.1, 0]} radius={0.1} length={0.5} color="#2FC7C9" />
      <Box pos={[0, 0.15, 0.3]} size={[0.4, 0.02, 0.2]} color="#F4E8D6" />
      <Box pos={[0, 0.15, -0.3]} size={[0.4, 0.02, 0.2]} color="#F4E8D6" />
      <Box pos={[-0.4, 0.2, 0]} size={[0.05, 0.15, 0.12]} color="#F4E8D6" />
      <Sphere pos={[0.45, 0.1, 0]} radius={0.04} color="#B8793E" />
      <Box pos={[0.45, 0.1, 0.12]} size={[0.02, 0.04, 0.2]} color="#C99A3E" />
      <Box pos={[0.45, 0.1, -0.12]} size={[0.02, 0.04, 0.2]} color="#C99A3E" />
      {[[-0.2, 0, 0.1], [0.2, 0, 0.1], [-0.2, 0, -0.1], [0.2, 0, -0.1]].map((p) => Wheel(p as Vec3, 0.04))}
    </group>
  );
}

function SkywardTalon() {
  return (
    <group>
      <Capsule pos={[0, 0.3, 0]} radius={0.15} length={0.4} color="#F4FFFF" />
      <Sphere pos={[0.4, 0.5, 0]} radius={0.1} color="#F4FFFF" />
      <Cone pos={[0.5, 0.48, 0]} radius={0.03} height={0.08} color="#C99A3E" />
      <Box pos={[0, 0.35, 0.5]} size={[0.5, 0.03, 0.25]} color="#5AAFE0" />
      <Box pos={[0, 0.35, -0.5]} size={[0.5, 0.03, 0.25]} color="#5AAFE0" />
      <Cone pos={[-0.35, 0.3, 0]} radius={0.06} height={0.15} color="#F4FFFF" />
      <Sphere pos={[0.42, 0.53, 0.06]} radius={0.02} color="#37D5D6" emissive="#37D5D6" />
      <Sphere pos={[0.42, 0.53, -0.06]} radius={0.02} color="#37D5D6" emissive="#37D5D6" />
    </group>
  );
}

function LiquidityWhale() {
  return (
    <group>
      <Capsule pos={[0, 0.15, 0]} radius={0.3} length={0.6} color="#123B6D" />
      <Sphere pos={[0, 0.08, 0.25]} radius={0.15} color="#A8F7FF" />
      <Cone pos={[-0.55, 0.15, 0]} radius={0.08} height={0.15} color="#123B6D" />
      <Box pos={[-0.6, 0.15, 0.12]} size={[0.08, 0.02, 0.1]} color="#123B6D" />
      <Box pos={[-0.6, 0.15, -0.12]} size={[0.08, 0.02, 0.1]} color="#123B6D" />
      <Cone pos={[0.1, 0.3, 0]} radius={0.04} height={0.12} color="#36C7C9" />
      <Sphere pos={[0.35, 0.22, 0.18]} radius={0.03} color="#FFF" />
      <Sphere pos={[0.35, 0.22, -0.18]} radius={0.03} color="#FFF" />
    </group>
  );
}

function CandleDragon() {
  const legs: Vec3[] = [[-0.2, 0.08, 0.15], [0.2, 0.08, 0.15], [-0.2, 0.08, -0.15], [0.2, 0.08, -0.15]];
  return (
    <group>
      <Capsule pos={[0, 0.25, 0]} radius={0.22} length={0.5} color="#15191D" />
      <Sphere pos={[0, 0.15, 0.2]} radius={0.12} color="#D93A32" />
      <Sphere pos={[0.45, 0.4, 0]} radius={0.15} color="#15191D" />
      <Box pos={[0.55, 0.38, 0]} size={[0.1, 0.06, 0.06]} color="#15191D" />
      <mesh position={[0.65, 0.38, 0]}>
        <coneGeometry args={[0.03, 0.15, 6]} />
        <meshStandardMaterial color="#2EAD4A" emissive="#2EAD4A" emissiveIntensity={0.5} />
      </mesh>
      <Cylinder pos={[0.45, 0.55, 0]} radius={[0.01, 0.01]} height={0.06} color="#C99A3E" />
      <Sphere pos={[0.45, 0.6, 0]} radius={0.025} color="#E8832E" emissive="#E8832E" />
      <Box pos={[-0.1, 0.45, 0.4]} size={[0.35, 0.03, 0.2]} color="#2EAD4A" />
      <Box pos={[-0.1, 0.45, -0.4]} size={[0.35, 0.03, 0.2]} color="#2EAD4A" />
      <Cone pos={[-0.4, 0.15, 0]} radius={0.04} height={0.2} color="#15191D" />
      {legs.map((p) => <Cylinder key={p[0]} pos={p} radius={[0.04, 0.05]} height={0.15} color="#15191D" />)}
    </group>
  );
}

function OrderBlockRhino() {
  const legs: Vec3[] = [[-0.3, 0.08, 0.2], [0.3, 0.08, 0.2], [-0.3, 0.08, -0.2], [0.3, 0.08, -0.2]];
  return (
    <group>
      <Capsule pos={[0, 0.25, 0]} radius={0.35} length={0.5} color="#6E767D" />
      <Box pos={[0, 0.35, 0.22]} size={[0.5, 0.04, 0.12]} color="#2F343A" />
      <Box pos={[0, 0.35, -0.22]} size={[0.5, 0.04, 0.12]} color="#2F343A" />
      <Sphere pos={[0.5, 0.35, 0]} radius={0.2} color="#6E767D" />
      <Cone pos={[0.6, 0.45, 0]} radius={0.04} height={0.18} color="#C99A3E" />
      <Cone pos={[0.45, 0.42, 0]} radius={0.02} height={0.08} color="#C99A3E" />
      {legs.map((p) => <Cylinder key={p[0]} pos={p} radius={[0.08, 0.1]} height={0.15} color="#2F343A" />)}
    </group>
  );
}

function MoonHopper() {
  return (
    <group>
      <Sphere pos={[0, 0.2, 0]} radius={0.22} color="#F4FFFF" />
      <Sphere pos={[0.3, 0.35, 0]} radius={0.15} color="#F4FFFF" />
      <Cylinder pos={[0.3, 0.55, 0]} radius={[0.02, 0.03]} height={0.35} color="#F4FFFF" />
      <Cylinder pos={[0.35, 0.52, 0]} radius={[0.02, 0.03]} height={0.3} color="#F4FFFF" />
      <Cylinder pos={[0.3, 0.55, 0]} radius={[0.01, 0.015]} height={0.28} color="#32E0E3" emissive="#32E0E3" />
      <Sphere pos={[0.35, 0.38, 0.1]} radius={0.03} color="#32E0E3" emissive="#32E0E3" />
      <Sphere pos={[0.35, 0.38, -0.1]} radius={0.03} color="#32E0E3" emissive="#32E0E3" />
      <Sphere pos={[-0.15, 0.02, 0.15]} radius={0.1} color="#17204E" />
      <Sphere pos={[-0.15, 0.02, -0.15]} radius={0.1} color="#17204E" />
      <Cylinder pos={[-0.15, 0.08, 0.15]} radius={[0.02, 0.025]} height={0.06} color="#C99A3E" />
      <Cylinder pos={[-0.15, 0.08, -0.15]} radius={[0.02, 0.025]} height={0.06} color="#C99A3E" />
      <Sphere pos={[-0.2, 0.15, 0]} radius={0.03} color="#F4FFFF" />
    </group>
  );
}

function VolatilityFalcon() {
  return (
    <group>
      <Capsule pos={[0, 0.25, 0]} radius={0.12} length={0.35} color="#15191D" />
      <Sphere pos={[0.35, 0.35, 0]} radius={0.08} color="#15191D" />
      <Cone pos={[0.43, 0.33, 0]} radius={0.02} height={0.06} color="#D93A32" />
      <Sphere pos={[0.36, 0.37, 0.04]} radius={0.015} color="#D93A32" emissive="#D93A32" />
      <Sphere pos={[0.36, 0.37, -0.04]} radius={0.015} color="#D93A32" emissive="#D93A32" />
      <Box pos={[-0.05, 0.3, 0.35]} size={[0.3, 0.02, 0.15]} color="#6F7479" />
      <Box pos={[-0.05, 0.3, -0.35]} size={[0.3, 0.02, 0.15]} color="#6F7479" />
      <Cone pos={[-0.3, 0.25, 0]} radius={0.04} height={0.1} color="#15191D" />
      <Cone pos={[-0.4, 0.25, 0]} radius={0.02} height={0.12} color="#D93A32" />
    </group>
  );
}

function MarketRover() {
  return (
    <group>
      <Box pos={[0, 0.12, 0]} size={[0.6, 0.12, 0.35]} color="#D9A13B" />
      <Box pos={[0.1, 0.25, 0]} size={[0.3, 0.15, 0.2]} color="#F4E8D6" />
      <Box pos={[0.1, 0.35, 0]} size={[0.25, 0.02, 0.15]} color="#6E767D" />
      <Cylinder pos={[0.3, 0.4, 0]} radius={[0.01, 0.015]} height={0.15} color="#C99A3E" />
      <Sphere pos={[0.3, 0.5, 0]} radius={0.025} color="#2FC7C9" emissive="#2FC7C9" />
      {[[-0.25, 0.02, 0.22], [0.25, 0.02, 0.22], [-0.25, 0.02, -0.22], [0.25, 0.02, -0.22]].map((p) => Wheel(p as Vec3, 0.12))}
      <Sphere pos={[0.35, 0.1, 0.1]} radius={0.025} color="#2FC7C9" emissive="#2FC7C9" />
      <Sphere pos={[0.35, 0.1, -0.1]} radius={0.025} color="#2FC7C9" emissive="#2FC7C9" />
    </group>
  );
}

const COMPONENTS: Record<string, React.FC> = {
  "pocket-rocket": PocketRocket,
  "noble-steed": NobleSteed,
  "wind-dasher": WindDasher,
  "skyward-talon": SkywardTalon,
  "liquidity-whale": LiquidityWhale,
  "candle-dragon": CandleDragon,
  "order-block-rhino": OrderBlockRhino,
  "moon-hopper": MoonHopper,
  "volatility-falcon": VolatilityFalcon,
  "market-rover": MarketRover,
};

function DefaultMount() {
  return (
    <group>
      <Box pos={[0, 0, 0]} size={[1.2, 0.3, 0.5]} color="#374151" />
    </group>
  );
}

export function PlaceholderMount({ mountId }: PlaceholderMountProps) {
  const Component = COMPONENTS[mountId ?? ""] ?? DefaultMount;
  return (
    <group position={[0, -0.35, 0]}>
      <Component />
    </group>
  );
}
