"use client";

import { useEffect, useState, useCallback } from "react";
import { useAchievementStore } from "@/stores/useAchievementStore";
import { useGameStore } from "@/stores/useGameStore";

export function AchievementNotifier() {
  const [queue, setQueue] = useState<{ id: string; name: string; icon: string; xp: number }[]>([]);
  const [current, setCurrent] = useState<typeof queue[0] | null>(null);
  const [visible, setVisible] = useState(false);
  const checkAchievements = useAchievementStore((s) => s.checkAchievements);
  const achievements = useAchievementStore((s) => s.achievements);
  const addXp = useGameStore((s) => s.addXp);

  const processQueue = useCallback(() => {
    if (queue.length === 0 && current) {
      setCurrent(null);
      setVisible(false);
      return;
    }
    if (queue.length > 0 && !current) {
      const next = queue[0];
      setQueue((q) => q.slice(1));
      setCurrent(next);
      setVisible(true);
      addXp(next.xp);
      setTimeout(() => setVisible(false), 4000);
    }
  }, [queue, current, addXp]);

  // Check achievements periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newIds = checkAchievements();
      if (newIds.length > 0) {
        const newAchs = achievements.filter((a) => newIds.includes(a.id));
        setQueue((q) => [...q, ...newAchs.map((a) => ({ id: a.id, name: a.name, icon: a.icon, xp: a.xpReward }))]);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [checkAchievements, achievements]);

  useEffect(() => {
    processQueue();
  }, [queue, current, processQueue]);

  if (!visible || !current) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-bounce pointer-events-none">
      <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 backdrop-blur-xl rounded-2xl px-6 py-4 text-center shadow-2xl shadow-amber-500/20">
        <div className="text-3xl mb-1">{current.icon}</div>
        <p className="text-xs text-amber-300 font-bold uppercase tracking-wider">Logro desbloqueado</p>
        <p className="text-sm font-bold text-white mt-0.5">{current.name}</p>
        <p className="text-[10px] text-amber-400 mt-0.5">+{current.xp} XP</p>
      </div>
    </div>
  );
}
