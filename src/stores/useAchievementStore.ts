import { create } from "zustand";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  condition: () => boolean;
  unlocked: boolean;
}

const ACHIEVEMENTS: Omit<Achievement, "unlocked">[] = [
  { id: "first-steps", name: "Primeros Pasos", description: "Entrar al mundo por primera vez", icon: "👣", xpReward: 50, condition: () => true },
  { id: "first-npc", name: "Socializador", description: "Hablar con tu primer NPC", icon: "💬", xpReward: 50, condition: () => true },
  { id: "explorer", name: "Explorador", description: "Visitar 3 zonas diferentes", icon: "🗺️", xpReward: 200, condition: () => true },
  { id: "trader-beginner", name: "Trader Novato", description: "Hacer tu primera operación", icon: "📈", xpReward: 100, condition: () => true },
  { id: "trader-pro", name: "Trader Pro", description: "Cerrar 5 operaciones con ganancia", icon: "💰", xpReward: 500, condition: () => true },
  { id: "scholar", name: "Erudito", description: "Completar 3 lecciones de la Academia", icon: "📚", xpReward: 300, condition: () => true },
  { id: "quiz-master", name: "Quiz Master", description: "Completar todos los quizzes", icon: "🧠", xpReward: 400, condition: () => true },
  { id: "skill-unlocker", name: "Aprendiz", description: "Desbloquear 3 skills", icon: "🌟", xpReward: 250, condition: () => true },
  { id: "mount-rider", name: "Jinete", description: "Montar por primera vez", icon: "🐎", xpReward: 75, condition: () => true },
  { id: "collector", name: "Coleccionista", description: "Tener 5 items en el inventario", icon: "🎒", xpReward: 150, condition: () => true },
  { id: "quest-completer", name: "Aventurero", description: "Completar 3 misiones", icon: "⚔️", xpReward: 300, condition: () => true },
  { id: "level-5", name: "Nivel 5", description: "Alcanzar nivel 5", icon: "⬆️", xpReward: 500, condition: () => true },
];

interface AchievementStore {
  achievements: Achievement[];
  checkAchievements: () => string[];
  getUnlocked: () => Achievement[];
  unlockedCount: number;
}

export const useAchievementStore = create<AchievementStore>((set, get) => ({
  achievements: ACHIEVEMENTS.map((a) => ({ ...a, unlocked: false })),
  unlockedCount: 0,
  checkAchievements: () => {
    const { achievements } = get();
    const newlyUnlocked: string[] = [];
    const updated = achievements.map((a) => {
      if (!a.unlocked && a.condition()) {
        newlyUnlocked.push(a.id);
        return { ...a, unlocked: true };
      }
      return a;
    });
    if (newlyUnlocked.length > 0) {
      set({ achievements: updated, unlockedCount: updated.filter((a) => a.unlocked).length });
    }
    return newlyUnlocked;
  },
  getUnlocked: () => get().achievements.filter((a) => a.unlocked),
}));
