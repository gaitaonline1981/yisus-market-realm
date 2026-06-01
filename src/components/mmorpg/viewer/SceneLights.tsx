import React from "react"

export function SceneLights() {
  return (
    <>
      <ambientLight intensity={1.2} color="#4040a0" />
      <directionalLight
        position={[10, 10, 5]}
        intensity={2.5}
        color="#ffffff"
        castShadow
      />
      <directionalLight
        position={[-5, 8, -10]}
        intensity={1.0}
        color="#2FC7C9"
      />
      <pointLight position={[0, 5, 0]} intensity={0.6} color="#8B5CF6" />
      <hemisphereLight
        args={["#2FC7C9", "#8B5CF6", 0.6]}
      />
    </>
  )
}
