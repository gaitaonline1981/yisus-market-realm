export type BlueprintStatus = "planned" | "prototype" | "available"
export type Priority = "high" | "medium" | "low"
export type BuildingStatus = "placeholder" | "future-glb" | "playable-system"

export interface WorldBuilding {
  id: string
  name: string
  zoneId: string
  description: string
  functionInGame: string
  tradingMeaning: string
  missionType: string
  npcId: string
  reward: string
  buildingStatus: BuildingStatus
  status: BlueprintStatus
  priority: Priority
}

export interface WorldNpc {
  id: string
  name: string
  zoneId: string
  role: string
  description: string
  missionTypes: string[]
  status: BlueprintStatus
  priority: Priority
}

export interface WorldSystem {
  id: string
  name: string
  description: string
  status: BlueprintStatus
  priority: Priority
  dependencies: string[]
}

export const worldBuildings: WorldBuilding[] = [
  {
    id: "risk-citadel",
    name: "Risk Citadel",
    zoneId: "camara-riesgo",
    description: "Fortaleza donde se enseña gestión de riesgo, tamaño de posición y control emocional.",
    functionInGame: "Cálculo de riesgo por operación, drawdown máximo y tamaño de posición sugerido.",
    tradingMeaning: "El riesgo no es opcional. Toda operación debe tener stop loss y tamaño definido.",
    missionType: "Defender el capital",
    npcId: "npc-risk",
    reward: "Aprendizaje: regla del 2%, riesgo/reward y drawdown máximo",
    buildingStatus: "future-glb",
    status: "prototype",
    priority: "high",
  },
  {
    id: "liquidity-scanner",
    name: "Liquidity Scanner Tower",
    zoneId: "bosque-liquidez",
    description: "Torre de escaneo que revela pools de liquidez, stops y zonas de barrido.",
    functionInGame: "Mapa de calor de liquidez con zonas de stops y órdenes grandes.",
    tradingMeaning: "La liquidez siempre deja rastro. Saber leerla es anticiparse al movimiento.",
    missionType: "Detectar liquidez oculta",
    npcId: "npc-liquidity",
    reward: "Aprendizaje: lectura de order book, stops hunting y liquidity sweep",
    buildingStatus: "future-glb",
    status: "planned",
    priority: "high",
  },
  {
    id: "wyckoff-temple",
    name: "Wyckoff Temple",
    zoneId: "montanas-wyckoff",
    description: "Templo dedicado al ciclo Wyckoff: acumulación, distribución, spring y UTAD.",
    functionInGame: "Lecciones interactivas del ciclo Wyckoff con ejemplos en gráficos reales.",
    tradingMeaning: "El mercado se mueve en ciclos institucionales. Identificar la fase es clave.",
    missionType: "Identificar fase del ciclo",
    npcId: "npc-wyckoff",
    reward: "Aprendizaje: acumulación, distribución, spring, UTAD, LPS/LPSY",
    buildingStatus: "future-glb",
    status: "prototype",
    priority: "high",
  },
  {
    id: "elliott-observatory",
    name: "Elliott Observatory",
    zoneId: "torre-elliott",
    description: "Observatorio para contar ondas de Elliott, patrones armónicos y Fibonacci.",
    functionInGame: "Simulador de conteo de ondas con validación y corrección.",
    tradingMeaning: "El mercado se mueve en ondas. Aprender a contarlas da ventaja direccional.",
    missionType: "Contar ondas correctamente",
    npcId: "npc-elliott",
    reward: "Aprendizaje: ondas de Elliott, Fibonacci, patrones armónicos",
    buildingStatus: "future-glb",
    status: "prototype",
    priority: "high",
  },
  {
    id: "backtesting-lab",
    name: "Backtesting Lab",
    zoneId: "laboratorio-ia",
    description: "Laboratorio para backtestear estrategias con datos históricos del mercado.",
    functionInGame: "Backtesting con datos reales, estadísticas y curva de equity.",
    tradingMeaning: "No operes sin backtest. Una estrategia sin pruebas es un casino.",
    missionType: "Backtestear una estrategia",
    npcId: "npc-mechanic",
    reward: "Aprendizaje: backtesting, métricas, sharpe ratio, drawdown",
    buildingStatus: "playable-system",
    status: "planned",
    priority: "medium",
  },
  {
    id: "prop-firm-challenge",
    name: "Prop Firm Challenge Gate",
    zoneId: "arena-scalping",
    description: "Puerta de desafíos estilo prop firm: objetivos de ganancia con límite de drawdown.",
    functionInGame: "Evaluación de trading con reglas de prop firm reales.",
    tradingMeaning: "Consistencia mata hype. Pasar un challenge demuestra disciplina.",
    missionType: "Superar evaluación de trading",
    npcId: "npc-recruiter",
    reward: "Aprendizaje: gestión de drawdown, objetivos diarios, consistencia",
    buildingStatus: "playable-system",
    status: "planned",
    priority: "medium",
  },
  {
    id: "macro-radar",
    name: "Macro Radar Station",
    zoneId: "macro-observatory",
    description: "Estación de radar macro: tasas, inflación, índices, commodities y geopolítica.",
    functionInGame: "Dashboard macro con datos en tiempo real y análisis de correlaciones.",
    tradingMeaning: "El contexto macro puede invalidar cualquier señal técnica.",
    missionType: "Leer el contexto global",
    npcId: "npc-macro",
    reward: "Aprendizaje: correlaciones, impacto macro, ciclos económicos",
    buildingStatus: "future-glb",
    status: "planned",
    priority: "medium",
  },
  {
    id: "volume-forge",
    name: "Volume Forge",
    zoneId: "candle-volcano",
    description: "Forja donde se aprende a leer volumen, momentum y presión compradora/vendedora.",
    functionInGame: "Lecciones de análisis de volumen con ejemplos interactivos.",
    tradingMeaning: "El volumen no miente. Es la huella del dinero institucional.",
    missionType: "Leer volumen y momentum",
    npcId: "npc-volume",
    reward: "Aprendizaje: volumen, delta, CVD, perfil de volumen",
    buildingStatus: "future-glb",
    status: "planned",
    priority: "medium",
  },
  {
    id: "bot-workshop",
    name: "Bot Workshop",
    zoneId: "laboratorio-ia",
    description: "Taller para crear, probar y optimizar bots de trading algorítmico.",
    functionInGame: "Editor de bots con parámetros ajustables y simulación.",
    tradingMeaning: "Automatizar no es magia: es codificar tu estrategia sin emociones.",
    missionType: "Crear un bot simple",
    npcId: "npc-mechanic",
    reward: "Aprendizaje: automatización, parámetros, optimización",
    buildingStatus: "playable-system",
    status: "planned",
    priority: "medium",
  },
  {
    id: "trading-academy",
    name: "Trading Academy",
    zoneId: "central-hub",
    description: "Academia principal donde se aprenden los fundamentos del trading.",
    functionInGame: "Lecciones progresivas desde velas japonesas hasta estrategias avanzadas.",
    tradingMeaning: "El conocimiento es el único edge sostenible en el mercado.",
    missionType: "Completar lecciones de trading",
    npcId: "npc-wyckoff",
    reward: "Aprendizaje: velas, soportes, resistencias, tendencias, patrones",
    buildingStatus: "future-glb",
    status: "prototype",
    priority: "high",
  },
  {
    id: "market-terminal",
    name: "Market Terminal",
    zoneId: "puerto-exchanges",
    description: "Terminal de mercado con cotizaciones, charts y order book en tiempo real.",
    functionInGame: "Cotizaciones en vivo, gráficos interactivos y profundidad de mercado.",
    tradingMeaning: "Todo trader necesita su terminal. Este es tu puesto de comando.",
    missionType: "Analizar un activo",
    npcId: "npc-macro",
    reward: "Aprendizaje: lectura de cotizaciones, tipos de órdenes, book",
    buildingStatus: "playable-system",
    status: "prototype",
    priority: "medium",
  },
  {
    id: "guild-house",
    name: "Guild House Trader",
    zoneId: "central-hub",
    description: "Casa del gremio: foro de señales, análisis compartido y comunidad.",
    functionInGame: "Feed de señales, análisis colaborativo y rankings del gremio.",
    tradingMeaning: "El trading no tiene por qué ser solitario. Una buena comunidad multiplica el aprendizaje.",
    missionType: "Participar en el gremio",
    npcId: "npc-recruiter",
    reward: "Aprendizaje: análisis colaborativo, señales, networking",
    buildingStatus: "future-glb",
    status: "planned",
    priority: "low",
  },
]

