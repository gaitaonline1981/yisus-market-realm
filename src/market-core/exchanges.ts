import type { Candle, ExchangeId, OrderBook, PublicExchangeAdapter, RecentTrade } from "./types";

const binanceBaseUrl = "https://api.binance.com/api/v3";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Market data request failed: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

function encodeSymbol(symbol: string): string {
  return symbol.replace(/[^a-z0-9]/gi, "").toUpperCase();
}

export const binanceAdapter: PublicExchangeAdapter = {
  id: "binance",
  label: "Binance Spot",
  supportsLivePublicData: true,
  async getCandles(symbol, interval, limit = 180): Promise<Candle[]> {
    type Kline = [number, string, string, string, string, string];
    const data = await fetchJson<Kline[]>(`${binanceBaseUrl}/klines?symbol=${encodeSymbol(symbol)}&interval=${interval}&limit=${limit}`);
    return data.map((row) => ({
      time: Math.floor(row[0] / 1000),
      open: Number(row[1]),
      high: Number(row[2]),
      low: Number(row[3]),
      close: Number(row[4]),
      volume: Number(row[5])
    }));
  },
  async getOrderBook(symbol, limit = 20): Promise<OrderBook> {
    const data = await fetchJson<{ bids: [string, string][]; asks: [string, string][] }>(`${binanceBaseUrl}/depth?symbol=${encodeSymbol(symbol)}&limit=${limit}`);
    return {
      bids: data.bids.map(([price, quantity]) => ({ price: Number(price), quantity: Number(quantity) })),
      asks: data.asks.map(([price, quantity]) => ({ price: Number(price), quantity: Number(quantity) }))
    };
  },
  async getRecentTrades(symbol, limit = 24): Promise<RecentTrade[]> {
    const data = await fetchJson<Array<{ id: number; price: string; qty: string; time: number; isBuyerMaker: boolean }>>(`${binanceBaseUrl}/trades?symbol=${encodeSymbol(symbol)}&limit=${limit}`);
    return data.map((trade) => ({
      id: trade.id,
      price: Number(trade.price),
      quantity: Number(trade.qty),
      time: trade.time,
      side: trade.isBuyerMaker ? "sell" : "buy"
    }));
  }
};

function plannedAdapter(id: Exclude<ExchangeId, "binance">, label: string): PublicExchangeAdapter {
  const unavailable = async () => {
    throw new Error(`${label} adapter is scaffolded for the secure backend phase.`);
  };
  return {
    id,
    label,
    supportsLivePublicData: false,
    getCandles: unavailable,
    getOrderBook: unavailable,
    getRecentTrades: unavailable
  };
}

export const exchangeAdapters: Record<ExchangeId, PublicExchangeAdapter> = {
  binance: binanceAdapter,
  bingx: plannedAdapter("bingx", "BingX"),
  bybit: plannedAdapter("bybit", "Bybit"),
  okx: plannedAdapter("okx", "OKX")
};
