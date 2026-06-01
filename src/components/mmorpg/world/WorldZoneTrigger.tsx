"use client";

import React from "react";
import * as THREE from "three";
import { WorldZone } from "@/data/mmorpg/worldZones";

interface WorldZoneTriggerProps {
  zone: WorldZone;
  isNear: boolean;
  isActive: boolean;
}

export function WorldZoneTrigger({ zone, isNear, isActive }: WorldZoneTriggerProps) {
  const baseOpacity = isNear ? 0.35 : 0.15;
  const ringScale = isNear ? 1.15 : 1;
  const pillarHeight = isActive ? 1.2 : 0.5;

  return (
    <group position={zone.position}>
      <mesh>
        <circleGeometry args={[zone.radius * ringScale, 32]} />
        <meshStandardMaterial color={zone.color} transparent opacity={baseOpacity} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <ringGeometry args={[zone.radius * ringScale - 0.1, zone.radius * ringScale + 0.05, 32]} />
        <meshStandardMaterial color={zone.color} transparent opacity={isNear ? 0.6 : 0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, pillarHeight / 2, 0]}>
        <cylinderGeometry args={[0.04, 0.08, pillarHeight, 6]} />
        <meshStandardMaterial color={zone.color} emissive={zone.color} emissiveIntensity={isNear ? 0.8 : 0.3} />
      </mesh>
      {isActive && (
        <mesh position={[0, 0.02, 0]}>
          <ringGeometry args={[zone.radius * ringScale + 0.15, zone.radius * ringScale + 0.35, 32]} />
          <meshStandardMaterial color={zone.color} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}
