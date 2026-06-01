"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function generateHeightmap(width: number, segments: number): Float32Array {
  const data = new Float32Array((segments + 1) * (segments + 1));
  const half = width / 2;

  for (let i = 0; i <= segments; i++) {
    for (let j = 0; j <= segments; j++) {
      const x = (i / segments - 0.5) * width;
      const z = (j / segments - 0.5) * width;
      let h = 0;

      // Base terrain with multiple octaves of noise
      h += Math.sin(x * 0.02) * Math.cos(z * 0.03) * 4;
      h += Math.sin(x * 0.05 + 1) * Math.cos(z * 0.04 + 2) * 2;
      h += Math.sin(x * 0.1) * Math.cos(z * 0.08) * 1;
      h += Math.sin(x * 0.008) * Math.cos(z * 0.006) * 8;

      // Mountains in specific zones
      const distFromCenter = Math.sqrt(x * x + z * z);
      if (distFromCenter > 80 && distFromCenter < 140) {
        h += Math.sin(x * 0.03) * Math.cos(z * 0.03) * 6;
      }

      // Elliott Mountains zone (-30, -30 area)
      const elliottDist = Math.sqrt((x + 30) ** 2 + (z + 30) ** 2);
      if (elliottDist < 20) {
        h += (20 - elliottDist) * 0.8;
      }

      // Wyckoff Forest zone - gentle hills
      const wyckoffDist = Math.sqrt((x + 25) ** 2 + z ** 2);
      if (wyckoffDist < 15) {
        h += Math.sin(x * 0.08) * Math.cos(z * 0.08) * 3;
      }

      data[i * (segments + 1) + j] = h;
    }
  }
  return data;
}

export function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const segments = 200;
  const width = 400;

  const { positions, colors } = useMemo(() => {
    const heights = generateHeightmap(width, segments);
    const pos = new Float32Array((segments + 1) * (segments + 1) * 3);
    const cols = new Float32Array((segments + 1) * (segments + 1) * 3);

    for (let i = 0; i <= segments; i++) {
      for (let j = 0; j <= segments; j++) {
        const idx = i * (segments + 1) + j;
        const x = (i / segments - 0.5) * width;
        const z = (j / segments - 0.5) * width;
        const h = heights[idx];

        pos[idx * 3] = x;
        pos[idx * 3 + 1] = h;
        pos[idx * 3 + 2] = z;

        // Color based on height - lighter and more vibrant
        const color = new THREE.Color();
        if (h < -1) color.set("#1a3a4a"); // Deep water
        else if (h < 0.5) color.set("#2a4a2a"); // Low ground
        else if (h < 3) color.set("#3a5a2a"); // Grasslands
        else if (h < 6) color.set("#4a5a3a"); // Hills
        else if (h < 10) color.set("#5a4a3a"); // Rocky highlands
        else color.set("#6a5a4a"); // Mountain peaks

        cols[idx * 3] = color.r;
        cols[idx * 3 + 1] = color.g;
        cols[idx * 3 + 2] = color.b;
      }
    }
    return { positions: pos, colors: cols };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, width, segments, segments);
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, [positions, colors]);

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry} receiveShadow castShadow>
        <meshStandardMaterial vertexColors roughness={0.7} metalness={0.05} flatShading={false} />
      </mesh>
    </group>
  );
}

export function WaterPlane() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.position.y = -0.6 + Math.sin(Date.now() * 0.0005) * 0.15;
    }
  });

  return (
    <mesh ref={ref} position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[400, 400, 80, 80]} />
      <meshStandardMaterial
        color="#0a1628"
        transparent
        opacity={0.75}
        roughness={0.1}
        metalness={0.3}
      />
    </mesh>
  );
}
