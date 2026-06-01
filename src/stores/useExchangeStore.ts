import { create } from "zustand";
import type { ExchangeConfig } from "@/game/trading/exchangeAdapter";

interface ExchangeStore {
  exchanges: ExchangeConfig[];
  addExchange: (config: ExchangeConfig) => void;
  updateExchange: (id: string, updates: Partial<ExchangeConfig>) => void;
  removeExchange: (id: string) => void;
  getExchange: (id: string) => ExchangeConfig | undefined;
}

const DEFAULT_EXCHANGES: ExchangeConfig[] = [
  { id: "binance", name: "Binance", enabled: true, apiKey: "", secretKey: "", testnet: false },
  { id: "bybit", name: "Bybit", enabled: false, apiKey: "", secretKey: "", testnet: false },
];

function loadFromStorage(): ExchangeConfig[] {
  try {
    const raw = localStorage.getItem("yisus-exchanges");
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_EXCHANGES;
}

function saveToStorage(exchanges: ExchangeConfig[]) {
  try {
    localStorage.setItem("yisus-exchanges", JSON.stringify(exchanges));
  } catch {}
}

export const useExchangeStore = create<ExchangeStore>((set, get) => ({
  exchanges: [],
  addExchange: (config) =>
    set((s) => {
      const updated = [...s.exchanges, config];
      saveToStorage(updated);
      return { exchanges: updated };
    }),
  updateExchange: (id, updates) =>
    set((s) => {
      const updated = s.exchanges.map((e) => (e.id === id ? { ...e, ...updates } : e));
      saveToStorage(updated);
      return { exchanges: updated };
    }),
  removeExchange: (id) =>
    set((s) => {
      const updated = s.exchanges.filter((e) => e.id !== id);
      saveToStorage(updated);
      return { exchanges: updated };
    }),
  getExchange: (id) => get().exchanges.find((e) => e.id === id),
}));

// Initialize from storage
try {
  const stored = loadFromStorage();
  useExchangeStore.setState({ exchanges: stored });
} catch {}
