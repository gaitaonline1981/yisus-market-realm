"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Terrain() {
  const ref = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[400, 400]} />
      <meshStandardMaterial color="#2a3a2a" roughness={0.8} metalness={0.05} />
    </mesh>
  );
}

export function WaterPlane() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) ref.current.position.y = -0.4 + Math.sin(Date.now() * 0.0005) * 0.1;
  });

  return (
    <mesh ref={ref} position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[400, 400, 40, 40]} />
      <meshStandardMaterial color="#1a3a5a" transparent opacity={0.7} roughness={0.1} metalness={0.3} />
    </mesh>
  );
}
