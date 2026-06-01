export interface WorldZone {
  id: string;
  name: string;
  description: string;
  tradingMeaning: string;
  functionInGame: string;
  questTitle: string;
  questDescription: string;
  position: [number, number, number];
  radius: number;
  color: string;
}

export const worldZones: WorldZone[] = [
  {
    id: "central-hub",
    name: "Central Hub",
    description: "Plaza principal del Market Realm.",
    tradingMeaning: "Planificaci\u00F3n general antes de operar.",
    functionInGame: "Punto de inicio, selecci\u00F3n de personajes y centro social.",
    questTitle: "Preparar el Plan",
    questDescription: "Revis\u00E1 tu personaje, montura y configuraci\u00F3n antes de salir al mercado.",
    position: [0, 0, 0],
    radius: 2.5,
    color: "#38BDF8",
  },
  {
    id: "liquidity-lake",
    name: "Liquidity Lake",
    description: "Lago donde se reflejan los stops y pools de liquidez.",
    tradingMeaning: "Barridos, stops, zonas de liquidez y trampas del mercado.",
    functionInGame: "Zona de Slyde y Liquidity Whale.",
    questTitle: "Detectar Liquidez",
    questDescription: "Identific\u00E1 una zona donde el mercado podr\u00EDa barrer stops.",
    position: [-5, 0, -3],
    radius: 2.2,
    color: "#22D3EE",
  },
  {
    id: "candle-volcano",
    name: "Candle Volcano",
    description: "Volc\u00E1n de velas, momentum y rupturas violentas.",
    tradingMeaning: "Volumen, momentum, volatilidad y breakouts.",
    functionInGame: "Zona de Candle Dragon y Volumax.",
    questTitle: "Confirmar Ruptura",
    questDescription: "Busc\u00E1 una ruptura con volumen antes de entrar.",
    position: [5, 0, -3],
    radius: 2.2,
    color: "#F97316",
  },
  {
    id: "macro-observatory",
    name: "Macro Observatory",
    description: "Observatorio para analizar ciclos, macro y correlaciones.",
    tradingMeaning: "Macro, ciclos, Elliott, tasas, d\u00F3lar, \u00EDndices y contexto global.",
    functionInGame: "Zona de Maci y Waven.",
    questTitle: "Leer el Contexto",
    questDescription: "Revis\u00E1 el sesgo macro antes de operar.",
    position: [-5, 0, 4],
    radius: 2.2,
    color: "#A78BFA",
  },
  {
    id: "mechanic-lab",
    name: "Mechanic Lab",
    description: "Laboratorio de bots, indicadores, dashboards y backtesting.",
    tradingMeaning: "Automatizaci\u00F3n, optimizaci\u00F3n, indicadores y herramientas.",
    functionInGame: "Zona de Sproket y Market Rover.",
    questTitle: "Reparar la Se\u00F1al",
    questDescription: "Ajust\u00E1 un par\u00E1metro del sistema para reducir falsas se\u00F1ales.",
    position: [5, 0, 4],
    radius: 2.2,
    color: "#2DD4BF",
  },
  {
    id: "risk-citadel",
    name: "Risk Citadel",
    description: "Fortaleza de disciplina, drawdown y protecci\u00F3n del capital.",
    tradingMeaning: "Gesti\u00F3n de riesgo, control emocional, drawdown y disciplina.",
    functionInGame: "Zona de Hedgey y Noble Steed.",
    questTitle: "Defender el Capital",
    questDescription: "Configur\u00E1 riesgo m\u00E1ximo antes de abrir una operaci\u00F3n.",
    position: [0, 0, 6],
    radius: 2.2,
    color: "#FACC15",
  },
];
