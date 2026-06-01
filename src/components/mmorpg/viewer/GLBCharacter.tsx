import React, { useRef } from "react"
import type { Character, EquippedParts } from "@/types/mmorpg"

type Props = {
  character: Character
  equipped: EquippedParts
}

export function GLBCharacter({ character, equipped }: Props) {
  return (
    <group position={[0, -0.3, 0]}>
      <mesh>
        <boxGeometry args={[0.8, 1.4, 0.6]} />
        <meshStandardMaterial
          color="#2FC7C9"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#C99A3E" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh position={[0, -0.1, 0.5]}>
        <planeGeometry args={[0.3, 0.3]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        >
        </meshStandardMaterial>
      </mesh>
    </group>
  )
}
