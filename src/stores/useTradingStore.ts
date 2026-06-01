import { create } from "zustand";
import { createBinanceAdapter, type ExchangeAdapter } from "@/game/trading/exchangeAdapter";

export interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface Trade {
  id: string;
  side: "buy" | "sell";
  entryPrice: number;
  quantity: number;
  openTime: number;
  closePrice?: number;
  closeTime?: number;
  pnl?: number;
  symbol: string;
}

interface TradingStore {
  symbol: string;
  candles: CandleData[];
  currentPrice: number;
  balance: number;
  equity: number;
  openTrades: Trade[];
  closedTrades: Trade[];
  generateCandles: () => void;
  updatePrice: () => void;
  openTrade: (side: "buy" | "sell", quantity: number) => void;
  closeTrade: (tradeId: string) => void;
  totalPnl: number;
  useRealData: boolean;
  fetchRealCandles: (symbol: string, interval: string) => Promise<void>;
}

function randomWalk(price: number, volatility = 0.002): number {
  const change = (Math.random() - 0.48) * volatility;
  return Math.max(price * (1 + change), price * 0.0001);
}

export const useTradingStore = create<TradingStore>((set, get) => ({
  symbol: "BTCUSDT",
  candles: [],
  currentPrice: 87000,
  balance: 10000,
  equity: 10000,
  openTrades: [],
  closedTrades: [],
  totalPnl: 0,
  useRealData: false,

  fetchRealCandles: async (symbol, interval) => {
    try {
      const adapter = createBinanceAdapter();
      const candles = await adapter.getCandles(symbol, interval, 500);
      if (candles.length > 0) {
        set({ candles, currentPrice: candles[candles.length - 1].close, useRealData: true });
      }
    } catch {
      // Fall back to simulation
      get().generateCandles();
    }
  },

  generateCandles: () => {
    const now = Math.floor(Date.now() / 1000);
    const candles: CandleData[] = [];
    let price = 85000 + Math.random() * 5000;
    for (let i = 500; i >= 0; i--) {
      const open = price;
      price = randomWalk(price, 0.003);
      const close = price;
      const high = Math.max(open, close) * (1 + Math.random() * 0.002);
      const low = Math.min(open, close) * (1 - Math.random() * 0.002);
      candles.push({ time: now - i * 60, open, high, low, close });
    }
    set({ candles, currentPrice: candles[candles.length - 1].close });
  },

  updatePrice: () => {
    const { candles, currentPrice, openTrades } = get();
    if (candles.length === 0) return;
    const newPrice = randomWalk(currentPrice, 0.001);
    const now = Math.floor(Date.now() / 1000);
    const lastCandle = candles[candles.length - 1];
    const newCandle: CandleData = {
      time: now,
      open: lastCandle?.close ?? newPrice,
      high: Math.max(lastCandle?.close ?? newPrice, newPrice),
      low: Math.min(lastCandle?.close ?? newPrice, newPrice),
      close: newPrice,
    };

    // Update unrealized PnL
    const updatedTrades = openTrades.map((t) => ({
      ...t,
      pnl: t.side === "buy"
        ? (newPrice - t.entryPrice) * t.quantity
        : (t.entryPrice - newPrice) * t.quantity,
    }));

    set({
      currentPrice: newPrice,
      candles: [...candles.slice(-499), newCandle],
      openTrades: updatedTrades,
    });
  },

  openTrade: (side, quantity) => {
    const { currentPrice, balance, openTrades } = get();
    const cost = currentPrice * quantity * 0.01; // 1% margin
    if (cost > balance) return;
    const trade: Trade = {
      id: `trade-${Date.now()}`,
      side,
      entryPrice: currentPrice,
      quantity,
      openTime: Date.now(),
      symbol: "BTCUSDT",
    };
    set({
      openTrades: [...openTrades, trade],
      balance: balance - cost,
    });
  },

  closeTrade: (tradeId) => {
    const { openTrades, closedTrades, currentPrice, balance } = get();
    const trade = openTrades.find((t) => t.id === tradeId);
    if (!trade) return;
    const pnl = trade.side === "buy"
      ? (currentPrice - trade.entryPrice) * trade.quantity
      : (trade.entryPrice - currentPrice) * trade.quantity;
    const closed: Trade = { ...trade, closePrice: currentPrice, closeTime: Date.now(), pnl };
    set({
      openTrades: openTrades.filter((t) => t.id !== tradeId),
      closedTrades: [...closedTrades, closed],
      balance: balance + pnl + currentPrice * trade.quantity * 0.01,
      totalPnl: get().totalPnl + pnl,
    });
  },
}));
