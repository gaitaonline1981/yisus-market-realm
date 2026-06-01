"use client";

import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useGameStore } from "@/stores/useGameStore";
import { CHARACTERS } from "@/data/characters";
import { MOUNTS } from "@/data/mounts";

function AnimatedCharModel({ path, scale, isMounted }: { path: string; scale: number; isMounted: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(path);
  const { actions } = useAnimations(animations, ref);
  const isMoving = useGameStore((s) => {
    const p = s.player.position;
    return Math.abs(p[0]) > 0.1 || Math.abs(p[2] - 5) > 0.1;
  });

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const animNames = Object.keys(actions);
      const idleAnim = animNames.find((n) => n.toLowerCase().includes("idle"));
      const walkAnim = animNames.find((n) => n.toLowerCase().includes("walk") || n.toLowerCase().includes("run"));
      if (isMoving && walkAnim) actions[walkAnim]?.reset().play();
      else if (idleAnim) actions[idleAnim]?.reset().play();
    }
  }, [isMoving, actions]);

  useFrame(() => {
    if (!ref.current) return;
    if (Object.keys(actions).length > 0) return; // Has real animations, skip procedural
    const t = Date.now() * 0.001;
    ref.current.position.y = isMoving ? Math.sin(t * 8) * 0.1 : Math.sin(t * 2) * 0.03;
  });

  return <primitive ref={ref} object={scene} scale={scale} position={[0, 0.5, 0]} />;
}

function AnimatedMountModel({ path, scale }: { path: string; scale: number }) {
  const ref = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(path);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const walkAnim = Object.keys(actions).find((n) => n.toLowerCase().includes("walk") || n.toLowerCase().includes("run"));
      const idleAnim = Object.keys(actions).find((n) => n.toLowerCase().includes("idle"));
      if (walkAnim) actions[walkAnim]?.reset().play();
      else if (idleAnim) actions[idleAnim]?.reset().play();
    }
  }, [actions]);

  useFrame(() => {
    if (!ref.current || Object.keys(actions).length > 0) return;
    ref.current.position.y = Math.sin(Date.now() * 0.003) * 0.05;
  });

  return <primitive ref={ref} object={scene} scale={scale} />;
}

function CharacterModel() {
  const player = useGameStore((s) => s.player);
  const isMounted = useGameStore((s) => s.isMounted);
  const char = CHARACTERS[player.characterId];
  const mount = player.mountId ? MOUNTS[player.mountId] : null;

  if (!char) return null;

  return (
    <group position={[player.position[0], 0, player.position[2]]} rotation={[0, player.rotation, 0]}>
      {isMounted && mount && (
        <Suspense fallback={null}>
          <AnimatedMountModel path={mount.modelPath} scale={mount.modelScale} />
        </Suspense>
      )}
      <Suspense fallback={null}>
        <AnimatedCharModel path={char.modelPath} scale={char.modelScale} isMounted={isMounted && !!mount} />
      </Suspense>
    </group>
  );
}

export function PlayerCharacter() {
  return <CharacterModel />;
}
