"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function DayNightCycle() {
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const ambRef = useRef<THREE.AmbientLight>(null);
  const skyRef = useRef<THREE.Color>(new THREE.Color("#020408"));

  useFrame(({ scene }) => {
    const t = Date.now() * 0.00005; // Slow cycle (~6 min per full day)
    const dayFactor = (Math.sin(t) + 1) / 2; // 0 = night, 1 = day

    if (sunRef.current) {
      sunRef.current.intensity = 0.2 + dayFactor * 0.8;
      sunRef.current.color.setHSL(0.12, 0.8, 0.3 + dayFactor * 0.5);
      sunRef.current.position.set(
        Math.cos(t) * 30,
        10 + Math.sin(t) * 20,
        Math.sin(t * 0.5) * 30
      );
    }
    if (ambRef.current) {
      ambRef.current.intensity = 0.1 + dayFactor * 0.4;
      ambRef.current.color.setHSL(0.6, 0.3, 0.1 + dayFactor * 0.3);
    }

    // Sky/fog color
    const skyColor = new THREE.Color();
    skyColor.setHSL(0.6, 0.3, Math.max(0.02, dayFactor * 0.3));
    scene.fog = new THREE.Fog(skyColor, 60, 150);
    scene.background = skyColor;
  });

  return (
    <>
      <ambientLight ref={ambRef} intensity={0.3} />
      <directionalLight ref={sunRef} position={[10, 20, 5]} intensity={0.8} castShadow shadow-mapSize={[1024, 1024]} />
    </>
  );
}
