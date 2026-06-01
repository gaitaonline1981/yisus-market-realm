export type TradingAchievementCategory =
  | "progress" | "risk" | "liquidity" | "volume" | "wyckoff" | "elliott"
  | "macro" | "bots" | "backtesting" | "prop_firm" | "psychology" | "exploration" | "community"

export type TradingAchievementRarity = "common" | "rare" | "epic" | "legendary" | "institutional"

export interface TradingAchievementRequirement {
  type: "xp" | "quest_completed" | "quests_completed_count" | "skill_unlocked"
    | "skills_unlocked_count" | "item_owned" | "items_owned_count"
    | "rank_reached" | "zone_active" | "title_unlocked"
  value: string | number
}

export interface TradingAchievement {
  id: string
  name: string
  category: TradingAchievementCategory
  rarity: TradingAchievementRarity
  description: string
  tradingMeaning: string
  requirement: TradingAchievementRequirement
  rewardText: string
  color: string
}

export const tradingAchievements: TradingAchievement[] = [
  { id: "first-plan", name: "Primer Plan Trader", category: "progress", rarity: "common",
    description: "Completaste tu primera preparación dentro del Market Realm.",
    tradingMeaning: "Todo trader serio empieza con un plan antes de operar.",
    requirement: { type: "quest_completed", value: "central-plan" }, rewardText: "Desbloquea mentalidad de planificación.", color: "#38BDF8" },
  { id: "risk-shield", name: "Escudo de Riesgo", category: "risk", rarity: "rare",
    description: "Completaste una misión de protección de capital.",
    tradingMeaning: "Sobrevivir es más importante que acertar una operación.",
    requirement: { type: "quest_completed", value: "risk-defense" }, rewardText: "Badge de disciplina y control de pérdida.", color: "#FACC15" },
  { id: "liquidity-hunter-initiate", name: "Iniciado Cazador de Liquidez", category: "liquidity", rarity: "rare",
    description: "Completaste tu primera lectura de liquidez.",
    tradingMeaning: "La liquidez revela dónde puede buscar combustible el mercado.",
    requirement: { type: "quest_completed", value: "liquidity-detect" }, rewardText: "Badge de lectura de stops.", color: "#22D3EE" },
  { id: "momentum-reader", name: "Lector de Momentum", category: "volume", rarity: "rare",
    description: "Confirmaste una ruptura con lógica de volumen.",
    tradingMeaning: "Una ruptura sin volumen puede ser una trampa.",
    requirement: { type: "quest_completed", value: "candle-confirm" }, rewardText: "Badge de momentum.", color: "#F97316" },
  { id: "macro-aware", name: "Consciente del Contexto Macro", category: "macro", rarity: "common",
    description: "Revisaste contexto macro antes de operar.",
    tradingMeaning: "El contexto puede invalidar una señal técnica aislada.",
    requirement: { type: "quest_completed", value: "macro-context" }, rewardText: "Checklist macro inicial.", color: "#60A5FA" },
  { id: "wyckoff-student", name: "Estudiante Wyckoff", category: "wyckoff", rarity: "epic",
    description: "Aprendiste estructura básica de acumulación y distribución.",
    tradingMeaning: "La estructura revela intención institucional.",
    requirement: { type: "quest_completed", value: "wyckoff-structure-basic" }, rewardText: "Reconocimiento de estructura de mercado.", color: "#A78BFA" },
  { id: "wave-initiate", name: "Iniciado de Ondas", category: "elliott", rarity: "epic",
    description: "Completaste tu primera misión de ciclos Elliott.",
    tradingMeaning: "Las ondas ayudan a pensar escenarios e invalidaciones.",
    requirement: { type: "quest_completed", value: "elliott-cycle-basic" }, rewardText: "Badge de ciclos.", color: "#C084FC" },
  { id: "first-backtest", name: "Primer Backtest", category: "backtesting", rarity: "epic",
    description: "Entendiste que una estrategia necesita datos.",
    tradingMeaning: "Sin backtesting, una estrategia es solo una opinión.",
    requirement: { type: "quest_completed", value: "backtest-first-strategy" }, rewardText: "Plantilla mental de validación.", color: "#14B8A6" },
  { id: "funded-mindset", name: "Mentalidad Fondeada", category: "prop_firm", rarity: "epic",
    description: "Aprendiste reglas básicas de una prueba fondeada.",
    tradingMeaning: "El drawdown puede ser más importante que el profit target.",
    requirement: { type: "quest_completed", value: "prop-firm-rules-basic" }, rewardText: "Badge de desafío prop firm.", color: "#F59E0B" },
  { id: "xp-100", name: "Primeros 100 XP", category: "progress", rarity: "common",
    description: "Alcanzaste 100 XP dentro del Market Realm.",
    tradingMeaning: "El progreso trader se construye con repetición y proceso.",
    requirement: { type: "xp", value: 100 }, rewardText: "Rango de aprendiz en camino.", color: "#38BDF8" },
  { id: "xp-500", name: "Trader en Desarrollo", category: "progress", rarity: "rare",
    description: "Alcanzaste 500 XP.",
    tradingMeaning: "Ya recorriste varias áreas de aprendizaje.",
    requirement: { type: "xp", value: 500 }, rewardText: "Reconocimiento de constancia.", color: "#22D3EE" },
  { id: "xp-1000", name: "Operador Consistente", category: "progress", rarity: "epic",
    description: "Alcanzaste 1000 XP.",
    tradingMeaning: "La consistencia supera a la emoción.",
    requirement: { type: "xp", value: 1000 }, rewardText: "Badge de constancia.", color: "#A78BFA" },
  { id: "three-quests", name: "Tres Misiones Completadas", category: "progress", rarity: "rare",
    description: "Completaste 3 misiones de trading.",
    tradingMeaning: "Aprender trading requiere pasar por varias dimensiones del mercado.",
    requirement: { type: "quests_completed_count", value: 3 }, rewardText: "Progreso educativo confirmado.", color: "#2DD4BF" },
  { id: "six-quests", name: "Explorador del Market Realm", category: "exploration", rarity: "epic",
    description: "Completaste 6 misiones.",
    tradingMeaning: "Ya recorriste las bases principales del mundo trader.",
    requirement: { type: "quests_completed_count", value: 6 }, rewardText: "Badge de explorador trader.", color: "#EC4899" },
  { id: "first-skill", name: "Primera Habilidad Trader", category: "progress", rarity: "common",
    description: "Desbloqueaste tu primera habilidad del Skill Tree.",
    tradingMeaning: "Convertiste una lección en competencia.",
    requirement: { type: "skills_unlocked_count", value: 1 }, rewardText: "Inicio del camino de especialización.", color: "#38BDF8" },
  { id: "five-skills", name: "Especialista en Formación", category: "progress", rarity: "epic",
    description: "Desbloqueaste 5 habilidades.",
    tradingMeaning: "Tu conocimiento empieza a tomar forma de sistema.",
    requirement: { type: "skills_unlocked_count", value: 5 }, rewardText: "Badge de especialista.", color: "#A78BFA" },
  { id: "first-item", name: "Primera Recompensa Trader", category: "progress", rarity: "common",
    description: "Obtuviste tu primer item del Inventario Trader.",
    tradingMeaning: "Las recompensas representan aprendizajes y herramientas simbólicas.",
    requirement: { type: "items_owned_count", value: 1 }, rewardText: "Inventario iniciado.", color: "#FACC15" },
  { id: "five-items", name: "Coleccionista de Herramientas", category: "bots", rarity: "rare",
    description: "Obtuviste 5 items de trading.",
    tradingMeaning: "Un trader construye su caja de herramientas con experiencia.",
    requirement: { type: "items_owned_count", value: 5 }, rewardText: "Badge de herramientas.", color: "#2DD4BF" },
  { id: "market-reader-rank", name: "Lector de Mercado", category: "progress", rarity: "epic",
    description: "Alcanzaste el rango Lector de Mercado.",
    tradingMeaning: "Empezás a conectar zonas, contexto y estructura.",
    requirement: { type: "rank_reached", value: "market_reader" }, rewardText: "Rango trader reconocido.", color: "#22D3EE" },
  { id: "risk-operator-rank", name: "Operador de Riesgo", category: "risk", rarity: "epic",
    description: "Alcanzaste el rango Operador de Riesgo.",
    tradingMeaning: "Tu progreso prioriza supervivencia y disciplina.",
    requirement: { type: "rank_reached", value: "risk_operator" }, rewardText: "Reputación de riesgo.", color: "#FACC15" },
]
