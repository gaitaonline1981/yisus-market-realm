"use client"

import { tradingBuildings } from "@/data/mmorpg/worldTradingBuildings"
import { TradingBuildingPlaceholder } from "./TradingBuildingPlaceholder"

interface Props {
  activeBuildingId?: string | null
  nearBuildingId?: string | null
  onSelectBuilding?: (buildingId: string) => void
}

export function WorldTradingBuildings({ activeBuildingId, nearBuildingId, onSelectBuilding }: Props) {
  return (
    <group>
      {tradingBuildings.map((b) => (
        <TradingBuildingPlaceholder
          key={b.id}
          building={b}
          isActive={b.id === activeBuildingId}
          isNear={b.id === nearBuildingId}
        />
      ))}
    </group>
  )
}
