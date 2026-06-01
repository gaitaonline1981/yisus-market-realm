export type TradingItemType = "badge" | "title" | "tool" | "module" | "key" | "report" | "blueprint" | "cosmetic" | "access"
export type TradingItemRarity = "common" | "rare" | "epic" | "legendary" | "institutional"

export interface TradingItem {
  id: string
  name: string
  type: TradingItemType
  rarity: TradingItemRarity
  description: string
  tradingConcept: string
  gameplayUse: string
  source: string
  color: string
}

export const tradingItems: TradingItem[] = [
  { id: "risk-shield-badge", name: "Badge Escudo de Riesgo", type: "badge", rarity: "rare", description: "Insignia obtenida por completar misiones de gestión de riesgo.", tradingConcept: "Gestión de riesgo, drawdown y disciplina.", gameplayUse: "Representa dominio inicial del control de pérdidas.", source: "risk-defense", color: "#FACC15" },
  { id: "liquidity-map-fragment", name: "Fragmento de Mapa de Liquidez", type: "tool", rarity: "rare", description: "Fragmento simbólico para identificar zonas donde podrían estar los stops.", tradingConcept: "Liquidez, stop hunts y pools.", gameplayUse: "Futuro acceso a herramientas de lectura de liquidez.", source: "liquidity-detect", color: "#22D3EE" },
  { id: "momentum-flame-badge", name: "Badge Llama de Momentum", type: "badge", rarity: "rare", description: "Insignia por comprender rupturas y confirmación con volumen.", tradingConcept: "Momentum, volumen y breakouts.", gameplayUse: "Representa lectura inicial de rupturas.", source: "candle-confirm", color: "#F97316" },
  { id: "macro-oracle-note", name: "Nota del Oráculo Macro", type: "report", rarity: "common", description: "Documento simbólico con checklist macro básico.", tradingConcept: "DXY, tasas, índices, eventos y contexto.", gameplayUse: "Futuro módulo de checklist macro.", source: "macro-context", color: "#60A5FA" },
  { id: "bot-filter-chip", name: "Chip de Filtro de Bot", type: "tool", rarity: "epic", description: "Componente técnico para reducir señales falsas.", tradingConcept: "Bots, indicadores, filtros y automatización.", gameplayUse: "Futuro componente para sistemas de señales.", source: "mechanic-signal", color: "#2DD4BF" },
  { id: "wyckoff-structure-scroll", name: "Pergamino de Estructura Wyckoff", type: "module", rarity: "epic", description: "Módulo educativo sobre acumulación, distribución y trampas.", tradingConcept: "Wyckoff, estructura y comportamiento institucional.", gameplayUse: "Desbloquea contenido avanzado de estructura.", source: "wyckoff-structure-basic", color: "#A78BFA" },
  { id: "elliott-cycle-compass", name: "Compás de Ciclos Elliott", type: "tool", rarity: "epic", description: "Herramienta simbólica para pensar impulsos, correcciones e invalidación.", tradingConcept: "Elliott Wave, ciclos y escenarios.", gameplayUse: "Futuro apoyo visual para misiones de ondas.", source: "elliott-cycle-basic", color: "#C084FC" },
  { id: "backtest-report-template", name: "Plantilla de Reporte Backtest", type: "report", rarity: "rare", description: "Plantilla simbólica para medir winrate, RR, drawdown y expectativa.", tradingConcept: "Backtesting, métricas y consistencia.", gameplayUse: "Futuro módulo de reportes de estrategia.", source: "backtest-first-strategy", color: "#14B8A6" },
  { id: "prop-firm-rulebook", name: "Manual de Reglas Prop Firm", type: "module", rarity: "epic", description: "Manual simbólico de profit target, daily loss, max drawdown y consistencia.", tradingConcept: "Prop firms, FTMO, drawdown y consistencia.", gameplayUse: "Desbloquea desafíos simulados de fondeo.", source: "prop-firm-rules-basic", color: "#F59E0B" },
  { id: "trader-discipline-title", name: "Título Disciplina Trader", type: "title", rarity: "rare", description: "Título simbólico para traders que priorizan proceso sobre impulsividad.", tradingConcept: "Psicología trader, paciencia y control emocional.", gameplayUse: "Título equipable futuro.", source: "central-plan", color: "#EC4899" },
  { id: "market-checklist-module", name: "Módulo Checklist Pre-Market", type: "module", rarity: "common", description: "Checklist previo antes de operar.", tradingConcept: "Rutina, planificación y preparación.", gameplayUse: "Futuro panel de rutina diaria.", source: "central-plan", color: "#38BDF8" },
  { id: "funded-challenger-access", name: "Acceso Funded Challenger", type: "access", rarity: "legendary", description: "Pase simbólico para desafíos avanzados de prop firm.", tradingConcept: "Fondeo, reglas, consistencia y riesgo.", gameplayUse: "Futuro acceso a retos avanzados.", source: "prop-firm-rules-basic", color: "#FBBF24" },
]
