export type TradingLessonCategory = "basics" | "risk" | "liquidity" | "volume" | "wyckoff" | "elliott" | "macro" | "bots" | "backtesting" | "prop_firm" | "psychology" | "community"
export type TradingLessonDifficulty = "beginner" | "intermediate" | "advanced"

export interface TradingLesson {
  id: string
  title: string
  category: TradingLessonCategory
  difficulty: TradingLessonDifficulty
  zoneId?: string
  npcId?: string
  buildingId?: string
  questId?: string
  skillId?: string
  itemId?: string
  summary: string
  content: string[]
  keyTakeaways: string[]
  commonMistakes: string[]
  practicalExercise: string
  unlockRequirement?: { type: "quest_completed" | "skill_unlocked" | "item_owned" | "xp"; value: string | number }
  rewardXp?: number
}

export const tradingLessons: TradingLesson[] = [
  {
    id: "lesson-premarket-plan", title: "Checklist Pre-Market", category: "basics", difficulty: "beginner",
    zoneId: "central-hub", buildingId: "trading-academy", questId: "central-plan",
    summary: "Aprendé a preparar tu sesión antes de operar.",
    content: ["Antes de operar, un trader debe saber qué mercado mira, qué temporalidad usa y qué escenario invalida su idea.", "El plan evita operar por impulso. No predice el futuro, pero limita errores.", "Un checklist simple puede incluir tendencia, liquidez, eventos macro, niveles clave y riesgo máximo."],
    keyTakeaways: ["No operar sin plan.", "Definir invalidación antes de entrar.", "Revisar noticias y contexto."],
    commonMistakes: ["Entrar por FOMO.", "No saber dónde va el stop.", "Cambiar de plan en mitad de la operación."],
    practicalExercise: "Antes de tu próxima operación simulada, escribí tendencia, nivel clave, stop, target y riesgo máximo.",
    rewardXp: 20,
  },
  {
    id: "lesson-risk-basic", title: "Riesgo por Operación", category: "risk", difficulty: "beginner",
    zoneId: "risk-citadel", npcId: "risk-guardian", buildingId: "risk-temple", questId: "risk-defense", skillId: "risk-basic",
    summary: "Entendé por qué sobrevivir es más importante que acertar.",
    content: ["La gestión de riesgo define cuánto perdés cuando te equivocás.", "Un buen trader no controla el resultado de una operación, pero sí controla el tamaño de la pérdida.", "Arriesgar demasiado destruye la cuenta antes de que la estrategia tenga tiempo de funcionar."],
    keyTakeaways: ["Definir riesgo antes de entrar.", "No aumentar lote por emoción.", "Aceptar pérdidas pequeñas."],
    commonMistakes: ["Mover el stop.", "Promediar pérdidas sin plan.", "Arriesgar más después de perder."],
    practicalExercise: "Calculá cuánto representa 1% de una cuenta simulada y cuántas pérdidas seguidas podrías soportar.",
    unlockRequirement: { type: "quest_completed", value: "risk-defense" }, rewardXp: 30,
  },
  {
    id: "lesson-liquidity-stops", title: "Dónde vive la liquidez", category: "liquidity", difficulty: "beginner",
    zoneId: "liquidity-lake", npcId: "liquidity-scout", buildingId: "liquidity-scanner-tower", questId: "liquidity-detect", skillId: "liquidity-basic",
    summary: "Aprendé a pensar dónde están los stops del mercado.",
    content: ["La liquidez suele concentrarse en zonas obvias: máximos, mínimos, soportes, resistencias y rangos.", "El mercado muchas veces visita esas zonas antes de moverse en dirección real.", "No toda ruptura es continuación. A veces es un barrido para capturar órdenes."],
    keyTakeaways: ["Mirar máximos y mínimos recientes.", "Esperar reacción después del barrido.", "No perseguir la primera ruptura."],
    commonMistakes: ["Comprar justo encima de una resistencia barrida.", "Vender justo debajo de un soporte barrido.", "Confundir sweep con breakout real."],
    practicalExercise: "Marcá en un gráfico tres máximos/mínimos obvios y preguntate dónde estarían los stops.",
    unlockRequirement: { type: "quest_completed", value: "liquidity-detect" }, rewardXp: 30,
  },
  {
    id: "lesson-volume-breakout", title: "Ruptura con Volumen", category: "volume", difficulty: "beginner",
    zoneId: "candle-volcano", npcId: "volume-blacksmith", buildingId: "volume-forge", questId: "candle-confirm", skillId: "volume-basic",
    summary: "Aprendé a usar volumen para confirmar movimientos.",
    content: ["Una ruptura confiable suele mostrar expansión de rango, cierre con intención y volumen superior al promedio.", "Si el precio rompe y vuelve rápido al rango, puede ser una falsa ruptura.", "El volumen no garantiza éxito, pero ayuda a filtrar señales débiles."],
    keyTakeaways: ["No mirar solo la vela.", "Comparar volumen con contexto.", "Esperar cierre e intención."],
    commonMistakes: ["Entrar antes de confirmación.", "Ignorar volumen bajo.", "Confundir mecha con ruptura."],
    practicalExercise: "Buscá una ruptura pasada y compará volumen de la vela con las anteriores.",
    unlockRequirement: { type: "quest_completed", value: "candle-confirm" }, rewardXp: 30,
  },
  {
    id: "lesson-wyckoff-structure", title: "Estructura Wyckoff Inicial", category: "wyckoff", difficulty: "intermediate",
    zoneId: "liquidity-lake", npcId: "mentor-wyckoff", buildingId: "wyckoff-temple", questId: "wyckoff-structure-basic", skillId: "wyckoff-basic",
    summary: "Aprendé acumulación, distribución y trampas de rango.",
    content: ["Wyckoff ayuda a interpretar la intención detrás del rango.", "Una acumulación puede verse débil antes de subir; una distribución puede verse fuerte antes de caer.", "Springs y upthrusts son eventos donde el mercado barre extremos del rango."],
    keyTakeaways: ["Leer rango antes que vela aislada.", "Buscar absorción.", "Esperar confirmación después del evento."],
    commonMistakes: ["Llamar acumulación a cualquier lateralización.", "Entrar sin confirmación.", "Ignorar volumen y contexto."],
    practicalExercise: "Marcá un rango y ubicá posibles zonas de spring/upthrust.",
    unlockRequirement: { type: "quest_completed", value: "wyckoff-structure-basic" }, rewardXp: 40,
  },
  {
    id: "lesson-elliott-invalidation", title: "Elliott e Invalidación", category: "elliott", difficulty: "intermediate",
    zoneId: "macro-observatory", npcId: "elliott-sage", buildingId: "elliott-observatory", questId: "elliott-cycle-basic", skillId: "elliott-basic",
    summary: "Aprendé a usar ondas sin forzar conteos.",
    content: ["Elliott sirve para crear escenarios, no certezas.", "Todo conteo necesita un punto de invalidación.", "Si el precio invalida el conteo, el trader debe cambiar escenario, no justificarlo."],
    keyTakeaways: ["No forzar ondas.", "Definir invalidación.", "Usar Elliott junto con liquidez y riesgo."],
    commonMistakes: ["Cambiar conteo para tener razón.", "Operar conteos sin stop.", "Ignorar temporalidad mayor."],
    practicalExercise: "Hacé dos escenarios posibles y definí qué precio invalidaría cada uno.",
    unlockRequirement: { type: "quest_completed", value: "elliott-cycle-basic" }, rewardXp: 40,
  },
  {
    id: "lesson-macro-events", title: "Eventos Macro de Alto Impacto", category: "macro", difficulty: "beginner",
    zoneId: "macro-observatory", npcId: "macro-oracle", buildingId: "macro-radar-station", questId: "macro-context", skillId: "macro-basic",
    summary: "Aprendé por qué las noticias pueden cambiar el comportamiento del mercado.",
    content: ["Eventos como CPI, FOMC, tasas y empleo pueden aumentar volatilidad.", "Un setup técnico puede fallar si el mercado espera una noticia fuerte.", "No hace falta ser economista, pero sí saber cuándo el calendario puede afectar tu trade."],
    keyTakeaways: ["Revisar calendario.", "Evitar operar a ciegas en eventos.", "Entender contexto antes de ejecutar."],
    commonMistakes: ["Operar justo antes de CPI sin plan.", "Ignorar DXY o índices.", "Usar apalancamiento alto en noticias."],
    practicalExercise: "Revisá el calendario económico de la semana y marcá eventos de alto impacto.",
    unlockRequirement: { type: "quest_completed", value: "macro-context" }, rewardXp: 30,
  },
  {
    id: "lesson-bot-filters", title: "Filtros para Señales", category: "bots", difficulty: "intermediate",
    zoneId: "mechanic-lab", npcId: "bot-mechanic", buildingId: "bot-workshop", questId: "mechanic-signal", skillId: "bots-basic",
    summary: "Aprendé por qué una señal necesita filtros.",
    content: ["Un indicador puede dar señales buenas en tendencia y malas en rango.", "Los filtros reducen ruido: tendencia, volumen, volatilidad, horario y contexto.", "Automatizar sin probar solo acelera pérdidas."],
    keyTakeaways: ["Toda señal necesita contexto.", "Backtesting antes de usar.", "Evitar sobreoptimización."],
    commonMistakes: ["Creer que un indicador funciona siempre.", "No medir resultados.", "Cambiar parámetros después de cada pérdida."],
    practicalExercise: "Elegí una señal y anotá qué filtros podrían reducir entradas malas.",
    unlockRequirement: { type: "quest_completed", value: "mechanic-signal" }, rewardXp: 40,
  },
  {
    id: "lesson-backtesting-metrics", title: "Métricas Básicas de Backtesting", category: "backtesting", difficulty: "intermediate",
    zoneId: "mechanic-lab", buildingId: "backtesting-lab", questId: "backtest-first-strategy", skillId: "backtest-basic",
    summary: "Aprendé qué medir antes de confiar en una estrategia.",
    content: ["Winrate solo no alcanza. Importan RR, drawdown, profit factor y cantidad de muestras.", "Una estrategia con bajo winrate puede ser rentable si el RR es alto.", "Una muestra pequeña puede engañar."],
    keyTakeaways: ["Medir expectativa.", "Mirar drawdown.", "Usar suficientes operaciones."],
    commonMistakes: ["Confiar en 10 trades.", "Mirar solo ganancia final.", "Ignorar rachas de pérdida."],
    practicalExercise: "Simulá 20 operaciones y calculá winrate, RR promedio y pérdida máxima.",
    unlockRequirement: { type: "quest_completed", value: "backtest-first-strategy" }, rewardXp: 40,
  },
  {
    id: "lesson-prop-firm-rules", title: "Reglas de Prop Firm", category: "prop_firm", difficulty: "intermediate",
    zoneId: "risk-citadel", npcId: "prop-firm-coach", buildingId: "prop-firm-challenge-gate", questId: "prop-firm-rules-basic", skillId: "prop-basic",
    summary: "Aprendé a pensar una prueba fondeada como un sistema de supervivencia.",
    content: ["En una prop firm, no basta con llegar al profit target.", "La pérdida diaria y pérdida máxima condicionan el tamaño de posición.", "La consistencia suele importar más que una operación grande."],
    keyTakeaways: ["Primero proteger drawdown.", "Calcular riesgo por operación.", "Evitar depender de un solo trade."],
    commonMistakes: ["Arriesgar mucho para pasar rápido.", "Ignorar reglas de consistencia.", "No adaptar tamaño de posición."],
    practicalExercise: "Definí un plan de riesgo para una cuenta hipotética con 5% de pérdida máxima.",
    unlockRequirement: { type: "quest_completed", value: "prop-firm-rules-basic" }, rewardXp: 50,
  },
]
