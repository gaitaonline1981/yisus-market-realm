export type TradingSkillBranchId =
  | "risk" | "liquidity" | "volume" | "wyckoff" | "elliott"
  | "macro" | "bots" | "backtesting" | "prop_firm" | "psychology"

export type TradingSkillStatus = "locked" | "available" | "unlocked"

export interface TradingSkillNode {
  id: string
  branchId: TradingSkillBranchId
  name: string
  description: string
  tradingConcept: string
  gameplayEffect: string
  requiredXp?: number
  requiredQuestIds?: string[]
  unlocks?: string[]
  tier: 1 | 2 | 3 | 4
  priority: "low" | "medium" | "high"
}

export interface TradingSkillBranch {
  id: TradingSkillBranchId
  name: string
  description: string
  color: string
  iconLabel: string
  tradingFocus: string
}

export const tradingSkillBranches: TradingSkillBranch[] = [
  { id: "risk", name: "Gestión de Riesgo", description: "Control de pérdida, drawdown, RR y supervivencia.", color: "#FACC15", iconLabel: "RISK", tradingFocus: "Riesgo por operación, pérdida máxima, RR y disciplina." },
  { id: "liquidity", name: "Liquidez", description: "Lectura de stops, pools, barridos e inducement.", color: "#22D3EE", iconLabel: "LIQ", tradingFocus: "Stop hunts, sweeps, máximos/mínimos y trampas." },
  { id: "volume", name: "Volumen", description: "Confirmación de rupturas, presión y participación.", color: "#EF4444", iconLabel: "VOL", tradingFocus: "Volumen, momentum, order flow y confirmación." },
  { id: "wyckoff", name: "Wyckoff", description: "Acumulación, distribución, springs y upthrusts.", color: "#A78BFA", iconLabel: "WCK", tradingFocus: "Estructura de mercado y comportamiento institucional." },
  { id: "elliott", name: "Elliott Wave", description: "Ciclos, impulsos, correcciones e invalidación.", color: "#C084FC", iconLabel: "EWT", tradingFocus: "Lectura de ondas, escenarios e invalidaciones." },
  { id: "macro", name: "Macro", description: "Contexto global, tasas, DXY, índices y eventos.", color: "#60A5FA", iconLabel: "MAC", tradingFocus: "FOMC, CPI, dólar, índices, tasas y correlaciones." },
  { id: "bots", name: "Bots e Indicadores", description: "Sistemas, filtros, alertas y automatización.", color: "#2DD4BF", iconLabel: "BOT", tradingFocus: "Indicadores, señales, filtros y automatización." },
  { id: "backtesting", name: "Backtesting", description: "Métricas, winrate, RR, drawdown y consistencia.", color: "#14B8A6", iconLabel: "TEST", tradingFocus: "Validación histórica y métricas de estrategia." },
  { id: "prop_firm", name: "Prop Firms", description: "Reglas de fondeo, profit target, drawdown y consistencia.", color: "#F59E0B", iconLabel: "PROP", tradingFocus: "FTMO, desafíos fondeados, reglas y límites." },
  { id: "psychology", name: "Psicología Trader", description: "Control emocional, paciencia, FOMO y disciplina.", color: "#EC4899", iconLabel: "PSY", tradingFocus: "Mentalidad, proceso, paciencia y gestión emocional." },
]

