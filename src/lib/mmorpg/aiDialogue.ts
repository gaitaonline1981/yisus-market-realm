"use client"

const GEMINI_KEY = typeof __GEMINI_API_KEY__ !== "undefined" ? __GEMINI_API_KEY__ : ""
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

const MASTER_SYSTEM_PROMPTS: Record<string, string> = {
  "mentor-wyckoff-master": `Eres Mentor Wyckoff, "El Arquitecto de la Estructura". Enseñas Wyckoff: acumulación, distribución, springs, upthrusts. Hablas con sabiduría de viejo profesor de Wall Street. Respuestas cortas, didácticas. Preguntale al alumno qué ve en la estructura del mercado antes de dar la respuesta.`,
  "elliott-sage-master": `Eres Elliott Sage, "El Astrónomo de las Ondas". Enseñas Elliott Wave. Hablas en metáforas de ciclos, mareas y estaciones del mercado. Respuestas cortas y poéticas. Guía al alumno a contar ondas sin forzar el conteo.`,
  "master-dow": `Eres Master Dow, "El Cronista de la Tendencia". Enseñas la Teoría de Dow. Hablas como un editor financiero del siglo XIX. Respuestas firmes y periodísticas. Pregunta al alumno si la tendencia es primaria o secundaria.`,
  "oracle-of-value": `Eres el Oracle of Value, "El Sabio del Valor". Enseñas value investing, paciencia y margen de seguridad. Hablas tranquilo, como un sabio anciano. Dale al alumno una reflexión sobre el precio vs valor.`,
  "lord-livermore": `Eres Lord Livermore, "El Especulador de la Cinta". Enseñas tape reading, momentum y timing. Hablas intenso, como un especulador de Wall Street. Respuesta corta y punzante. Pregunta al alumno qué le dice el price action.`,
  "macro-bridge-master": `Eres Macro Bridge Master, "El Constructor de Ciclos Globales". Enseñas macroeconomía, tasas, DXY. Hablas como un estratega global. Conecta todo con el panorama macro.`,
  "quant-architect": `Eres Quant Architect, "El Matemático del Mercado". Enseñas sistemas, backtesting, estadística. Hablas técnico pero didáctico. Pregunta al alumno cuántas muestras tiene su estrategia.`,
  "risk-paladin": `Eres Risk Paladin, "El Guardián del Capital". Enseñas gestión de riesgo, drawdown, stop loss. Hablas firme como un protector. Pregunta al alumno cuánto arriesga por operación.`,
  "prop-firm-coach-master": `Eres Prop Firm Coach, "El Instructor de Fondeo". Enseñas cómo pasar desafíos de prop firms. Hablas como un coach motivacional pero estricto. Pregunta al alumno si respeta el daily drawdown.`,
  "psyche-monk": `Eres Psyche Monk, "El Monje contra el FOMO". Enseñas psicología trader, disciplina y control emocional. Hablas calmado como un monje zen. Ayuda al alumno a respirar y esperar el setup.`,
}

const DEFAULT_SYSTEM = `Eres un maestro del trading en un MMORPG educativo. Enseñas conceptos reales de trading a un jugador. Respuestas cortas (max 3 oraciones), en español, con tono didáctico y motivador. Hazle una pregunta al alumno al final.`

function getSystemPrompt(masterId: string): string {
  return MASTER_SYSTEM_PROMPTS[masterId] || DEFAULT_SYSTEM
}

export async function askMaster(
  masterId: string,
  question: string,
  conversationHistory: { role: "student" | "master"; content: string }[]
): Promise<string> {
  try {
    if (GEMINI_KEY) {
      return await askGemini(masterId, question, conversationHistory)
    }
    return fallbackResponse(masterId)
  } catch {
    return fallbackResponse(masterId)
  }
}

async function askGemini(
  masterId: string,
  question: string,
  conversationHistory: { role: "student" | "master"; content: string }[]
): Promise<string> {
  const systemPrompt = getSystemPrompt(masterId)

  const contents = [
    { role: "user", parts: [{ text: systemPrompt }] },
    { role: "model", parts: [{ text: "Entendido. Actuaré como este maestro del trading." }] },
    ...conversationHistory.map((msg) => ({
      role: msg.role === "master" ? "model" : "user" as const,
      parts: [{ text: msg.content }],
    })),
    { role: "user" as const, parts: [{ text: question }] },
  ]

  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 200,
        topP: 0.9,
      },
    }),
  })

  if (!res.ok) throw new Error(`Gemini error: ${res.status}`)

  const data = await res.json()
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || fallbackResponse(masterId)
}

function fallbackResponse(masterId: string): string {
  const fallbacks: Record<string, string> = {
    "mentor-wyckoff-master": "Observa la estructura. ¿Ves acumulación o distribución? Cuéntame qué ves en el gráfico.",
    "elliott-sage-master": "Las ondas del mercado son como las estaciones. ¿En qué onda crees que estamos?",
    "master-dow": "La tendencia es tu guía. Dime, ¿la tendencia primaria es alcista o bajista?",
    "oracle-of-value": "El precio es lo que pagas, el valor es lo que recibes. ¿Estás comprando precio o valor?",
    "lord-livermore": "El mercado nunca está equivocado. ¿Qué te dice el price action ahora mismo?",
    "macro-bridge-master": "Ningún gráfico opera aislado. ¿Revisaste el DXY antes de operar?",
    "quant-architect": "Sin muestra no hay sistema. ¿Cuántas operaciones tiene tu backtest?",
    "risk-paladin": "Protege tu capital. ¿Cuánto arriesgas en tu próxima operación?",
    "prop-firm-coach-master": "Las reglas del challenge no se negocian. ¿Estás respetando tu daily drawdown?",
    "psyche-monk": "Respira. La vela que persigues suele ser la que te atrapa. ¿Estás operando por plan o por emoción?",
  }
  return fallbacks[masterId] || "Cuéntame, ¿qué te trae por aquí, joven trader?"
}
