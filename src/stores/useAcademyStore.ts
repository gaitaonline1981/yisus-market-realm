import { create } from "zustand";

interface AcademyStore {
  completedLessons: string[];
  completedQuizzes: string[];
  quizScores: Record<string, number>;
  completeLesson: (id: string) => void;
  completeQuiz: (id: string, score: number) => void;
  isLessonCompleted: (id: string) => boolean;
  isQuizCompleted: (id: string) => boolean;
}

export const useAcademyStore = create<AcademyStore>((set, get) => ({
  completedLessons: [],
  completedQuizzes: [],
  quizScores: {},
  completeLesson: (id) =>
    set((s) => ({
      completedLessons: s.completedLessons.includes(id)
        ? s.completedLessons
        : [...s.completedLessons, id],
    })),
  completeQuiz: (id, score) =>
    set((s) => ({
      completedQuizzes: s.completedQuizzes.includes(id)
        ? s.completedQuizzes
        : [...s.completedQuizzes, id],
      quizScores: { ...s.quizScores, [id]: score },
    })),
  isLessonCompleted: (id) => get().completedLessons.includes(id),
  isQuizCompleted: (id) => get().completedQuizzes.includes(id),
}));
