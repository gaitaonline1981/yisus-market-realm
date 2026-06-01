import React, { useRef } from "react"
import { OrbitControls } from "@react-three/drei"
import type { OrbitControls as OrbitControlsType } from "three-stdlib"

export function CameraControls() {
  const controlsRef = useRef<OrbitControlsType>(null)

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      minDistance={2}
      maxDistance={8}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2.2}
      autoRotate
      autoRotateSpeed={0.8}
    />
  )
}
