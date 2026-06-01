export type MultiplayerProvider = "partykit" | "colyseus" | "nakama"

export interface MultiplayerPlayer {
  id: string
  name: string
  characterId: string
  mountId?: string
  position: [number, number, number]
  rotation: number
  zoneId?: string
  isOnline: boolean
  lastSeen: string
}

export interface MultiplayerChatMessage {
  id: string
  playerId: string
  playerName: string
  message: string
  timestamp: string
  target?: string // para whispers
}

export interface MultiplayerRoom {
  id: string
  name: string
  type: "world" | "trading" | "guild" | "arena"
  playerCount: number
  maxPlayers: number
}

// Cliente → Servidor
export type ClientMessage =
  | { type: "join"; room: string; player: { id: string; name: string; characterId: string; mountId?: string } }
  | { type: "move"; position: [number, number, number]; rotation: number }
  | { type: "chat"; message: string; target?: string }
  | { type: "emote"; emote: string }
  | { type: "leave" }

// Servidor → Cliente
export type ServerMessage =
  | { type: "connected"; id: string }
  | { type: "room_state"; players: MultiplayerPlayer[] }
  | { type: "player_joined"; player: MultiplayerPlayer }
  | { type: "player_left"; playerId: string }
  | { type: "player_moved"; playerId: string; position: [number, number, number]; rotation: number }
  | { type: "chat"; playerId: string; playerName: string; message: string }
  | { type: "emote"; playerId: string; emote: string }
  | { type: "error"; message: string }

export type ConnectionStatus = "disconnected" | "connecting" | "connected" | "reconnecting"
