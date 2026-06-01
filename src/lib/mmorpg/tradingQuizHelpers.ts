import { tradingQuizzes } from "@/data/mmorpg/tradingQuizzes"

export function getQuizById(quizId: string) { return tradingQuizzes.find((q) => q.id === quizId) }
export function getQuizByLesson(lessonId: string) { return tradingQuizzes.find((q) => q.lessonId === lessonId) }
export function getQuizzesByLessonIds(lessonIds: string[]) { return tradingQuizzes.filter((q) => lessonIds.includes(q.lessonId)) }

export function calculateQuizScore(params: { quizId: string; answers: Record<string, string> }): { score: number; total: number; passed: boolean } {
  const quiz = getQuizById(params.quizId)
  if (!quiz) return { score: 0, total: 0, passed: false }
  let score = 0
  for (const q of quiz.questions) {
    if (params.answers[q.id] === q.correctOptionId) score++
  }
  return { score, total: quiz.questions.length, passed: score >= quiz.passingScore }
}
