export interface TradingLesson {
  id: string;
  title: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  category: "fundamentos" | "analisis-tecnico" | "gestion-riesgo" | "psicologia" | "estrategia";
  content: string;
  keyTakeaway: string;
}

export interface TradingQuiz {
  id: string;
  lessonId: string;
  title: string;
  questions: {
    id: string;
    question: string;
    options: { id: string; text: string; correct: boolean }[];
    explanation: string;
  }[];
  xpReward: number;
}

export const TRADING_LESSONS: TradingLesson[] = [
  {
    id: "que-es-trading",
    title: "¿Qué es el Trading?",
    difficulty: 1,
    category: "fundamentos",
    content: `El trading es la compra y venta de activos financieros con el objetivo de obtener ganancias. A diferencia de la inversión a largo plazo, el trading se enfoca en movimientos de precio de corto y mediano plazo.

Los mercados más comunes son:
- Forex (divisas)
- Criptomonedas
- Acciones
- Índices
- Commodities

Cada mercado tiene sus propias características de volatilidad, liquidez y horarios. Lo importante es entender que el trading NO es apostar — es analizar probabilidades basadas en datos.`,
    keyTakeaway: "Trading = análisis de probabilidades, no apuestas.",
  },
  {
    id: "velas-japonesas",
    title: "Velas Japonesas",
    difficulty: 1,
    category: "analisis-tecnico",
    content: `Cada vela representa la acción del precio en un período de tiempo. Tiene 4 componentes:

- Apertura (Open): precio al inicio del período
- Cierre (Close): precio al final del período  
- Máximo (High): precio más alto
- Mínimo (Low): precio más bajo

Vela verde/alcista: cierre > apertura (compradores dominan)
Vela roja/bajista: cierre < apertura (vendedores dominan)

Patrones básicos:
- Doji: apertura ≈ cierre (indecisión)
- Martillo: mecha inferior larga (posible reversión alcista)
- Envolvente: una vela "envuelve" a la anterior (señal fuerte)`,
    keyTakeaway: "Las velas cuentan la historia de la batalla entre compradores y vendedores.",
  },
  {
    id: "soporte-resistencia",
    title: "Soportes y Resistencias",
    difficulty: 2,
    category: "analisis-tecnico",
    content: `Soporte: nivel de precio donde la demanda es suficientemente fuerte para detener una caída.

Resistencia: nivel donde la oferta es suficientemente fuerte para detener una subida.

Regla clave: los soportes rotos se convierten en resistencias, y las resistencias rotas en soportes. Esto se llama "cambio de rol".

Cómo identificarlos:
- Picos y valles anteriores
- Números redondos (psicológicos)
- Medias móviles
- Puntos de alto volumen`,
    keyTakeaway: "El precio tiene memoria. Los niveles que fueron importantes antes, probablemente lo serán otra vez.",
  },
  {
    id: "gestion-riesgo",
    title: "Gestión de Riesgo",
    difficulty: 2,
    category: "gestion-riesgo",
    content: `La regla de oro: NUNCA arriesgues más del 1-2% de tu capital en una sola operación.

Si tenés $1000, tu riesgo máximo por trade es $10-$20. Esto significa que incluso con 10 pérdidas seguidas, solo perdés el 10-20% de tu cuenta.

Conceptos clave:
- Stop Loss: precio donde cerrás la operación si va en tu contra
- Risk/Reward Ratio: cuánto ganás vs cuánto arriesgás (mínimo 1:2)
- Drawdown: máxima caída desde un pico de capital
- Posición sizing: cuánto capital asignar a cada trade`,
    keyTakeaway: "El 1% es sagrado. Protegé tu capital primero, las ganancias vienen solas.",
  },
  {
    id: "wyckoff",
    title: "Método Wyckoff",
    difficulty: 3,
    category: "estrategia",
    content: `Richard Wyckoff desarrolló un método para seguir las huellas del "dinero inteligente" (instituciones, ballenas).

El ciclo de Wyckoff tiene 4 fases:
1. Acumulación: las ballenas compran en silencio, precio lateral
2. Markup: el precio sube, el público entra
3. Distribución: las ballenas venden, precio lateral arriba
4. Markdown: el precio baja, pánico

Fases de la acumulación (esquema):
- Fase A: Stopping (se detiene la caída)
- Fase B: Acumulación (rango lateral)
- Fase C: Spring/Test (trampa bajista)
- Fase D: Sign of Strength (ruptura alcista)
- Fase E: Markup (tendencia alcista)`,
    keyTakeaway: "Seguí las huellas del smart money. No pelees contra las ballenas.",
  },
  {
    id: "elliott-wave",
    title: "Ondas de Elliott",
    difficulty: 4,
    category: "estrategia",
    content: `Ralph Nelson Elliott descubrió que los mercados se mueven en patrones de ondas repetitivos basados en la psicología de masas.

Estructura básica (ciclo completo):
- 5 ondas impulsivas (a favor de la tendencia): 1, 2, 3, 4, 5
- 3 ondas correctivas (contra la tendencia): A, B, C

Reglas innegociables:
- Onda 2 no puede retroceder más del 100% de onda 1
- Onda 3 NUNCA es la más corta
- Onda 4 no puede entrar en territorio de onda 1

Extensiones comunes: Fibonacci (0.382, 0.5, 0.618, 0.786)`,
    keyTakeaway: "El mercado respira en ondas. Aprendé a contar, no a predecir.",
  },
];

