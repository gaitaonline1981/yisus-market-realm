"use client";

import { worldZones } from "@/data/mmorpg/worldZones";
import { WorldZoneTrigger } from "./WorldZoneTrigger";

interface WorldMapZonesProps {
  nearZoneId?: string | null;
  activeZoneId?: string;
}

export function WorldMapZones({ nearZoneId, activeZoneId }: WorldMapZonesProps) {
  return (
    <group>
      {worldZones.map((zone) => (
        <WorldZoneTrigger
          key={zone.id}
          zone={zone}
          isNear={zone.id === nearZoneId}
          isActive={zone.id === activeZoneId}
        />
      ))}
    </group>
  );
}
