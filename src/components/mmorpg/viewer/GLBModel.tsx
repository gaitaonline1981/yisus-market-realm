"use client";

import { useGLTF } from "@react-three/drei";

interface GLBModelProps {
  url: string;
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
}

export function GLBModel({
  url,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
}: GLBModelProps) {
  const gltf = useGLTF(url);

  return <primitive object={gltf.scene} position={position} scale={scale} rotation={rotation} />;
}
