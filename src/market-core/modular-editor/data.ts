import type {
  CharacterTemplate, MountData, BodyPart, Accessory,
  BodyStats, UnlockCondition, CharacterId,
} from './types'

export const BASE_STATS: BodyStats = {
  speed: 5, strength: 5, defense: 5, agility: 5, luck: 5, trading: 5,
}

export const CHARACTERS: CharacterTemplate[] = [
  {
    id: 'ticker',
    name: 'Ticker',
    title: 'El Scalper Veloz',
    description: 'Pequeño zorro robotizado de bolsillo. Veloz, astuto, entra y sale del mercado en milisegundos.',
    defaultParts: {
      head: 'ticker_head_default', face: 'ticker_face_default',
      ears: 'ticker_ears_default', eyes: 'ticker_eyes_default',
      torso: 'ticker_torso_default', arms: 'ticker_arms_default',
      hands: 'ticker_hands_default', legs: 'ticker_legs_default',
      feet: 'ticker_feet_default', tail: 'ticker_tail_default',
    },
    baseStats: { speed: 9, strength: 3, defense: 3, agility: 8, luck: 6, trading: 7 },
    height: 0.6, scale: 1.0,
    compatibleAccessorySlots: ['headwear', 'facewear', 'neckwear', 'back', 'emote'],
    compatibleMountIds: ['pocket_rocket', 'moon_hopper', 'wind_dasher'],
    tags: ['scalper', 'veloz', 'pequeño', 'robot'],
    personality: 'Astuto, hiperactivo, siempre mirando pantallas, impaciente.',
    colorPalette: ['#FF6B00', '#1A1A1A', '#00D4FF', '#FFD700'],
  },
  {
    id: 'hedgey',
    name: 'Hedgey',
    title: 'El Gestor de Riesgos',
    description: 'Erizo sabio y estratega. Protege su cartera con coberturas inteligentes y disciplina institucional.',
    defaultParts: {
      head: 'hedgey_head_default', face: 'hedgey_face_default',
      ears: 'hedgey_ears_default', eyes: 'hedgey_eyes_default',
      torso: 'hedgey_torso_default', arms: 'hedgey_arms_default',
      hands: 'hedgey_hands_default', legs: 'hedgey_legs_default',
      feet: 'hedgey_feet_default',
    },
    baseStats: { speed: 4, strength: 7, defense: 9, agility: 4, luck: 7, trading: 9 },
    height: 1.0, scale: 1.0,
    compatibleAccessorySlots: ['headwear', 'neckwear', 'back', 'shield', 'aura'],
    compatibleMountIds: ['noble_steed', 'order_block_rhino', 'skyward_talon'],
    tags: ['institucional', 'defensa', 'estratega', 'disciplinado'],
    personality: 'Sereno, calculador, protector, siempre piensa a largo plazo.',
    colorPalette: ['#F4E8D6', '#C99A3E', '#2FC7C9', '#7A4E2D'],
  },
  {
    id: 'slyde',
    name: 'Slyde',
    title: 'El Liquidador Silencioso',
    description: 'Serpiente líquida que se desliza entre órdenes. Silenciosa, letal, siempre encuentra liquidez donde otros ven vacío.',
    defaultParts: {
      head: 'slyde_head_default', face: 'slyde_face_default',
      eyes: 'slyde_eyes_default', torso: 'slyde_torso_default',
      tail: 'slyde_tail_default',
    },
    baseStats: { speed: 7, strength: 5, defense: 5, agility: 9, luck: 8, trading: 8 },
    height: 0.8, scale: 0.9,
    compatibleAccessorySlots: ['headwear', 'neckwear', 'aura', 'emote'],
    compatibleMountIds: ['liquidity_whale', 'volatility_falcon'],
    tags: ['sigiloso', 'liquidez', 'ágil', 'serpiente'],
    personality: 'Misterioso, elegante, silencioso, siempre en movimiento.',
    colorPalette: ['#2D1B69', '#00BCD4', '#E0E0E0', '#FFD700'],
  },
  {
    id: 'maci',
    name: 'Maci',
    title: 'La Rastreadora de Tendencias',
    description: 'Mariposa curiosa y veloz. Vuela sobre el mercado detectando patrones, tendencias y oportunidades emergentes.',
    defaultParts: {
      head: 'maci_head_default', face: 'maci_face_default',
      ears: 'maci_ears_default', eyes: 'maci_eyes_default',
      torso: 'maci_torso_default', arms: 'maci_arms_default',
      hands: 'maci_hands_default', legs: 'maci_legs_default',
      feet: 'maci_feet_default',
    },
    baseStats: { speed: 8, strength: 4, defense: 4, agility: 8, luck: 7, trading: 7 },
    height: 1.1, scale: 1.0,
    compatibleAccessorySlots: ['headwear', 'facewear', 'neckwear', 'back', 'pet', 'emote'],
    compatibleMountIds: ['wind_dasher', 'skyward_talon', 'moon_hopper'],
    tags: ['tendencias', 'exploradora', 'curiosa', 'aérea'],
    personality: 'Optimista, curiosa, siempre mirando el horizonte, aventurera.',
    colorPalette: ['#FF69B4', '#FFD700', '#87CEEB', '#FFFFFF'],
  },
  {
    id: 'volumax',
    name: 'Volumax',
    title: 'El Titán del Volumen',
    description: 'Gorila imponente que se alimenta de volumen. Cuanto más grande el trade, más fuerte se vuelve.',
    defaultParts: {
      head: 'volumax_head_default', face: 'volumax_face_default',
      ears: 'volumax_ears_default', eyes: 'volumax_eyes_default',
      torso: 'volumax_torso_default', arms: 'volumax_arms_default',
      hands: 'volumax_hands_default', legs: 'volumax_legs_default',
      feet: 'volumax_feet_default',
    },
    baseStats: { speed: 3, strength: 10, defense: 8, agility: 3, luck: 5, trading: 6 },
    height: 1.4, scale: 1.0,
    compatibleAccessorySlots: ['headwear', 'neckwear', 'back', 'weapon', 'shield', 'aura'],
    compatibleMountIds: ['candle_dragon', 'order_block_rhino', 'noble_steed'],
    tags: ['volumen', 'fuerza', 'imponente', 'tanque'],
    personality: 'Imponente, ruidoso, dominante, pero noble de corazón.',
    colorPalette: ['#2D1B69', '#FFD700', '#00C853', '#FF1744'],
  },
  {
    id: 'waven',
    name: 'Waven',
    title: 'La Jinete de Ondas',
    description: 'Surfista celestial que cabalga las ondas del mercado con gracia y estilo.',
    defaultParts: {
      head: 'waven_head_default', face: 'waven_face_default',
      eyes: 'waven_eyes_default', torso: 'waven_torso_default',
      arms: 'waven_arms_default', hands: 'waven_hands_default',
      legs: 'waven_legs_default', feet: 'waven_feet_default',
    },
    baseStats: { speed: 7, strength: 5, defense: 5, agility: 8, luck: 8, trading: 7 },
    height: 1.1, scale: 1.0,
    compatibleAccessorySlots: ['headwear', 'neckwear', 'back', 'aura', 'emote'],
    compatibleMountIds: ['skyward_talon', 'wind_dasher', 'liquidity_whale'],
    tags: ['ondas', 'fluida', 'elegante', 'aérea'],
    personality: 'Serena, fluida, elegante, una con el mercado.',
    colorPalette: ['#4A90D9', '#FFFFFF', '#8B5CF6', '#C99A3E'],
  },
  {
    id: 'sproket',
    name: 'Sproket',
    title: 'El Ingeniero Cuantitativo',
    description: 'Robot armador de estrategias. Construye sistemas de trading con piezas de precisión.',
    defaultParts: {
      head: 'sproket_head_default', face: 'sproket_face_default',
      eyes: 'sproket_eyes_default', torso: 'sproket_torso_default',
      arms: 'sproket_arms_default', hands: 'sproket_hands_default',
      legs: 'sproket_legs_default', feet: 'sproket_feet_default',
    },
    baseStats: { speed: 6, strength: 6, defense: 7, agility: 5, luck: 6, trading: 9 },
    height: 1.5, scale: 1.0,
    compatibleAccessorySlots: ['headwear', 'facewear', 'neckwear', 'back', 'weapon', 'shield', 'pet'],
    compatibleMountIds: ['volatility_falcon', 'pocket_rocket', 'market_rover'],
    tags: ['cuantitativo', 'precisión', 'robótico', 'analítico'],
    personality: 'Metódico, analítico, perfeccionista, siempre optimizando.',
    colorPalette: ['#4A4A4A', '#00BFFF', '#FFD700', '#F0F8FF'],
  },
  {
    id: 'flipper',
    name: 'Flipper',
    title: 'El Buscavidas del Mercado',
    description: 'Mapache travieso que busca gangas. Revuelve el mercado en busca de oportunidades infravaloradas.',
    defaultParts: {
      head: 'flipper_head_default', face: 'flipper_face_default',
      ears: 'flipper_ears_default', eyes: 'flipper_eyes_default',
      torso: 'flipper_torso_default', arms: 'flipper_arms_default',
      hands: 'flipper_hands_default', legs: 'flipper_legs_default',
      feet: 'flipper_feet_default', tail: 'flipper_tail_default',
    },
    baseStats: { speed: 7, strength: 4, defense: 4, agility: 7, luck: 9, trading: 6 },
    height: 0.65, scale: 1.0,
    compatibleAccessorySlots: ['headwear', 'facewear', 'neckwear', 'back', 'pet', 'emote'],
    compatibleMountIds: ['moon_hopper', 'market_rover', 'pocket_rocket'],
    tags: ['buscavidas', 'suerte', 'travieso', 'pequeño'],
    personality: 'Travieso, carismático, suertudo, siempre encuentra tesoros.',
    colorPalette: ['#6B7280', '#FFFFFF', '#111827', '#F59E0B'],
  },
]

