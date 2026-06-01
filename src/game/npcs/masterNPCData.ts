import type { GameCharacter } from "@/game/core/types";

export interface MasterNPC {
  id: string;
  name: string;
  title: string;
  zoneId: string;
  biome: MasterBiome;
  modelPath: string;
  previewImage: string;
  tradingStyle: string;
  difficulty: number;
  color: string;
  questIds: string[];
  dialogues: { id: string; text: string; responses?: { text: string; nextDialogueId?: string; acceptQuestId?: string }[] }[];
}

export interface MasterBiome {
  name: string;
  description: string;
  skyColor: string;
  groundColor: string;
  fogColor: string;
  ambientColor: string;
  particles: "sparkles" | "leaves" | "fire" | "gold" | "blue" | "purple" | "green" | "none";
  props: ("trees" | "rocks" | "crystals" | "pillars" | "water" | "fire" | "fog" | "buildings")[];
}

const BASE = "/models/mmorpg/masters";

export const MASTER_BIOMES: Record<string, MasterBiome> = {
  "elliott-mountains": {
    name: "Montañas de Elliott",
    description: "Picos sagrados donde las ondas del mercado se revelan",
    skyColor: "#1a1020", groundColor: "#3a2a1a", fogColor: "#2a1a30",
    ambientColor: "#ffaa44", particles: "gold",
    props: ["rocks", "crystals", "pillars"],
  },
  "wyckoff-forest": {
    name: "Bosque de Wyckoff",
    description: "Bosque ancestral donde la acumulación y distribución son visibles",
    skyColor: "#0a1a0a", groundColor: "#1a2a1a", fogColor: "#0a2a0a",
    ambientColor: "#44ff44", particles: "leaves",
    props: ["trees", "rocks", "water"],
  },
  "risk-temple": {
    name: "Templo del Riesgo",
    description: "Santuario donde los traders aprenden a proteger su capital",
    skyColor: "#1a0a0a", groundColor: "#2a1a1a", fogColor: "#1a0a0a",
    ambientColor: "#ff4444", particles: "fire",
    props: ["pillars", "fire", "rocks"],
  },
  "prop-firm-city": {
    name: "Ciudad de las Prop Firms",
    description: "Metrópolis donde los traders buscan fondeo profesional",
    skyColor: "#0a0a1a", groundColor: "#1a1a2a", fogColor: "#0a0a1a",
    ambientColor: "#ff44ff", particles: "sparkles",
    props: ["buildings", "pillars"],
  },
  "macro-observatory": {
    name: "Observatorio Macro",
    description: "Observatorio celestial que monitorea la economía global",
    skyColor: "#0a0a2a", groundColor: "#0a0a1a", fogColor: "#0a0a2a",
    ambientColor: "#8844ff", particles: "blue",
    props: ["crystals", "pillars", "water"],
  },
  "scalping-arena": {
    name: "Arena de Scalping",
    description: "Coliseo donde solo los más rápidos sobreviven",
    skyColor: "#1a0a00", groundColor: "#2a1a0a", fogColor: "#1a0a00",
    ambientColor: "#ff8844", particles: "fire",
    props: ["pillars", "fire"],
  },
  "liquidity-plains": {
    name: "Llanuras de Liquidez",
    description: "Vastas llanuras donde el smart money deja sus huellas",
    skyColor: "#0a1a2a", groundColor: "#1a2a3a", fogColor: "#0a1a2a",
    ambientColor: "#8844ff", particles: "sparkles",
    props: ["water", "rocks"],
  },
  "backtest-district": {
    name: "Distrito de Backtesting",
    description: "Centro de datos donde las estrategias se prueban contra la historia",
    skyColor: "#0a0a1a", groundColor: "#1a1a1a", fogColor: "#0a0a1a",
    ambientColor: "#4444ff", particles: "blue",
    props: ["buildings", "crystals"],
  },
  "exchange-port": {
    name: "Puerto de Exchanges",
    description: "Puerto interestelar que conecta con todos los exchanges del universo",
    skyColor: "#0a1a2a", groundColor: "#0a2a2a", fogColor: "#0a1a2a",
    ambientColor: "#44ffff", particles: "sparkles",
    props: ["buildings", "water", "pillars"],
  },
  "trader-spawn": {
    name: "Plaza del Trader",
    description: "Punto de partida para todos los nuevos traders",
    skyColor: "#0a0a1a", groundColor: "#1a1a1a", fogColor: "#0a0a1a",
    ambientColor: "#44ff88", particles: "sparkles",
    props: ["buildings", "trees"],
  },
};

