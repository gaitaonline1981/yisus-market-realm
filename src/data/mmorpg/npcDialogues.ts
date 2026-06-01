export interface NpcDialogueChoice {
  id: string
  label: string
  nextNodeId?: string
  action?: "start_quest" | "show_lesson" | "close"
  questId?: string
}

export interface NpcDialogueNode {
  id: string
  npcId: string
  title: string
  text: string
  tradingLesson?: string
  choices: NpcDialogueChoice[]
}

export const npcDialogues: NpcDialogueNode[] = [
  // ─── Mentor Wyckoff ──────────────────────────────────────
  {
    id: "mentor-wyckoff-intro", npcId: "mentor-wyckoff",
    title: "Lectura de estructura",
    text: "El mercado no se mueve al azar. Primero observamos acumulación, distribución, manipulación y reacción. Si entendés la estructura, dejás de perseguir velas.",
    tradingLesson: "Wyckoff ayuda a interpretar quién domina el mercado: compradores fuertes, vendedores fuertes o manipulación previa a un movimiento.",
    choices: [
      { id: "w-acc", label: "Quiero aprender acumulación", nextNodeId: "mentor-wyckoff-accumulation" },
      { id: "w-trap", label: "Quiero detectar trampas", nextNodeId: "mentor-wyckoff-traps" },
      { id: "w-quest", label: "Dame una misión", action: "start_quest", questId: "liquidity-detect" },
      { id: "w-close", label: "Cerrar", action: "close" },
    ],
  },
  {
    id: "mentor-wyckoff-accumulation", npcId: "mentor-wyckoff",
    title: "Acumulación",
    text: "Una acumulación suele aparecer cuando el precio parece débil, pero deja de caer con fuerza. El volumen, los rangos y los springs pueden mostrar absorción.",
    tradingLesson: "El objetivo no es adivinar el piso, sino detectar absorción y confirmación.",
    choices: [
      { id: "w-acc-back", label: "Volver", nextNodeId: "mentor-wyckoff-intro" },
      { id: "w-acc-close", label: "Cerrar", action: "close" },
    ],
  },
  {
    id: "mentor-wyckoff-traps", npcId: "mentor-wyckoff",
    title: "Trampas de liquidez",
    text: "Las trampas aparecen cuando el precio rompe un nivel obvio, activa stops y luego vuelve al rango. Ahí muchos traders quedan atrapados.",
    tradingLesson: "Un sweep de liquidez puede ser más importante que una ruptura limpia.",
    choices: [
      { id: "w-trap-back", label: "Volver", nextNodeId: "mentor-wyckoff-intro" },
      { id: "w-trap-close", label: "Cerrar", action: "close" },
    ],
  },
  // ─── Liquidity Scout ─────────────────────────────────────
  {
    id: "liquidity-scout-intro", npcId: "liquidity-scout",
    title: "Combustible del mercado",
    text: "Los stops son combustible. Si todos ven el mismo soporte o resistencia, preguntate qué liquidez hay detrás.",
    tradingLesson: "La liquidez suele concentrarse en máximos, mínimos, rangos, soportes, resistencias y zonas obvias.",
    choices: [
      { id: "ls-mark", label: "Cómo marco liquidez", nextNodeId: "liquidity-scout-mark" },
      { id: "ls-quest", label: "Dame una misión", action: "start_quest", questId: "liquidity-detect" },
      { id: "ls-close", label: "Cerrar", action: "close" },
    ],
  },
  {
    id: "liquidity-scout-mark", npcId: "liquidity-scout",
    title: "Marcar liquidez",
    text: "Marcá máximos y mínimos recientes, rangos laterales y zonas donde muchos traders pondrían stop. Después esperá reacción, no entres por ansiedad.",
    choices: [
      { id: "ls-mark-back", label: "Volver", nextNodeId: "liquidity-scout-intro" },
      { id: "ls-mark-close", label: "Cerrar", action: "close" },
    ],
  },
  // ─── Risk Guardian ────────────────────────────────────────
  {
    id: "risk-guardian-intro", npcId: "risk-guardian",
    title: "Sobrevivir primero",
    text: "Tu primera misión no es ganar. Es sobrevivir. Un trader sin riesgo definido está jugando contra sí mismo.",
    tradingLesson: "La gestión de riesgo define cuánto podés perder antes de pensar cuánto podés ganar.",
    choices: [
      { id: "rg-risk", label: "Cómo defino riesgo", nextNodeId: "risk-guardian-risk" },
      { id: "rg-quest", label: "Dame una misión", action: "start_quest", questId: "risk-defense" },
      { id: "rg-close", label: "Cerrar", action: "close" },
    ],
  },
  {
    id: "risk-guardian-risk", npcId: "risk-guardian",
    title: "Definir riesgo",
    text: "Antes de entrar, definí stop, tamaño de posición, pérdida máxima diaria y relación riesgo/beneficio. Si no podés medirlo, no deberías operarlo.",
    choices: [
      { id: "rg-risk-back", label: "Volver", nextNodeId: "risk-guardian-intro" },
      { id: "rg-risk-close", label: "Cerrar", action: "close" },
    ],
  },
  // ─── Volume Blacksmith ────────────────────────────────────
  {
    id: "volume-blacksmith-intro", npcId: "volume-blacksmith",
    title: "Forja de confirmación",
    text: "Una vela grande sin volumen puede ser humo. El volumen forja la confirmación.",
    tradingLesson: "El volumen ayuda a validar rupturas, rechazos y presión direccional.",
    choices: [
      { id: "vb-breakout", label: "Cómo confirmo ruptura", nextNodeId: "volume-blacksmith-breakout" },
      { id: "vb-quest", label: "Dame una misión", action: "start_quest", questId: "candle-confirm" },
      { id: "vb-close", label: "Cerrar", action: "close" },
    ],
  },
  {
    id: "volume-blacksmith-breakout", npcId: "volume-blacksmith",
    title: "Ruptura con volumen",
    text: "Buscá expansión de rango, volumen superior al promedio y cierre con intención. Si rompe y vuelve rápido, puede ser trampa.",
    choices: [
      { id: "vb-breakout-back", label: "Volver", nextNodeId: "volume-blacksmith-intro" },
      { id: "vb-breakout-close", label: "Cerrar", action: "close" },
    ],
  },
  // ─── Macro Oracle ─────────────────────────────────────────
  {
    id: "macro-oracle-intro", npcId: "macro-oracle",
    title: "Contexto global",
    text: "El gráfico puede verse perfecto, pero una noticia macro puede cambiar todo el escenario.",
    tradingLesson: "Macro no reemplaza al técnico, pero da contexto: tasas, dólar, inflación, índices y eventos.",
    choices: [
      { id: "mo-checklist", label: "Qué miro antes de operar", nextNodeId: "macro-oracle-checklist" },
      { id: "mo-quest", label: "Dame una misión", action: "start_quest", questId: "macro-context" },
      { id: "mo-close", label: "Cerrar", action: "close" },
    ],
  },
  {
    id: "macro-oracle-checklist", npcId: "macro-oracle",
    title: "Checklist macro",
    text: "Revisá calendario económico, DXY, índices principales, tasas, eventos FOMC/CPI y sentimiento general del mercado.",
    choices: [
      { id: "mo-checklist-back", label: "Volver", nextNodeId: "macro-oracle-intro" },
      { id: "mo-checklist-close", label: "Cerrar", action: "close" },
    ],
  },
  // ─── Elliott Sage ─────────────────────────────────────────
  {
    id: "elliott-sage-intro", npcId: "elliott-sage",
    title: "Ciclos del precio",
    text: "El precio respira en ciclos. Impulso, corrección, expansión y agotamiento.",
    tradingLesson: "Elliott Wave ayuda a ubicar el movimiento dentro de un ciclo, pero siempre necesita invalidación clara.",
    choices: [
      { id: "es-count", label: "Cómo empiezo a contar ondas", nextNodeId: "elliott-sage-count" },
      { id: "es-quest", label: "Dame una misión", action: "start_quest", questId: "macro-context" },
      { id: "es-close", label: "Cerrar", action: "close" },
    ],
  },
  {
    id: "elliott-sage-count", npcId: "elliott-sage",
    title: "Conteo de ondas",
    text: "Empezá identificando impulso claro, corrección proporcional e invalidación. No fuerces conteos: si no es claro, no se opera.",
    choices: [
      { id: "es-count-back", label: "Volver", nextNodeId: "elliott-sage-intro" },
      { id: "es-count-close", label: "Cerrar", action: "close" },
    ],
  },
  // ─── Bot Mechanic ─────────────────────────────────────────
  {
    id: "bot-mechanic-intro", npcId: "bot-mechanic",
    title: "Automatización consciente",
    text: "Un bot sin filtros solo automatiza errores más rápido.",
    tradingLesson: "Todo sistema necesita backtesting, filtros, control de riesgo y métricas reales.",
    choices: [
      { id: "bm-filters", label: "Cómo reduzco falsas señales", nextNodeId: "bot-mechanic-filters" },
      { id: "bm-quest", label: "Dame una misión", action: "start_quest", questId: "mechanic-signal" },
      { id: "bm-close", label: "Cerrar", action: "close" },
    ],
  },
  {
    id: "bot-mechanic-filters", npcId: "bot-mechanic",
    title: "Filtros de señal",
    text: "Agregá filtros de tendencia, volumen, volatilidad, horario y contexto. Después medí resultados con backtesting.",
    choices: [
      { id: "bm-filters-back", label: "Volver", nextNodeId: "bot-mechanic-intro" },
      { id: "bm-filters-close", label: "Cerrar", action: "close" },
    ],
  },
  // ─── Prop Firm Coach ──────────────────────────────────────
  {
    id: "prop-firm-coach-intro", npcId: "prop-firm-coach",
    title: "Desafío fondeado",
    text: "Una prueba fondeada no se gana por una operación. Se gana respetando reglas durante una serie.",
    tradingLesson: "Profit target, pérdida diaria, pérdida máxima y consistencia importan más que una entrada aislada.",
    choices: [
      { id: "pc-rules", label: "Qué regla miro primero", nextNodeId: "prop-firm-coach-rules" },
      { id: "pc-quest", label: "Dame una misión", action: "start_quest", questId: "risk-defense" },
      { id: "pc-close", label: "Cerrar", action: "close" },
    ],
  },
  {
    id: "prop-firm-coach-rules", npcId: "prop-firm-coach",
    title: "Reglas del desafío",
    text: "Primero mirá pérdida máxima y pérdida diaria. Después calculá cuántas operaciones malas podés soportar antes de quedar fuera.",
    choices: [
      { id: "pc-rules-back", label: "Volver", nextNodeId: "prop-firm-coach-intro" },
      { id: "pc-rules-close", label: "Cerrar", action: "close" },
    ],
  },
  // ─── Guild Recruiter ──────────────────────────────────────
  {
    id: "guild-recruiter-intro", npcId: "guild-recruiter",
    title: "Comunidad trader",
    text: "Un trader mejora más rápido cuando comparte análisis, errores y procesos con una comunidad seria.",
    tradingLesson: "La comunidad trader sirve para feedback, disciplina, revisión y constancia.",
    choices: [
      { id: "gr-community", label: "Cómo participo", nextNodeId: "guild-recruiter-community" },
      { id: "gr-close", label: "Cerrar", action: "close" },
    ],
  },
  {
    id: "guild-recruiter-community", npcId: "guild-recruiter",
    title: "Participar en comunidad",
    text: "Compartí tu plan, no solo resultados. La comunidad debe ayudarte a mejorar proceso, no a perseguir señales.",
    choices: [
      { id: "gr-community-back", label: "Volver", nextNodeId: "guild-recruiter-intro" },
      { id: "gr-community-close", label: "Cerrar", action: "close" },
    ],
  },
  // ─── Market News Agent ────────────────────────────────────
  {
    id: "market-news-agent-intro", npcId: "market-news-agent",
    title: "Noticias y mercado",
    text: "Antes de operar, revisá si el mercado está esperando una noticia. La volatilidad de evento puede invalidar señales.",
    tradingLesson: "El calendario económico evita operar a ciegas durante eventos de alto impacto.",
    choices: [
      { id: "mn-events", label: "Qué noticias importan", nextNodeId: "market-news-agent-events" },
      { id: "mn-close", label: "Cerrar", action: "close" },
    ],
  },
  {
    id: "market-news-agent-events", npcId: "market-news-agent",
    title: "Eventos clave",
    text: "Mirar CPI, FOMC, tasas, empleo, discursos de bancos centrales, datos de inflación y eventos geopolíticos relevantes.",
    choices: [
      { id: "mn-events-back", label: "Volver", nextNodeId: "market-news-agent-intro" },
      { id: "mn-events-close", label: "Cerrar", action: "close" },
    ],
  },
]
