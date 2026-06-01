export type MarketReplayCategory = "liquidity" | "breakout" | "risk" | "wyckoff" | "macro" | "prop_firm" | "psychology"
export type MarketReplayDifficulty = "beginner" | "intermediate" | "advanced"
export type MarketReplayDecision = "long" | "short" | "wait" | "avoid" | "reduce_risk"

export interface MarketReplayCandle {
  index: number
  open: number
  high: number
  low: number
  close: number
  volume: number
  note?: string
}

export interface MarketReplayDecisionPoint {
  candleIndex: number
  question: string
  context: string
  options: { id: MarketReplayDecision; label: string; description: string }[]
  correctDecision: MarketReplayDecision
  correctFeedback: string
  wrongFeedback: string
  tradingLesson: string
}

export interface MarketReplay {
  id: string
  title: string
  category: MarketReplayCategory
  difficulty: MarketReplayDifficulty
  zoneId?: string
  npcId?: string
  buildingId?: string
  lessonId?: string
  questId?: string
  summary: string
  marketContext: string
  learningGoal: string
  candles: MarketReplayCandle[]
  decisionPoints: MarketReplayDecisionPoint[]
  rewardXp: number
  unlockRequirement?: { type: "lesson_completed" | "quest_completed" | "scenario_completed" | "xp"; value: string | number }
}

function makeCandles(prices: number[], len: number): MarketReplayCandle[] {
  const candles: MarketReplayCandle[] = []
  for (let i = 0; i < len; i++) {
    const base = prices[Math.min(i, prices.length - 1)]
    const vol = base * 0.015
    const o = base + (Math.random() - 0.5) * vol
    const c = base + (Math.random() - 0.5) * vol
    const h = Math.max(o, c) + Math.random() * vol * 0.4
    const l = Math.min(o, c) - Math.random() * vol * 0.4
    candles.push({ index: i, open: Math.round(o * 100) / 100, high: Math.round(h * 100) / 100, low: Math.round(l * 100) / 100, close: Math.round(c * 100) / 100, volume: Math.round(80 + Math.random() * 200) })
  }
  return candles
}

const dp1: MarketReplayDecisionPoint[] = [
  { candleIndex: 9, question: "El precio acaba de barrer el mínimo del rango. ¿Qué hacés?", context: "Hay mecha inferior fuerte, pero todavía no hay confirmación de recuperación.", options: [{ id: "long", label: "Long", description: "Comprar inmediatamente el sweep." }, { id: "short", label: "Short", description: "Vender porque rompió soporte." }, { id: "wait", label: "Esperar", description: "Esperar confirmación." }, { id: "avoid", label: "Evitar", description: "Ignorar el mercado." }], correctDecision: "wait", correctFeedback: "Correcto. El sweep es una pista, pero falta confirmación.", wrongFeedback: "Entrar en la primera mecha puede ser impulsivo.", tradingLesson: "La liquidez necesita reacción y confirmación." },
  { candleIndex: 11, question: "El precio cerró nuevamente dentro del rango después del sweep. ¿Qué decisión tiene más sentido educativo?", context: "Ya existe recuperación del rango, pero todavía se debe definir riesgo.", options: [{ id: "long", label: "Long", description: "Considerar long con stop claro debajo del sweep." }, { id: "short", label: "Short", description: "Vender porque el precio sigue débil." }, { id: "avoid", label: "Evitar", description: "Evitar siempre cualquier sweep." }, { id: "reduce_risk", label: "Reducir", description: "Entrar sin stop pero con poco tamaño." }], correctDecision: "long", correctFeedback: "Correcto. La recuperación del rango da mejor contexto, siempre con riesgo definido.", wrongFeedback: "Ignorar la confirmación o entrar sin stop rompe la lógica del setup.", tradingLesson: "El setup se valida con contexto, confirmación e invalidación." },
]

