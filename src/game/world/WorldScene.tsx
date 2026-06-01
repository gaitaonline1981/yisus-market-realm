"use client";

import { WORLD_ZONES } from "@/data/worldData";
import { NPCMarkers } from "@/game/npcs/NPCMarkers";
import { ZoneLabels } from "@/game/world/ZoneLabels";
import { WorldBuildings } from "@/game/world/WorldBuildings";
import { SpaceSky } from "@/game/world/SpaceSky";
import { WorldParticles } from "@/game/world/WorldParticles";
import { Terrain, WaterPlane } from "@/game/world/Terrain";

function GridHelper() {
  return (
    <group>
      <gridHelper args={[400, 100, "#1e293b", "#0f172a"]} position={[0, 0.2, 0]} />
    </group>
  );
}

function ZoneTiles() {
  return (
    <group>
      {WORLD_ZONES.map((zone) => (
        <mesh key={zone.id} position={[zone.position[0], 0.3, zone.position[2]]} rotation={[-Math.PI / 2, 0, 0]}>
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
          <mesh position={[zone.position[0], 1.2 + zone.difficulty * 0.5, zone.position[2]]}>
            <cylinderGeometry args={[0.3, 0.4, zone.difficulty * 0.6, 8]} />
            <meshStandardMaterial color={zone.color} emissive={zone.color} emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[zone.position[0], 0.3, zone.position[2]]} rotation={[-Math.PI / 2, 0, 0]}>
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
      <Terrain />
      <WaterPlane />
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
