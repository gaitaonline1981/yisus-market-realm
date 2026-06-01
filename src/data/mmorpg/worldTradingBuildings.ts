export type TradingBuildingStatus = "placeholder" | "prototype" | "future-glb"

export type BuildingType =
  | "academy" | "scanner" | "temple" | "lab" | "gate"
  | "terminal" | "forge" | "tower" | "stable" | "guild"

export interface TradingBuilding {
  id: string
  name: string
  zoneId: string
  position: [number, number, number]
  scale: [number, number, number]
  color: string
  accentColor: string
  buildingType: BuildingType
  description: string
  tradingConcept: string
  gameplayFunction: string
  missionType: string
  npcId?: string
  rewardType: string
  status: TradingBuildingStatus
  priority: "low" | "medium" | "high"
}

export const tradingBuildings: TradingBuilding[] = [
  {
    id: "trading-academy", name: "Trading Academy", zoneId: "central-hub",
    position: [-1.8, 0, 1.8], scale: [1.2, 1.2, 1.2], color: "#1E293B", accentColor: "#38BDF8",
    buildingType: "academy",
    description: "Centro de aprendizaje para nuevos traders del Market Realm.",
    tradingConcept: "Educación financiera, análisis técnico básico y rutina de trader.",
    gameplayFunction: "Desbloquea tutoriales, cursos, guías y misiones introductorias.",
    missionType: "Tutorial / educación", npcId: "mentor-wyckoff",
    rewardType: "XP, títulos educativos y acceso a módulos.",
    status: "placeholder", priority: "high",
  },
  {
    id: "market-terminal", name: "Market Terminal", zoneId: "central-hub",
    position: [1.8, 0, 1.8], scale: [1, 1.2, 1], color: "#111827", accentColor: "#22D3EE",
    buildingType: "terminal",
    description: "Terminal central para leer estado general del mercado.",
    tradingConcept: "Watchlist, contexto, sentimiento, niveles y preparación diaria.",
    gameplayFunction: "Sirve como panel principal de datos del jugador.",
    missionType: "Daily market check", npcId: "macro-oracle",
    rewardType: "XP diario y checklist completado.",
    status: "placeholder", priority: "high",
  },
  {
    id: "liquidity-scanner-tower", name: "Liquidity Scanner Tower", zoneId: "liquidity-lake",
    position: [-5.8, 0, -2.2], scale: [1, 1.5, 1], color: "#0F172A", accentColor: "#22D3EE",
    buildingType: "scanner",
    description: "Torre que escanea stops, pools de liquidez y zonas de barrido.",
    tradingConcept: "Liquidez, stop hunts, manipulación y barridos.",
    gameplayFunction: "Activa misiones de detección de liquidez.",
    missionType: "Liquidity Hunt", npcId: "liquidity-scout",
    rewardType: "XP, badge de liquidez y acceso a mapas de liquidez.",
    status: "placeholder", priority: "high",
  },
  {
    id: "wyckoff-temple", name: "Wyckoff Temple", zoneId: "liquidity-lake",
    position: [-4.2, 0, -4.2], scale: [1.1, 1.1, 1.1], color: "#312E81", accentColor: "#A78BFA",
    buildingType: "temple",
    description: "Templo de acumulación, distribución y lectura estructural.",
    tradingConcept: "Wyckoff, acumulación, distribución, springs y upthrusts.",
    gameplayFunction: "Enseña estructuras de mercado y fases Wyckoff.",
    missionType: "Wyckoff Analysis", npcId: "mentor-wyckoff",
    rewardType: "Títulos Wyckoff y acceso a misiones de estructura.",
    status: "placeholder", priority: "high",
  },
  {
    id: "candle-breakout-gate", name: "Candle Breakout Gate", zoneId: "candle-volcano",
    position: [5.8, 0, -2.2], scale: [1.1, 1.4, 1.1], color: "#451A03", accentColor: "#F97316",
    buildingType: "gate",
    description: "Portal de rupturas, momentum y velas impulsivas.",
    tradingConcept: "Breakouts, falsas rupturas, momentum y confirmación.",
    gameplayFunction: "Inicia desafíos de ruptura con volumen.",
    missionType: "Breakout Confirmation", npcId: "volume-blacksmith",
    rewardType: "XP, badge de momentum y acceso a desafíos rápidos.",
    status: "placeholder", priority: "high",
  },
  {
    id: "volume-forge", name: "Volume Forge", zoneId: "candle-volcano",
    position: [4.2, 0, -4.2], scale: [1.2, 1.1, 1.2], color: "#1F2937", accentColor: "#EF4444",
    buildingType: "forge",
    description: "Forja donde se estudia volumen, presión y confirmaciones.",
    tradingConcept: "Volumen, order flow, presión compradora/vendedora.",
    gameplayFunction: "Mejora habilidades de confirmación antes de entrar.",
    missionType: "Volume Reading", npcId: "volume-blacksmith",
    rewardType: "XP, herramientas de lectura y títulos de volumen.",
    status: "placeholder", priority: "high",
  },
  {
    id: "macro-radar-station", name: "Macro Radar Station", zoneId: "macro-observatory",
    position: [-5.8, 0, 4.8], scale: [1.1, 1.4, 1.1], color: "#172554", accentColor: "#60A5FA",
    buildingType: "tower",
    description: "Estación de radar para noticias, tasas, dólar e índices.",
    tradingConcept: "Macro, DXY, tasas, inflación, índices y calendario económico.",
    gameplayFunction: "Activa misiones de contexto macro antes de operar.",
    missionType: "Macro Context", npcId: "macro-oracle",
    rewardType: "XP macro, títulos de observador y checklist fundamental.",
    status: "placeholder", priority: "high",
  },
  {
    id: "elliott-observatory", name: "Elliott Observatory", zoneId: "macro-observatory",
    position: [-4.2, 0, 3.2], scale: [1, 1.4, 1], color: "#581C87", accentColor: "#C084FC",
    buildingType: "tower",
    description: "Observatorio de ondas, ciclos y fractales del mercado.",
    tradingConcept: "Elliott Wave, ciclos, impulsos, correcciones y fractales.",
    gameplayFunction: "Desbloquea misiones de conteo de ondas.",
    missionType: "Elliott Wave Analysis", npcId: "elliott-sage",
    rewardType: "XP, título de Wave Reader y misiones avanzadas.",
    status: "placeholder", priority: "medium",
  },
  {
    id: "bot-workshop", name: "Bot Workshop", zoneId: "mechanic-lab",
    position: [5.8, 0, 4.8], scale: [1.1, 1.1, 1.1], color: "#134E4A", accentColor: "#2DD4BF",
    buildingType: "lab",
    description: "Taller para bots, indicadores, dashboards y señales.",
    tradingConcept: "Automatización, indicadores, bots, alertas y sistemas.",
    gameplayFunction: "Permite misiones de calibración de señales.",
    missionType: "Bot Calibration", npcId: "bot-mechanic",
    rewardType: "XP técnico, piezas de bot y títulos de mecánico.",
    status: "placeholder", priority: "high",
  },
  {
    id: "backtesting-lab", name: "Backtesting Lab", zoneId: "mechanic-lab",
    position: [4.2, 0, 3.2], scale: [1.2, 1, 1.2], color: "#0F172A", accentColor: "#14B8A6",
    buildingType: "lab",
    description: "Laboratorio para probar estrategias antes de arriesgar capital.",
    tradingConcept: "Backtesting, métricas, winrate, drawdown y consistencia.",
    gameplayFunction: "Desbloquea misiones de prueba histórica.",
    missionType: "Backtest Mission", npcId: "bot-mechanic",
    rewardType: "XP, reportes, badges de consistencia.",
    status: "placeholder", priority: "high",
  },
  {
    id: "risk-temple", name: "Risk Temple", zoneId: "risk-citadel",
    position: [-1.4, 0, 6.8], scale: [1.1, 1.3, 1.1], color: "#422006", accentColor: "#FACC15",
    buildingType: "temple",
    description: "Templo donde se protege el capital antes de buscar ganancias.",
    tradingConcept: "Gestión de riesgo, drawdown, RR y control emocional.",
    gameplayFunction: "Exige configurar riesgo antes de misiones avanzadas.",
    missionType: "Risk Check", npcId: "risk-guardian",
    rewardType: "XP, títulos de disciplina y límites de riesgo.",
    status: "placeholder", priority: "high",
  },
  {
    id: "prop-firm-challenge-gate", name: "Prop Firm Challenge Gate", zoneId: "risk-citadel",
    position: [1.4, 0, 6.8], scale: [1.2, 1.5, 1.2], color: "#111827", accentColor: "#F59E0B",
    buildingType: "gate",
    description: "Portal de desafíos tipo prop firm con reglas de pérdida y objetivo.",
    tradingConcept: "FTMO, prop firms, drawdown, profit target y consistencia.",
    gameplayFunction: "Inicia desafíos simulados de fondeo.",
    missionType: "Prop Firm Challenge", npcId: "risk-guardian",
    rewardType: "XP, título de funded challenger y acceso a niveles difíciles.",
    status: "placeholder", priority: "high",
  },
  {
    id: "mount-stable", name: "Mount Stable", zoneId: "central-hub",
    position: [0, 0, -2.2], scale: [1.2, 1, 1.2], color: "#3F2A1D", accentColor: "#FBBF24",
    buildingType: "stable",
    description: "Establo de monturas trader, cada una ligada a un estilo de mercado.",
    tradingConcept: "Estilos de movilidad del trader: scalping, macro, liquidez, momentum.",
    gameplayFunction: "Permite seleccionar, revisar y calibrar monturas.",
    missionType: "Mount Management", npcId: "guild-recruiter",
    rewardType: "Acceso a monturas y títulos de exploración.",
    status: "placeholder", priority: "medium",
  },
  {
    id: "trader-guild-house", name: "Trader Guild House", zoneId: "central-hub",
    position: [0, 0, 3.2], scale: [1.2, 1.1, 1.2], color: "#312E81", accentColor: "#EC4899",
    buildingType: "guild",
    description: "Casa de comunidad para traders, clanes, eventos y rankings.",
    tradingConcept: "Comunidad, mentorías, torneos, señales y reputación.",
    gameplayFunction: "Futuro hub social y de comunidad.",
    missionType: "Community Event", npcId: "guild-recruiter",
    rewardType: "Reputación, badges sociales y acceso a eventos.",
    status: "placeholder", priority: "medium",
  },
  {
    id: "hall-of-value", name: "Hall of Value", zoneId: "central-hub",
    position: [0.9, 0, 1.2], scale: [1, 1.1, 1], color: "#064E3B", accentColor: "#10B981",
    buildingType: "academy",
    description: "Salón del inversor paciente, margen de seguridad y largo plazo.",
    tradingConcept: "Value investing, margen de seguridad, paciencia y compound interest.",
    gameplayFunction: "Casa del Oracle of Value. Enseña a diferenciar precio de valor.",
    missionType: "Value Analysis", npcId: "oracle-of-value",
    rewardType: "XP, títulos de value investor y lecciones de paciencia.",
    status: "placeholder", priority: "medium",
  },
  {
    id: "dow-archive", name: "Dow Archive", zoneId: "central-hub",
    position: [-0.9, 0, 1.2], scale: [0.9, 1, 0.9], color: "#1E3A5F", accentColor: "#38BDF8",
    buildingType: "academy",
    description: "Archivo de la teoría de Dow, tendencia primaria y confirmación entre mercados.",
    tradingConcept: "Teoría de Dow, tendencia primaria, secundaria, confirmación e índices.",
    gameplayFunction: "Casa de Master Dow. Enseña fundamentos de lectura de tendencia.",
    missionType: "Trend Analysis", npcId: "master-dow",
    rewardType: "XP de tendencia y títulos de cronista.",
    status: "placeholder", priority: "medium",
  },
  {
    id: "speculators-chamber", name: "Speculators Chamber", zoneId: "candle-volcano",
    position: [5.1, 0, -4.6], scale: [1, 1.2, 1], color: "#451A03", accentColor: "#F97316",
    buildingType: "terminal",
    description: "Cámara de especulación, timing, momentum y lectura de cinta.",
    tradingConcept: "Especulación, timing, tape reading, momentum y disciplina.",
    gameplayFunction: "Casa de Lord Livermore. Enseña cuándo actuar y cuándo esperar.",
    missionType: "Speculation Drill", npcId: "lord-livermore",
    rewardType: "XP de momentum y títulos de especulador.",
    status: "placeholder", priority: "high",
  },
]
