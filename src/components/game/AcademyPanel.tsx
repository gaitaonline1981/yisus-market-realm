"use client";

import { useState, useEffect } from "react";
import { useAcademyStore } from "@/stores/useAcademyStore";
import { useGameStore } from "@/stores/useGameStore";
import { TRADING_LESSONS, TRADING_QUIZZES, type TradingLesson, type TradingQuiz } from "@/data/academy";
import { X, BookOpen, Brain, CheckCircle2 } from "lucide-react";

function LessonView({ lesson, onBack }: { lesson: TradingLesson; onBack: () => void }) {
  const completeLesson = useAcademyStore((s) => s.completeLesson);
  const addXp = useGameStore((s) => s.addXp);

  const handleComplete = () => {
    completeLesson(lesson.id);
    addXp(50);
    onBack();
  };

  return (
    <div className="p-6">
      <button onClick={onBack} className="text-cyan-400 text-sm hover:underline mb-4 block">
        ← Volver
      </button>
      <h2 className="text-xl font-bold text-white mb-1">{lesson.title}</h2>
      <span className={`text-[10px] px-2 py-0.5 rounded-full inline-block mb-4 ${
        lesson.difficulty <= 2 ? "bg-green-500/20 text-green-300" :
        lesson.difficulty <= 3 ? "bg-yellow-500/20 text-yellow-300" :
        "bg-red-500/20 text-red-300"
      }`}>
        Nivel {lesson.difficulty} · {lesson.category}
      </span>
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
        <pre className="text-zinc-300 text-sm whitespace-pre-wrap font-sans leading-relaxed">
          {lesson.content}
        </pre>
      </div>
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-6">
        <p className="text-cyan-300 text-sm font-bold">💡 {lesson.keyTakeaway}</p>
      </div>
      <button
        onClick={handleComplete}
        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold rounded-xl hover:scale-[1.02] transition-transform"
      >
        COMPLETAR LECCIÓN (+50 XP)
      </button>
    </div>
  );
}

function QuizView({ quiz, onBack }: { quiz: TradingQuiz; onBack: () => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const completeQuiz = useAcademyStore((s) => s.completeQuiz);
  const addXp = useGameStore((s) => s.addXp);

  const question = quiz.questions[currentQ];
  const allAnswered = quiz.questions.every((q) => answers[q.id]);

  const score = quiz.questions.filter((q) => {
    const correct = q.options.find((o) => o.correct);
    return answers[q.id] === correct?.id;
  }).length;

  const handleAnswer = (qId: string, optId: string) => {
    setAnswers((a) => ({ ...a, [qId]: optId }));
  };

  const handleNext = () => {
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ((c) => c + 1);
    } else {
      setShowResult(true);
      completeQuiz(quiz.id, (score / quiz.questions.length) * 100);
      addXp(quiz.xpReward);
    }
  };

  if (showResult) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Resultado</h2>
        <p className="text-4xl font-black text-cyan-300 mb-4">
          {score}/{quiz.questions.length}
        </p>
        <p className="text-zinc-400 mb-6">
          {score === quiz.questions.length
            ? "¡Perfecto! Dominás este tema."
            : score >= quiz.questions.length / 2
            ? "¡Bien! Pero podés mejorar."
            : "Seguí estudiando, vas por buen camino."}
        </p>
        <p className="text-cyan-300 font-bold mb-6">+{quiz.xpReward} XP</p>
        <button
          onClick={onBack}
          className="px-6 py-2.5 bg-white/10 border border-white/10 rounded-lg text-white text-sm hover:bg-white/20"
        >
          Volver a la Academia
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="text-cyan-400 text-sm hover:underline">
          ← Salir
        </button>
        <span className="text-xs text-zinc-500">
          {currentQ + 1}/{quiz.questions.length}
        </span>
      </div>
      <h2 className="text-lg font-bold text-white mb-6">{question.question}</h2>
      <div className="space-y-2 mb-6">
        {question.options.map((opt) => {
          const selected = answers[question.id] === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => handleAnswer(question.id, opt.id)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                selected
                  ? "border-cyan-400 bg-cyan-500/20 text-white"
                  : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
              }`}
            >
              {opt.text}
            </button>
          );
        })}
      </div>
      <button
        onClick={handleNext}
        disabled={!answers[question.id]}
        className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all ${
          answers[question.id]
            ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-black"
            : "bg-white/10 text-white/20 cursor-not-allowed"
        }`}
      >
        {currentQ < quiz.questions.length - 1 ? "Siguiente" : "Finalizar"}
      </button>
    </div>
  );
}

export function AcademyPanel() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"hub" | "lesson" | "quiz">("hub");
  const [selectedLesson, setSelectedLesson] = useState<TradingLesson | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<TradingQuiz | null>(null);
  const completedLessons = useAcademyStore((s) => s.completedLessons);
  const completedQuizzes = useAcademyStore((s) => s.completedQuizzes);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "t") setOpen((o) => !o);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  if (view === "lesson" && selectedLesson) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-[#0a0f1a] border border-white/10 rounded-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-auto">
          <LessonView lesson={selectedLesson} onBack={() => { setView("hub"); setSelectedLesson(null); }} />
        </div>
      </div>
    );
  }

  if (view === "quiz" && selectedQuiz) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-[#0a0f1a] border border-white/10 rounded-2xl w-full max-w-xl mx-4 max-h-[80vh] overflow-auto">
          <QuizView quiz={selectedQuiz} onBack={() => { setView("hub"); setSelectedQuiz(null); }} />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#0a0f1a] border border-white/10 rounded-2xl p-6 w-full max-w-3xl mx-4 max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            📚 Academia de Trading
          </h2>
          <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Lessons */}
        <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <BookOpen size={14} /> Lecciones
        </h3>
        <div className="space-y-2 mb-6">
          {TRADING_LESSONS.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => { setSelectedLesson(lesson); setView("lesson"); }}
              className="w-full flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors text-left"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                completedLessons.includes(lesson.id) ? "bg-green-500/20 text-green-300" : "bg-white/10 text-white/50"
              }`}>
                {completedLessons.includes(lesson.id) ? <CheckCircle2 size={16} /> : lesson.difficulty}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-white">{lesson.title}</h4>
                <p className="text-[10px] text-zinc-500">{lesson.category} · Nivel {lesson.difficulty}</p>
              </div>
              {completedLessons.includes(lesson.id) && (
                <span className="text-[10px] text-green-400 font-bold">HECHO</span>
              )}
            </button>
          ))}
        </div>

        {/* Quizzes */}
        <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Brain size={14} /> Quizzes
        </h3>
        <div className="space-y-2">
          {TRADING_QUIZZES.map((quiz) => (
            <button
              key={quiz.id}
              onClick={() => { setSelectedQuiz(quiz); setView("quiz"); }}
              className="w-full flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors text-left"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                completedQuizzes.includes(quiz.id) ? "bg-green-500/20 text-green-300" : "bg-purple-500/20 text-purple-300"
              }`}>
                {completedQuizzes.includes(quiz.id) ? <CheckCircle2 size={16} /> : "?"}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-white">{quiz.title}</h4>
                <p className="text-[10px] text-zinc-500">{quiz.questions.length} preguntas · +{quiz.xpReward} XP</p>
              </div>
              {completedQuizzes.includes(quiz.id) && (
                <span className="text-[10px] text-green-400 font-bold">HECHO</span>
              )}
            </button>
          ))}
        </div>

        <p className="text-white/20 text-xs text-center mt-6">Presioná T para cerrar</p>
      </div>
    </div>
  );
}
