"use client"

import { tradingNpcs } from "@/data/mmorpg/worldTradingNpcs"
import { TradingNpcPlaceholder } from "./TradingNpcPlaceholder"

interface Props {
  activeNpcId?: string | null
  nearNpcId?: string | null
  onSelectNpc?: (npcId: string) => void
}

export function WorldTradingNpcs({ activeNpcId, nearNpcId }: Props) {
  return (
    <group>
      {tradingNpcs.map((npc) => (
        <group key={npc.id} position={npc.position} scale={npc.scale}>
          <TradingNpcPlaceholder
            npc={npc}
            isActive={activeNpcId === npc.id}
            isNear={nearNpcId === npc.id}
          />
        </group>
      ))}
    </group>
  )
}
