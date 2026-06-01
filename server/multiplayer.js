const { WebSocketServer } = require("ws");

const PORT = 3002;
const wss = new WebSocketServer({ port: PORT });
const players = new Map();

console.log(`[Multiplayer] WebSocket server running on ws://localhost:${PORT}`);

wss.on("connection", (ws) => {
  const id = `player-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  players.set(id, { id, position: [0, 1, 5], rotation: 0, characterId: "ticker", name: "Trader" });

  console.log(`[+] ${id} connected (${players.size} online)`);

  // Send current state to new player
  ws.send(JSON.stringify({ type: "init", id, players: Array.from(players.values()) }));

  // Broadcast new player to others
  broadcast({ type: "join", player: players.get(id) }, id);

  ws.on("message", (data) => {
    try {
      const msg = JSON.parse(data.toString());
      if (msg.type === "move" && players.has(id)) {
        const p = players.get(id);
        p.position = msg.position;
        p.rotation = msg.rotation;
        broadcast({ type: "move", id, position: msg.position, rotation: msg.rotation }, id);
      }
      if (msg.type === "chat" && players.has(id)) {
        broadcast({ type: "chat", id, name: players.get(id).name, text: msg.text }, null);
      }
      if (msg.type === "setName" && players.has(id)) {
        players.get(id).name = msg.name || "Trader";
        players.get(id).characterId = msg.characterId || "ticker";
        broadcast({ type: "update", id, ...players.get(id) }, id);
      }
    } catch {}
  });

  ws.on("close", () => {
    players.delete(id);
    broadcast({ type: "leave", id }, null);
    console.log(`[-] ${id} left (${players.size} online)`);
  });
});

function broadcast(msg, excludeId) {
  const data = JSON.stringify(msg);
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(data);
    }
  });
}

console.log("[Multiplayer] Ready. Connect to ws://localhost:3002");
