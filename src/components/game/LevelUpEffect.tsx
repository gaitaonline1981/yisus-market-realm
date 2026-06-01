"use client";

import { useEffect, useState } from "react";
import { useGameStore } from "@/stores/useGameStore";

export function LevelUpEffect() {
  const level = useGameStore((s) => s.player.level);
  const [prevLevel, setPrevLevel] = useState(level);
  const [showEffect, setShowEffect] = useState(false);

  useEffect(() => {
    if (level > prevLevel) {
      setShowEffect(true);
      setPrevLevel(level);
      const timer = setTimeout(() => setShowEffect(false), 2500);
      return () => clearTimeout(timer);
    }
    setPrevLevel(level);
  }, [level, prevLevel]);

  if (!showEffect) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="text-center animate-bounce">
        <div className="text-6xl mb-4">⚡</div>
        <h1 className="text-4xl font-black text-transparent bg-gradient-to-r from-cyan-300 via-amber-300 to-emerald-300 bg-clip-text drop-shadow-lg">
          ¡NIVEL {level}!
        </h1>
        <p className="text-cyan-300 text-sm mt-2 font-mono">Seguí tradeando</p>
      </div>
    </div>
  );
}