export const worldNpcs: WorldNpc[] = [
  { id: "npc-wyckoff", name: "Mentor Wyckoff", zoneId: "montanas-wyckoff", role: "Mentor de acumulación/distribución", description: "Enseña el ciclo Wyckoff, springs y UTAD.", missionTypes: ["Detección de acumulación", "Spring hunting"], status: "prototype", priority: "high" },
  { id: "npc-elliott", name: "Elliott Sage", zoneId: "torre-elliott", role: "Sabio de ondas de Elliott", description: "Guía en el conteo de ondas y patrones armónicos.", missionTypes: ["Conteo de ondas", "Fibonacci"], status: "prototype", priority: "high" },
  { id: "npc-risk", name: "Risk Guardian", zoneId: "camara-riesgo", role: "Guardián del riesgo", description: "Guardián que enseña disciplina y control emocional.", missionTypes: ["Gestión de riesgo", "Control emocional"], status: "prototype", priority: "high" },
  { id: "npc-liquidity", name: "Liquidity Scout", zoneId: "bosque-liquidez", role: "Explorador de liquidez", description: "Explora el order book en busca de stops y pools.", missionTypes: ["Detección de stops", "Order flow"], status: "planned", priority: "medium" },
  { id: "npc-volume", name: "Volume Blacksmith", zoneId: "candle-volcano", role: "Forjador de volumen", description: "Forja herramientas para leer volumen y momentum.", missionTypes: ["Análisis de volumen", "Momentum"], status: "planned", priority: "medium" },
  { id: "npc-macro", name: "Macro Oracle", zoneId: "macro-observatory", role: "Oráculo macroeconómico", description: "Revela correlaciones globales y contexto macro.", missionTypes: ["Análisis macro", "Ciclos"], status: "planned", priority: "medium" },
  { id: "npc-mechanic", name: "Bot Mechanic", zoneId: "laboratorio-ia", role: "Mecánico de bots", description: "Ayuda a crear y reparar bots de trading.", missionTypes: ["Creación de bots", "Optimización"], status: "planned", priority: "low" },
  { id: "npc-recruiter", name: "Guild Recruiter", zoneId: "central-hub", role: "Reclutador del gremio", description: "Recluta jugadores para el gremio y organiza eventos.", missionTypes: ["Eventos", "Gremio"], status: "planned", priority: "low" },
]

