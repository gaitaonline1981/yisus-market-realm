export type TradingScenarioCategory = "risk" | "liquidity" | "volume" | "wyckoff" | "elliott" | "macro" | "backtesting" | "prop_firm" | "psychology"
export type TradingScenarioDifficulty = "beginner" | "intermediate" | "advanced"
export type TradingScenarioDecision = "long" | "short" | "wait" | "avoid" | "reduce_risk"

export interface TradingScenarioCandle {
  index: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface TradingScenarioOption {
  id: TradingScenarioDecision
  label: string
  description: string
}

export interface TradingScenario {
  id: string
  title: string
  category: TradingScenarioCategory
  difficulty: TradingScenarioDifficulty
  zoneId?: string
  npcId?: string
  buildingId?: string
  lessonId?: string
  questId?: string
  summary: string
  marketContext: string
  setupDescription: string
  candles: TradingScenarioCandle[]
  options: TradingScenarioOption[]
  correctDecision: TradingScenarioDecision
  correctReason: string
  wrongReason: string
  riskLesson: string
  rewardXp: number
  unlockRequirement?: { type: "lesson_completed" | "quest_completed" | "skill_unlocked" | "xp"; value: string | number }
}

function makeCandles(prices: number[]): TradingScenarioCandle[] {
  return prices.map((p, i) => {
    const volatility = p * 0.02
    const open = p + (Math.random() - 0.5) * volatility
    const close = p + (Math.random() - 0.5) * volatility
    const high = Math.max(open, close) + Math.random() * volatility * 0.5
    const low = Math.min(open, close) - Math.random() * volatility * 0.5
    return { index: i, open: Math.round(open * 100) / 100, high: Math.round(high * 100) / 100, low: Math.round(low * 100) / 100, close: Math.round(close * 100) / 100, volume: Math.round(100 + Math.random() * 200) }
  })
}

export const tradingScenarios: TradingScenario[] = [
  {
    id: "scenario-liquidity-sweep-basic", title: "Barrido de Liquidez Básico", category: "liquidity", difficulty: "beginner",
    zoneId: "liquidity-lake", npcId: "liquidity-scout", buildingId: "liquidity-scanner-tower", lessonId: "lesson-liquidity-stops", questId: "liquidity-detect",
    summary: "El precio barre un mínimo obvio y vuelve al rango.",
    marketContext: "Mercado en rango lateral. Muchos traders tienen stops debajo del mínimo reciente.",
    setupDescription: "El precio rompe brevemente el mínimo, deja mecha inferior y cierra nuevamente dentro del rango.",
    candles: makeCandles([100, 101, 100, 99, 100, 101, 100, 99, 98, 97, 99, 101]),
    options: [
      { id: "long", label: "Long", description: "Buscar long agresivo después del sweep." },
      { id: "short", label: "Short", description: "Vender porque rompió soporte." },
      { id: "wait", label: "Esperar", description: "Esperar confirmación adicional." },
      { id: "avoid", label: "Evitar", description: "Evitar porque no hay contexto." },
    ],
    correctDecision: "wait",
    correctReason: "El sweep es una pista, pero conviene esperar confirmación antes de entrar.",
    wrongReason: "Entrar solo por ver una mecha puede ser impulsivo. La liquidez necesita reacción y confirmación.",
    riskLesson: "No operar el barrido sin invalidación clara.",
    rewardXp: 35,
    unlockRequirement: { type: "lesson_completed", value: "lesson-liquidity-stops" },
  },
  {
    id: "scenario-breakout-volume-basic", title: "Ruptura con Volumen", category: "volume", difficulty: "beginner",
    zoneId: "candle-volcano", npcId: "volume-blacksmith", buildingId: "volume-forge", lessonId: "lesson-volume-breakout", questId: "candle-confirm",
    summary: "El precio rompe resistencia con expansión de rango y volumen.",
    marketContext: "Mercado comprimido debajo de una resistencia visible.",
    setupDescription: "Una vela cierra por encima del rango con volumen superior al promedio.",
    candles: makeCandles([50, 50, 49, 50, 49, 50, 51, 52, 53, 53, 54, 55]),
    options: [
      { id: "long", label: "Long", description: "Considerar long si el riesgo está definido." },
      { id: "short", label: "Short", description: "Vender contra la ruptura." },
      { id: "wait", label: "Esperar", description: "Esperar siempre 10 velas más." },
      { id: "avoid", label: "Evitar", description: "Evitar cualquier ruptura." },
    ],
    correctDecision: "long",
    correctReason: "Hay ruptura con cierre e incremento de volumen, pero solo es válida si el riesgo está controlado.",
    wrongReason: "Ignorar volumen y cierre puede llevar a perder oportunidades o entrar en contra del momentum.",
    riskLesson: "Confirmar no elimina riesgo; solo mejora contexto.",
    rewardXp: 35,
    unlockRequirement: { type: "lesson_completed", value: "lesson-volume-breakout" },
  },
  {
    id: "scenario-risk-overleverage", title: "Señal buena, riesgo malo", category: "risk", difficulty: "beginner",
    zoneId: "risk-citadel", npcId: "risk-guardian", buildingId: "risk-temple", lessonId: "lesson-risk-basic", questId: "risk-defense",
    summary: "El setup parece bueno, pero el tamaño de posición excede el riesgo permitido.",
    marketContext: "El precio ofrece entrada técnica aceptable, pero el stop queda lejos.",
    setupDescription: "Para tomar la operación con el lote elegido, la pérdida potencial sería demasiado grande.",
    candles: makeCandles([80, 81, 82, 81, 82, 83, 83, 84, 83, 84]),
    options: [
      { id: "long", label: "Long", description: "Entrar igual porque el setup es bueno." },
      { id: "reduce_risk", label: "Reducir riesgo", description: "Reducir tamaño o esperar mejor entrada." },
      { id: "short", label: "Short", description: "Operar en contra." },
      { id: "avoid", label: "Evitar", description: "Cerrar la plataforma." },
    ],
    correctDecision: "reduce_risk",
    correctReason: "Una buena idea no justifica romper la regla de riesgo.",
    wrongReason: "El tamaño incorrecto puede destruir una cuenta incluso con una entrada técnica razonable.",
    riskLesson: "Primero se protege el capital, después se busca ganancia.",
    rewardXp: 40,
    unlockRequirement: { type: "lesson_completed", value: "lesson-risk-basic" },
  },
  {
    id: "scenario-wyckoff-fake-break", title: "Upthrust en Rango", category: "wyckoff", difficulty: "intermediate",
    zoneId: "liquidity-lake", npcId: "mentor-wyckoff", buildingId: "wyckoff-temple", lessonId: "lesson-wyckoff-structure", questId: "wyckoff-structure-basic",
    summary: "El precio rompe el máximo del rango y vuelve rápidamente adentro.",
    marketContext: "Rango lateral después de una subida. Muchos traders compran la ruptura.",
    setupDescription: "La ruptura superior falla y el precio cierra de nuevo dentro del rango.",
    candles: makeCandles([100, 101, 100, 99, 100, 101, 100, 99, 100, 102, 101, 100, 99, 98]),
    options: [
      { id: "long", label: "Long", description: "Comprar la ruptura sin esperar." },
      { id: "short", label: "Short", description: "Considerar short si confirma rechazo y riesgo claro." },
      { id: "wait", label: "Esperar", description: "Esperar confirmación del rechazo." },
      { id: "avoid", label: "Evitar", description: "Ignorar completamente el patrón." },
    ],
    correctDecision: "wait",
    correctReason: "Un upthrust puede ser trampa, pero se necesita confirmación antes de operar.",
    wrongReason: "Operar directamente la primera ruptura o el primer rechazo puede ser impulsivo.",
    riskLesson: "Wyckoff necesita contexto, confirmación e invalidación.",
    rewardXp: 50,
    unlockRequirement: { type: "lesson_completed", value: "lesson-wyckoff-structure" },
  },
  {
    id: "scenario-macro-event-risk", title: "Setup antes de noticia macro", category: "macro", difficulty: "beginner",
    zoneId: "macro-observatory", npcId: "macro-oracle", buildingId: "macro-radar-station", lessonId: "lesson-macro-events", questId: "macro-context",
    summary: "Hay setup técnico, pero en minutos sale una noticia de alto impacto.",
    marketContext: "El gráfico parece ordenado, pero se acerca CPI/FOMC.",
    setupDescription: "El mercado está comprimido antes de una noticia importante.",
    candles: makeCandles([120, 120, 119, 120, 119, 120, 121, 120, 119, 120]),
    options: [
      { id: "long", label: "Long", description: "Entrar antes de la noticia." },
      { id: "short", label: "Short", description: "Entrar en contra antes de la noticia." },
      { id: "avoid", label: "Evitar", description: "Evitar operar hasta que pase el evento." },
      { id: "reduce_risk", label: "Apalancar", description: "Entrar con mucho apalancamiento." },
    ],
    correctDecision: "avoid",
    correctReason: "En eventos de alto impacto, la volatilidad puede invalidar señales técnicas.",
    wrongReason: "Entrar antes de una noticia sin plan puede exponer a slippage y movimientos violentos.",
    riskLesson: "El calendario macro forma parte de la gestión de riesgo.",
    rewardXp: 35,
    unlockRequirement: { type: "lesson_completed", value: "lesson-macro-events" },
  },
  {
    id: "scenario-prop-firm-drawdown", title: "Cerca del Drawdown Diario", category: "prop_firm", difficulty: "intermediate",
    zoneId: "risk-citadel", npcId: "prop-firm-coach", buildingId: "prop-firm-challenge-gate", lessonId: "lesson-prop-firm-rules", questId: "prop-firm-rules-basic",
    summary: "Estás cerca del límite diario de pérdida en una prueba fondeada.",
    marketContext: "Ya tuviste dos pérdidas en el día. Queda poco margen antes de violar regla diaria.",
    setupDescription: "Aparece una operación interesante, pero el riesgo puede romper el límite diario.",
    candles: makeCandles([100, 99, 98, 99, 100, 99, 98, 97, 98, 99]),
    options: [
      { id: "long", label: "Long", description: "Entrar para recuperar." },
      { id: "short", label: "Short", description: "Entrar en contra para recuperar." },
      { id: "reduce_risk", label: "Reducir riesgo", description: "Reducir riesgo al mínimo o no operar." },
      { id: "avoid", label: "Evitar", description: "Cerrar sesión y proteger la cuenta." },
    ],
    correctDecision: "avoid",
    correctReason: "Si estás cerca del límite diario, la prioridad es proteger la cuenta.",
    wrongReason: "Intentar recuperar cerca del drawdown suele empeorar el problema.",
    riskLesson: "En prop firms, sobrevivir a las reglas es parte central del juego.",
    rewardXp: 50,
    unlockRequirement: { type: "lesson_completed", value: "lesson-prop-firm-rules" },
  },
]
