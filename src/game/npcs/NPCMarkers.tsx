"use client";

import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Text } from "@react-three/drei";
import * as THREE from "three";
import { NPCS } from "@/game/npcs/npcData";
import { MASTER_NPCS } from "@/game/npcs/masterNPCData";
import { WORLD_ZONES } from "@/data/worldData";

function MasterModel({ master }: { master: typeof MASTER_NPCS[number] }) {
  const zone = WORLD_ZONES.find(z => z.id === master.zoneId);
  const position = zone ? [zone.position[0], 0.5, zone.position[2] + 3] as [number, number, number] : [0, 0.5, 0] as [number, number, number];

  const orbRef = useRef<THREE.Mesh>(null);
  const { scene } = useGLTF(master.modelPath);

  useFrame((_, delta) => {
    if (orbRef.current) orbRef.current.position.y = 2.5 + Math.sin(Date.now() * 0.001 + position[0]) * 0.2;
  });

  return (
    <group position={position}>
      {/* Master GLB */}
      <Suspense fallback={null}>
        <primitive object={scene} scale={0.8} position={[0, 0.5, 0]} />
      </Suspense>
      {/* Orb above master */}
      <mesh ref={orbRef} position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={master.color} emissive={master.color} emissiveIntensity={0.8} transparent opacity={0.9} />
      </mesh>
      {/* Name */}
      <Text position={[0, 3.2, 0]} fontSize={0.4} color={master.color} anchorX="center" anchorY="middle" outlineWidth={0.05} outlineColor="#000">
        {master.name}
      </Text>
      <Text position={[0, 2.8, 0]} fontSize={0.25} color="#888" anchorX="center" anchorY="middle">
        {master.tradingStyle}
      </Text>
    </group>
  );
}

function NPCPillar({ npc }: { npc: typeof NPCS[number] }) {
  const orbRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const t = Date.now() * 0.001;
    if (orbRef.current) orbRef.current.position.y = 2.8 + Math.sin(t * 1.5 + npc.position[0]) * 0.3;
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.5;
      ringRef.current.position.y = orbRef.current?.position.y ?? 2.8;
    }
  });

  return (
    <group position={[npc.position[0], npc.position[1], npc.position[2]]}>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.25, 0.35, 2.5, 8]} />
        <meshStandardMaterial color={npc.color} emissive={npc.color} emissiveIntensity={0.3} />
      </mesh>
      <mesh ref={orbRef} position={[0, 2.8, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={npc.color} emissive={npc.color} emissiveIntensity={0.6} transparent opacity={0.8} />
      </mesh>
      <mesh ref={ringRef} position={[0, 2.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.6, 32]} />
        <meshBasicMaterial color={npc.color} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      <Text position={[0, 3.4, 0]} fontSize={0.4} color={npc.color} anchorX="center" anchorY="middle" outlineWidth={0.05} outlineColor="#000000">
        {npc.name}
      </Text>
      <Text position={[0, 3.0, 0]} fontSize={0.25} color="#888888" anchorX="center" anchorY="middle">
        {npc.role}
      </Text>
    </group>
  );
}

export function NPCMarkers() {
  return (
    <group>
      {NPCS.map((npc) => (
        <NPCPillar key={npc.id} npc={npc} />
      ))}
      {MASTER_NPCS.map((master) => (
        <Suspense key={master.id} fallback={null}>
          <MasterModel master={master} />
        </Suspense>
      ))}
    </group>
  );
}
