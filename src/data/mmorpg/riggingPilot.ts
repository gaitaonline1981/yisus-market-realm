export interface RiggingPilotAnimation {
  name: string
  description: string
  required: boolean
}

export interface RiggingPilot {
  entityId: string
  entityName: string
  entityType: "character" | "mount"
  staticModelUrl: string
  riggedModelUrl: string
  thumbnailUrl: string
  status: "not_started" | "in_progress" | "testing" | "completed"
  animations: RiggingPilotAnimation[]
  notes: string[]
}

export const tickerRiggingPilot: RiggingPilot = {
  entityId: "ticker",
  entityName: "Ticker",
  entityType: "character",
  staticModelUrl: "/models/mmorpg/characters/ticker/ticker.glb",
  riggedModelUrl: "/models/mmorpg/characters/ticker/ticker-rigged.glb",
  thumbnailUrl: "/models/mmorpg/characters/ticker/thumbnail.png",
  status: "not_started",
  animations: [
    { name: "Idle", description: "Ticker quieto con respiración suave.", required: true },
    { name: "Walk", description: "Caminata corta y energética.", required: true },
    { name: "Run", description: "Carrera rápida estilo scalper.", required: true },
    { name: "Jump", description: "Salto pequeño.", required: false },
    { name: "Wave", description: "Saludo para showroom.", required: false },
    { name: "AnalyzeChart", description: "Ticker analiza o señala un gráfico.", required: false },
    { name: "Dash", description: "Movimiento rápido tipo scalping.", required: true },
    { name: "Skill_01", description: "Habilidad activa básica.", required: false },
    { name: "Ultimate", description: "Scalping Boost visual.", required: false },
  ],
  notes: [
    "No reemplazar ticker.glb.",
    "El archivo riggeado debe llamarse ticker-rigged.glb.",
    "Probar primero en Showroom antes de integrarlo al World.",
    "El modelo actual es estático y debe seguir funcionando como fallback.",
  ],
}
