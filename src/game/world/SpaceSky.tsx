"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function StarField() {
  const ref = useRef<THREE.Points>(null);
  const count = 2000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 80 + Math.random() * 40;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) + 30;
    positions[i * 3 + 2] = r * Math.cos(phi);
    colors[i * 3] = 0.8 + Math.random() * 0.2;
    colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
    colors[i * 3 + 2] = 0.6 + Math.random() * 0.4;
  }

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.4} vertexColors sizeAttenuation={true} transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function Planet() {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <group ref={ref} position={[40, 40, -60]}>
      {/* Planet body */}
      <mesh>
        <sphereGeometry args={[12, 64, 64]} />
        <meshStandardMaterial color="#1a1a4e" roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[12.5, 64, 64]} />
        <meshBasicMaterial color="#4488ff" transparent opacity={0.08} />
      </mesh>
      {/* Rings */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[17, 1.5, 16, 100]} />
        <meshBasicMaterial color="#8866cc" transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[15, 0.8, 16, 80]} />
        <meshBasicMaterial color="#cc88ff" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function Moon() {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.01;
  });

  return (
    <group ref={ref} position={[-30, 30, -40]}>
      <mesh>
        <sphereGeometry args={[4, 32, 32]} />
        <meshStandardMaterial color="#d4c8b8" roughness={0.8} />
      </mesh>
      {/* Craters */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`crater-${i}`} position={[(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 4, Math.random() * 3]}>
          <sphereGeometry args={[0.4 + Math.random() * 0.6, 8, 8]} />
          <meshStandardMaterial color="#a89880" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function TradingSatellite() {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15;
      ref.current.position.y += Math.sin(Date.now() * 0.001) * 0.005;
    }
  });

  return (
    <group ref={ref} position={[15, 25, -30]}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Solar panels */}
      <mesh position={[2, 0, 0]}>
        <boxGeometry args={[3, 0.05, 1.5]} />
        <meshStandardMaterial color="#112244" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-2, 0, 0]}>
        <boxGeometry args={[3, 0.05, 1.5]} />
        <meshStandardMaterial color="#112244" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Dish */}
      <mesh position={[0, 0.8, 0]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.2, 0.3, 16]} />
        <meshStandardMaterial color="#888" metalness={0.6} />
      </mesh>
      {/* Blinking light */}
      <mesh position={[0, -0.6, 0]}>
        <sphereGeometry args={[0.1, 4, 4]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.8} />
      </mesh>
      {/* Chart line beam */}
      <mesh position={[0, -1.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 2, 8]} />
        <meshBasicMaterial color="#2FC7C9" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Nebulae() {
  return (
    <group>
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh key={`neb-${i}`} position={[(Math.random() - 0.5) * 80, 15 + Math.random() * 30, (Math.random() - 0.5) * 80]}>
          <sphereGeometry args={[3 + Math.random() * 5, 8, 8]} />
          <meshBasicMaterial
            color={new THREE.Color().setHSL(Math.random(), 0.5, 0.3 + Math.random() * 0.3)}
            transparent
            opacity={0.06}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export function SpaceSky() {
  return (
    <group>
      <StarField />
      <Nebulae />
      <Planet />
      <Moon />
      <TradingSatellite />
    </group>
  );
}
