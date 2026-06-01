"use client"

interface Props {
  label?: string
}

export function ModelLoadingFallback({ label }: Props) {
  return (
    <group position={[0, 0, 0]}>
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#22D3EE" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial color="#A78BFA" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  )
}