export const MOUNTS: MountData[] = [
  {
    id: 'noble_steed', name: 'Noble Steed', type: 'ground', category: 'fantasy',
    rarity: 'legendary', modelPath: '/models/mounts/noble_steed.glb', thumbnail: '/mounts/noble_steed.png',
    compatibleCharacters: ['hedgey', 'volumax', 'waven', 'maci'],
    speed: 8, specialAbility: 'Avance disciplinado — carga imparable en línea recta',
    colors: ['#F4E8D6', '#C99A3E', '#2FC7C9', '#5AAFE0', '#7A4E2D'],
    unlockCondition: { type: 'level', requirement: 'reach_level_20', value: 20, description: 'Alcanza nivel 20 con Hedgey' },
    animations: ['idle', 'walk', 'trot', 'gallop', 'brake', 'neigh', 'protective', 'jump', 'summon', 'celebration'],
  },
  {
    id: 'pocket_rocket', name: 'Pocket Rocket', type: 'ground', category: 'tech',
    rarity: 'epic', modelPath: '/models/mounts/pocket_rocket.glb', thumbnail: '/mounts/pocket_rocket.png',
    compatibleCharacters: ['ticker', 'flipper', 'sproket'],
    speed: 9, specialAbility: 'Scalp Boost — nitro de aceleración máxima con estela de tokens',
    colors: ['#E63946', '#F4E8D6', '#2FC7C9', '#C99A3E', '#1A1D23'],
    unlockCondition: { type: 'level', requirement: 'reach_level_15', value: 15, description: 'Alcanza nivel 15 con Ticker' },
    animations: ['idle', 'accelerate', 'drift', 'jump', 'boost', 'victory'],
  },
  {
    id: 'wind_dasher', name: 'Wind Dasher', type: 'flying', category: 'fantasy',
    rarity: 'epic', modelPath: '/models/mounts/wind_dasher.glb', thumbnail: '/mounts/wind_dasher.png',
    compatibleCharacters: ['maci', 'waven', 'ticker'],
    speed: 8, specialAbility: 'Tailwind — ráfaga de viento que aumenta velocidad del grupo',
    colors: ['#2FC7C9', '#F97316', '#F4E8D6', '#7A4E2D', '#CD7F32'],
    unlockCondition: { type: 'quest', requirement: 'complete_air_trails', value: 'Completa todas las rutas aéreas del mapa', description: 'Completa la cadena de misiones Rutas Aéreas' },
    animations: ['idle', 'flight', 'climb', 'dive', 'loop', 'land'],
  },
  {
    id: 'skyward_talon', name: 'Skyward Talon', type: 'flying', category: 'fantasy',
    rarity: 'legendary', modelPath: '/models/mounts/skyward_talon.glb', thumbnail: '/mounts/skyward_talon.png',
    compatibleCharacters: ['waven', 'maci', 'hedgey'],
    speed: 9, specialAbility: 'Dive Bomb — picada supersónica con estela de luz',
    colors: ['#FFFFFF', '#4A90D9', '#8B5CF6', '#C99A3E', '#2FC7C9'],
    unlockCondition: { type: 'achievement', requirement: 'earn_wings_achievement', value: 'Alcanza el logro Alas del Mercado', description: 'Consigue el logro Alas del Mercado' },
    animations: ['idle', 'soar', 'fast_flight', 'glide', 'dive', 'land', 'preen'],
  },
  {
    id: 'liquidity_whale', name: 'Liquidity Whale', type: 'flying', category: 'fantasy',
    rarity: 'mythic', modelPath: '/models/mounts/liquidity_whale.glb', thumbnail: '/mounts/liquidity_whale.png',
    compatibleCharacters: ['slyde', 'waven', 'volumax'],
    speed: 7, specialAbility: 'Deep Pool — sumerge al grupo en liquidez profunda, regenerando recursos',
    colors: ['#1A3A6B', '#00BCD4', '#E0E0E0', '#FFD700', '#FFFFFF'],
    unlockCondition: { type: 'collect', requirement: 'collect_all_whale_tokens', value: 'Colecciona los 5 token ballena', description: 'Colecciona los 5 Whale Tokens ocultos en el mapa' },
    animations: ['idle', 'swim_flight', 'dive_deep', 'breach', 'song', 'summon'],
  },
  {
    id: 'candle_dragon', name: 'Candle Dragon', type: 'ground', category: 'fantasy',
    rarity: 'legendary', modelPath: '/models/mounts/candle_dragon.glb', thumbnail: '/mounts/candle_dragon.png',
    compatibleCharacters: ['volumax', 'hedgey', 'sproket'],
    speed: 8, specialAbility: 'Market Breath — aliento que muestra velas del futuro cercano a aliados',
    colors: ['#EF4444', '#22C55E', '#C99A3E', '#F97316', '#1A1D23'],
    unlockCondition: { type: 'trade', requirement: 'trade_1000_volume_dragon', value: 1000, description: 'Acumula 1000 de volumen de trading en el mercado de dragones' },
    animations: ['idle', 'flight', 'land', 'breath', 'roar', 'tail_whip'],
  },
  {
    id: 'order_block_rhino', name: 'Order Block Rhino', type: 'ground', category: 'beast',
    rarity: 'epic', modelPath: '/models/mounts/order_block_rhino.glb', thumbnail: '/mounts/order_block_rhino.png',
    compatibleCharacters: ['hedgey', 'volumax'],
    speed: 5, specialAbility: 'Block Wall — muro de órdenes que protege al grupo',
    colors: ['#4B5563', '#9CA3AF', '#C99A3E', '#2FC7C9', '#7A4E2D'],
    unlockCondition: { type: 'level', requirement: 'reach_level_25', value: 25, description: 'Alcanza nivel 25 con Hedgey' },
    animations: ['idle', 'walk', 'charge', 'block', 'hit', 'victory'],
  },
  {
    id: 'moon_hopper', name: 'Moon Hopper', type: 'ground', category: 'tech',
    rarity: 'rare', modelPath: '/models/mounts/moon_hopper.glb', thumbnail: '/mounts/moon_hopper.png',
    compatibleCharacters: ['flipper', 'ticker', 'maci'],
    speed: 7, specialAbility: 'Moon Jump — salto parabólico gigante que evita obstáculos',
    colors: ['#F8FAFC', '#E2E8F0', '#22D3EE', '#2FC7C9', '#C99A3E'],
    unlockCondition: { type: 'quest', requirement: 'complete_moon_quest', value: 'Ayuda al científico loco en la zona lunar', description: 'Completa la misión del científico loco en la zona lunar' },
    animations: ['idle', 'hop', 'moon_jump', 'run', 'spin', 'land', 'helicopter', 'happy_bounce'],
  },
  {
    id: 'volatility_falcon', name: 'Volatility Falcon', type: 'flying', category: 'beast',
    rarity: 'epic', modelPath: '/models/mounts/volatility_falcon.glb', thumbnail: '/mounts/volatility_falcon.png',
    compatibleCharacters: ['sproket', 'slyde', 'ticker'],
    speed: 10, specialAbility: 'Volatility Dash — movimiento telegráfico ultra-rápido con estela de rayos',
    colors: ['#111827', '#374151', '#EF4444', '#2FC7C9', '#22D3EE'],
    unlockCondition: { type: 'achievement', requirement: 'survive_volatility', value: 'Sobrevive 10 spikes de volatilidad', description: 'Sobrevive a 10 eventos de alta volatilidad en el mercado' },
    animations: ['idle', 'flight', 'dash', 'dive', 'soar', 'lightning_strike'],
  },
  {
    id: 'market_rover', name: 'Market Rover', type: 'ground', category: 'tech',
    rarity: 'rare', modelPath: '/models/mounts/market_rover.glb', thumbnail: '/mounts/market_rover.png',
    compatibleCharacters: ['flipper', 'sproket', 'ticker'],
    speed: 8, specialAbility: 'Scout Scan — escanea el terreno revelando atajos y recursos ocultos',
    colors: ['#D4A574', '#F4E8D6', '#2FC7C9', '#F97316', '#9CA3AF'],
    unlockCondition: { type: 'level', requirement: 'reach_level_10', value: 10, description: 'Alcanza nivel 10 con Flipper' },
    animations: ['idle', 'drive', 'boost', 'jump', 'land', 'drift', 'scan'],
  },
]

