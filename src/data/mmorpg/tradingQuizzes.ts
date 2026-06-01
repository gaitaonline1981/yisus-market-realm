export type TradingQuizDifficulty = "beginner" | "intermediate" | "advanced"

export interface TradingQuizOption {
  id: string
  text: string
}

export interface TradingQuizQuestion {
  id: string
  question: string
  options: TradingQuizOption[]
  correctOptionId: string
  explanation: string
}

export interface TradingQuiz {
  id: string
  lessonId: string
  title: string
  difficulty: TradingQuizDifficulty
  passingScore: number
  rewardXp: number
  questions: TradingQuizQuestion[]
}

export const tradingQuizzes: TradingQuiz[] = [
  {
    id: "quiz-premarket-plan", lessonId: "lesson-premarket-plan",
    title: "Quiz Checklist Pre-Market", difficulty: "beginner", passingScore: 2, rewardXp: 20,
    questions: [
      { id: "q1", question: "¿Cuál es el objetivo principal de un checklist pre-market?", options: [{ id: "a", text: "Predecir el precio exacto." }, { id: "b", text: "Reducir decisiones impulsivas y preparar el escenario." }, { id: "c", text: "Operar más veces por día." }], correctOptionId: "b", explanation: "El checklist no predice el futuro; ayuda a reducir errores y operar con plan." },
      { id: "q2", question: "¿Qué dato debería estar definido antes de entrar a una operación?", options: [{ id: "a", text: "Stop, target e invalidación." }, { id: "b", text: "Solo el posible take profit." }, { id: "c", text: "El resultado exacto esperado." }], correctOptionId: "a", explanation: "Antes de operar debe existir invalidación, riesgo y objetivo." },
      { id: "q3", question: "¿Qué error representa operar sin plan?", options: [{ id: "a", text: "Disciplina profesional." }, { id: "b", text: "FOMO o reacción impulsiva." }, { id: "c", text: "Gestión de riesgo avanzada." }], correctOptionId: "b", explanation: "Operar sin plan suele estar vinculado a FOMO e impulsividad." },
    ],
  },
  {
    id: "quiz-risk-basic", lessonId: "lesson-risk-basic",
    title: "Quiz Riesgo por Operación", difficulty: "beginner", passingScore: 2, rewardXp: 25,
    questions: [
      { id: "q1", question: "¿Qué controla realmente un trader antes de entrar?", options: [{ id: "a", text: "El resultado del mercado." }, { id: "b", text: "El tamaño de su pérdida potencial." }, { id: "c", text: "La reacción de otros traders." }], correctOptionId: "b", explanation: "No se controla el mercado, pero sí el riesgo asumido." },
      { id: "q2", question: "¿Por qué es peligroso aumentar lote después de perder?", options: [{ id: "a", text: "Porque puede aumentar drawdown emocional y financiero." }, { id: "b", text: "Porque mejora automáticamente la recuperación." }, { id: "c", text: "Porque elimina el riesgo." }], correctOptionId: "a", explanation: "Aumentar tamaño por emoción puede destruir la cuenta rápidamente." },
      { id: "q3", question: "¿Qué significa aceptar una pérdida pequeña?", options: [{ id: "a", text: "Fallar como trader." }, { id: "b", text: "Proteger capital para seguir operando." }, { id: "c", text: "No tener estrategia." }], correctOptionId: "b", explanation: "Una pérdida controlada forma parte de la supervivencia trader." },
    ],
  },
  {
    id: "quiz-liquidity-stops", lessonId: "lesson-liquidity-stops",
    title: "Quiz Liquidez y Stops", difficulty: "beginner", passingScore: 2, rewardXp: 25,
    questions: [
      { id: "q1", question: "¿Dónde suele concentrarse liquidez?", options: [{ id: "a", text: "En zonas que nadie mira." }, { id: "b", text: "En máximos, mínimos y niveles obvios." }, { id: "c", text: "Solo en el precio actual." }], correctOptionId: "b", explanation: "Los stops suelen estar cerca de niveles evidentes." },
      { id: "q2", question: "¿Qué puede significar una ruptura que vuelve rápido al rango?", options: [{ id: "a", text: "Posible barrido o falsa ruptura." }, { id: "b", text: "Confirmación garantizada." }, { id: "c", text: "Ausencia total de liquidez." }], correctOptionId: "a", explanation: "Un sweep puede activar stops y luego revertir." },
      { id: "q3", question: "¿Qué conviene hacer después de un barrido?", options: [{ id: "a", text: "Entrar siempre al instante." }, { id: "b", text: "Esperar reacción y confirmación." }, { id: "c", text: "Ignorar contexto." }], correctOptionId: "b", explanation: "El barrido por sí solo no alcanza; se necesita reacción." },
    ],
  },
  {
    id: "quiz-volume-breakout", lessonId: "lesson-volume-breakout",
    title: "Quiz Ruptura con Volumen", difficulty: "beginner", passingScore: 2, rewardXp: 25,
    questions: [
      { id: "q1", question: "¿Qué ayuda a validar una ruptura?", options: [{ id: "a", text: "Volumen superior al promedio y cierre con intención." }, { id: "b", text: "Solo una mecha." }, { id: "c", text: "Entrar antes del cierre." }], correctOptionId: "a", explanation: "Volumen, rango y cierre ayudan a filtrar falsas rupturas." },
      { id: "q2", question: "¿Qué puede indicar una ruptura sin volumen?", options: [{ id: "a", text: "Señal perfecta." }, { id: "b", text: "Movimiento débil o posible trampa." }, { id: "c", text: "Garantía de continuación." }], correctOptionId: "b", explanation: "Sin participación, la ruptura puede carecer de fuerza." },
      { id: "q3", question: "¿Qué error es común en breakouts?", options: [{ id: "a", text: "Esperar confirmación." }, { id: "b", text: "Ignorar el volumen y perseguir la vela." }, { id: "c", text: "Definir stop antes de entrar." }], correctOptionId: "b", explanation: "Perseguir la vela sin confirmación aumenta riesgo de trampa." },
    ],
  },
  {
    id: "quiz-wyckoff-structure", lessonId: "lesson-wyckoff-structure",
    title: "Quiz Estructura Wyckoff", difficulty: "intermediate", passingScore: 2, rewardXp: 35,
    questions: [
      { id: "q1", question: "¿Qué intenta interpretar Wyckoff?", options: [{ id: "a", text: "La intención detrás del rango y comportamiento institucional." }, { id: "b", text: "Solo indicadores retrasados." }, { id: "c", text: "Noticias sin gráfico." }], correctOptionId: "a", explanation: "Wyckoff estudia acumulación, distribución y manipulación." },
      { id: "q2", question: "¿Qué es un spring de forma conceptual?", options: [{ id: "a", text: "Un barrido por debajo del rango con posible recuperación." }, { id: "b", text: "Una compra garantizada." }, { id: "c", text: "Una vela sin contexto." }], correctOptionId: "a", explanation: "El spring puede barrer liquidez antes de recuperar." },
      { id: "q3", question: "¿Cuál es un error común?", options: [{ id: "a", text: "Esperar confirmación." }, { id: "b", text: "Llamar acumulación a cualquier lateralización." }, { id: "c", text: "Leer estructura." }], correctOptionId: "b", explanation: "No todo rango es acumulación; se necesita contexto y confirmación." },
    ],
  },
  {
    id: "quiz-prop-firm-rules", lessonId: "lesson-prop-firm-rules",
    title: "Quiz Reglas Prop Firm", difficulty: "intermediate", passingScore: 2, rewardXp: 35,
    questions: [
      { id: "q1", question: "¿Qué regla puede ser más importante que el profit target?", options: [{ id: "a", text: "Pérdida máxima y pérdida diaria." }, { id: "b", text: "Color de la plataforma." }, { id: "c", text: "Cantidad de pantallas." }], correctOptionId: "a", explanation: "El drawdown define si seguís dentro del desafío." },
      { id: "q2", question: "¿Qué suele destruir pruebas fondeadas?", options: [{ id: "a", text: "Riesgo controlado." }, { id: "b", text: "Sobreapalancamiento y falta de consistencia." }, { id: "c", text: "Tener plan." }], correctOptionId: "b", explanation: "Arriesgar demasiado puede romper reglas rápidamente." },
      { id: "q3", question: "¿Cómo se debe pensar una prueba fondeada?", options: [{ id: "a", text: "Como una serie de decisiones controladas." }, { id: "b", text: "Como una apuesta rápida." }, { id: "c", text: "Como una sola operación heroica." }], correctOptionId: "a", explanation: "La consistencia importa más que una operación aislada." },
    ],
  },
]
