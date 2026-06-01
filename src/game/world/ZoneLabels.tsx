"use client";

import * as THREE from "three";
import { Text } from "@react-three/drei";
import { WORLD_ZONES } from "@/data/worldData";

export function ZoneLabels() {
  return (
    <group>
      {WORLD_ZONES.map((zone) => (
        <group key={`label-${zone.id}`} position={[zone.position[0], 0.8 + zone.difficulty * 0.3 + 2, zone.position[2]]}>
          <Text
            fontSize={0.5}
            color={zone.color}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#000000"
          >
            {zone.name}
          </Text>
          <Text
            position={[0, -0.5, 0]}
            fontSize={0.3}
            color="#666666"
            anchorX="center"
            anchorY="middle"
          >
            Nivel {zone.difficulty}
          </Text>
        </group>
      ))}
    </group>
  );
}
