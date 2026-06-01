"use client";

import { useState, useEffect, useRef } from "react";
import { useMultiplayerStore } from "@/stores/useMultiplayerStore";
import { MessageCircle, X } from "lucide-react";

export function ChatPanel() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const messages = useMultiplayerStore((s) => s.messages);
  const sendChat = useMultiplayerStore((s) => s.sendChat);
  const connected = useMultiplayerStore((s) => s.connected);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !open) {
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendChat(input.trim());
    setInput("");
  };

  return (
    <>
      {/* Chat toggle button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/70 border border-white/10 rounded-full px-4 py-2 text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <MessageCircle size={14} className="inline mr-1" />
          {connected ? "Chat (Enter)" : "Desconectado"}
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[400px] max-w-[90vw]">
          <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
              <span className="text-xs text-white/60 font-bold">
                {connected ? `Chat · ${messages.length} mensajes` : "Desconectado"}
              </span>
              <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-48 overflow-y-auto p-3 space-y-2">
              {messages.length === 0 && (
                <p className="text-xs text-zinc-600 text-center py-6">No hay mensajes. ¡Sé el primero!</p>
              )}
              {messages.map((msg) => (
                <div key={msg.id} className="text-xs">
                  <span className="text-indigo-400 font-bold">{msg.name}</span>
                  <span className="text-zinc-600 mx-1">·</span>
                  <span className="text-zinc-300">{msg.text}</span>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex border-t border-white/10">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Escribí un mensaje..."
                className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2.5 text-xs text-cyan-400 font-bold hover:bg-white/5"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
