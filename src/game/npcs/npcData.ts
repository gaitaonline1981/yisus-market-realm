import type { WorldZone } from "@/game/core/types";

export interface GameNPC {
  id: string;
  name: string;
  role: string;
  zoneId: string;
  position: [number, number, number];
  dialogues: NPCDialogue[];
  questIds: string[];
  color: string;
}

export interface NPCDialogue {
  id: string;
  text: string;
  responses?: { text: string; nextDialogueId?: string; acceptQuestId?: string }[];
}

export const NPCS: GameNPC[] = [
  {
    id: "risk-paladin",
    name: "Risk Paladin",
    role: "Mentor de Gestión de Riesgo",
    zoneId: "risk-temple",
    position: [-30, 0, -28],
    color: "#EF4444",
    questIds: ["first-risk-lesson"],
    dialogues: [
      {
        id: "greeting",
        text: "Bienvenido, joven trader. El riesgo es la base de todo. ¿Sabés cuánto arriesgar por operación?",
        responses: [
          { text: "No más del 1%", nextDialogueId: "correct" },
          { text: "Lo que haga falta para ganar", nextDialogueId: "wrong" },
        ],
      },
      {
        id: "correct",
        text: "Exacto. El 1% es sagrado. Protegé tu capital y vivirás para tradear otro día. ¿Querés aprender más?",
        responses: [
          { text: "Sí, acepto la misión", acceptQuestId: "first-risk-lesson" },
          { text: "Después vuelvo" },
        ],
      },
      { id: "wrong", text: "Ese es el camino a la ruina. Volvé cuando estés listo para aprender de verdad." },
    ],
  },
  {
    id: "mentor-wyckoff",
    name: "Wyckoff Sage",
    role: "Maestro de Acumulación y Distribución",
    zoneId: "wyckoff-forest",
    position: [-25, 0, 3],
    color: "#10B981",
    questIds: ["wyckoff-schematics"],
    dialogues: [
      {
        id: "greeting",
        text: "El mercado no es aleatorio. Las ballenas dejan huellas. ¿Ves la acumulación en este gráfico?",
        responses: [
          { text: "Creo que sí... explicame", nextDialogueId: "explain" },
          { text: "Solo veo velas", nextDialogueId: "patience" },
        ],
      },
      {
        id: "explain",
        text: "Fase A: stopping. Fase B: acumulación. Fase C: test. Después viene el markup. ¿Querés la misión de Wyckoff?",
        responses: [
          { text: "Acepto el desafío", acceptQuestId: "wyckoff-schematics" },
          { text: "Demasiado complejo" },
        ],
      },
      { id: "patience", text: "Paciencia, joven padawan. Estudiá los esquemas y volvé." },
    ],
  },
  {
    id: "elliott-sage",
    name: "Elliott Sage",
    role: "Maestro de Ondas",
    zoneId: "elliott-mountains",
    position: [0, 0, -28],
    color: "#F59E0B",
    questIds: [],
    dialogues: [
      {
        id: "greeting",
        text: "Cinco ondas impulsivas, tres correctivas. El mercado respira en ciclos. ¿Sentís el ritmo?",
        responses: [
          { text: "Enséñame a contar ondas", nextDialogueId: "teach" },
          { text: "Estoy perdido en el mar", nextDialogueId: "comfort" },
        ],
      },
      { id: "teach", text: "Empezá por la onda 1. Siempre buscá divergencias en el RSI. Pronto tendré misiones para vos." },
      { id: "comfort", text: "Todos empiezan perdidos. La práctica hace al maestro de ondas." },
    ],
  },
  {
    id: "scalp-master",
    name: "Scalp Master",
    role: "Instructor de Scalping",
    zoneId: "scalping-arena",
    position: [-55, 0, 3],
    color: "#F97316",
    questIds: ["first-scalp"],
    dialogues: [
      {
        id: "greeting",
        text: "Velocidad. Precisión. 5 segundos, adentro y afuera. ¿Tenés lo que se necesita para scalpear?",
        responses: [
          { text: "Nací para esto", acceptQuestId: "first-scalp" },
          { text: "Prefiero ir más lento", nextDialogueId: "slow" },
        ],
      },
      { id: "slow", text: "Respetable. El scalping no es para todos. Visita al Risk Paladin primero." },
    ],
  },
  {
    id: "prop-firm-coach",
    name: "Prop Firm Coach",
    role: "Preparador de Prop Firms",
    zoneId: "prop-firm-city",
    position: [30, 0, -28],
    color: "#EC4899",
    questIds: [],
    dialogues: [
      {
        id: "greeting",
        text: "¿Querés que te fondeen? 10% de profit target, 5% max drawdown. Dos fases. ¿Te animás?",
        responses: [
          { text: "¿Cómo me preparo?", nextDialogueId: "prep" },
          { text: "No estoy listo aún" },
        ],
      },
      { id: "prep", text: "Consistencia. Todos los días green, aunque sea 0.5%. Es una maratón, no un sprint." },
    ],
  },
  {
    id: "macro-seer",
    name: "Macro Seer",
    role: "Visionaria Macroeconómica",
    zoneId: "macro-observatory",
    position: [0, 0, -58],
    color: "#8B5CF6",
    questIds: [],
    dialogues: [
      {
        id: "greeting",
        text: "Las estrellas no mienten. La FED, el ECB, el PIB... todo está conectado. ¿Ves el panorama completo?",
        responses: [
          { text: "Abrime los ojos", nextDialogueId: "open" },
          { text: "Solo veo velas" },
        ],
      },
      { id: "open", text: "Estudiá el calendario económico. Cada dato mueve mercados. Volvé cuando hayas visto 5 NFP." },
    ],
  },
  {
    id: "guide",
    name: "Guía Novato",
    role: "Asistente de Nuevos Traders",
    zoneId: "trader-spawn",
    position: [3, 0, 3],
    color: "#2FC7C9",
    questIds: ["explore-wyckoff", "explore-exchange", "mount-master"],
    dialogues: [
      {
        id: "greeting",
        text: "¡Bienvenido a Yisus Market Realm! Soy tu guía. ¿Listo para tu primera misión de exploración?",
        responses: [
          { text: "¡Vamos!", acceptQuestId: "explore-wyckoff" },
          { text: "Dame un segundo", nextDialogueId: "wait" },
        ],
      },
      { id: "wait", text: "Sin apuro. Explorá el spawn y cuando quieras, hablame." },
    ],
  },
  {
    id: "exchange-trader",
    name: "Exchange Trader",
    role: "Operador del Puerto",
    zoneId: "exchange-port",
    position: [0, 0, 62],
    color: "#06B6D4",
    questIds: [],
    dialogues: [
      {
        id: "greeting",
        text: "Bienvenido al Puerto de Exchanges. Acá podés operar con datos de mercado simulados. ¿Querés probar el terminal de trading? Presioná C.",
        responses: [
          { text: "¡Quiero tradear!", nextDialogueId: "tips" },
          { text: "¿Consejos?", nextDialogueId: "tips" },
        ],
      },
      {
        id: "tips",
        text: "Compra bajo, vende alto. Usa stop loss. No arriesgues más del 1%. Las ganancias te dan XP. ¡Buena suerte, trader!",
      },
    ],
  },
  {
    id: "liquidity-seeker",
    name: "Liquidity Seeker",
    role: "Cazadora de Liquidez",
    zoneId: "liquidity-plains",
    position: [27, 0, 3],
    color: "#A78BFA",
    questIds: [],
    dialogues: [
      {
        id: "greeting",
        text: "Las ballenas dejan pools de liquidez como migas de pan. ¿Sabés identificarlos?",
        responses: [
          { text: "Enseñame", nextDialogueId: "teach" },
          { text: "¿Qué es liquidez?", nextDialogueId: "explain" },
        ],
      },
      { id: "teach", text: "Buscá zonas donde el precio rebotó varias veces. Ahí hay órdenes pendientes. Las ballenas cazan stops justo debajo de esos niveles." },
      { id: "explain", text: "Liquidez = órdenes de compra/venta esperando ser ejecutadas. Donde hay liquidez, hay oportunidad." },
    ],
  },
  {
    id: "backtest-engineer",
    name: "Backtest Engineer",
    role: "Ingeniera de Backtesting",
    zoneId: "backtest-district",
    position: [57, 0, 3],
    color: "#6366F1",
    questIds: [],
    dialogues: [
      {
        id: "greeting",
        text: "No operes a ciegas. Cada estrategia debe ser probada con datos históricos. ¿Has hecho backtesting?",
        responses: [
          { text: "¿Cómo se hace?", nextDialogueId: "how" },
          { text: "No sé qué es", nextDialogueId: "explain" },
        ],
      },
      { id: "how", text: "Tomá tu estrategia, aplicala a velas pasadas, y medí el resultado. Si funciona en 1000 velas, probablemente funcione en las próximas 100." },
      { id: "explain", text: "Backtesting = probar tu estrategia en datos del pasado para ver si hubiera funcionado. Es la base de todo trader serio." },
    ],
  },
  {
    id: "candle-dragon-master",
    name: "Candle Dragon",
    role: "Maestro de Patrones",
    zoneId: "liquidity-plains",
    position: [22, 0, -3],
    color: "#F59E0B",
    questIds: [],
    dialogues: [
      { id: "greeting", text: "Cada vela respira. Martillo, estrella fugaz, envolvente... los patrones cuentan historias que pocos saben leer.", responses: [{ text: "Quiero aprender", nextDialogueId: "learn" }, { text: "Ya sé leer velas", nextDialogueId: "test" }] },
      { id: "learn", text: "Empezá por el martillo: mecha larga abajo, cuerpo chico arriba. Señal de reversión alcista. Buscalo en soportes." },
      { id: "test", text: "Entonces sabrás que un Doji en resistencia es señal de agotamiento. Bien, seguí practicando." },
    ],
  },
  {
    id: "volume-professor",
    name: "Volume Professor",
    role: "Especialista en Volumen",
    zoneId: "wyckoff-forest",
    position: [-22, 0, -3],
    color: "#10B981",
    questIds: [],
    dialogues: [
      { id: "greeting", text: "El precio miente, el volumen no. Un breakout sin volumen es una trampa. ¿Sabés leer el Volume Profile?", responses: [{ text: "Enseñame", nextDialogueId: "teach" }, { text: "¿Qué es VPVR?", nextDialogueId: "explain" }] },
      { id: "teach", text: "Buscá el Point of Control (POC): el precio donde más volumen se negoció. Ahí es donde las ballenas acumularon." },
      { id: "explain", text: "Volume Profile muestra cuánto se negoció a cada precio. El POC es el nivel más importante del mercado." },
    ],
  },
  {
    id: "divergence-hunter",
    name: "Divergence Hunter",
    role: "Cazadora de Divergencias",
    zoneId: "elliott-mountains",
    position: [5, 0, -33],
    color: "#F59E0B",
    questIds: [],
    dialogues: [
      { id: "greeting", text: "RSI haciendo máximos más bajos mientras el precio hace máximos más altos. Eso, joven trader, es una divergencia bajista.", responses: [{ text: "¡Quiero cazar divergencias!", nextDialogueId: "hunt" }, { text: "¿Qué es RSI?", nextDialogueId: "rsi" }] },
      { id: "hunt", text: "Buscá divergencias en temporalidades altas (4h, 1d). Son señales más fuertes. Confirmá siempre con volumen." },
      { id: "rsi", text: "Relative Strength Index. Mide la fuerza de la tendencia. Sobre 70 = sobrecompra. Bajo 30 = sobreventa." },
    ],
  },
  {
    id: "journal-keeper",
    name: "Journal Keeper",
    role: "Guardián del Diario de Trading",
    zoneId: "backtest-district",
    position: [53, 0, -3],
    color: "#6366F1",
    questIds: [],
    dialogues: [
      { id: "greeting", text: "El 90% de los traders pierde dinero. ¿Sabés por qué? Porque no llevan un diario. Sin datos, no hay mejora.", responses: [{ text: "¿Cómo empiezo mi diario?", nextDialogueId: "how" }, { text: "Yo uso Excel", nextDialogueId: "good" }] },
      { id: "how", text: "Anotá: fecha, par, entrada, salida, P&L, emoción, setup, captura de pantalla. Revisalo cada domingo." },
      { id: "good", text: "Excel es un buen comienzo. Pero asegurate de anotar también cómo te sentías al entrar y salir. La psicología importa." },
    ],
  },
  {
    id: "defi-explorer",
    name: "DeFi Explorer",
    role: "Exploradora de Finanzas Descentralizadas",
    zoneId: "macro-observatory",
    position: [-5, 0, -62],
    color: "#8B5CF6",
    questIds: [],
    dialogues: [
      { id: "greeting", text: "CEX no es el único camino. DEX, yield farming, liquidity pools... el mundo DeFi es enorme. ¿Querés explorarlo?", responses: [{ text: "Llevame a DeFi", nextDialogueId: "guide" }, { text: "Prefiero CEX", nextDialogueId: "ok" }] },
      { id: "guide", text: "Empezá por Uniswap. Proveé liquidez a un pool estable. APR bajo pero seguro. Después explorá proyectos más riesgosos." },
      { id: "ok", text: "Respetable. Los CEX son más fáciles para empezar. Pero no ignores DeFi: es el futuro de las finanzas." },
    ],
  },
];
