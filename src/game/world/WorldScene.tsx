"use client";

import { WORLD_ZONES } from "@/data/worldData";
import { NPCMarkers } from "@/game/npcs/NPCMarkers";
import { ZoneLabels } from "@/game/world/ZoneLabels";
import { WorldParticles } from "@/game/world/WorldParticles";
import { WorldBuildings } from "@/game/world/WorldBuildings";

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="#111827" roughness={0.9} />
    </mesh>
  );
}

function GridHelper() {
  return (
    <group>
      <gridHelper args={[200, 100, "#1e293b", "#0f172a"]} position={[0, 0.01, 0]} />
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
      <WorldParticles />
    </group>
  );
}
