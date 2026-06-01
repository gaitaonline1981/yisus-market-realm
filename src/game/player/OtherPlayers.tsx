"use client";

import { Suspense, useRef } from "react";
import { Text } from "@react-three/drei";
import { useMultiplayerStore } from "@/stores/useMultiplayerStore";

function OtherPlayer({ player }: { player: { id: string; position: [number, number, number]; rotation: number; name: string } }) {
  const ref = useRef<THREE.Group>(null);

  return (
    <group ref={ref} position={[player.position[0], 0, player.position[2]]} rotation={[0, player.rotation, 0]}>
      {/* Simple player model */}
      <mesh position={[0, 1, 0]}>
        <capsuleGeometry args={[0.4, 1, 8, 8]} />
        <meshStandardMaterial color="#6366F1" />
      </mesh>
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial color="#818CF8" />
      </mesh>
      {/* Name tag */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.35}
        color="#818CF8"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000"
      >
        {player.name}
      </Text>
    </group>
  );
}

export function OtherPlayers() {
  const players = useMultiplayerStore((s) => s.players);
  const playerId = useMultiplayerStore((s) => s.playerId);

  const others = Array.from(players.values()).filter((p) => p.id !== playerId);

  return (
    <group>
      {others.map((player) => (
        <OtherPlayer key={player.id} player={player} />
      ))}
    </group>
  );
}
