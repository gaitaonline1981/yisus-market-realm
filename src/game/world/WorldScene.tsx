"use client";

import { RigidBody } from "@react-three/rapier";
import { WORLD_ZONES } from "@/data/worldData";
import { NPCMarkers } from "@/game/npcs/NPCMarkers";
import { ZoneLabels } from "@/game/world/ZoneLabels";
import { WorldParticles } from "@/game/world/WorldParticles";
import { WorldBuildings } from "@/game/world/WorldBuildings";
import { SpaceSky } from "@/game/world/SpaceSky";

function Ground() {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[400, 400, 100, 100]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.7} wireframe={false} flatShading={false} />
      </mesh>
    </RigidBody>
  );
}

function GridHelper() {
  return (
    <group>
      <gridHelper args={[400, 100, "#1e293b", "#0f172a"]} position={[0, 0.01, 0]} />
    </group>
  );
}

function ZoneTiles() {
  return (
    <group>
      {WORLD_ZONES.map((zone) => (
        <mesh key={zone.id} position={[zone.position[0], 0.02, zone.position[2]]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[zone.size[0], zone.size[1]]} />
          <meshBasicMaterial color={zone.color} transparent opacity={0.12} />
        </mesh>
      ))}
    </group>
  );
}

function ZoneMarkers() {
  return (
    <group>
      {WORLD_ZONES.map((zone) => (
        <group key={`marker-${zone.id}`}>
          <mesh position={[zone.position[0], 0.8, zone.position[2]]}>
            <cylinderGeometry args={[0.3, 0.4, zone.difficulty * 0.6, 8]} />
            <meshStandardMaterial color={zone.color} emissive={zone.color} emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[zone.position[0], 0.03, zone.position[2]]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2, 2.3, 32]} />
            <meshBasicMaterial color={zone.color} transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function WorldScene() {
  return (
    <group>
      <Ground />
      <GridHelper />
      <ambientLight intensity={0.15} />
      <ZoneTiles />
      <ZoneMarkers />
      <ZoneLabels />
      <NPCMarkers />
      <WorldBuildings />
      <SpaceSky />
      <WorldParticles />
    </group>
  );
}
