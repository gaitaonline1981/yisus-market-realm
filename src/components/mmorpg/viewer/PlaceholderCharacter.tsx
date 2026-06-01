"use client";

import React from "react";

interface PlaceholderCharacterProps {
  characterId: string;
}

type Vec3 = [number, number, number];

function Sphere({ pos, radius, color, emissive }: { pos: Vec3; radius: number; color: string; emissive?: string }) {
  return (
    <mesh position={pos}>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial color={color} emissive={emissive ?? color} emissiveIntensity={emissive ? 0.3 : 0} />
    </mesh>
  );
}

function Box({ pos, size, color, metalness }: { pos: Vec3; size: Vec3; color: string; metalness?: number }) {
  return (
    <mesh position={pos}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} metalness={metalness ?? 0} roughness={0.5} />
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

function Cone({ pos, radius, height, color }: { pos: Vec3; radius: number; height: number; color: string }) {
  return (
    <mesh position={pos}>
      <coneGeometry args={[radius, height, 8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Torus({ pos, radius, tube, color, emissive }: { pos: Vec3; radius: number; tube: number; color: string; emissive?: string }) {
  return (
    <mesh position={pos}>
      <torusGeometry args={[radius, tube, 8, 16]} />
      <meshStandardMaterial color={color} emissive={emissive ?? color} emissiveIntensity={emissive ? 0.3 : 0} />
    </mesh>
  );
}

function Capsule({ pos, radius, length, color }: { pos: Vec3; radius: number; length: number; color: string }) {
  return (
    <mesh position={pos}>
      <capsuleGeometry args={[radius, length, 8, 12]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Ticker() {
  return (
    <group>
      <Capsule pos={[0, 0.7, 0]} radius={0.28} length={0.45} color="#F2B420" />
      <Sphere pos={[0, 1.25, 0]} radius={0.25} color="#C89A3D" />
      <Cone pos={[-0.2, 1.55, 0]} radius={0.07} height={0.35} color="#C89A3D" />
      <Cone pos={[0.2, 1.55, 0]} radius={0.07} height={0.35} color="#C89A3D" />
      <mesh position={[0, 1.22, 0.25]} rotation={[Math.PI / 2, 0, 0] as Vec3}>
        <cylinderGeometry args={[0.15, 0.15, 0.08, 16]} />
        <meshStandardMaterial color="#39C6C8" emissive="#39C6C8" emissiveIntensity={0.5} />
      </mesh>
      <Torus pos={[0, 1.35, 0]} radius={0.28} tube={0.04} color="#7A5332" />
      <Box pos={[0, 0.8, -0.35]} size={[0.2, 0.12, 0.08]} color="#39C6C8" />
    </group>
  );
}

function Hedgey() {
  return (
    <group>
      <Box pos={[0, 0.55, 0]} size={[0.7, 0.55, 0.45]} color="#BFC3C7" metalness={0.6} />
      <Sphere pos={[0, 1.1, 0]} radius={0.3} color="#BFC3C7" />
      <Cone pos={[0, 1.4, 0]} radius={0.06} height={0.25} color="#35D1D0" />
      <Torus pos={[0.45, 0.7, 0]} radius={0.2} tube={0.05} color="#C99A3E" />
      <mesh position={[0.45, 0.7, 0]}>
        <circleGeometry args={[0.15, 24]} />
        <meshStandardMaterial color="#35D1D0" metalness={0.3} roughness={0.5} />
      </mesh>
      <Box pos={[-0.2, 0.15, 0]} size={[0.18, 0.15, 0.2]} color="#6B4428" />
      <Box pos={[0.2, 0.15, 0]} size={[0.18, 0.15, 0.2]} color="#6B4428" />
    </group>
  );
}

function Slyde() {
  return (
    <group>
      <Capsule pos={[0, 0.7, 0]} radius={0.22} length={0.55} color="#214A37" />
      <Sphere pos={[0, 1.2, 0]} radius={0.22} color="#6E4AB8" />
      <Cone pos={[-0.2, 1.45, 0]} radius={0.04} height={0.2} color="#6E4AB8" />
      <Cone pos={[0.2, 1.45, 0]} radius={0.04} height={0.2} color="#6E4AB8" />
      <mesh position={[0, 0.4, -0.35]} rotation={[0.5, 0, 0] as Vec3}>
        <cylinderGeometry args={[0.04, 0.06, 0.4, 8]} />
        <meshStandardMaterial color="#6E4AB8" />
      </mesh>
      <Sphere pos={[-0.08, 1.25, 0.2]} radius={0.04} color="#36C7C9" emissive="#36C7C9" />
      <Sphere pos={[0.08, 1.25, 0.2]} radius={0.04} color="#36C7C9" emissive="#36C7C9" />
      <Box pos={[0, 0.5, 0.12]} size={[0.35, 0.4, 0.04]} color="#214A37" />
      <Sphere pos={[0.4, 0.7, 0]} radius={0.08} color="#C99A3E" emissive="#C99A3E" />
    </group>
  );
}

function Maci() {
  return (
    <group>
      <Capsule pos={[0, 0.6, 0]} radius={0.25} length={0.4} color="#2E8B57" />
      <Sphere pos={[0, 1.1, 0]} radius={0.22} color="#E9962D" />
      <Sphere pos={[-0.22, 1.25, 0]} radius={0.1} color="#28C7C9" emissive="#28C7C9" />
      <Sphere pos={[0.22, 1.25, 0]} radius={0.1} color="#28C7C9" emissive="#28C7C9" />
      <Torus pos={[-0.1, 1.12, 0.22]} radius={0.08} tube={0.015} color="#C99A3E" />
      <Torus pos={[0.1, 1.12, 0.22]} radius={0.08} tube={0.015} color="#C99A3E" />
      <Sphere pos={[0.35, 0.65, 0]} radius={0.1} color="#28C7C9" emissive="#28C7C9" />
      <Box pos={[0, 0.7, -0.3]} size={[0.25, 0.25, 0.12]} color="#7A4E2D" />
    </group>
  );
}

function Volumax() {
  return (
    <group>
      <Box pos={[0, 0.5, 0]} size={[0.65, 0.5, 0.4]} color="#2F343A" metalness={0.5} />
      <mesh position={[0, 0.55, 0.22]}>
        <planeGeometry args={[0.25, 0.15]} />
        <meshStandardMaterial color="#32E0E3" emissive="#32E0E3" emissiveIntensity={0.4} />
      </mesh>
      <Box pos={[0, 0.95, 0]} size={[0.32, 0.25, 0.25]} color="#2F343A" metalness={0.5} />
      <Sphere pos={[-0.1, 0.98, 0.14]} radius={0.05} color="#32E0E3" emissive="#32E0E3" />
      <Sphere pos={[0.1, 0.98, 0.14]} radius={0.05} color="#32E0E3" emissive="#32E0E3" />
      <Cylinder pos={[0, 0.6, -0.25]} radius={[0.04, 0.04]} height={0.3} color="#32E0E3" emissive="#32E0E3" />
      <mesh position={[-0.38, 0.4, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#6E767D" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[0.38, 0.4, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#6E767D" metalness={0.4} roughness={0.5} />
      </mesh>
      <Box pos={[-0.18, 0.15, 0]} size={[0.2, 0.12, 0.2]} color="#6E767D" metalness={0.3} />
      <Box pos={[0.18, 0.15, 0]} size={[0.2, 0.12, 0.2]} color="#6E767D" metalness={0.3} />
    </group>
  );
}

function Waven() {
  return (
    <group>
      <mesh position={[0, 0.15, 0]} rotation={[-Math.PI / 2, 0, 0] as Vec3}>
        <ringGeometry args={[0.4, 0.55, 32]} />
        <meshStandardMaterial color="#37D5D6" emissive="#37D5D6" emissiveIntensity={0.3} transparent opacity={0.4} side={2} />
      </mesh>
      <Capsule pos={[0, 0.7, 0]} radius={0.2} length={0.6} color="#6D42B8" />
      <mesh position={[0, 0.4, 0]}>
        <coneGeometry args={[0.35, 0.5, 12]} />
        <meshStandardMaterial color="#6D42B8" transparent opacity={0.8} />
      </mesh>
      <Sphere pos={[0, 1.15, 0]} radius={0.2} color="#A985D6" />
      <Cone pos={[0, 1.3, 0]} radius={0.22} height={0.2} color="#273C8F" />
      <Cylinder pos={[0.35, 0.7, 0]} radius={[0.02, 0.025]} height={0.7} color="#C99A3E" />
      <Sphere pos={[0.35, 1.05, 0]} radius={0.06} color="#37D5D6" emissive="#37D5D6" />
      <Sphere pos={[-0.07, 1.18, 0.18]} radius={0.035} color="#37D5D6" emissive="#37D5D6" />
      <Sphere pos={[0.07, 1.18, 0.18]} radius={0.035} color="#37D5D6" emissive="#37D5D6" />
    </group>
  );
}

function Sproket() {
  return (
    <group>
      <Box pos={[-0.45, 0.25, 0]} size={[0.1, 0.15, 0.1]} color="#55E7EA" />
      <Sphere pos={[-0.45, 0.35, 0]} radius={0.06} color="#55E7EA" emissive="#55E7EA" />
      <Capsule pos={[0, 0.6, 0]} radius={0.24} length={0.4} color="#2FC7C9" />
      <Sphere pos={[0, 1.1, 0]} radius={0.22} color="#F4E8D6" />
      <Sphere pos={[-0.15, 1.25, 0]} radius={0.1} color="#F062A6" />
      <Sphere pos={[0.15, 1.25, 0]} radius={0.1} color="#F062A6" />
      <Sphere pos={[0, 1.3, 0]} radius={0.08} color="#F062A6" />
      <Torus pos={[0, 1.12, 0.22]} radius={0.1} tube={0.025} color="#B8793E" />
      <Box pos={[0.35, 0.6, 0]} size={[0.04, 0.3, 0.04]} color="#B8793E" />
      <Torus pos={[0.35, 0.75, 0]} radius={0.06} tube={0.015} color="#B8793E" />
      <Box pos={[0, 0.65, -0.28]} size={[0.22, 0.2, 0.1]} color="#6F4528" />
      <Box pos={[0, 0.55, 0.15]} size={[0.3, 0.03, 0.01]} color="#F062A6" />
    </group>
  );
}

function Flipper() {
  const tokens: Vec3[] = [[-0.4, 0.5, 0.2], [0.4, 0.7, -0.15], [0.3, 0.35, 0.3]];
  return (
    <group>
      {tokens.map((pos, i) => (
        <Box key={i} pos={pos} size={[0.05, 0.05, 0.02]} color="#C99A3E" />
      ))}
      <Sphere pos={[0, 0.6, 0]} radius={0.35} color="#7A4E2D" />
      <Sphere pos={[0, 0.55, 0.25]} radius={0.22} color="#F4E6D2" />
      <Sphere pos={[0, 1.0, 0]} radius={0.24} color="#E8832E" />
      <Sphere pos={[0, 0.95, 0.24]} radius={0.1} color="#F4E6D2" />
      <Torus pos={[-0.12, 1.04, 0.22]} radius={0.07} tube={0.018} color="#C99A3E" />
      <Torus pos={[0.12, 1.04, 0.22]} radius={0.07} tube={0.018} color="#C99A3E" />
      <mesh position={[0, 1.12, 0]}>
        <sphereGeometry args={[0.18, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#7A4E2D" />
      </mesh>
      <Box pos={[0, 0.65, -0.35]} size={[0.3, 0.25, 0.12]} color="#F4E6D2" />
      <Sphere pos={[-0.22, 1.1, 0]} radius={0.06} color="#E8832E" />
      <Sphere pos={[0.22, 1.1, 0]} radius={0.06} color="#E8832E" />
    </group>
  );
}

const COMPONENTS: Record<string, React.FC> = {
  ticker: Ticker,
  hedgey: Hedgey,
  slyde: Slyde,
  maci: Maci,
  volumax: Volumax,
  waven: Waven,
  sproket: Sproket,
  flipper: Flipper,
};

function DefaultCharacter() {
  return (
    <group>
      <Capsule pos={[0, 0.6, 0]} radius={0.3} length={0.5} color="#888" />
      <Sphere pos={[0, 1.15, 0]} radius={0.25} color="#aaa" />
    </group>
  );
}

export function PlaceholderCharacter({ characterId }: PlaceholderCharacterProps) {
  const Component = COMPONENTS[characterId] ?? DefaultCharacter;
  return (
    <group position={[0, 0.2, 0]}>
      <Component />
    </group>
  );
}
