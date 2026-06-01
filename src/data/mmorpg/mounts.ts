import { Mount } from "@/types/mmorpg";
import { mountCalibrationDefaults } from "@/data/mmorpg/modelCalibrationDefaults";

export const mounts: Mount[] = [
  {
    id: "noble-steed",
    name: "Noble Steed",
    type: "Fantasy Horse Mount",
    rarity: "epic",
    description:
      "Caballo fantasy elegante, noble y disciplinado, ideal para avanzar con control, paciencia y estabilidad emocional.",
    compatibleCharacterIds: ["hedgey", "maci", "waven", "slyde"],
    colorPalette: ["#F4E8D6", "#C99A3E", "#2FC7C9", "#5AAFE0", "#7A4E2D"],
    specialAbility: {
      name: "Avance Disciplinado",
      visualEffect:
        "Deja una estela dorada y turquesa mientras galopa con postura heroica.",
      gameplayEffect:
        "Aumenta estabilidad del rider y reduce penalizaciones por terreno difícil.",
      tradingMeaning:
        "Avanzar con plan, sin FOMO, sin impulsividad y respetando la estrategia.",
    },
    modelUrl: "/models/mmorpg/mounts/noble-steed/noble-steed.glb",
    thumbnailUrl: "/models/mmorpg/mounts/noble-steed/thumbnail.png",
    modelScale: mountCalibrationDefaults["noble-steed"].scale,
    modelPosition: mountCalibrationDefaults["noble-steed"].position,
    modelRotation: mountCalibrationDefaults["noble-steed"].rotation,
  },
  {
    id: "pocket-rocket",
    name: "Pocket Rocket",
    type: "Scalping Kart Mount",
    rarity: "epic",
    description:
      "Mini kart veloz, gracioso y explosivo para movimientos rápidos de scalping y escapes cortos.",
    compatibleCharacterIds: ["ticker", "sproket", "flipper"],
    colorPalette: ["#D93A32", "#F4E8D6", "#2FC7C9", "#C99A3E", "#111827"],
    specialAbility: {
      name: "Scalping Boost",
      visualEffect:
        "El escape libera una llamarada cian y deja una estela de flechas luminosas.",
      gameplayEffect:
        "Aumenta velocidad por pocos segundos y permite giros rápidos.",
      tradingMeaning:
        "Entrada rápida, salida rápida y cero permanencia innecesaria en el mercado.",
    },
    modelUrl: "/models/mmorpg/mounts/pocket-rocket/pocket-rocket.glb",
    thumbnailUrl: "/models/mmorpg/mounts/pocket-rocket/thumbnail.png",
    modelScale: mountCalibrationDefaults["pocket-rocket"].scale,
    modelPosition: mountCalibrationDefaults["pocket-rocket"].position,
    modelRotation: mountCalibrationDefaults["pocket-rocket"].rotation,
  },
  {
    id: "wind-dasher",
    name: "Wind Dasher",
    type: "Steampunk Airplane Mount",
    rarity: "epic",
    description:
      "Avioncito steampunk adorable para exploración aérea, rutas rápidas y viajes entre zonas del mapa.",
    compatibleCharacterIds: ["ticker", "flipper", "maci", "sproket"],
    colorPalette: ["#2FC7C9", "#E8832E", "#F4E8D6", "#B8793E", "#7A4E2D"],
    specialAbility: {
      name: "Ruta Aérea",
      visualEffect:
        "Dibuja una línea de viento turquesa en el cielo mientras la hélice brilla.",
      gameplayEffect:
        "Permite cruzar zonas del mapa rápidamente y evitar obstáculos terrestres.",
      tradingMeaning:
        "Mirar el mercado desde arriba antes de entrar, usando contexto y no solo microseñales.",
    },
    modelUrl: "/models/mmorpg/mounts/wind-dasher/wind-dasher.glb",
    thumbnailUrl: "/models/mmorpg/mounts/wind-dasher/thumbnail.png",
    modelScale: mountCalibrationDefaults["wind-dasher"].scale,
    modelPosition: mountCalibrationDefaults["wind-dasher"].position,
    modelRotation: mountCalibrationDefaults["wind-dasher"].rotation,
  },
  {
    id: "skyward-talon",
    name: "Skyward Talon",
    type: "Epic Bird Mount",
    rarity: "legendary",
    description:
      "Ave épica gigante, majestuosa y protectora, diseñada para visión elevada y desplazamiento aéreo premium.",
    compatibleCharacterIds: ["waven", "slyde", "maci", "hedgey"],
    colorPalette: ["#F4FFFF", "#5AAFE0", "#6D42B8", "#C99A3E", "#37D5D6"],
    specialAbility: {
      name: "Visión de Altura",
      visualEffect:
        "Asciende con alas abiertas y revela zonas ocultas con rayos turquesa.",
      gameplayEffect:
        "Permite detectar rutas, objetivos y amenazas desde mayor distancia.",
      tradingMeaning:
        "Analizar temporalidades mayores antes de bajar a la ejecución fina.",
    },
    modelUrl: "/models/mmorpg/mounts/skyward-talon/skyward-talon.glb",
    thumbnailUrl: "/models/mmorpg/mounts/skyward-talon/thumbnail.png",
    modelScale: mountCalibrationDefaults["skyward-talon"].scale,
    modelPosition: mountCalibrationDefaults["skyward-talon"].position,
    modelRotation: mountCalibrationDefaults["skyward-talon"].rotation,
  },
  {
    id: "liquidity-whale",
    name: "Liquidity Whale",
    type: "Pez Volador de Liquidez",
    rarity: "institutional",
    description:
      "Pez volador enorme que surca el mercado revelando zonas de liquidez oculta y pools institucionales.",
    compatibleCharacterIds: ["slyde", "maci", "waven"],
    colorPalette: ["#123B6D", "#36C7C9", "#A8F7FF", "#C99A3E", "#6D42B8"],
    specialAbility: {
      name: "Sonar de Liquidez",
      visualEffect:
        "Emite ondas cian circulares que revelan rutas, stops y zonas ocultas.",
      gameplayEffect:
        "Muestra pools de liquidez, rutas seguras y áreas peligrosas.",
      tradingMeaning:
        "Detectar dónde están los stops y las órdenes antes de ejecutar una operación.",
    },
    modelUrl: "/models/mmorpg/mounts/liquidity-whale/liquidity-whale.glb",
    thumbnailUrl: "/models/mmorpg/mounts/liquidity-whale/thumbnail.png",
    modelScale: mountCalibrationDefaults["liquidity-whale"].scale,
    modelPosition: mountCalibrationDefaults["liquidity-whale"].position,
    modelRotation: mountCalibrationDefaults["liquidity-whale"].rotation,
  },
  {
    id: "candle-dragon",
    name: "Candle Dragon",
    type: "Escarabajo de Velas",
    rarity: "mythic",
    description:
      "Escarabajo mítico inspirado en velas japonesas, momentum, rupturas y volatilidad del mercado.",
    compatibleCharacterIds: ["waven", "slyde", "volumax"],
    colorPalette: ["#D93A32", "#2EAD4A", "#C99A3E", "#E8832E", "#15191D"],
    specialAbility: {
      name: "Llama de Momentum",
      visualEffect:
        "Exhala una llamarada verde y roja que deja velas luminosas flotando.",
      gameplayEffect:
        "Aumenta velocidad, salto y potencia durante rupturas o zonas de alta energía.",
      tradingMeaning:
        "Momentum fuerte confirmado por ruptura, volumen y presión direccional.",
    },
    modelUrl: "/models/mmorpg/mounts/candle-dragon/candle-dragon.glb",
    thumbnailUrl: "/models/mmorpg/mounts/candle-dragon/thumbnail.png",
    modelScale: mountCalibrationDefaults["candle-dragon"].scale,
    modelPosition: mountCalibrationDefaults["candle-dragon"].position,
    modelRotation: mountCalibrationDefaults["candle-dragon"].rotation,
  },
  {
    id: "order-block-rhino",
    name: "Order Block Rhino",
    type: "Cabra de Montaña Institucional",
    rarity: "institutional",
    description:
      "Cabra de montaña blindada, pesada y confiable, ideal para defender zonas importantes del mapa.",
    compatibleCharacterIds: ["hedgey", "volumax"],
    colorPalette: ["#6E767D", "#2F343A", "#C99A3E", "#35D1D0", "#6B4428"],
    specialAbility: {
      name: "Bloque Institucional",
      visualEffect:
        "Golpea el suelo y crea un bloque turquesa/dorado de protección.",
      gameplayEffect:
        "Reduce daño y permite resistir ataques, impactos o terrenos peligrosos.",
      tradingMeaning:
        "Operar desde zonas institucionales bien defendidas, no desde impulsos aleatorios.",
    },
    modelUrl: "/models/mmorpg/mounts/order-block-rhino/order-block-rhino.glb",
    thumbnailUrl: "/models/mmorpg/mounts/order-block-rhino/thumbnail.png",
    modelScale: mountCalibrationDefaults["order-block-rhino"].scale,
    modelPosition: mountCalibrationDefaults["order-block-rhino"].position,
    modelRotation: mountCalibrationDefaults["order-block-rhino"].rotation,
  },
  {
    id: "moon-hopper",
    name: "Moon Hopper",
    type: "Perro Lunar Mecánico",
    rarity: "epic",
    description:
      "Perro mecánico lunar, adorable e hiperactivo, diseñado para saltos verticales, gaps y exploración de plataformas.",
    compatibleCharacterIds: ["ticker", "sproket", "flipper"],
    colorPalette: ["#F4FFFF", "#BFC3C7", "#32E0E3", "#C99A3E", "#17204E"],
    specialAbility: {
      name: "Salto Lunar",
      visualEffect:
        "Comprime sus patas con resortes, carga energía cian y salta dejando una estela circular azulada.",
      gameplayEffect:
        "Permite cruzar huecos, subir plataformas y esquivar obstáculos.",
      tradingMeaning:
        "Aprovechar un movimiento explosivo sin quedar atrapado en el ruido.",
    },
    modelUrl: "/models/mmorpg/mounts/moon-hopper/moon-hopper.glb",
    thumbnailUrl: "/models/mmorpg/mounts/moon-hopper/thumbnail.png",
    modelScale: mountCalibrationDefaults["moon-hopper"].scale,
    modelPosition: mountCalibrationDefaults["moon-hopper"].position,
    modelRotation: mountCalibrationDefaults["moon-hopper"].rotation,
  },
  {
    id: "volatility-falcon",
    name: "Volatility Falcon",
    type: "Mantarraya Voladora",
    rarity: "legendary",
    description:
      "Mantarraya voladora, veloz y elegante, ideal para movimientos violentos, spikes y rupturas rápidas.",
    compatibleCharacterIds: ["slyde", "ticker", "waven"],
    colorPalette: ["#15191D", "#6F7479", "#D93A32", "#32E0E3", "#C99A3E"],
    specialAbility: {
      name: "Picada de Volatilidad",
      visualEffect:
        "Cae en picada dejando dos estelas: una roja y una cian.",
      gameplayEffect:
        "Aumenta mucho la velocidad durante pocos segundos y permite esquivar amenazas.",
      tradingMeaning:
        "Operar movimientos fuertes solo cuando hay confirmación, evitando quedar atrapado en la mecha.",
    },
    modelUrl: "/models/mmorpg/mounts/volatility-falcon/volatility-falcon.glb",
    thumbnailUrl: "/models/mmorpg/mounts/volatility-falcon/thumbnail.png",
    modelScale: mountCalibrationDefaults["volatility-falcon"].scale,
    modelPosition: mountCalibrationDefaults["volatility-falcon"].position,
    modelRotation: mountCalibrationDefaults["volatility-falcon"].rotation,
  },
  {
    id: "market-rover",
    name: "Market Rover",
    type: "Moto Voladora Explorer",
    rarity: "epic",
    description:
      "Moto voladora exploradora trader, robusta y técnica, pensada como laboratorio móvil para analizar datos y recorrer mapas.",
    compatibleCharacterIds: ["maci", "sproket", "ticker", "flipper", "volumax"],
    colorPalette: ["#D9A13B", "#F4E8D6", "#2FC7C9", "#6E767D", "#111827"],
    specialAbility: {
      name: "Escáner de Mercado",
      visualEffect:
        "Despliega antenas y emite un radar turquesa sobre el terreno.",
      gameplayEffect:
        "Revela recursos, rutas, señales, zonas ocultas y eventos cercanos.",
      tradingMeaning:
        "Escanear el mercado antes de operar: contexto, niveles, volumen, noticias y liquidez.",
    },
    modelUrl: "/models/mmorpg/mounts/market-rover/market-rover.glb",
    thumbnailUrl: "/models/mmorpg/mounts/market-rover/thumbnail.png",
    modelScale: mountCalibrationDefaults["market-rover"].scale,
    modelPosition: mountCalibrationDefaults["market-rover"].position,
    modelRotation: mountCalibrationDefaults["market-rover"].rotation,
  },
];

export function getMountById(id: string): Mount | undefined {
  return mounts.find((m) => m.id === id);
}
