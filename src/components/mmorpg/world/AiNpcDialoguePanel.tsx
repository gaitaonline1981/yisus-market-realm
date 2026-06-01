"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { tradingMasters } from "@/data/mmorpg/tradingMasters"
import { askMaster } from "@/lib/mmorpg/aiDialogue"
import { MessageCircle, Send, User, Bot } from "lucide-react"

interface Message {
  role: "student" | "master"
  content: string
}

interface AiNpcDialoguePanelProps {
  masterId: string
  onClose: () => void
}

export function AiNpcDialoguePanel({ masterId, onClose }: AiNpcDialoguePanelProps) {
  const master = tradingMasters.find((m) => m.id === masterId)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (master) {
      const intro: Message = {
        role: "master",
        content: `Soy ${master.name}, ${master.alias}. ${master.iconicPhrase}. ¿Qué deseas aprender hoy?`,
      }
      setMessages([intro])
    }
  }, [masterId])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  const sendMessage = useCallback(async () => {
    if (!input.trim() || loading) return
    const question = input.trim()
    setInput("")
    setLoading(true)
    setMessages((prev) => [...prev, { role: "student", content: question }])

    try {
      const response = await askMaster(masterId, question, messages)
      setMessages((prev) => [...prev, { role: "master", content: response }])
    } catch {
      setMessages((prev) => [...prev, { role: "master", content: "Disculpa, estoy pensando... ¿podrías repetir la pregunta?" }])
    }
    setLoading(false)
  }, [input, loading, masterId, messages])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
    if (e.key === "Escape") onClose()
  }

  if (!master) return null

  return (
    <div className="fixed bottom-20 left-4 z-50 w-80 rounded-2xl border border-violet-400/20 bg-black/90 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/5 px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_6px_rgba(167,139,250,0.5)]" />
          <span className="text-[11px] font-bold text-violet-300">{master.name}</span>
          <span className="text-[8px] text-zinc-600">{master.alias}</span>
        </div>
        <button onClick={onClose} className="text-[10px] text-zinc-600 hover:text-zinc-400">
          ESC
        </button>
      </div>

      <div ref={listRef} className="h-64 space-y-2 overflow-y-auto px-3 py-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === "student" ? "justify-end" : "justify-start"}`}>
            {msg.role === "master" && (
              <div className="mt-1 shrink-0">
                <Bot size={14} className="text-violet-400" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed ${
                msg.role === "student"
                  ? "bg-cyan-400/10 text-cyan-200"
                  : "bg-violet-400/10 text-violet-200"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "student" && (
              <div className="mt-1 shrink-0">
                <User size={14} className="text-cyan-400" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-zinc-600">
            <div className="flex gap-0.5">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: "0ms" }} />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: "150ms" }} />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: "300ms" }} />
            </div>
            <span className="text-[10px]">{master.name} está pensando...</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 border-t border-white/5 p-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Preguntale a ${master.name}...`}
          className="flex-1 rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-[11px] text-zinc-200 placeholder-zinc-600 focus:border-violet-400/40 focus:outline-none"
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-400/20 text-violet-300 transition hover:bg-violet-400/30 disabled:opacity-30"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  )
}
