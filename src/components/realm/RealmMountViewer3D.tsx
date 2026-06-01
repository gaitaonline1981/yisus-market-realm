import React, { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows, SoftShadows } from "@react-three/drei"
import { GLBModel } from "@/components/mmorpg/viewer/GLBModel"
import { ErrorBoundary } from "@/components/realm/ErrorBoundary"
import { realmTheme } from "@/components/realm/styles"
import type { RealmMount } from "@/types/realm"
import * as THREE from "three"

interface Props {
  mount: RealmMount
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 8, 4]} intensity={2.5} castShadow />
      <directionalLight position={[-4, 3, -3]} intensity={0.8} color="#4facfe" />
      <pointLight position={[0, 4, 2]} intensity={2} color="#43e9ff" distance={10} decay={2} />
      <pointLight position={[-3, 2, -4]} intensity={1.2} color="#a855f7" distance={10} decay={2} />
      <pointLight position={[3, 1, 3]} intensity={0.8} color="#f97316" distance={8} decay={2} />
    </>
  )
}

function MountModel({ mount }: Props) {
  return (
    <group position={[0, -0.35, 0]}>
      <GLBModel
        url={mount.modelUrl}
        position={[0, 0, 0]}
        scale={[1, 1, 1]}
        rotation={[0, 0, 0]}
      />
    </group>
  )
}

function LoadingFallback() {
  return (
    <div
      style={{
        height: 480,
        borderRadius: realmTheme.radius,
        border: `1px solid ${realmTheme.border}`,
        background: realmTheme.bgCard,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          border: "2px solid #F59E0B",
          borderTopColor: "transparent",
          borderRadius: "50%",
          animation: "spin-mount 1s linear infinite",
        }}
      />
      <div style={{ fontSize: 12, color: realmTheme.textMuted }}>Cargando montura 3D...</div>
      <style>{`@keyframes spin-mount { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

export function RealmMountViewer3D({ mount }: Props) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <div
          style={{
            width: "100%",
            height: 480,
            borderRadius: realmTheme.radius,
            overflow: "hidden",
            border: `1px solid ${realmTheme.accent}40`,
            background: "#05050f",
          }}
        >
          <Canvas
            camera={{ position: [3.5, 2.5, 5], fov: 40 }}
            gl={{
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.0,
              antialias: true,
            }}
            shadows
          >
            <color attach="background" args={["#05050f"]} />
            <SoftShadows size={12} samples={16} />
            <SceneLights />
            <MountModel mount={mount} />
            <ContactShadows position={[0, -1.15, 0]} opacity={0.6} scale={6} blur={3} far={2} />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]}>
              <circleGeometry args={[5, 64]} />
              <meshStandardMaterial color="#0c0c1e" roughness={0.4} metalness={0.6} />
            </mesh>
            <Environment preset="studio" resolution={512} />
            <OrbitControls
              enablePan={false}
              minDistance={2.5}
              maxDistance={8}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2.2}
              autoRotate
              autoRotateSpeed={1.2}
            />
          </Canvas>
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}
