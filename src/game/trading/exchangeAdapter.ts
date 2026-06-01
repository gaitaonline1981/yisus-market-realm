export interface ExchangeConfig {
  id: string;
  name: string;
  enabled: boolean;
  apiKey: string;
  secretKey: string;
  testnet: boolean;
}

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface OrderBook {
  bids: { price: number; quantity: number }[];
  asks: { price: number; quantity: number }[];
}

export interface Ticker {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
}

export interface ExchangeAdapter {
  id: string;
  name: string;
  getCandles(symbol: string, interval: string, limit: number): Promise<Candle[]>;
  getOrderBook(symbol: string, limit: number): Promise<OrderBook>;
  getTicker(symbol: string): Promise<Ticker | null>;
  getServerTime(): Promise<number>;
}

const SYMBOLS: Record<string, string> = {
  BTCUSDT: "BTCUSDT", ETHUSDT: "ETHUSDT", SOLUSDT: "SOLUSDT",
  BNBUSDT: "BNBUSDT", XRPUSDT: "XRPUSDT", ADAUSDT: "ADAUSDT",
  DOGEUSDT: "DOGEUSDT", DOTUSDT: "DOTUSDT",
};

async function fetchJson(url: string, apiKey?: string): Promise<any> {
  const headers: Record<string, string> = {};
  if (apiKey) headers["X-MBX-APIKEY"] = apiKey;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function createBinanceAdapter(config?: ExchangeConfig): ExchangeAdapter {
  const baseUrl = config?.testnet ? "https://testnet.binance.vision/api/v3" : "https://api.binance.com/api/v3";

  return {
    id: "binance",
    name: "Binance",
    async getCandles(symbol, interval, limit = 500) {
      const raw = await fetchJson(`${baseUrl}/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`, config?.apiKey);
      return raw.map((k: any[]) => ({
        time: Math.floor(k[0] / 1000),
        open: Number(k[1]), high: Number(k[2]), low: Number(k[3]),
        close: Number(k[4]), volume: Number(k[5]),
      }));
    },
    async getOrderBook(symbol, limit = 20) {
      const raw = await fetchJson(`${baseUrl}/depth?symbol=${symbol}&limit=${limit}`, config?.apiKey);
      return {
        bids: raw.bids.map(([p, q]: string[]) => ({ price: Number(p), quantity: Number(q) })),
        asks: raw.asks.map(([p, q]: string[]) => ({ price: Number(p), quantity: Number(q) })),
      };
    },
    async getTicker(symbol) {
      const raw = await fetchJson(`${baseUrl}/ticker/24hr?symbol=${symbol}`, config?.apiKey);
      return {
        symbol: raw.symbol,
        price: Number(raw.lastPrice),
        change24h: Number(raw.priceChangePercent),
        volume24h: Number(raw.quoteVolume),
        high24h: Number(raw.highPrice),
        low24h: Number(raw.lowPrice),
      };
    },
    async getServerTime() {
      const raw = await fetchJson(`${baseUrl}/time`, config?.apiKey);
      return raw.serverTime;
    },
  };
}

export function createBybitAdapter(config?: ExchangeConfig): ExchangeAdapter {
  const baseUrl = config?.testnet ? "https://api-testnet.bybit.com/v5" : "https://api.bybit.com/v5";

  return {
    id: "bybit",
    name: "Bybit",
    async getCandles(symbol, interval, limit = 500) {
      const raw = await fetchJson(`${baseUrl}/market/kline?category=spot&symbol=${symbol}&interval=${intervalMap[interval] || "15"}&limit=${limit}`, config?.apiKey);
      return (raw.result.list || []).reverse().map((k: string[]) => ({
        time: Math.floor(Number(k[0]) / 1000),
        open: Number(k[1]), high: Number(k[2]), low: Number(k[3]),
        close: Number(k[4]), volume: Number(k[5]),
      }));
    },
    async getOrderBook(symbol, limit = 20) {
      const raw = await fetchJson(`${baseUrl}/market/orderbook?category=spot&symbol=${symbol}&limit=${limit}`, config?.apiKey);
      return {
        bids: (raw.result.b || []).map(([p, q]: string[]) => ({ price: Number(p), quantity: Number(q) })),
        asks: (raw.result.a || []).map(([p, q]: string[]) => ({ price: Number(p), quantity: Number(q) })),
      };
    },
    async getTicker(symbol) {
      const raw = await fetchJson(`${baseUrl}/market/tickers?category=spot&symbol=${symbol}`, config?.apiKey);
      const t = raw.result.list?.[0];
      if (!t) return null;
      return {
        symbol: t.symbol,
        price: Number(t.lastPrice),
        change24h: Number(t.price24hPcnt) * 100,
        volume24h: Number(t.quoteVolume24h || t.turnover24h),
        high24h: Number(t.highPrice24h),
        low24h: Number(t.lowPrice24h),
      };
    },
    async getServerTime() {
      const raw = await fetchJson(`${baseUrl}/market/time`, config?.apiKey);
      return Number(raw.result.timeSecond || raw.time);
    },
  };
}

const intervalMap: Record<string, string> = {
  "1m": "1", "5m": "5", "15m": "15", "30m": "30",
  "1h": "60", "4h": "240", "1d": "D", "1w": "W",
};

export const EXCHANGE_LIST = [
  { id: "binance", name: "Binance", icon: "🔶", description: "El exchange más grande del mundo. API pública sin key para datos." },
  { id: "bybit", name: "Bybit", icon: "🟣", description: "Derivados y spot. Excelente para trading activo." },
];
