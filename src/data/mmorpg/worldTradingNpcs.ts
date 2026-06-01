export type TradingNpcStatus = "placeholder" | "prototype" | "future-glb"

export type TradingNpcType =
  | "wyckoff-mentor" | "elliott-sage" | "risk-guardian" | "liquidity-scout"
  | "volume-blacksmith" | "macro-oracle" | "bot-mechanic" | "guild-recruiter"
  | "prop-firm-coach" | "market-news-agent"

export interface TradingNpc {
  id: string
  name: string
  title: string
  zoneId: string
  buildingId?: string
  position: [number, number, number]
  scale: [number, number, number]
  color: string
  accentColor: string
  npcType: TradingNpcType
  description: string
  tradingConcept: string
  gameplayFunction: string
  missionTypes: string[]
  starterDialogue: string
  rewardFocus: string
  status: TradingNpcStatus
  priority: "low" | "medium" | "high"
}

export const tradingNpcs: TradingNpc[] = [
  {
    id: "mentor-wyckoff", name: "Mentor Wyckoff", title: "Maestro de estructura de mercado",
    zoneId: "liquidity-lake", buildingId: "wyckoff-temple",
    position: [-4.2, 0, -3.25], scale: [0.8, 0.8, 0.8],
    color: "#312E81", accentColor: "#A78BFA", npcType: "wyckoff-mentor",
    description: "Mentor especializado en acumulación, distribución, springs, upthrusts y lectura de estructura.",
    tradingConcept: "Wyckoff, estructura de mercado, acumulación y distribución.",
    gameplayFunction: "Entrega misiones de lectura estructural y validación de fases.",
    missionTypes: ["Wyckoff Analysis", "Market Structure", "Liquidity Trap"],
    starterDialogue: "Antes de entrar al mercado, primero entendé quién está acumulando y quién está distribuyendo.",
    rewardFocus: "Títulos Wyckoff, XP estructural y acceso a misiones avanzadas.",
    status: "placeholder", priority: "high",
  },
  {
    id: "elliott-sage", name: "Elliott Sage", title: "Sabio de ondas y ciclos",
    zoneId: "macro-observatory", buildingId: "elliott-observatory",
    position: [-4.2, 0, 4.1], scale: [0.8, 0.8, 0.8],
    color: "#581C87", accentColor: "#C084FC", npcType: "elliott-sage",
    description: "Analista de ondas, impulsos, correcciones y fractales del mercado.",
    tradingConcept: "Elliott Wave, ciclos, impulsos, correcciones y fractalidad.",
    gameplayFunction: "Enseña conteos de ondas y contexto de ciclo.",
    missionTypes: ["Elliott Wave Analysis", "Cycle Mapping", "Impulse Correction"],
    starterDialogue: "El precio no camina en línea recta; respira en ondas, impulsos y correcciones.",
    rewardFocus: "XP de ciclos, título Wave Reader y misiones de conteo.",
    status: "placeholder", priority: "medium",
  },
  {
    id: "risk-guardian", name: "Risk Guardian", title: "Guardián del capital",
    zoneId: "risk-citadel", buildingId: "risk-temple",
    position: [-1.4, 0, 7.75], scale: [0.9, 0.9, 0.9],
    color: "#422006", accentColor: "#FACC15", npcType: "risk-guardian",
    description: "Protector del capital, drawdown y disciplina emocional.",
    tradingConcept: "Gestión de riesgo, RR, drawdown, stop loss y supervivencia.",
    gameplayFunction: "Bloquea misiones avanzadas si el riesgo no está configurado.",
    missionTypes: ["Risk Check", "Drawdown Defense", "RR Validation"],
    starterDialogue: "El trader que sobrevive puede volver mañana. El que arriesga de más queda fuera del juego.",
    rewardFocus: "Títulos de disciplina, XP de riesgo y límites de pérdida desbloqueados.",
    status: "placeholder", priority: "high",
  },
  {
    id: "liquidity-scout", name: "Liquidity Scout", title: "Explorador de stops y barridos",
    zoneId: "liquidity-lake", buildingId: "liquidity-scanner-tower",
    position: [-5.8, 0, -1.25], scale: [0.75, 0.75, 0.75],
    color: "#0F172A", accentColor: "#22D3EE", npcType: "liquidity-scout",
    description: "Rastreador de pools de liquidez, stops y zonas de manipulación.",
    tradingConcept: "Liquidez, stop hunts, sweeps, inducement y manipulación.",
    gameplayFunction: "Marca zonas donde puede ocurrir barrido antes de entrada.",
    missionTypes: ["Liquidity Hunt", "Stop Sweep", "Inducement Detection"],
    starterDialogue: "Donde todos ponen su stop, el mercado suele ir a buscar combustible.",
    rewardFocus: "Badges de liquidez, XP de lectura y acceso a mapas de stops.",
    status: "placeholder", priority: "high",
  },
  {
    id: "volume-blacksmith", name: "Volume Blacksmith", title: "Forjador de confirmaciones",
    zoneId: "candle-volcano", buildingId: "volume-forge",
    position: [4.2, 0, -3.25], scale: [0.9, 0.9, 0.9],
    color: "#1F2937", accentColor: "#EF4444", npcType: "volume-blacksmith",
    description: "Maestro de volumen, presión, breakouts y confirmaciones.",
    tradingConcept: "Volumen, order flow, momentum, presión compradora/vendedora.",
    gameplayFunction: "Enseña a validar rupturas y evitar falsas señales.",
    missionTypes: ["Volume Reading", "Breakout Confirmation", "Momentum Validation"],
    starterDialogue: "Una ruptura sin volumen es solo ruido con disfraz de oportunidad.",
    rewardFocus: "XP de volumen, títulos de momentum y herramientas de confirmación.",
    status: "placeholder", priority: "high",
  },
  {
    id: "macro-oracle", name: "Macro Oracle", title: "Oráculo del contexto global",
    zoneId: "macro-observatory", buildingId: "macro-radar-station",
    position: [-5.8, 0, 5.75], scale: [0.8, 0.8, 0.8],
    color: "#172554", accentColor: "#60A5FA", npcType: "macro-oracle",
    description: "Interpreta tasas, dólar, índices, inflación y eventos macro.",
    tradingConcept: "Macro, DXY, índices, tasas, CPI, FOMC y correlaciones.",
    gameplayFunction: "Entrega contexto previo antes de operar zonas técnicas.",
    missionTypes: ["Macro Context", "News Filter", "Correlation Check"],
    starterDialogue: "Una buena entrada técnica puede fallar si el contexto macro está en contra.",
    rewardFocus: "XP macro, checklist fundamental y títulos de observador.",
    status: "placeholder", priority: "high",
  },
  {
    id: "bot-mechanic", name: "Bot Mechanic", title: "Mecánico de señales y sistemas",
    zoneId: "mechanic-lab", buildingId: "bot-workshop",
    position: [5.8, 0, 5.75], scale: [0.8, 0.8, 0.8],
    color: "#134E4A", accentColor: "#2DD4BF", npcType: "bot-mechanic",
    description: "Especialista en bots, indicadores, backtesting y dashboards.",
    tradingConcept: "Automatización, indicadores, filtros, backtesting y señales.",
    gameplayFunction: "Da misiones para calibrar estrategias y reducir falsas señales.",
    missionTypes: ["Bot Calibration", "Backtest Mission", "Signal Optimization"],
    starterDialogue: "Una señal sin filtro puede hacer más daño que no operar.",
    rewardFocus: "XP técnico, piezas de bot, badges de consistencia.",
    status: "placeholder", priority: "high",
  },
  {
    id: "guild-recruiter", name: "Guild Recruiter", title: "Reclutador de traders",
    zoneId: "central-hub", buildingId: "trader-guild-house",
    position: [0, 0, 4.15], scale: [0.8, 0.8, 0.8],
    color: "#312E81", accentColor: "#EC4899", npcType: "guild-recruiter",
    description: "Conecta traders, clanes, eventos, comunidad y reputación.",
    tradingConcept: "Comunidad, mentoría, torneos, reputación y colaboración.",
    gameplayFunction: "Futuro acceso a guilds, eventos y rankings comunitarios.",
    missionTypes: ["Community Event", "Guild Mission", "Reputation Task"],
    starterDialogue: "Ningún trader mejora solo; la comunidad acelera la curva de aprendizaje.",
    rewardFocus: "Reputación, badges sociales, acceso a eventos y roles.",
    status: "placeholder", priority: "medium",
  },
  {
    id: "prop-firm-coach", name: "Prop Firm Coach", title: "Instructor de desafíos fondeados",
    zoneId: "risk-citadel", buildingId: "prop-firm-challenge-gate",
    position: [1.4, 0, 7.75], scale: [0.85, 0.85, 0.85],
    color: "#111827", accentColor: "#F59E0B", npcType: "prop-firm-coach",
    description: "Instructor de reglas tipo prop firm: profit target, pérdida diaria, pérdida máxima y consistencia.",
    tradingConcept: "Prop firms, FTMO, drawdown, consistencia, profit target.",
    gameplayFunction: "Activa desafíos simulados de fondeo.",
    missionTypes: ["Prop Firm Challenge", "Consistency Rule", "Drawdown Limit"],
    starterDialogue: "Pasar una prueba no es ganar una operación; es sobrevivir a una serie completa.",
    rewardFocus: "Títulos de funded challenger, XP de consistencia y acceso a retos.",
    status: "placeholder", priority: "high",
  },
  {
    id: "market-news-agent", name: "Market News Agent", title: "Operador de noticias del reino",
    zoneId: "central-hub", buildingId: "market-terminal",
    position: [1.8, 0, 2.75], scale: [0.75, 0.75, 0.75],
    color: "#111827", accentColor: "#22D3EE", npcType: "market-news-agent",
    description: "Agente encargado de alertas, noticias y calendario económico.",
    tradingConcept: "Noticias, calendario económico, volatilidad de eventos y filtros.",
    gameplayFunction: "Futuro panel de eventos macro y alertas de mercado.",
    missionTypes: ["Daily Market Check", "News Filter", "Event Risk"],
    starterDialogue: "Antes de abrir una operación, revisá si el mercado está esperando una noticia.",
    rewardFocus: "XP diario, alertas desbloqueadas y checklist de eventos.",
    status: "placeholder", priority: "medium",
  },
]
