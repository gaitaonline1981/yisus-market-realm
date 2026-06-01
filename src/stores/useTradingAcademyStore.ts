import { create } from "zustand"
import { persist } from "zustand/middleware"

interface TradingAcademyState {
  completedLessonIds: string[]
  bookmarkedLessonIds: string[]
  activeLessonId?: string
  startLesson: (lessonId: string) => void
  completeLesson: (lessonId: string) => void
  toggleBookmark: (lessonId: string) => void
  isLessonCompleted: (lessonId: string) => boolean
  isLessonBookmarked: (lessonId: string) => boolean
  resetAcademy: () => void
}

export const useTradingAcademyStore = create<TradingAcademyState>()(
  persist(
    (set, get) => ({
      completedLessonIds: [],
      bookmarkedLessonIds: [],
      activeLessonId: undefined,
      startLesson: (lessonId) => set({ activeLessonId: lessonId }),
      completeLesson: (lessonId) => {
        const { completedLessonIds } = get()
        if (!completedLessonIds.includes(lessonId)) set({ completedLessonIds: [...completedLessonIds, lessonId] })
      },
      toggleBookmark: (lessonId) => {
        const { bookmarkedLessonIds } = get()
        set({ bookmarkedLessonIds: bookmarkedLessonIds.includes(lessonId) ? bookmarkedLessonIds.filter((id) => id !== lessonId) : [...bookmarkedLessonIds, lessonId] })
      },
      isLessonCompleted: (lessonId) => get().completedLessonIds.includes(lessonId),
      isLessonBookmarked: (lessonId) => get().bookmarkedLessonIds.includes(lessonId),
      resetAcademy: () => set({ completedLessonIds: [], bookmarkedLessonIds: [], activeLessonId: undefined }),
    }),
    { name: "yisus-market-realm-trading-academy" }
  )
)