export const worldSystems: WorldSystem[] = [
  { id: "sys-character", name: "Character System", description: "Selección de personaje, stats, rareza y lore.", status: "available", priority: "high", dependencies: [] },
  { id: "sys-mount", name: "Mount System", description: "Selección de montura, compatibilidad y special ability.", status: "available", priority: "high", dependencies: [] },
  { id: "sys-glb-viewer", name: "Static GLB Viewer", description: "Visor 3D de modelos GLB estáticos.", status: "available", priority: "high", dependencies: ["Character System", "Mount System"] },
  { id: "sys-mounted-preview", name: "Visual Mounted Preview", description: "Posicionamiento visual del personaje sobre la montura.", status: "available", priority: "high", dependencies: ["Character System", "Mount System"] },
  { id: "sys-quest", name: "Quest System", description: "Misiones por zona con progreso local.", status: "available", priority: "medium", dependencies: ["Character System"] },
  { id: "sys-local-progress", name: "Local Progress", description: "Progreso local con Zustand persist.", status: "available", priority: "medium", dependencies: [] },
  { id: "sys-save-slots", name: "Save Slots", description: "Guardado de configuraciones con export/import JSON.", status: "available", priority: "medium", dependencies: ["Local Progress"] },
  { id: "sys-minimap", name: "Minimap", description: "Mini mapa 2D del mundo.", status: "available", priority: "medium", dependencies: [] },
  { id: "sys-fast-travel", name: "Fast Travel", description: "Teletransporte entre zonas del mundo.", status: "available", priority: "medium", dependencies: ["Minimap"] },
  { id: "sys-inventory", name: "Inventory System", description: "Inventario de objetos, títulos y logros.", status: "planned", priority: "medium", dependencies: ["Character System", "Supabase Cloud Save"] },
  { id: "sys-skill-tree", name: "Skill Tree", description: "Árbol de habilidades por personaje.", status: "planned", priority: "medium", dependencies: ["Character System"] },
  { id: "sys-trading-academy", name: "Trading Academy System", description: "Lecciones, exámenes y certificaciones de trading.", status: "planned", priority: "high", dependencies: ["Character System"] },
  { id: "sys-npc-dialogue", name: "NPC Dialogue", description: "Diálogos con NPCs usando LLM local.", status: "planned", priority: "medium", dependencies: ["Character System"] },
  { id: "sys-supabase", name: "Supabase Cloud Save", description: "Sincronización de progreso con Supabase.", status: "planned", priority: "low", dependencies: ["Local Progress", "Save Slots"] },
  { id: "sys-multiplayer", name: "Multiplayer", description: "Jugadores en tiempo real en el mundo.", status: "planned", priority: "low", dependencies: ["Character System", "Mount System", "Supabase Cloud Save"] },
  { id: "sys-combat", name: "Combat Events", description: "Eventos interactivos de trading gamificado.", status: "planned", priority: "low", dependencies: ["Character System", "Skill Tree"] },
]