export const tradingSkillNodes: TradingSkillNode[] = [
  // Risk
  { id: "risk-basic", branchId: "risk", name: "Riesgo básico", description: "Aprendé a definir cuánto podés perder antes de abrir una operación.", tradingConcept: "Riesgo por operación.", gameplayEffect: "Desbloquea checklist de riesgo básico.", tier: 1, requiredXp: 0, requiredQuestIds: ["risk-defense"], priority: "high" },
  { id: "risk-rr", branchId: "risk", name: "Relación Riesgo/Beneficio", description: "Entendé cómo evaluar si una operación compensa el riesgo.", tradingConcept: "RR, target, stop y expectativa.", gameplayEffect: "Desbloquea misiones de validación RR.", tier: 2, requiredXp: 150, requiredQuestIds: ["risk-defense"], priority: "high" },
  { id: "risk-drawdown", branchId: "risk", name: "Control de Drawdown", description: "Aprendé a limitar pérdidas acumuladas.", tradingConcept: "Daily drawdown y max drawdown.", gameplayEffect: "Desbloquea reglas de protección de cuenta.", tier: 3, requiredXp: 300, requiredQuestIds: ["prop-firm-rules-basic"], priority: "medium" },
  // Liquidity
  { id: "liquidity-basic", branchId: "liquidity", name: "Liquidez básica", description: "Aprendé dónde se suelen ubicar stops.", tradingConcept: "Máximos, mínimos, soportes y resistencias obvias.", gameplayEffect: "Desbloquea lectura básica de Liquidity Lake.", tier: 1, requiredXp: 0, requiredQuestIds: ["liquidity-detect"], priority: "high" },
  { id: "liquidity-sweeps", branchId: "liquidity", name: "Barridos de liquidez", description: "Detectá sweeps antes de una reacción.", tradingConcept: "Stop hunt y sweep.", gameplayEffect: "Desbloquea misiones de barrido.", tier: 2, requiredXp: 150, requiredQuestIds: ["liquidity-detect"], priority: "high" },
  { id: "liquidity-inducement", branchId: "liquidity", name: "Inducement", description: "Entendé cómo el precio induce entradas antes del movimiento real.", tradingConcept: "Manipulación y trampa de entrada.", gameplayEffect: "Desbloquea misiones avanzadas de liquidez.", tier: 3, requiredXp: 350, requiredQuestIds: ["wyckoff-structure-basic"], priority: "medium" },
  // Volume
  { id: "volume-basic", branchId: "volume", name: "Volumen básico", description: "Usá volumen para confirmar o sospechar de un movimiento.", tradingConcept: "Volumen relativo y confirmación.", gameplayEffect: "Desbloquea lectura básica de Candle Volcano.", tier: 1, requiredXp: 0, requiredQuestIds: ["candle-confirm"], priority: "high" },
  { id: "volume-breakout", branchId: "volume", name: "Ruptura con volumen", description: "Diferenciá ruptura real de falsa ruptura.", tradingConcept: "Breakout, cierre e intención.", gameplayEffect: "Desbloquea desafíos de ruptura.", tier: 2, requiredXp: 180, requiredQuestIds: ["candle-confirm"], priority: "high" },
  { id: "volume-pressure", branchId: "volume", name: "Presión compradora/vendedora", description: "Interpretá presión direccional en zonas clave.", tradingConcept: "Order flow conceptual.", gameplayEffect: "Desbloquea misiones de momentum.", tier: 3, requiredXp: 400, requiredQuestIds: ["candle-confirm"], priority: "medium" },
  // Wyckoff
  { id: "wyckoff-basic", branchId: "wyckoff", name: "Fases Wyckoff", description: "Aprendé acumulación, distribución y rango.", tradingConcept: "Fases de mercado.", gameplayEffect: "Desbloquea Wyckoff Temple.", tier: 1, requiredXp: 100, requiredQuestIds: ["wyckoff-structure-basic"], priority: "high" },
  { id: "wyckoff-spring", branchId: "wyckoff", name: "Spring y Upthrust", description: "Detectá trampas en extremos de rango.", tradingConcept: "Spring, UTAD, upthrust.", gameplayEffect: "Desbloquea misiones de trampa.", tier: 2, requiredXp: 250, requiredQuestIds: ["wyckoff-structure-basic"], priority: "medium" },
  // Elliott
  { id: "elliott-basic", branchId: "elliott", name: "Ciclo básico Elliott", description: "Identificá impulso, corrección e invalidación.", tradingConcept: "Ondas y ciclos.", gameplayEffect: "Desbloquea Elliott Observatory.", tier: 1, requiredXp: 100, requiredQuestIds: ["elliott-cycle-basic"], priority: "high" },
  { id: "elliott-invalidation", branchId: "elliott", name: "Invalidación", description: "Aprendé cuándo un conteo deja de tener sentido.", tradingConcept: "Escenarios e invalidación.", gameplayEffect: "Desbloquea misiones de escenario.", tier: 2, requiredXp: 250, requiredQuestIds: ["elliott-cycle-basic"], priority: "medium" },
  // Macro
  { id: "macro-basic", branchId: "macro", name: "Contexto macro básico", description: "Revisá eventos antes de operar.", tradingConcept: "Calendario económico, DXY, índices.", gameplayEffect: "Desbloquea checklist macro.", tier: 1, requiredXp: 0, requiredQuestIds: ["macro-context"], priority: "high" },
  { id: "macro-events", branchId: "macro", name: "Eventos de alto impacto", description: "Identificá cuándo el mercado puede volverse peligroso.", tradingConcept: "CPI, FOMC, tasas y empleo.", gameplayEffect: "Desbloquea alertas macro futuras.", tier: 2, requiredXp: 200, requiredQuestIds: ["macro-context"], priority: "medium" },
  // Bots
  { id: "bots-basic", branchId: "bots", name: "Señales con filtros", description: "Entendé por qué una señal necesita contexto.", tradingConcept: "Indicadores, filtros y falsas señales.", gameplayEffect: "Desbloquea Bot Workshop.", tier: 1, requiredXp: 100, requiredQuestIds: ["mechanic-signal"], priority: "high" },
  { id: "bots-optimization", branchId: "bots", name: "Optimización de sistema", description: "Ajustá reglas sin sobreoptimizar.", tradingConcept: "Parámetros, ruido y robustez.", gameplayEffect: "Desbloquea misiones de optimización.", tier: 2, requiredXp: 300, requiredQuestIds: ["mechanic-signal"], priority: "medium" },
  // Backtesting
  { id: "backtest-basic", branchId: "backtesting", name: "Backtesting básico", description: "Validá una idea con datos antes de usarla.", tradingConcept: "Winrate, RR, muestra y drawdown.", gameplayEffect: "Desbloquea Backtesting Lab.", tier: 1, requiredXp: 150, requiredQuestIds: ["backtest-first-strategy"], priority: "high" },
  { id: "backtest-metrics", branchId: "backtesting", name: "Métricas de estrategia", description: "Interpretá resultados de una estrategia.", tradingConcept: "Profit factor, expectativa y drawdown.", gameplayEffect: "Desbloquea reportes futuros.", tier: 2, requiredXp: 350, requiredQuestIds: ["backtest-first-strategy"], priority: "medium" },
  // Prop Firm
  { id: "prop-basic", branchId: "prop_firm", name: "Reglas de fondeo", description: "Entendé reglas básicas de prop firms.", tradingConcept: "Profit target, daily loss y max drawdown.", gameplayEffect: "Desbloquea Prop Firm Challenge Gate.", tier: 1, requiredXp: 200, requiredQuestIds: ["prop-firm-rules-basic"], priority: "high" },
  { id: "prop-consistency", branchId: "prop_firm", name: "Consistencia", description: "Evitá depender de una sola operación grande.", tradingConcept: "Reglas de consistencia y gestión de serie.", gameplayEffect: "Desbloquea desafíos avanzados.", tier: 2, requiredXp: 450, requiredQuestIds: ["prop-firm-rules-basic"], priority: "medium" },
  // Psychology
  { id: "psychology-fomo", branchId: "psychology", name: "Control de FOMO", description: "Aprendé a no perseguir velas.", tradingConcept: "Paciencia, impulsividad y proceso.", gameplayEffect: "Desbloquea recordatorios de disciplina.", tier: 1, requiredXp: 100, requiredQuestIds: ["central-plan"], priority: "high" },
  { id: "psychology-discipline", branchId: "psychology", name: "Disciplina operativa", description: "Seguí el plan incluso cuando el mercado tienta.", tradingConcept: "Rutina, reglas y control emocional.", gameplayEffect: "Desbloquea títulos de disciplina.", tier: 2, requiredXp: 300, requiredQuestIds: ["risk-defense"], priority: "medium" },
]
