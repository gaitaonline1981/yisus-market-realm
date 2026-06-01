import React from "react"
import type { Mount } from "@/types/mmorpg"

type Props = {
  mount: Mount
}

export function GLBMount({ mount }: Props) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.6, 0.3, 0.8]} />
        <meshStandardMaterial color="#C99A3E" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  )
}
