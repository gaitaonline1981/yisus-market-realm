import { create } from "zustand";

interface RemotePlayer {
  id: string;
  position: [number, number, number];
  rotation: number;
  characterId: string;
  name: string;
}

interface ChatMessage {
  id: string;
  playerId: string;
  name: string;
  text: string;
  timestamp: number;
}

interface MultiplayerStore {
  connected: boolean;
  playerId: string;
  players: Map<string, RemotePlayer>;
  messages: ChatMessage[];
  connect: (name: string, characterId: string) => void;
  disconnect: () => void;
  sendPosition: (pos: [number, number, number], rot: number) => void;
  sendChat: (text: string) => void;
}

let ws: WebSocket | null = null;

export const useMultiplayerStore = create<MultiplayerStore>((set, get) => ({
  connected: false,
  playerId: "",
  players: new Map(),
  messages: [],

  connect: (name, characterId) => {
    try {
      ws = new WebSocket("ws://localhost:3002");
      ws.onopen = () => {
        ws?.send(JSON.stringify({ type: "setName", name, characterId }));
      };
      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        const state = get();
        if (msg.type === "init") {
          const map = new Map<string, RemotePlayer>();
          msg.players.forEach((p: RemotePlayer) => map.set(p.id, p));
          set({ connected: true, playerId: msg.id, players: map });
        } else if (msg.type === "join") {
          const newMap = new Map(state.players);
          newMap.set(msg.player.id, msg.player);
          set({ players: newMap });
        } else if (msg.type === "leave") {
          const newMap = new Map(state.players);
          newMap.delete(msg.id);
          set({ players: newMap });
        } else if (msg.type === "move") {
          const p = state.players.get(msg.id);
          if (p) {
            const newMap = new Map(state.players);
            newMap.set(msg.id, { ...p, position: msg.position, rotation: msg.rotation });
            set({ players: newMap });
          }
        } else if (msg.type === "chat") {
          set({
            messages: [
              ...state.messages.slice(-49),
              { id: `${Date.now()}-${Math.random()}`, playerId: msg.id, name: msg.name, text: msg.text, timestamp: Date.now() },
            ],
          });
        } else if (msg.type === "update") {
          const p = state.players.get(msg.id);
          if (p) {
            const newMap = new Map(state.players);
            newMap.set(msg.id, { ...p, name: msg.name, characterId: msg.characterId });
            set({ players: newMap });
          }
        }
      };
      ws.onclose = () => set({ connected: false });
    } catch {}
  },

  disconnect: () => {
    ws?.close();
    ws = null;
    set({ connected: false });
  },

  sendPosition: (pos, rot) => {
    if (ws?.readyState === 1) {
      ws.send(JSON.stringify({ type: "move", position: pos, rotation: rot }));
    }
  },

  sendChat: (text) => {
    if (ws?.readyState === 1) {
      ws.send(JSON.stringify({ type: "chat", text }));
    }
  },
}));
