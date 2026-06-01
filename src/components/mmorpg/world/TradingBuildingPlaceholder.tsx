"use client"

import type { TradingBuilding, BuildingType } from "@/data/mmorpg/worldTradingBuildings"

interface Props {
  building: TradingBuilding
  isActive?: boolean
  isNear?: boolean
}

function Academy({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.8, 0.6, 0.6]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.6, 0.3, 0.5]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.1} />
      </mesh>
      <mesh position={[0, 0.6, 0.32]}>
        <planeGeometry args={[0.4, 0.2]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

function Scanner({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 1.5, 8]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <torusGeometry args={[0.25, 0.04, 8, 16]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.8} />
      </mesh>
    </group>
  )
}

function Temple({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.7, 0.5, 0.7]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <coneGeometry args={[0.5, 0.4, 6]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[-0.3, 0.5, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.5, 6]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.3, 0.5, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.5, 6]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

function Lab({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.8, 0.5, 0.6]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh position={[0.2, 0.8, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 0.3, 6]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.55, 0.32]}>
        <planeGeometry args={[0.3, 0.15]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}

function Gate({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[-0.3, 0.4, 0]}>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh position={[0.3, 0.4, 0]}>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[0.7, 0.1, 0.12]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <torusGeometry args={[0.2, 0.04, 8, 12]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

function Terminal({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.05, 1.0, 0.4]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.6, 0.22]}>
        <planeGeometry args={[0.6, 0.7]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.15} />
      </mesh>
    </group>
  )
}

function Forge({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.7, 0.5, 0.6]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[0.2, 0.8, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 0.3, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[-0.2, 0.8, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 0.3, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, 0.5, 0.32]}>
        <planeGeometry args={[0.3, 0.1]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

function Tower({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 1.4, 8]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

function Stable({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1, 0.3, 0.6]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.8, 0.15, 0.5]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.1} />
      </mesh>
    </group>
  )
}

function Guild({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[1, 0.5, 0.7]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.8, 0.3, 0.6]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.1} />
      </mesh>
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.08, 6, 6]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} />
      </mesh>
    </group>
  )
}

const BUILDINGS: Record<BuildingType, React.FC<{ color: string; accent: string }>> = {
  academy: Academy,
  scanner: Scanner,
  temple: Temple,
  lab: Lab,
  gate: Gate,
  terminal: Terminal,
  forge: Forge,
  tower: Tower,
  stable: Stable,
  guild: Guild,
}

export function TradingBuildingPlaceholder({ building, isActive, isNear }: Props) {
  const Component = BUILDINGS[building.buildingType]
  const pos = building.position
  const s = building.scale

  return (
    <group position={[pos[0], pos[1], pos[2]]} scale={[s[0], s[1], s[2]]}>
      {/* Selection ring */}
      {isActive && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.5, 0.6, 24]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.3} transparent opacity={0.6} side={2} />
        </mesh>
      )}
      {isNear && !isActive && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.45, 0.55, 24]} />
          <meshStandardMaterial color={building.accentColor} emissive={building.accentColor} emissiveIntensity={0.2} transparent opacity={0.4} side={2} />
        </mesh>
      )}

      <Component color={building.color} accent={building.accentColor} />
    </group>
  )
}
