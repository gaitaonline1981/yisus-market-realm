export type TradingMasterType = "historical_homage" | "inspired_archetype" | "original_teacher"

export type TradingMasterSpecialty =
  | "wyckoff" | "elliott" | "dow_theory" | "value_investing" | "speculation"
  | "macro" | "risk" | "quant" | "psychology" | "prop_firm" | "bots" | "liquidity" | "volume" | "backtesting"

export interface TradingMaster {
  id: string
  name: string
  alias: string
  type: TradingMasterType
  specialty: TradingMasterSpecialty
  zoneId: string
  buildingId: string
  title: string
  description: string
  tradingConcept: string
  teachingRole: string
  iconicPhrase: string
  relatedQuestIds: string[]
  relatedLessonIds: string[]
  relatedSkillIds: string[]
  visualStyle: string
  imagePrompt: string
  status: "planned" | "placeholder" | "future_glb" | "active"
  priority: "low" | "medium" | "high"
}

export const tradingMasters: TradingMaster[] = [
  {
    id: "mentor-wyckoff-master", name: "Mentor Wyckoff", alias: "El Arquitecto de la Estructura", type: "historical_homage", specialty: "wyckoff",
    zoneId: "liquidity-lake", buildingId: "wyckoff-temple", title: "Maestro de acumulación y distribución",
    description: "Maestro histórico del comportamiento institucional, rangos, springs, upthrusts y fases del mercado.",
    tradingConcept: "Wyckoff, acumulación, distribución, springs, upthrusts, estructura de mercado.",
    teachingRole: "Enseña a leer quién controla el mercado antes de entrar.",
    iconicPhrase: "Primero entendé la campaña; después pensá en la entrada.",
    relatedQuestIds: ["wyckoff-structure-basic", "liquidity-detect"],
    relatedLessonIds: ["lesson-wyckoff-structure", "lesson-liquidity-stops"],
    relatedSkillIds: ["wyckoff-basic", "wyckoff-spring", "liquidity-sweeps"],
    visualStyle: "Hombre maduro/anciano rostro alargado, frente amplia, poco cabello arriba, corto lateral, lentes redondos, expresión seria, traje vintage marrón/gris, chaleco, corbata, reloj de bolsillo, libro de mercado, bastón simple, postura elegante de profesor.",
    imagePrompt: "Personaje 3D caricaturesco premium, cuerpo completo, inspirado en Richard D. Wyckoff como homenaje histórico, hombre maduro rostro alargado, frente amplia, poco cabello arriba, cabello corto lateral, lentes redondos, expresión seria e inteligente, traje vintage marrón/gris, chaleco, corbata, reloj de bolsillo, libro de mercado en una mano, bastón simple, postura elegante de profesor de trading, estilo MMORPG cute premium, proporciones simpáticas, cabeza ligeramente grande, ojos expresivos, ropa detallada, colores elegantes marrón gris dorado, sin efectos flotando, sin texto, sin logo, fondo blanco o transparente, listo para referencia GLB.",
    status: "planned", priority: "high",
  },
  {
    id: "elliott-sage-master", name: "Elliott Sage", alias: "El Astrónomo de las Ondas", type: "historical_homage", specialty: "elliott",
    zoneId: "macro-observatory", buildingId: "elliott-observatory", title: "Sabio de ciclos, impulsos y correcciones",
    description: "Maestro de ondas, fractales, ciclos, escenarios e invalidaciones.",
    tradingConcept: "Elliott Wave, impulsos, correcciones, fractales, invalidación.",
    teachingRole: "Enseña a pensar escenarios sin forzar conteos.",
    iconicPhrase: "Una onda sin invalidación es solo imaginación.",
    relatedQuestIds: ["elliott-cycle-basic", "macro-context"],
    relatedLessonIds: ["lesson-elliott-invalidation", "lesson-macro-events"],
    relatedSkillIds: ["elliott-basic", "elliott-invalidation"],
    visualStyle: "Hombre mayor delgado, rostro fino, cabello canoso peinado atrás, bigote fino, lentes redondos, expresión sabia, traje académico azul/violeta, detalles dorados, abrigo largo elegante, pergamino enrollado.",
    imagePrompt: "Personaje 3D caricaturesco premium, cuerpo completo, inspirado en Ralph Nelson Elliott como homenaje histórico estilizado, hombre mayor delgado, rostro fino, cabello canoso peinado atrás, bigote fino, lentes redondos, expresión sabia y tranquila, traje académico azul/violeta con detalles dorados, abrigo largo elegante, sosteniendo pergamino enrollado o pequeño telescopio, estilo MMORPG cute premium, proporciones simpáticas, cabeza ligeramente grande, ojos expresivos, ropa detallada, colores elegantes azul violeta dorado, sin efectos flotando, sin texto, sin logo, fondo blanco o transparente, listo para referencia GLB.",
    status: "planned", priority: "high",
  },
  {
    id: "master-dow", name: "Master Dow", alias: "El Cronista de la Tendencia", type: "historical_homage", specialty: "dow_theory",
    zoneId: "central-hub", buildingId: "dow-archive", title: "Maestro de tendencia primaria y confirmación",
    description: "Profesor de fundamentos clásicos del mercado. Enseña a entender tendencia, confirmación entre mercados, fases de mercado y contexto general antes de operar.",
    tradingConcept: "Teoría de Dow, tendencia primaria, tendencia secundaria, confirmación entre mercados, estructura básica, lectura de índices.",
    teachingRole: "Enseña fundamentos clásicos de lectura de tendencia, confirmación y estructura de mercado.",
    iconicPhrase: "La tendencia habla; el trader aprende a escuchar.",
    relatedQuestIds: ["central-plan", "macro-context"],
    relatedLessonIds: ["lesson-premarket-plan", "lesson-macro-events"],
    relatedSkillIds: ["macro-basic", "psychology-discipline"],
    visualStyle: "Hombre adulto/maduro con barba y bigote prolijos, rostro serio y analítico, estilo periodista financiero antiguo, traje vintage oscuro, chaleco, corbata clásica, abrigo azul marino con detalles dorados, sosteniendo periódico financiero enrollado o libreta de notas, postura elegante de maestro fundador del mercado.",
    imagePrompt: "Crear personaje 3D caricaturesco premium, cuerpo completo, inspirado en Charles Dow como homenaje histórico estilizado, hombre maduro con barba y bigote prolijos, rostro serio y analítico, estilo periodista financiero antiguo, traje vintage oscuro, chaleco, corbata clásica, abrigo azul marino con detalles dorados, sosteniendo periódico financiero enrollado o libreta de notas pegada al cuerpo, postura elegante de maestro fundador del mercado, estilo MMORPG cute premium, sin efectos flotantes, sin gráficos alrededor, sin texto, sin logo, fondo blanco o transparente.",
    status: "active", priority: "medium",
  },
  {
    id: "oracle-of-value", name: "Oracle of Value", alias: "El Sabio del Valor", type: "inspired_archetype", specialty: "value_investing",
    zoneId: "central-hub", buildingId: "hall-of-value", title: "Maestro de paciencia, valor y largo plazo",
    description: "Personaje original inspirado en el arquetipo del inversor paciente y fundamentalista.",
    tradingConcept: "Value investing, margen de seguridad, paciencia, compound interest, lectura de empresas.",
    teachingRole: "Enseña a diferenciar precio, valor y paciencia.",
    iconicPhrase: "El mercado corre; el valor espera.",
    relatedQuestIds: ["central-plan"],
    relatedLessonIds: ["lesson-premarket-plan"],
    relatedSkillIds: ["psychology-fomo", "psychology-discipline"],
    visualStyle: "Inversor anciano original, cara redondeada, cabello blanco, lentes clásicos, sonrisa sabia, traje oscuro, chaleco verde, detalles dorados, libro de balances, postura tranquila.",
    imagePrompt: "Personaje 3D caricaturesco premium, cuerpo completo, inversor anciano original inspirado en arquetipo de value investing, NO copiar a Warren Buffett, cara amable redondeada, cabello blanco, lentes clásicos, sonrisa sabia, traje oscuro elegante, chaleco verde, detalles dorados, sosteniendo libro de balances cerrado, postura tranquila y paciente, estilo MMORPG cute premium, proporciones simpáticas, cabeza ligeramente grande, ojos expresivos, ropa detallada, colores verde esmeralda dorado negro, sin efectos flotando, sin monedas alrededor, sin texto, sin logo, fondo blanco o transparente, listo para referencia GLB.",
    status: "planned", priority: "high",
  },
  {
    id: "lord-livermore", name: "Lord Livermore", alias: "El Especulador de la Cinta", type: "historical_homage", specialty: "speculation",
    zoneId: "candle-volcano", buildingId: "speculators-chamber", title: "Maestro de timing, especulación y momentum",
    description: "Maestro de lectura de cinta, momentum, paciencia y peligro del sobreapalancamiento.",
    tradingConcept: "Tape reading, momentum, timing, especulación, disciplina.",
    teachingRole: "Enseña cuándo actuar y cuándo esperar.",
    iconicPhrase: "No es comprar o vender; es saber cuándo no hacer nada.",
    relatedQuestIds: ["candle-confirm", "risk-defense"],
    relatedLessonIds: ["lesson-volume-breakout", "lesson-risk-basic"],
    relatedSkillIds: ["volume-breakout", "psychology-discipline"],
    visualStyle: "Hombre adulto alto y delgado, cabello negro peinado atrás, cejas marcadas, mirada intensa, traje oscuro a rayas, chaleco verde petróleo, abrigo largo elegante, reloj de bolsillo, libreta pequeña, postura segura.",
    imagePrompt: "Personaje 3D caricaturesco premium, cuerpo completo, inspirado en Jesse Livermore como homenaje histórico estilizado, trader clásico elegante de Wall Street antiguo, hombre adulto alto y delgado, cabello negro peinado hacia atrás, cejas marcadas, mirada intensa y calculadora, traje oscuro a rayas, chaleco verde petróleo, abrigo largo elegante, reloj de bolsillo en una mano o libreta pequeña, postura segura con una mano en el bolsillo, estilo MMORPG cute premium, proporciones simpáticas, cabeza ligeramente grande, ojos expresivos, ropa detallada, colores negro verde petróleo dorado, sin efectos flotando, sin gráficos alrededor, sin texto, sin logo, fondo blanco o transparente, listo para referencia GLB.",
    status: "planned", priority: "high",
  },
  {
    id: "macro-bridge-master", name: "Macro Bridge Master", alias: "El Constructor de Ciclos Globales", type: "inspired_archetype", specialty: "macro",
    zoneId: "macro-observatory", buildingId: "macro-radar-station", title: "Maestro de correlaciones, tasas y contexto global",
    description: "Macro strategist original inspirado en arquetipos de grandes macro traders globales. Enseña cómo el mercado cripto, forex, acciones, oro y dólar se conectan dentro de un sistema global.",
    tradingConcept: "DXY, tasas, índices, commodities, inflación, correlaciones, ciclos globales, risk-on/risk-off.",
    teachingRole: "Enseña a conectar gráfico técnico con contexto global, macroeconomía y ciclos.",
    iconicPhrase: "Un gráfico aislado no ve la marea macro.",
    relatedQuestIds: ["macro-context"],
    relatedLessonIds: ["lesson-macro-events"],
    relatedSkillIds: ["macro-basic", "macro-events"],
    visualStyle: "Hombre maduro cabello gris, rostro delgado, mirada inteligente y serena, traje azul profundo, chaleco azul petróleo, abrigo largo con detalles dorados, sosteniendo libro de macro global, postura de estratega global.",
    imagePrompt: "Crear personaje 3D caricaturesco premium, cuerpo completo, macro strategist original inspirado en arquetipos de grandes macro traders globales, NO copiar exactamente a Ray Dalio, Soros, Druckenmiller ni Paul Tudor Jones, hombre maduro de cabello gris, rostro delgado, mirada inteligente y serena, traje azul profundo, chaleco azul petróleo, abrigo largo elegante con detalles dorados y patrones sutiles de mapas/ciclos, sosteniendo libro de macro global pegado al cuerpo, estilo MMORPG cute premium, sin efectos flotantes, sin mapas flotando, sin gráficos alrededor, sin texto, sin logo, fondo blanco o transparente.",
    status: "active", priority: "high",
  },
  {
    id: "quant-architect", name: "Quant Architect", alias: "El Matemático del Mercado", type: "inspired_archetype", specialty: "quant",
    zoneId: "mechanic-lab", buildingId: "backtesting-lab", title: "Maestro de datos, probabilidad y sistemas",
    description: "Quant architect original inspirado en arquetipos de Jim Simons, Ed Thorp y científicos de datos financieros. Enseña que una estrategia no se valida por intuición sino por muestra, métricas y repetición.",
    tradingConcept: "Sistemas cuantitativos, estadística, probabilidad, backtesting, modelos, métricas, esperanza matemática, robustez.",
    teachingRole: "Enseña a medir estrategias con datos y no con intuición. Valida con muestra, métricas y repetición.",
    iconicPhrase: "Sin muestra, no hay sistema; solo una historia bonita.",
    relatedQuestIds: ["backtest-first-strategy", "mechanic-signal"],
    relatedLessonIds: ["lesson-backtesting-metrics", "lesson-bot-filters"],
    relatedSkillIds: ["backtest-basic", "backtest-metrics", "bots-basic"],
    visualStyle: "Hombre maduro con cabello canoso, barba corta prolija, lentes, expresión amable e intelectual, abrigo blanco/crema de laboratorio mezclado con traje trader, chaleco verde petróleo, detalles dorados y cian, sosteniendo tablet o cuaderno de backtesting.",
    imagePrompt: "Crear personaje 3D caricaturesco premium, cuerpo completo, quant architect original inspirado en arquetipos de Jim Simons, Ed Thorp y profesores de matemática financiera, NO copiar exactamente a ninguna persona real, hombre maduro o mayor con cabello canoso, barba corta prolija, lentes, expresión amable e intelectual, abrigo blanco/crema de laboratorio elegante mezclado con traje trader, chaleco verde petróleo, detalles dorados y cian, sosteniendo tablet o cuaderno de backtesting pegado al cuerpo, estilo MMORPG cute premium, sin efectos flotantes, sin fórmulas flotando, sin robots, sin gráficos alrededor, sin texto, sin logo, fondo blanco o transparente.",
    status: "active", priority: "high",
  },
  {
    id: "risk-paladin", name: "Risk Paladin", alias: "El Guardián del Capital", type: "original_teacher", specialty: "risk",
    zoneId: "risk-citadel", buildingId: "risk-temple", title: "Maestro de drawdown, stop loss y supervivencia",
    description: "Guardián original inspirado en gestión de riesgo, Van Tharp y Mark Douglas. Bloquea al jugador si no tiene reglas de riesgo. Enseña que antes de ganar hay que sobrevivir.",
    tradingConcept: "Gestión de riesgo, stop loss, tamaño de posición, drawdown, pérdida diaria, RR, disciplina operativa.",
    teachingRole: "Enseña a sobrevivir antes de buscar rentabilidad. Define stops, controla drawdown y protege el capital.",
    iconicPhrase: "El capital es tu barra de vida.",
    relatedQuestIds: ["risk-defense", "prop-firm-rules-basic"],
    relatedLessonIds: ["lesson-risk-basic", "lesson-prop-firm-rules"],
    relatedSkillIds: ["risk-basic", "risk-rr", "risk-drawdown"],
    visualStyle: "Hombre adulto robusto con barba prolija, cejas marcadas, expresión amable pero estricta, traje financiero azul oscuro combinado con armadura elegante blanca y dorada tipo paladín protector, hombreras sobrias, símbolo de protección en pecho, sosteniendo clipboard de riesgo.",
    imagePrompt: "Crear personaje 3D caricaturesco premium, cuerpo completo, maestro original de gestión de riesgo, hombre adulto robusto con barba prolija, cejas marcadas, expresión amable pero estricta, traje financiero azul oscuro combinado con armadura elegante blanca y dorada tipo paladín protector, hombreras sobrias, símbolo de protección en el pecho, sosteniendo clipboard/checklist de riesgo pegado al cuerpo, estilo MMORPG cute premium, sin armas, sin espada, sin efectos de combate, sin gráficos flotantes, sin texto, sin logo, fondo blanco o transparente.",
    status: "active", priority: "high",
  },
  {
    id: "prop-firm-coach-master", name: "Prop Firm Coach", alias: "El Instructor de Fondeo", type: "original_teacher", specialty: "prop_firm",
    zoneId: "risk-citadel", buildingId: "prop-firm-challenge-gate", title: "Maestro de reglas, consistencia y desafíos fondeados",
    description: "Entrenador original de desafíos fondeados inspirado en coaches de prop firms y gestores de riesgo institucional. Enseña a pasar pruebas sin romper reglas de pérdida, consistencia o sobreapalancamiento.",
    tradingConcept: "Prop firms, FTMO-style challenges, profit target, daily drawdown, max drawdown, consistency rule, gestión de serie, psicología de evaluación.",
    teachingRole: "Enseña a pasar desafíos fondeados respetando daily drawdown, max drawdown y consistencia.",
    iconicPhrase: "Pasar la prueba es sobrevivir al sistema, no ganar una vela.",
    relatedQuestIds: ["prop-firm-rules-basic", "risk-defense"],
    relatedLessonIds: ["lesson-prop-firm-rules", "lesson-risk-basic"],
    relatedSkillIds: ["prop-basic", "prop-consistency", "risk-drawdown"],
    visualStyle: "Hombre adulto profesional con cabello oscuro y canas, barba prolija, mirada firme de instructor, traje azul oscuro, abrigo largo con detalles dorados, corbata, sosteniendo clipboard de evaluación fondeada, bolso maletín discreto.",
    imagePrompt: "Crear personaje 3D caricaturesco premium, cuerpo completo, prop firm coach original, hombre adulto profesional con cabello oscuro y canas, barba prolija, mirada firme de instructor, traje azul oscuro o negro, abrigo largo elegante con detalles dorados, corbata, botas elegantes, sosteniendo clipboard o carpeta de evaluación fondeada pegada al cuerpo, bolso/maletín discreto, estilo MMORPG cute premium, sin logos reales de prop firms, sin textos de marcas, sin efectos flotantes, sin gráficos alrededor, sin logo, fondo blanco o transparente.",
    status: "active", priority: "high",
  },
  {
    id: "psyche-monk", name: "Psyche Monk", alias: "El Monje contra el FOMO", type: "original_teacher", specialty: "psychology",
    zoneId: "central-hub", buildingId: "trading-academy", title: "Maestro de paciencia, disciplina y control emocional",
    description: "Maestro original de psicología trader inspirado en Mark Douglas, disciplina mental, mindfulness y control emocional. Enseña que el peor enemigo no es el mercado sino la reacción emocional del trader.",
    tradingConcept: "Psicología trader, FOMO, revenge trading, paciencia, disciplina, aceptación de pérdida, diario emocional.",
    teachingRole: "Enseña a controlar impulsos antes de operar, vencer el FOMO y mantener disciplina mental.",
    iconicPhrase: "La vela que perseguís suele ser la que te atrapa.",
    relatedQuestIds: ["central-plan", "risk-defense"],
    relatedLessonIds: ["lesson-premarket-plan", "lesson-risk-basic"],
    relatedSkillIds: ["psychology-fomo", "psychology-discipline"],
    visualStyle: "Hombre mayor con barba blanca/canosa, mirada tranquila, sonrisa leve, rostro amable, túnica elegante violeta y fucsia con detalles dorados, estilo monje/trader híbrido, collar de cuentas, sosteniendo libro de psicología trader, postura calmada.",
    imagePrompt: "Crear personaje 3D caricaturesco premium, cuerpo completo, maestro original de psicología trader, hombre mayor con barba blanca/canosa, mirada tranquila, sonrisa leve, rostro amable, túnica elegante violeta y fucsia con detalles dorados, estilo monje/trader híbrido, collar de cuentas, sosteniendo libro de psicología trader o diario emocional pegado al cuerpo, postura calmada, estilo MMORPG cute premium, sin símbolos religiosos fuertes, sin efectos místicos flotantes, sin velas flotantes, sin gráficos alrededor, sin texto, sin logo, fondo blanco o transparente.",
    status: "active", priority: "high",
  },
]
