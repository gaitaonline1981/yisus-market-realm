export type QuestStatus = "locked" | "available" | "active" | "completed"

export type MissionCategory =
  | "tutorial" | "liquidity" | "risk" | "breakout" | "macro" | "bot"
  | "backtesting" | "prop_firm" | "community" | "wyckoff" | "elliott" | "volume"

export interface WorldQuest {
  id: string
  zoneId: string
  title: string
  description: string
  tradingLesson: string
  objective: string
  steps: string[]
  category: MissionCategory
  difficulty: "beginner" | "intermediate" | "advanced"
  npcId?: string
  buildingId?: string
  estimatedMinutes?: number
  reward: {
    xp: number
    title?: string
    unlock?: string
  }
}

export const worldQuests: WorldQuest[] = [
  {
    id: "central-plan", zoneId: "central-hub",
    title: "Preparar el Plan",
    description: "Revisá tu personaje, montura y configuración antes de salir al mercado.",
    tradingLesson: "Ninguna operación debería empezar sin un plan previo.",
    objective: "Activar el Central Hub y revisar tu configuración.",
    steps: ["Elegir personaje y montura.", "Revisar modo de visualización.", "Confirmar zona inicial.", "Leer checklist de preparación."],
    category: "tutorial", difficulty: "beginner", npcId: "market-news-agent", buildingId: "trading-academy", estimatedMinutes: 5,
    reward: { xp: 50, title: "Planificador Inicial" },
  },
  {
    id: "liquidity-detect", zoneId: "liquidity-lake",
    title: "Detectar Liquidez",
    description: "Identificá una zona donde el mercado podría barrer stops.",
    tradingLesson: "La liquidez suele estar donde la mayoría coloca sus stops.",
    objective: "Acercarte a Liquidity Lake y activar la zona.",
    steps: ["Visitar Liquidity Lake.", "Identificar máximos/mínimos obvios.", "Leer concepto de stop hunt.", "Activar la zona."],
    category: "liquidity", difficulty: "beginner", npcId: "liquidity-scout", buildingId: "liquidity-scanner-tower", estimatedMinutes: 10,
    reward: { xp: 120, title: "Aprendiz de Liquidez" },
  },
  {
    id: "candle-confirm", zoneId: "candle-volcano",
    title: "Confirmar Ruptura",
    description: "Buscá una ruptura con volumen antes de entrar.",
    tradingLesson: "Una ruptura sin volumen puede ser una trampa.",
    objective: "Activar Candle Volcano y revisar el concepto de momentum.",
    steps: ["Visitar Candle Volcano.", "Leer concepto de ruptura.", "Revisar volumen como confirmación.", "Completar misión."],
    category: "breakout", difficulty: "beginner", npcId: "volume-blacksmith", buildingId: "candle-breakout-gate", estimatedMinutes: 10,
    reward: { xp: 120, title: "Iniciado del Momentum" },
  },
  {
    id: "macro-context", zoneId: "macro-observatory",
    title: "Leer el Contexto",
    description: "Revisá el sesgo macro antes de operar.",
    tradingLesson: "El contexto macro puede invalidar una señal técnica aislada.",
    objective: "Activar Macro Observatory.",
    steps: ["Visitar Macro Observatory.", "Revisar contexto macro.", "Leer lección de eventos.", "Completar misión."],
    category: "macro", difficulty: "beginner", npcId: "macro-oracle", buildingId: "macro-radar-station", estimatedMinutes: 10,
    reward: { xp: 150, title: "Observador Macro" },
  },
  {
    id: "mechanic-signal", zoneId: "mechanic-lab",
    title: "Reparar la Señal",
    description: "Ajustá un parámetro del sistema para reducir falsas señales.",
    tradingLesson: "Una estrategia buena puede fallar si sus filtros están mal calibrados.",
    objective: "Activar Mechanic Lab.",
    steps: ["Visitar Mechanic Lab.", "Leer concepto de filtros.", "Revisar falsas señales.", "Completar misión."],
    category: "bot", difficulty: "intermediate", npcId: "bot-mechanic", buildingId: "bot-workshop", estimatedMinutes: 10,
    reward: { xp: 100, title: "Mecánico del Mercado" },
  },
  {
    id: "risk-defense", zoneId: "risk-citadel",
    title: "Defender el Capital",
    description: "Configurá riesgo máximo antes de abrir una operación.",
    tradingLesson: "Sobrevivir es más importante que acertar una operación.",
    objective: "Activar Risk Citadel.",
    steps: ["Visitar Risk Citadel.", "Leer regla de riesgo.", "Definir pérdida máxima conceptual.", "Completar misión."],
    category: "risk", difficulty: "beginner", npcId: "risk-guardian", buildingId: "risk-temple", estimatedMinutes: 10,
    reward: { xp: 180, title: "Guardián del Riesgo" },
  },
  {
    id: "wyckoff-structure-basic", zoneId: "liquidity-lake",
    title: "Leer estructura Wyckoff",
    description: "Aprendé a diferenciar acumulación, distribución y trampa de liquidez.",
    tradingLesson: "La estructura muestra el comportamiento de los participantes fuertes antes del movimiento.",
    objective: "Hablar con Mentor Wyckoff y revisar el concepto de acumulación/distribución.",
    steps: ["Visitar Wyckoff Temple.", "Hablar con Mentor Wyckoff.", "Leer lección de acumulación.", "Leer lección de trampas."],
    category: "wyckoff", difficulty: "intermediate", npcId: "mentor-wyckoff", buildingId: "wyckoff-temple", estimatedMinutes: 15,
    reward: { xp: 160, title: "Aprendiz Wyckoff" },
  },
  {
    id: "elliott-cycle-basic", zoneId: "macro-observatory",
    title: "Mapear ciclo Elliott",
    description: "Aprendé a ubicar impulsos, correcciones e invalidaciones.",
    tradingLesson: "Elliott sirve para pensar escenarios, no para forzar conteos.",
    objective: "Hablar con Elliott Sage y revisar el concepto de ciclo.",
    steps: ["Visitar Elliott Observatory.", "Hablar con Elliott Sage.", "Leer lección de ondas.", "Revisar invalidación conceptual."],
    category: "elliott", difficulty: "intermediate", npcId: "elliott-sage", buildingId: "elliott-observatory", estimatedMinutes: 15,
    reward: { xp: 160, title: "Iniciado de Ondas" },
  },
  {
    id: "backtest-first-strategy", zoneId: "mechanic-lab",
    title: "Primer backtest",
    description: "Entendé por qué una estrategia debe probarse antes de usarse.",
    tradingLesson: "Sin datos, una estrategia es solo una opinión.",
    objective: "Revisar el laboratorio de backtesting.",
    steps: ["Visitar Backtesting Lab.", "Leer métricas básicas.", "Revisar winrate, RR y drawdown.", "Completar misión."],
    category: "backtesting", difficulty: "intermediate", npcId: "bot-mechanic", buildingId: "backtesting-lab", estimatedMinutes: 15,
    reward: { xp: 180, title: "Tester de Estrategias" },
  },
  {
    id: "prop-firm-rules-basic", zoneId: "risk-citadel",
    title: "Reglas de fondeo",
    description: "Aprendé reglas básicas de una prueba fondeada.",
    tradingLesson: "La pérdida máxima suele ser más importante que el objetivo de ganancia.",
    objective: "Revisar profit target, daily drawdown y max drawdown.",
    steps: ["Visitar Prop Firm Challenge Gate.", "Hablar con Prop Firm Coach.", "Leer reglas de drawdown.", "Completar misión."],
    category: "prop_firm", difficulty: "intermediate", npcId: "prop-firm-coach", buildingId: "prop-firm-challenge-gate", estimatedMinutes: 15,
    reward: { xp: 200, title: "Funded Challenger" },
  },
]

export function getQuestById(id: string): WorldQuest | undefined {
  return worldQuests.find((q) => q.id === id)
}

export function getQuestsByZone(zoneId: string): WorldQuest[] {
  return worldQuests.filter((q) => q.zoneId === zoneId)
}
