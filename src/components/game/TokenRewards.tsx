"use client";

import { useEffect } from "react";
import { useTokenStore } from "@/stores/useTokenStore";
import { useQuestStore } from "@/stores/useQuestStore";
import { useAcademyStore } from "@/stores/useAcademyStore";
import { useAchievementStore } from "@/stores/useAchievementStore";

export function TokenRewards() {
  const earnTokens = useTokenStore((s) => s.earnTokens);
  const completedQuests = useQuestStore((s) => s.completedQuests);
  const completedLessons = useAcademyStore((s) => s.completedLessons);
  const achievements = useAchievementStore((s) => s.achievements);

  const rewardedQuests = new Set<string>();
  const rewardedLessons = new Set<string>();
  const rewardedAchievements = new Set<string>();

  // Reward for quests
  useEffect(() => {
    for (const qId of completedQuests) {
      if (!rewardedQuests.has(qId)) {
        rewardedQuests.add(qId);
        earnTokens(15, `Misión completada`);
      }
    }
  }, [completedQuests, earnTokens]);

  // Reward for lessons
  useEffect(() => {
    for (const lId of completedLessons) {
      if (!rewardedLessons.has(lId)) {
        rewardedLessons.add(lId);
        earnTokens(5, `Lección completada`);
      }
    }
  }, [completedLessons, earnTokens]);

  // Reward for achievements
  useEffect(() => {
    for (const a of achievements) {
      if (a.unlocked && !rewardedAchievements.has(a.id)) {
        rewardedAchievements.add(a.id);
        earnTokens(20, `Logro: ${a.name}`);
      }
    }
  }, [achievements, earnTokens]);

  return null;
}
