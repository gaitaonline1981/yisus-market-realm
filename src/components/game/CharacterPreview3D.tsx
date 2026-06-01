"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { CHARACTERS } from "@/data/characters";

function RotatingModel({ path, scale = 1 }: { path: string; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF(path);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.5;
  });

  return <primitive ref={ref} object={scene} scale={scale} />;
}

function FallbackModel({ charId }: { charId: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const char = CHARACTERS[charId];
  const color = char?.rarity === "legendary" ? "#F59E0B" : char?.rarity === "epic" ? "#A78BFA" : "#2FC7C9";

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={ref}>
      <capsuleGeometry args={[0.6, 1.2, 8, 16]} />
      <meshStandardMaterial color={color} wireframe />
    </mesh>
  );
}

export function CharacterPreview3D({ characterId }: { characterId: string }) {
  const char = CHARACTERS[characterId];
  if (!char) return null;

  return (
    <div className="w-full h-64 rounded-xl overflow-hidden bg-gradient-to-b from-black/60 to-black/20">
      <Canvas camera={{ position: [0, 1, 3.5], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[0, 2, 0]} intensity={0.5} color="#2FC7C9" />
        <Suspense fallback={<FallbackModel charId={characterId} />}>
          <RotatingModel path={char.modelPath} scale={char.modelScale} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
