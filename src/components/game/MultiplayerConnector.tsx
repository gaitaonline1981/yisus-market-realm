"use client";

import { useEffect } from "react";
import { useMultiplayerStore } from "@/stores/useMultiplayerStore";
import { useGameStore } from "@/stores/useGameStore";
import { CHARACTERS } from "@/data/characters";

export function MultiplayerConnector() {
  const connect = useMultiplayerStore((s) => s.connect);
  const disconnect = useMultiplayerStore((s) => s.disconnect);
  const sendPosition = useMultiplayerStore((s) => s.sendPosition);
  const player = useGameStore((s) => s.player);
  const char = CHARACTERS[player.characterId];

  // Connect on mount
  useEffect(() => {
    connect(char?.name ?? "Trader", player.characterId);
    return () => disconnect();
  }, []);

  // Sync position every 200ms
  useEffect(() => {
    const interval = setInterval(() => {
      const p = useGameStore.getState().player;
      sendPosition(p.position, p.rotation);
    }, 200);
    return () => clearInterval(interval);
  }, [sendPosition]);

  return null;
}
