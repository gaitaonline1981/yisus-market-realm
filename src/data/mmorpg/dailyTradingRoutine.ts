export type DailyRoutineTaskCategory = "market_overview" | "watchlist" | "macro" | "liquidity" | "risk" | "psychology" | "journal"

export interface DailyRoutineTask {
  id: string
  title: string
  category: DailyRoutineTaskCategory
  description: string
  tradingMeaning: string
  terminalMode?: "overview" | "watchlist" | "macro" | "liquidity" | "risk"
  required: boolean
  rewardXp: number
}

export const dailyTradingRoutineTasks: DailyRoutineTask[] = [
  { id: "daily-market-overview", title: "Revisar régimen de mercado", category: "market_overview",
    description: "Revisá el overview mock del Market Terminal.",
    tradingMeaning: "Antes de operar, el trader debe saber si el mercado está en rango, tendencia, volatilidad o evento.",
    terminalMode: "overview", required: true, rewardXp: 10 },
  { id: "daily-watchlist", title: "Revisar watchlist", category: "watchlist",
    description: "Observá activos principales de la watchlist ficticia.",
    tradingMeaning: "El trader necesita saber qué activos tienen fuerza relativa, debilidad o volatilidad.",
    terminalMode: "watchlist", required: true, rewardXp: 10 },
  { id: "daily-macro", title: "Revisar eventos macro", category: "macro",
    description: "Revisá el calendario macro ficticio.",
    tradingMeaning: "Eventos como CPI, FOMC o empleo pueden cambiar el comportamiento del mercado.",
    terminalMode: "macro", required: true, rewardXp: 15 },
  { id: "daily-liquidity", title: "Revisar zonas de liquidez", category: "liquidity",
    description: "Mirá las zonas mock de liquidez por encima y debajo del precio.",
    tradingMeaning: "La liquidez puede actuar como imán antes de movimientos importantes.",
    terminalMode: "liquidity", required: true, rewardXp: 15 },
  { id: "daily-risk-checklist", title: "Completar checklist de riesgo", category: "risk",
    description: "Confirmá stop, tamaño de posición, calendario, liquidez y estado emocional.",
    tradingMeaning: "La preparación de riesgo evita operar por impulso.",
    terminalMode: "risk", required: true, rewardXp: 20 },
  { id: "daily-emotional-check", title: "Chequeo emocional", category: "psychology",
    description: "Confirmá que no estás operando por FOMO, revancha o aburrimiento.",
    tradingMeaning: "La psicología afecta más decisiones de las que el trader quiere admitir.",
    required: true, rewardXp: 15 },
  { id: "daily-trading-journal-note", title: "Nota de diario trader", category: "journal",
    description: "Escribí una nota breve sobre tu plan o aprendizaje del día.",
    tradingMeaning: "Registrar proceso ayuda a mejorar consistencia.",
    required: false, rewardXp: 20 },
]
