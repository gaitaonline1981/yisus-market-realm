"use client";

import { useGLTF } from "@react-three/drei";
import { characters } from "@/data/mmorpg/characters";
import { mounts } from "@/data/mmorpg/mounts";
import { PlaceholderCharacter } from "@/components/mmorpg/viewer/PlaceholderCharacter";
import { PlaceholderMount } from "@/components/mmorpg/viewer/PlaceholderMount";
import { GLBModel } from "@/components/mmorpg/viewer/GLBModel";

interface StaticEntity {
  id: string;
  type: "character" | "mount";
  position: [number, number, number];
  scale?: [number, number, number];
}

const STATIC_ENTITIES: StaticEntity[] = [
  { id: "ticker", type: "character", position: [-1.5, 0, 0], scale: [0.8, 0.8, 0.8] },
  { id: "hedgey", type: "character", position: [1.5, 0, 0], scale: [0.9, 0.9, 0.9] },
  { id: "slyde", type: "character", position: [-5, 0, -2.3], scale: [0.8, 0.8, 0.8] },
  { id: "maci", type: "character", position: [-5, 0, 4.7], scale: [0.8, 0.8, 0.8] },
  { id: "volumax", type: "character", position: [0, 0, 5.2], scale: [0.9, 0.9, 0.9] },
  { id: "waven", type: "character", position: [-3.8, 0, 4], scale: [0.8, 0.8, 0.8] },
  { id: "sproket", type: "character", position: [5, 0, 4.7], scale: [0.8, 0.8, 0.8] },
  { id: "flipper", type: "character", position: [3.8, 0, 4], scale: [0.8, 0.8, 0.8] },
  { id: "liquidity-whale", type: "mount", position: [-6.2, 0.8, -3.5], scale: [0.9, 0.9, 0.9] },
  { id: "candle-dragon", type: "mount", position: [6.2, 0, -3.5], scale: [0.9, 0.9, 0.9] },
  { id: "market-rover", type: "mount", position: [5.8, 0, 5.2], scale: [0.9, 0.9, 0.9] },
  { id: "noble-steed", type: "mount", position: [0.8, 0, 6.8], scale: [0.9, 0.9, 0.9] },
];

function StaticModel({ entity, useRealModels }: { entity: StaticEntity; useRealModels: boolean }) {
  const item = entity.type === "character"
    ? characters.find((c) => c.id === entity.id)
    : mounts.find((m) => m.id === entity.id);

  const s = entity.scale ?? [1, 1, 1];
  const pos: [number, number, number] = [entity.position[0], entity.position[1], entity.position[2]];

  if (useRealModels && item?.modelUrl) {
    return <GLBModel url={item.modelUrl} position={pos} scale={s} rotation={[0, 0, 0]} />;
  }

  return (
    <group position={pos} scale={s}>
      {entity.type === "character" ? (
        <PlaceholderCharacter characterId={entity.id} />
      ) : (
        <PlaceholderMount mountId={entity.id} />
      )}
    </group>
  );
}

export function WorldStaticModels({ useRealModels }: { useRealModels: boolean }) {
  return (
    <>
      {STATIC_ENTITIES.map((entity) => (
        <StaticModel key={entity.id} entity={entity} useRealModels={useRealModels} />
      ))}
    </>
  );
}
