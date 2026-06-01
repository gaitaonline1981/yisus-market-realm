"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useChatStore, type ChatChannel } from "@/lib/mmorpg/chatSystem"
import { MessageCircle, X } from "lucide-react"

const CHANNEL_LABELS: Record<ChatChannel, string> = {
  global: "Global", whisper: "Whisper", party: "Party", system: "System", trade: "Trade",
}

const CHANNEL_COLORS: Record<ChatChannel, string> = {
  global: "#22D3EE", whisper: "#A78BFA", party: "#10B981", system: "#FACC15", trade: "#F59E0B",
}

export function WorldChatPanel() {
  const { messages, channels, activeChannel, sendMessage, setActiveChannel } = useChatStore()
  const [input, setInput] = useState("")
  const [open, setOpen] = useState(true)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  const handleSend = useCallback(() => {
    if (!input.trim()) return
    sendMessage(activeChannel, "Tú", input.trim())
    setInput("")
  }, [input, activeChannel, sendMessage])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const filtered = messages.filter((m) => m.channel === activeChannel || activeChannel === "global")

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex h-8 w-8 items-center justify-center rounded border border-white/10 bg-black/70 text-cyan-400 shadow-lg"
      >
        <MessageCircle size={14} />
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-72 rounded border border-white/10 bg-black/85 shadow-2xl">
      {/* Channel tabs */}
      <div className="flex items-center border-b border-white/5 bg-black/50">
        {channels.filter(c => c.id !== "system").map((ch) => (
          <button key={ch.id} onClick={() => setActiveChannel(ch.id)}
            className={`flex-1 py-1 text-[9px] font-bold uppercase tracking-wider transition ${
              activeChannel === ch.id ? "bg-white/10" : "text-zinc-600 hover:text-zinc-400"
            }`}
            style={activeChannel === ch.id ? { color: ch.color, borderBottom: `1px solid ${ch.color}` } : {}}
          >
            {ch.label}
          </button>
        ))}
        <button onClick={() => setOpen(false)} className="px-1.5 py-1 text-zinc-600 hover:text-zinc-400"><X size={12} /></button>
      </div>

      {/* Messages */}
      <div ref={listRef} className="h-28 overflow-y-auto px-2 py-1">
        {filtered.length === 0 && (
          <p className="py-3 text-center text-[9px] text-zinc-700">Bienvenido al Market Realm</p>
        )}
        {filtered.slice(-30).map((msg) => (
          <div key={msg.id} className="text-[10px] leading-relaxed">
            <span className="text-zinc-600">[{CHANNEL_LABELS[msg.channel]}] </span>
            <span className="font-bold text-zinc-400">{msg.sender}: </span>
            <span className="text-zinc-300">{msg.content}</span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-white/5 p-1">
        <input ref={inputRef} type="text" value={input}
          onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
          placeholder={`Decir en ${CHANNEL_LABELS[activeChannel]}...`}
          className="w-full rounded border border-white/10 bg-black/50 px-2 py-1 text-[10px] text-zinc-200 placeholder-zinc-700 focus:border-cyan-400/30 focus:outline-none"
        />
      </div>
    </div>
  )
}
