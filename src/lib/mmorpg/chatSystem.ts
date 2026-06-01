"use client"

import { create } from "zustand"

export type ChatChannel = "global" | "whisper" | "party" | "system" | "trade"

export interface ChatMessage {
  id: string
  channel: ChatChannel
  sender: string
  content: string
  timestamp: number
  target?: string
}

interface ChatState {
  messages: ChatMessage[]
  activeChannel: ChatChannel
  channels: { id: ChatChannel; label: string; color: string; unread: number }[]
  sendMessage: (channel: ChatChannel, sender: string, content: string, target?: string) => void
  addSystemMessage: (content: string) => void
  setActiveChannel: (channel: ChatChannel) => void
  clearChannel: (channel: ChatChannel) => void
}

let msgId = 0

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  activeChannel: "global",
  channels: [
    { id: "global", label: "Global", color: "#22D3EE", unread: 0 },
    { id: "trade", label: "Trade", color: "#F59E0B", unread: 0 },
    { id: "party", label: "Party", color: "#10B981", unread: 0 },
    { id: "whisper", label: "Whisper", color: "#A78BFA", unread: 0 },
    { id: "system", label: "System", color: "#FACC15", unread: 0 },
  ],
  sendMessage: (channel, sender, content, target) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { id: `msg-${++msgId}`, channel, sender, content, timestamp: Date.now(), target },
      ],
    })),
  addSystemMessage: (content) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { id: `sys-${++msgId}`, channel: "system", sender: "Sistema", content, timestamp: Date.now() },
      ],
    })),
  setActiveChannel: (channel) =>
    set((state) => ({
      activeChannel: channel,
      channels: state.channels.map((c) => (c.id === channel ? { ...c, unread: 0 } : c)),
    })),
  clearChannel: (channel) =>
    set((state) => ({
      channels: state.channels.map((c) => (c.id === channel ? { ...c, unread: 0 } : c)),
    })),
}))
