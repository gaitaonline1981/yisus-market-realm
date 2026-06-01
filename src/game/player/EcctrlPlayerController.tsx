"use client";

import { useEffect, useRef } from "react";
import Ecctrl, { type EcctrlAnimation } from "ecctrl";
import { useGameStore } from "@/stores/useGameStore";
import { useMultiplayerStore } from "@/stores/useMultiplayerStore";

export function EcctrlPlayerController() {
  const toggleMount = useGameStore((s) => s.toggleMount);
  const sendPosition = useMultiplayerStore((s) => s.sendPosition);

  // Track position for multiplayer
  useEffect(() => {
    const interval = setInterval(() => {
      const p = useGameStore.getState().player;
      sendPosition(p.position, p.rotation);
    }, 200);
    return () => clearInterval(interval);
  }, [sendPosition]);

  // Keyboard handler for mount toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "m") toggleMount();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleMount]);

  return (
    <Ecctrl
      position={[0, 3, 5]}
      mode="FixedCamera"
      camInitDirection={{ x: 0, y: 0 }}
      camInitTarget={{ x: 0, y: 1, z: 5 }}
      camCollision={false}
      floatHeight={1}
      characterHeight={2.5}
      capsuleHalfHeight={1.2}
      capsuleRadius={0.4}
      mass={1}
      jumpVelocity={8}
      maxVelLimit={10}
      slopeDownExtraForce={0.1}
      animated={false}
    >
      {/* Placeholder character model */}
      <mesh castShadow>
        <capsuleGeometry args={[0.4, 1, 8, 8]} />
        <meshStandardMaterial color="#2FC7C9" />
      </mesh>
      <mesh position={[0, 1.5, 0]} castShadow>
        <sphereGeometry args={[0.35, 8, 8]} />
        <meshStandardMaterial color="#3FE7D9" />
      </mesh>
    </Ecctrl>
  );
}
