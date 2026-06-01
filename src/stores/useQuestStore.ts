import { create } from "zustand";

export interface TrackedQuest {
  questId: string;
  acceptedAt: number;
  progress: number;
  target: number;
}

interface QuestStore {
  activeQuests: TrackedQuest[];
  completedQuests: string[];
  acceptQuest: (questId: string, target?: number) => void;
  updateProgress: (questId: string, amount?: number) => void;
  completeQuest: (questId: string) => void;
  isCompleted: (questId: string) => boolean;
}

export const useQuestStore = create<QuestStore>((set, get) => ({
  activeQuests: [],
  completedQuests: [],
  acceptQuest: (questId, target = 1) =>
    set((s) => ({
      activeQuests: s.activeQuests.some((q) => q.questId === questId)
        ? s.activeQuests
        : [...s.activeQuests, { questId, acceptedAt: Date.now(), progress: 0, target }],
    })),
  updateProgress: (questId, amount = 1) =>
    set((s) => ({
      activeQuests: s.activeQuests.map((q) =>
        q.questId === questId ? { ...q, progress: Math.min(q.progress + amount, q.target) } : q
      ),
    })),
  completeQuest: (questId) =>
    set((s) => ({
      activeQuests: s.activeQuests.filter((q) => q.questId !== questId),
      completedQuests: [...s.completedQuests, questId],
    })),
  isCompleted: (questId) => get().completedQuests.includes(questId),
}));
