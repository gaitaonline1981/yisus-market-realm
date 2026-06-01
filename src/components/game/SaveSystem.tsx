"use client";

import { useEffect, useRef } from "react";
import { useGameStore } from "@/stores/useGameStore";
import { useQuestStore } from "@/stores/useQuestStore";
import { useInventoryStore } from "@/stores/useInventoryStore";
import { useAcademyStore } from "@/stores/useAcademyStore";
import { useSkillStore } from "@/stores/useSkillStore";
import { useTradingStore } from "@/stores/useTradingStore";

const SAVE_KEY = "yisus-market-realm-save";

export function SaveSystem() {
  const player = useGameStore((s) => s.player);
  const isMounted = useGameStore((s) => s.isMounted);
  const setCharacter = useGameStore((s) => s.setCharacter);
  const setMount = useGameStore((s) => s.setMount);
  const moveTo = useGameStore((s) => s.moveTo);
  const addXp = useGameStore((s) => s.addXp);
  const toggleMount = useGameStore((s) => s.toggleMount);

  const activeQuests = useQuestStore((s) => s.activeQuests);
  const completedQuests = useQuestStore((s) => s.completedQuests);
  const acceptQuest = useQuestStore((s) => s.acceptQuest);

  const items = useInventoryStore((s) => s.items);
  const addItem = useInventoryStore((s) => s.addItem);

  const completedLessons = useAcademyStore((s) => s.completedLessons);
  const completedQuizzesA = useAcademyStore((s) => s.completedQuizzes);
  const completeLesson = useAcademyStore((s) => s.completeLesson);

  const skills = useSkillStore((s) => s.skills);
  const unlockSkill = useSkillStore((s) => s.unlockSkill);

  const balance = useTradingStore((s) => s.balance);
  const totalPnl = useTradingStore((s) => s.totalPnl);

  const loadedRef = useRef(false);
  const saveRef = useRef<() => void>(() => {});

  // Build save function
  saveRef.current = () => {
    const data = {
      version: 1,
      timestamp: Date.now(),
      player: { ...useGameStore.getState().player },
      isMounted: useGameStore.getState().isMounted,
      quests: {
        active: useQuestStore.getState().activeQuests,
        completed: useQuestStore.getState().completedQuests,
      },
      inventory: useInventoryStore.getState().items,
      academy: {
        lessons: useAcademyStore.getState().completedLessons,
        quizzes: useAcademyStore.getState().completedQuizzes,
      },
      skills: useSkillStore.getState().skills,
      trading: {
        balance: useTradingStore.getState().balance,
        totalPnl: useTradingStore.getState().totalPnl,
      },
    };
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    } catch {}
  };

  // Load on mount
  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (!data || data.version !== 1) return;

      setCharacter(data.player.characterId);
      setMount(data.player.mountId);
      moveTo(data.player.position);
      if (data.player.xp > 0) addXp(data.player.xp);
      if (data.isMounted) toggleMount();

      data.quests?.active?.forEach((q: any) => acceptQuest(q.questId, q.target));
      data.inventory?.forEach((item: any) => addItem(item, item.quantity));
      data.academy?.lessons?.forEach((id: string) => completeLesson(id));
      data.skills?.filter((s: any) => s.unlocked).forEach((s: any) => unlockSkill(s.id));

      if (data.quests?.completed) {
        useQuestStore.setState({ completedQuests: data.quests.completed });
      }
      if (data.completedQuizzes) {
        useAcademyStore.setState({ completedQuizzes: data.academy.quizzes || data.completedQuizzes });
      }
      if (data.trading) {
        useTradingStore.setState({ balance: data.trading.balance, totalPnl: data.trading.totalPnl });
      }
    } catch {}
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => saveRef.current(), 30000);
    return () => clearInterval(interval);
  }, []);

  // Save on page unload
  useEffect(() => {
    const onUnload = () => saveRef.current();
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, []);

  return null;
}