const dp2: MarketReplayDecisionPoint[] = [
  { candleIndex: 10, question: "La vela rompió resistencia, pero el volumen fue bajo. ¿Qué hacés?", context: "Hay ruptura visual, pero sin participación fuerte.", options: [{ id: "long", label: "Long", description: "Comprar solo porque rompió." }, { id: "wait", label: "Esperar", description: "Esperar cierre y continuación." }, { id: "short", label: "Short", description: "Vender inmediatamente." }, { id: "avoid", label: "Evitar", description: "Evitar mirar volumen." }], correctDecision: "wait", correctFeedback: "Correcto. Una ruptura sin volumen necesita confirmación.", wrongFeedback: "Comprar toda ruptura visual puede llevar a fakeouts.", tradingLesson: "El volumen ayuda a validar intención." },
  { candleIndex: 12, question: "El precio volvió dentro del rango después de romper. ¿Qué indica?", context: "La ruptura falló y no hubo continuación.", options: [{ id: "long", label: "Long", description: "Mantener sesgo long." }, { id: "short", label: "Short", description: "Considerar fakeout si hay rechazo." }, { id: "wait", label: "Esperar", description: "Esperar nueva estructura." }, { id: "reduce_risk", label: "Aumentar", description: "Aumentar tamaño para recuperar." }], correctDecision: "wait", correctFeedback: "Correcto. El fakeout es posible, pero conviene esperar estructura clara.", wrongFeedback: "Reaccionar sin plan suele ser emocional.", tradingLesson: "Una ruptura fallida cambia el contexto." },
]

const dp3: MarketReplayDecisionPoint[] = [
  { candleIndex: 8, question: "Aparece un setup aceptable, pero estás cerca del límite diario. ¿Qué hacés?", context: "Si perdés esta operación con tamaño normal, rompés la regla diaria.", options: [{ id: "long", label: "Long", description: "Entrar normal para recuperar." }, { id: "short", label: "Short", description: "Entrar en contra." }, { id: "reduce_risk", label: "Reducir", description: "Reducir mucho riesgo o no operar." }, { id: "avoid", label: "Evitar", description: "Cerrar sesión y proteger cuenta." }], correctDecision: "avoid", correctFeedback: "Correcto. Proteger reglas es prioridad.", wrongFeedback: "Intentar recuperar cerca del límite acelera la pérdida.", tradingLesson: "La mejor operación puede ser no operar." },
]

export const marketReplays: MarketReplay[] = [
  {
    id: "replay-liquidity-sweep-reversal", title: "Sweep y Reacción en Rango", category: "liquidity", difficulty: "beginner",
    zoneId: "liquidity-lake", npcId: "liquidity-scout", buildingId: "liquidity-scanner-tower", lessonId: "lesson-liquidity-stops", questId: "liquidity-detect",
    summary: "Replay ficticio donde el precio barre un mínimo y luego recupera el rango.",
    marketContext: "Mercado lateral con mínimos obvios. Muchos traders podrían tener stops debajo del rango.",
    learningGoal: "Practicar lectura de liquidez sin entrar impulsivamente.",
    candles: makeCandles([100, 101, 100, 99, 100, 101, 100, 99, 98, 97, 99, 100, 101, 102, 101, 102, 103, 102], 18),
    decisionPoints: dp1, rewardXp: 45,
    unlockRequirement: { type: "lesson_completed", value: "lesson-liquidity-stops" },
  },
  {
    id: "replay-breakout-fakeout", title: "Breakout o Fakeout", category: "breakout", difficulty: "beginner",
    zoneId: "candle-volcano", npcId: "volume-blacksmith", buildingId: "candle-breakout-gate", lessonId: "lesson-volume-breakout", questId: "candle-confirm",
    summary: "Replay ficticio donde una ruptura parece fuerte, pero el volumen no acompaña.",
    marketContext: "Precio comprimiendo debajo de resistencia. Muchos esperan ruptura.",
    learningGoal: "Diferenciar breakout con confirmación de fakeout.",
    candles: makeCandles([50, 49, 50, 49, 50, 51, 52, 53, 52, 53, 54, 53, 52, 51, 50, 49, 50, 51], 18),
    decisionPoints: dp2, rewardXp: 45,
    unlockRequirement: { type: "lesson_completed", value: "lesson-volume-breakout" },
  },
  {
    id: "replay-risk-management-prop", title: "Riesgo y Drawdown en Prop Firm", category: "prop_firm", difficulty: "intermediate",
    zoneId: "risk-citadel", npcId: "prop-firm-coach", buildingId: "prop-firm-challenge-gate", lessonId: "lesson-prop-firm-rules", questId: "prop-firm-rules-basic",
    summary: "Replay educativo donde el setup aparece cuando el trader está cerca del límite diario.",
    marketContext: "El trader ya perdió dos operaciones. Queda poco margen antes del daily drawdown.",
    learningGoal: "Practicar decisión de no operar cuando el riesgo de regla es alto.",
    candles: makeCandles([100, 99, 98, 99, 100, 99, 98, 97, 98, 99, 100, 99, 98, 97, 96, 97], 16),
    decisionPoints: dp3, rewardXp: 60,
    unlockRequirement: { type: "lesson_completed", value: "lesson-prop-firm-rules" },
  },
]