export const TRADING_QUIZZES: TradingQuiz[] = [
  {
    id: "quiz-velas",
    lessonId: "velas-japonesas",
    title: "Quiz: Velas Japonesas",
    xpReward: 100,
    questions: [
      {
        id: "q1",
        question: "¿Qué significa una vela verde?",
        options: [
          { id: "a", text: "El precio bajó", correct: false },
          { id: "b", text: "El cierre fue mayor que la apertura", correct: true },
          { id: "c", text: "Hubo mucho volumen", correct: false },
          { id: "d", text: "El mercado está cerrado", correct: false },
        ],
        explanation: "Vela verde = cierre > apertura. Los compradores dominaron ese período.",
      },
      {
        id: "q2",
        question: "Un Doji indica:",
        options: [
          { id: "a", text: "Fuerte tendencia alcista", correct: false },
          { id: "b", text: "Indecisión en el mercado", correct: true },
          { id: "c", text: "Que el mercado va a cerrar", correct: false },
          { id: "d", text: "Alto volumen de trading", correct: false },
        ],
        explanation: "Un Doji se forma cuando apertura ≈ cierre. Representa indecisión entre compradores y vendedores.",
      },
    ],
  },
  {
    id: "quiz-riesgo",
    lessonId: "gestion-riesgo",
    title: "Quiz: Gestión de Riesgo",
    xpReward: 150,
    questions: [
      {
        id: "q1",
        question: "¿Cuál es el riesgo máximo recomendado por operación?",
        options: [
          { id: "a", text: "10% del capital", correct: false },
          { id: "b", text: "1-2% del capital", correct: true },
          { id: "c", text: "50% del capital", correct: false },
          { id: "d", text: "No hay límite", correct: false },
        ],
        explanation: "La regla de oro: nunca más del 1-2%. Te permite sobrevivir a rachas perdedoras.",
      },
      {
        id: "q2",
        question: "¿Qué es un Stop Loss?",
        options: [
          { id: "a", text: "Una orden para comprar más", correct: false },
          { id: "b", text: "Un precio donde cerrás la operación si va en tu contra", correct: true },
          { id: "c", text: "El precio más alto del día", correct: false },
          { id: "d", text: "Una estrategia de scalping", correct: false },
        ],
        explanation: "El Stop Loss es tu red de seguridad. Define tu riesgo máximo antes de entrar.",
      },
    ],
  },
  {
    id: "quiz-wyckoff",
    lessonId: "wyckoff",
    title: "Quiz: Método Wyckoff",
    xpReward: 200,
    questions: [
      {
        id: "q1",
        question: "¿Cuántas fases tiene el ciclo de Wyckoff?",
        options: [
          { id: "a", text: "2", correct: false },
          { id: "b", text: "4", correct: true },
          { id: "c", text: "6", correct: false },
          { id: "d", text: "8", correct: false },
        ],
        explanation: "4 fases: Acumulación, Markup, Distribución y Markdown.",
      },
      {
        id: "q2",
        question: "¿Qué es un Spring en Wyckoff?",
        options: [
          { id: "a", text: "Una estación del año", correct: false },
          { id: "b", text: "Una trampa bajista antes de subir", correct: true },
          { id: "c", text: "Un indicador técnico", correct: false },
          { id: "d", text: "El cierre del mercado", correct: false },
        ],
        explanation: "El Spring es una falsa ruptura bajista diseñada para sacar a los traders débiles antes del markup.",
      },
    ],
  },
];