const commonUnlock: UnlockCondition = { type: 'level', requirement: 'reach_level_5', value: 5, description: 'Alcanza nivel 5' }

function makeBodyPart(id: string, name: string, characterId: CharacterId, slot: BodyPart['slot'], rarity: BodyPart['rarity'], overrides: Partial<BodyPart> = {}): BodyPart {
  return {
    id, name, characterId, slot, rarity,
    modelPath: `/models/characters/${characterId}/${id}.glb`,
    thumbnail: `/characters/${id}.png`,
    colors: [],
    stats: {},
    tags: [],
    unlockCondition: commonUnlock,
    ...overrides,
  }
}

import type { BodyPart as BodyPartType } from './types'

export const BODY_PARTS: BodyPartType[] = [
  makeBodyPart('ticker_head_default', 'Cabeza Default', 'ticker', 'head', 'common'),
  makeBodyPart('ticker_head_scouter', 'Cabeza Scouter', 'ticker', 'head', 'rare', { tags: ['scouter', 'visor'] }),
  makeBodyPart('ticker_ears_default', 'Orejas Default', 'ticker', 'ears', 'common'),
  makeBodyPart('ticker_ears_cyber', 'Orejas Cyber', 'ticker', 'ears', 'uncommon', { tags: ['cyber', 'led'] }),
  makeBodyPart('ticker_eyes_default', 'Ojos Default', 'ticker', 'eyes', 'common'),
  makeBodyPart('ticker_eyes_visor', 'Ojos Visor', 'ticker', 'eyes', 'rare', { tags: ['visor', 'scan'] }),
  makeBodyPart('ticker_torso_default', 'Torso Default', 'ticker', 'torso', 'common'),
  makeBodyPart('ticker_torso_armor', 'Torso Armadura', 'ticker', 'torso', 'epic', { stats: { defense: 3 }, tags: ['armor'] }),
  makeBodyPart('hedgey_head_default', 'Cabeza Default', 'hedgey', 'head', 'common'),
  makeBodyPart('hedgey_head_crown', 'Corona de Órdenes', 'hedgey', 'head', 'legendary', { stats: { trading: 5 }, tags: ['crown', 'premium'] }),
  makeBodyPart('flipper_head_default', 'Cabeza Default', 'flipper', 'head', 'common'),
  makeBodyPart('flipper_head_thief', 'Cabeza Ladrona', 'flipper', 'head', 'rare', { tags: ['thief', 'mask'] }),
  makeBodyPart('volumax_head_default', 'Cabeza Default', 'volumax', 'head', 'common'),
  makeBodyPart('volumax_head_warrior', 'Cabeza Guerrero', 'volumax', 'head', 'epic', { stats: { strength: 4 }, tags: ['warrior', 'helmet'] }),
  makeBodyPart('maci_head_default', 'Cabeza Default', 'maci', 'head', 'common'),
  makeBodyPart('maci_head_flower', 'Cabeza Floral', 'maci', 'head', 'uncommon', { tags: ['flower', 'nature'] }),
  makeBodyPart('waven_head_default', 'Cabeza Default', 'waven', 'head', 'common'),
  makeBodyPart('waven_head_tiara', 'Tiara de Ondas', 'waven', 'head', 'rare', { tags: ['tiara', 'water'] }),
  makeBodyPart('sproket_head_default', 'Cabeza Default', 'sproket', 'head', 'common'),
  makeBodyPart('sproket_head_quant', 'Cabeza Quant', 'sproket', 'head', 'epic', { stats: { trading: 4 }, tags: ['quant', 'processor'] }),
  makeBodyPart('slyde_head_default', 'Cabeza Default', 'slyde', 'head', 'common'),
  makeBodyPart('slyde_head_hood', 'Capucha de Liquidez', 'slyde', 'head', 'rare', { tags: ['hood', 'stealth'] }),
]

