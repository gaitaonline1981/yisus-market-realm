"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function DayNightCycle() {
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const ambRef = useRef<THREE.AmbientLight>(null);

  useFrame(({ scene }) => {
    const t = Date.now() * 0.00003;
    const dayFactor = (Math.sin(t) + 1) / 2; // 0-1
    // Minimum 60% brightness always - never too dark
    const minBrightness = 0.6;
    const brightness = minBrightness + dayFactor * 0.4;

    if (sunRef.current) {
      sunRef.current.intensity = 0.6 + brightness * 0.8;
      sunRef.current.position.set(
        Math.cos(t) * 30,
        15 + Math.sin(t) * 20,
        Math.sin(t * 0.5) * 30
      );
    }
    if (ambRef.current) {
      ambRef.current.intensity = 0.6 + brightness * 0.4;
    }

    const skyColor = new THREE.Color();
    skyColor.setHSL(0.58, 0.2, Math.max(0.2, brightness * 0.4));
    scene.fog = new THREE.Fog(skyColor, 120, 350);
    scene.background = skyColor;
  });

  return (
    <>
      <ambientLight ref={ambRef} intensity={0.8} />
      <directionalLight ref={sunRef} position={[10, 20, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
      <hemisphereLight args={["#aabbcc", "#445566", 0.5]} />
    </>
  );
}