export const MASTER_NPCS: MasterNPC[] = [
  {
    id: "elliott-sage-npc", name: "Elliott Sage", title: "Maestro de las Ondas",
    zoneId: "elliott-mountains", biome: MASTER_BIOMES["elliott-mountains"],
    modelPath: `${BASE}/elliott-sage/elliott-sage.glb`, previewImage: `${BASE}/elliott-sage/elliott-sage.png`,
    tradingStyle: "Elliott Wave", difficulty: 5, color: "#F59E0B",
    questIds: ["elliott-basic"],
    dialogues: [
      { id: "greeting", text: "Bienvenido a las Montañas de Elliott. Aquí las ondas del mercado se revelan a quienes saben mirar. Cinco ondas impulsivas, tres correctivas. ¿Estás listo para aprender el ritmo del mercado?", responses: [{ text: "Enseñame las ondas", nextDialogueId: "teach" }, { text: "¿Por qué 5 y 3?", nextDialogueId: "why" }] },
      { id: "teach", text: "Onda 1: el inicio. Onda 2: la corrección. Onda 3: la más poderosa, nunca la más corta. Onda 4: consolidación. Onda 5: el clímax. Luego A-B-C corrige todo. Cada onda cuenta una historia de psicología de masas." },
      { id: "why", text: "Ralph Nelson Elliott descubrió que las multitudes se mueven en patrones predecibles. 5 ondas en la dirección de la tendencia, 3 en contra. Es la naturaleza fractal del mercado." },
    ],
  },
  {
    id: "mentor-wyckoff-npc", name: "Wyckoff Sage", title: "Guardián de la Acumulación",
    zoneId: "wyckoff-forest", biome: MASTER_BIOMES["wyckoff-forest"],
    modelPath: `${BASE}/mentor-wyckoff/mentor-wyckoff.glb`, previewImage: `${BASE}/mentor-wyckoff/mentor-wyckoff.png`,
    tradingStyle: "Wyckoff Method", difficulty: 4, color: "#10B981",
    questIds: ["wyckoff-schematics"],
    dialogues: [
      { id: "greeting", text: "En este bosque, cada árbol representa una fase del mercado. Acumulación, markup, distribución, markdown. Las ballenas dejan huellas... ¿las ves?", responses: [{ text: "Quiero aprender Wyckoff", nextDialogueId: "teach" }, { text: "¿Qué es un spring?", nextDialogueId: "spring" }] },
      { id: "teach", text: "El Composite Man es la metáfora de Wyckoff. Hay una entidad que mueve el mercado. Nuestro trabajo es seguir sus huellas: fases A-B-C-D-E de acumulación, luego el markup." },
      { id: "spring", text: "El spring es la trampa final. El precio rompe el soporte brevemente para sacar a los débiles, luego se dispara. Es la señal más poderosa de Wyckoff." },
    ],
  },
  {
    id: "risk-paladin-npc", name: "Risk Paladin", title: "Guardián del Capital",
    zoneId: "risk-temple", biome: MASTER_BIOMES["risk-temple"],
    modelPath: `${BASE}/risk-paladin/risk-paladin.glb`, previewImage: `${BASE}/risk-paladin/risk-paladin.png`,
    tradingStyle: "Risk Management", difficulty: 3, color: "#EF4444",
    questIds: ["first-risk-lesson"],
    dialogues: [
      { id: "greeting", text: "Este templo está construido sobre los huesos de traders que no usaron stop loss. El 1% es sagrado. ¿Jurás proteger tu capital?", responses: [{ text: "Lo juro", acceptQuestId: "first-risk-lesson" }, { text: "¿Tan importante es?", nextDialogueId: "important" }] },
      { id: "important", text: "Sin gestión de riesgo, sos un trader muerto caminando. Podés tener 90% de aciertos y aún así perder todo. Es la lección más importante que aprenderás." },
    ],
  },
  {
    id: "prop-firm-coach-npc", name: "Prop Firm Coach", title: "Preparador de Élite",
    zoneId: "prop-firm-city", biome: MASTER_BIOMES["prop-firm-city"],
    modelPath: `${BASE}/prop-firm-coach/prop-firm-coach.glb`, previewImage: `${BASE}/prop-firm-coach/prop-firm-coach.png`,
    tradingStyle: "Prop Firm Trading", difficulty: 4, color: "#EC4899",
    questIds: [],
    dialogues: [
      { id: "greeting", text: "Bienvenido a la Ciudad de las Prop Firms. Acá preparamos traders para desafíos de fondeo. 10% profit target, 5% max drawdown. ¿Tenés lo necesario?", responses: [{ text: "Quiero intentarlo", nextDialogueId: "try" }, { text: "¿Qué es una prop firm?", nextDialogueId: "explain" }] },
      { id: "try", text: "Primero demostrame consistencia. 20 días de trading, todos positivos aunque sea 0.5%. Sin consistencia no hay fondeo." },
      { id: "explain", text: "Las prop firms te dan capital para tradear a cambio de un porcentaje de ganancias. Pasás un desafío, ellos ponen el dinero, vos ponés la habilidad." },
    ],
  },
  {
    id: "lord-livermore-npc", name: "Lord Livermore", title: "Leyenda del Trading",
    zoneId: "backtest-district", biome: MASTER_BIOMES["backtest-district"],
    modelPath: `${BASE}/lord-livermore/lord-livermore.glb`, previewImage: `${BASE}/lord-livermore/lord-livermore.png`,
    tradingStyle: "Market Psychology", difficulty: 5, color: "#F59E0B",
    questIds: [],
    dialogues: [
      { id: "greeting", text: "El mercado nunca cambia porque la naturaleza humana nunca cambia. Miedo y codicia, una y otra vez. Yo hice y perdí millones. ¿Querés escuchar mi historia?", responses: [{ text: "Contame todo", nextDialogueId: "story" }, { text: "¿Cuál fue tu mayor error?", nextDialogueId: "mistake" }] },
      { id: "story", text: "Vendí en corto durante el crash del 29. Gané $100 millones. El mercado estaba quebrado y yo lo vi antes que nadie. Pero la clave no fue la predicción... fue la paciencia." },
      { id: "mistake", text: "Escuchar a otros. Seguí un tip y perdí todo. Desde entonces, solo confío en mi propio análisis. El mercado es el mejor maestro, pero cobra caro sus lecciones." },
    ],
  },
  {
    id: "oracle-of-value-npc", name: "Oracle of Value", title: "Visionaria del Valor Intrínseco",
    zoneId: "macro-observatory", biome: MASTER_BIOMES["macro-observatory"],
    modelPath: `${BASE}/oracle-of-value/oracle-of-value.glb`, previewImage: `${BASE}/oracle-of-value/oracle-of-value.png`,
    tradingStyle: "Value Investing", difficulty: 5, color: "#8B5CF6",
    questIds: [],
    dialogues: [
      { id: "greeting", text: "El precio es lo que pagás. El valor es lo que recibís. Desde este observatorio veo el verdadero valor de cada activo en el universo.", responses: [{ text: "¿Cómo calculás el valor?", nextDialogueId: "how" }, { text: "El mercado ya es eficiente", nextDialogueId: "efficient" }] },
      { id: "how", text: "Flujo de caja descontado. Crecimiento proyectado. Ventaja competitiva. Un activo solo vale los flujos futuros que puede generar, traídos a valor presente." },
      { id: "efficient", text: "Si el mercado fuera eficiente, no existirían las burbujas ni los crashes. El mercado es eficiente a largo plazo, pero en el corto plazo es un maníaco-depresivo." },
    ],
  },
  {
    id: "quant-architect-npc", name: "Quant Architect", title: "Constructor de Algoritmos",
    zoneId: "liquidity-plains", biome: MASTER_BIOMES["liquidity-plains"],
    modelPath: `${BASE}/quant-architect/quant-architect.glb`, previewImage: `${BASE}/quant-architect/quant-architect.png`,
    tradingStyle: "Quantitative Trading", difficulty: 5, color: "#6366F1",
    questIds: [],
    dialogues: [
      { id: "greeting", text: "Los números no mienten. Cada tick es un dato, cada dato es una oportunidad. Mis algoritmos procesan millones de datos por segundo.", responses: [{ text: "Quiero construir un bot", nextDialogueId: "bot" }, { text: "¿No perdés el toque humano?", nextDialogueId: "human" }] },
      { id: "bot", text: "Empezá simple: media móvil + RSI. Backtesteá 1000 operaciones. Si el Sharpe ratio es mayor a 1, tenés algo. Si no, iterá." },
      { id: "human", text: "El toque humano está en diseñar la estrategia. La ejecución la delego a las máquinas. Son más rápidas, no tienen emociones, no se cansan." },
    ],
  },
  {
    id: "psyche-monk-npc", name: "Psyche Monk", title: "Maestro de la Mente Trader",
    zoneId: "scalping-arena", biome: MASTER_BIOMES["scalping-arena"],
    modelPath: `${BASE}/psyche-monk/psyche-monk.glb`, previewImage: `${BASE}/psyche-monk/psyche-monk.png`,
    tradingStyle: "Trading Psychology", difficulty: 4, color: "#10B981",
    questIds: [],
    dialogues: [
      { id: "greeting", text: "El mayor enemigo del trader no es el mercado. Es el trader mismo. Miedo, codicia, venganza. ¿Cuál es tu demonio?", responses: [{ text: "El miedo a perder", nextDialogueId: "fear" }, { text: "La codicia de ganar más", nextDialogueId: "greed" }] },
      { id: "fear", text: "El miedo se cura con tamaño de posición pequeño. Si arriesgás 0.25%, no te importa perder. El miedo desaparece. Operá tan chico que no te importe." },
      { id: "greed", text: "La codicia se cura con reglas. 'Cierro a 2R, pase lo que pase'. Sin reglas, la codicia te hace holdear hasta que la ganancia se vuelve pérdida." },
    ],
  },
  {
    id: "macro-bridge-npc", name: "Macro Bridge", title: "Conector de Mercados Globales",
    zoneId: "macro-observatory", biome: MASTER_BIOMES["macro-observatory"],
    modelPath: `${BASE}/macro-bridge-master/macro-bridge-master.glb`, previewImage: `${BASE}/macro-bridge-master/macro-bridge-master.png`,
    tradingStyle: "Macro Economics", difficulty: 5, color: "#06B6D4",
    questIds: [],
    dialogues: [
      { id: "greeting", text: "Todo está conectado. La decisión de la FED afecta al Bitcoin. La guerra en Europa afecta al trigo. El PIB de China afecta al cobre. ¿Ves las conexiones?", responses: [{ text: "Abrime los ojos", nextDialogueId: "open" }, { text: "Es demasiada información", nextDialogueId: "simple" }] },
      { id: "open", text: "Empezá por el dólar (DXY). Es la variable más importante. Dólar fuerte = activos de riesgo débiles. Dólar débil = todo sube." },
      { id: "simple", text: "No necesitás saber todo. Solo necesitás saber qué mueve TU activo. Si tradeás oro, mirá las tasas reales. Si tradeás crypto, mirá la liquidez global." },
    ],
  },
  {
    id: "master-dow-npc", name: "Master Dow", title: "Padre del Análisis Técnico",
    zoneId: "trader-spawn", biome: MASTER_BIOMES["trader-spawn"],
    modelPath: `${BASE}/master-dow/master-dow.glb`, previewImage: `${BASE}/master-dow/master-dow.png`,
    tradingStyle: "Dow Theory", difficulty: 2, color: "#2FC7C9",
    questIds: [],
    dialogues: [
      { id: "greeting", text: "Joven trader. Charles Dow, mi tocayo, estableció los principios que rigen todo análisis técnico. ¿Conocés las 6 leyes de Dow?", responses: [{ text: "Enseñamelas", nextDialogueId: "teach" }, { text: "Ya las conozco", nextDialogueId: "test" }] },
      { id: "teach", text: "1. El mercado lo descuenta todo. 2. Hay 3 tendencias. 3. Las tendencias tienen 3 fases. 4. Los índices se confirman. 5. El volumen confirma la tendencia. 6. La tendencia sigue hasta que dé señales claras de reversión." },
      { id: "test", text: "Entonces decime: si el Dow Jones sube pero el Dow Transportes baja, ¿qué significa? Exacto: divergencia. La tendencia no está confirmada." },
    ],
  },
];
