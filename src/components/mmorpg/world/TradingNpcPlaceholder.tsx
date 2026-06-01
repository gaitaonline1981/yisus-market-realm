"use client"

import type { TradingNpc, TradingNpcType } from "@/data/mmorpg/worldTradingNpcs"

interface Props {
  npc: TradingNpc
  isActive?: boolean
  isNear?: boolean
}

function WyckoffMentor({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.15, 0.4, 6, 8]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.2, 0.5, 0]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.015, 0.02, 0.3, 6]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

function ElliottSage({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.14, 0.4, 6, 8]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.11, 8, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <torusGeometry args={[0.12, 0.02, 8, 12]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}

function RiskGuardian({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.16, 0.45, 6, 8]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.13, 8, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[0, 0.5, 0.18]}>
        <boxGeometry args={[0.2, 0.25, 0.03]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.2} metalness={0.3} />
      </mesh>
    </group>
  )
}

function LiquidityScout({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, 0.45, 0]}>
        <capsuleGeometry args={[0.13, 0.35, 6, 8]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.7, 0.12]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} />
      </mesh>
    </group>
  )
}

function VolumeBlacksmith({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, 0.55, 0]}>
        <capsuleGeometry args={[0.17, 0.45, 6, 8]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.14, 8, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[0.2, 0.6, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.04, 0.15, 0.04]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

function MacroOracle({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.14, 0.4, 6, 8]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.11, 8, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

function BotMechanic({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.14, 0.4, 6, 8]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.11, 8, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 0.5, 0.15]}>
        <planeGeometry args={[0.15, 0.1]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}

function GuildRecruiter({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.14, 0.4, 6, 8]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.11, 8, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.15, 0.95, 0]}>
        <planeGeometry args={[0.08, 0.1]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.3} side={2} />
      </mesh>
    </group>
  )
}

function PropFirmCoach({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <capsuleGeometry args={[0.15, 0.4, 6, 8]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[0, 0.5, 0.17]}>
        <boxGeometry args={[0.12, 0.15, 0.02]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

function MarketNewsAgent({ color, accent }: { color: string; accent: string }) {
  return (
    <group>
      <mesh position={[0, 0.45, 0]}>
        <capsuleGeometry args={[0.13, 0.35, 6, 8]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 0.65, 0.14]}>
        <planeGeometry args={[0.12, 0.08]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

const NPC_TYPES: Record<TradingNpcType, React.FC<{ color: string; accent: string }>> = {
  "wyckoff-mentor": WyckoffMentor,
  "elliott-sage": ElliottSage,
  "risk-guardian": RiskGuardian,
  "liquidity-scout": LiquidityScout,
  "volume-blacksmith": VolumeBlacksmith,
  "macro-oracle": MacroOracle,
  "bot-mechanic": BotMechanic,
  "guild-recruiter": GuildRecruiter,
  "prop-firm-coach": PropFirmCoach,
  "market-news-agent": MarketNewsAgent,
}

export function TradingNpcPlaceholder({ npc, isActive, isNear }: Props) {
  const Component = NPC_TYPES[npc.npcType]
  return (
    <group>
      {isActive && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.35, 0.45, 16]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.3} transparent opacity={0.6} side={2} />
        </mesh>
      )}
      {isNear && !isActive && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.3, 0.4, 16]} />
          <meshStandardMaterial color={npc.accentColor} emissive={npc.accentColor} emissiveIntensity={0.2} transparent opacity={0.4} side={2} />
        </mesh>
      )}
      <Component color={npc.color} accent={npc.accentColor} />
    </group>
  )
}