export const ACCESSORIES: Accessory[] = [
  {
    id: 'hat_trader', name: 'Sombrero de Trader', slot: 'headwear', rarity: 'uncommon',
    modelPath: '/models/accessories/hat_trader.glb', thumbnail: '/accessories/hat_trader.png',
    compatibleCharacters: ['ticker', 'hedgey', 'flipper', 'maci', 'sproket'],
    colors: ['#8B4513', '#C99A3E', '#1A1A1A'], tags: ['hat', 'classic'],
    unlockCondition: { type: 'level', requirement: 'reach_level_5', value: 5, description: 'Alcanza nivel 5' },
  },
  {
    id: 'glasses_cyber', name: 'Gafas Cyber', slot: 'facewear', rarity: 'rare',
    modelPath: '/models/accessories/glasses_cyber.glb', thumbnail: '/accessories/glasses_cyber.png',
    compatibleCharacters: ['ticker', 'sproket', 'flipper'],
    colors: ['#00D4FF', '#1A1A1A', '#C99A3E'], tags: ['cyber', 'glasses'],
    unlockCondition: { type: 'level', requirement: 'reach_level_12', value: 12, description: 'Alcanza nivel 12' },
  },
  {
    id: 'cape_institutional', name: 'Capa Institucional', slot: 'back', rarity: 'epic',
    modelPath: '/models/accessories/cape_institutional.glb', thumbnail: '/accessories/cape_institutional.png',
    compatibleCharacters: ['hedgey', 'volumax', 'waven'],
    colors: ['#1A3A6B', '#C99A3E', '#2FC7C9'], tags: ['cape', 'premium'],
    unlockCondition: { type: 'level', requirement: 'reach_level_25', value: 25, description: 'Alcanza nivel 25' },
  },
  {
    id: 'collar_token', name: 'Collar Token', slot: 'neckwear', rarity: 'rare',
    modelPath: '/models/accessories/collar_token.glb', thumbnail: '/accessories/collar_token.png',
    compatibleCharacters: ['ticker', 'hedgey', 'flipper', 'maci', 'slyde', 'waven'],
    colors: ['#C99A3E', '#2FC7C9', '#FFFFFF'], tags: ['collar', 'token'],
    unlockCondition: { type: 'quest', requirement: 'complete_first_trade', value: 'Completa tu primer trade exitoso', description: 'Completa la misión de primer trade' },
  },
  {
    id: 'shield_order', name: 'Escudo de Órdenes', slot: 'shield', rarity: 'epic',
    modelPath: '/models/accessories/shield_order.glb', thumbnail: '/accessories/shield_order.png',
    compatibleCharacters: ['hedgey', 'volumax', 'sproket'],
    colors: ['#C99A3E', '#2FC7C9', '#1A1A1A'], tags: ['shield', 'defense'],
    stats: { defense: 5 },
    unlockCondition: { type: 'achievement', requirement: 'block_1000_damage', value: 1000, description: 'Bloquea 1000 de daño total' },
  },
  {
    id: 'weapon_laser', name: 'Láser de Precisión', slot: 'weapon', rarity: 'legendary',
    modelPath: '/models/accessories/weapon_laser.glb', thumbnail: '/accessories/weapon_laser.png',
    compatibleCharacters: ['sproket', 'volumax'],
    colors: ['#00D4FF', '#C99A3E', '#FFFFFF'], tags: ['weapon', 'laser', 'precision'],
    stats: { strength: 6 },
    unlockCondition: { type: 'trade', requirement: 'trade_10000_volume', value: 10000, description: 'Acumula 10,000 de volumen de trading' },
  },
  {
    id: 'pet_fox', name: 'Zorro de Bolsillo', slot: 'pet', rarity: 'epic',
    modelPath: '/models/accessories/pet_fox.glb', thumbnail: '/accessories/pet_fox.png',
    compatibleCharacters: ['ticker', 'flipper', 'maci'],
    colors: ['#FF6B00', '#FFFFFF', '#1A1A1A'], tags: ['pet', 'fox'],
    unlockCondition: { type: 'collect', requirement: 'find_hidden_fox', value: 'Encuentra al zorro escondido en el mapa', description: 'Encuentra al Zorro de Bolsillo escondido' },
  },
  {
    id: 'aura_profit', name: 'Aura de Ganancia', slot: 'aura', rarity: 'mythic',
    modelPath: '/models/accessories/aura_profit.glb', thumbnail: '/accessories/aura_profit.png',
    compatibleCharacters: ['ticker', 'hedgey', 'slyde', 'maci', 'volumax', 'waven', 'sproket', 'flipper'],
    colors: ['#C99A3E', '#22D3EE', '#22C55E'], tags: ['aura', 'premium', 'mythic'],
    stats: { luck: 8, trading: 5 },
    unlockCondition: { type: 'achievement', requirement: 'complete_all_achievements', value: 'Completa todos los logros', description: 'Completa todos los logros del juego' },
  },
]

export function getCharacterById(id: CharacterId): CharacterTemplate | undefined {
  return CHARACTERS.find(c => c.id === id)
}

export function getMountById(id: string): MountData | undefined {
  return MOUNTS.find(m => m.id === id)
}

export function getBodyPartsForCharacter(characterId: CharacterId): BodyPart[] {
  return BODY_PARTS.filter(p => p.characterId === characterId)
}

export function getAccessoriesForCharacter(characterId: CharacterId): Accessory[] {
  return ACCESSORIES.filter(a => a.compatibleCharacters.includes(characterId))
}

export function getMountsForCharacter(characterId: CharacterId): MountData[] {
  return MOUNTS.filter(m => m.compatibleCharacters.includes(characterId))
}

export function calculateStats(character: CharacterTemplate, parts: BodyPart[], accessories: Accessory[]): BodyStats {
  const stats = { ...character.baseStats }
  for (const part of parts) {
    if (part.stats) {
      for (const [key, val] of Object.entries(part.stats)) {
        stats[key as keyof BodyStats] += val
      }
    }
  }
  for (const acc of accessories) {
    if (acc.stats) {
      for (const [key, val] of Object.entries(acc.stats)) {
        stats[key as keyof BodyStats] += val
      }
    }
  }
  return stats
}
