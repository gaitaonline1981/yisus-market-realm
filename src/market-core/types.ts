export type ExchangeId = "binance" | "bingx" | "bybit" | "okx";

export type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type OrderBookLevel = {
  price: number;
  quantity: number;
};

export type OrderBook = {
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
};

export type RecentTrade = {
  id: number;
  price: number;
  quantity: number;
  time: number;
  side: "buy" | "sell";
};

export type MarketSnapshot = {
  exchange: ExchangeId;
  symbol: string;
  candles: Candle[];
  orderBook: OrderBook;
  trades: RecentTrade[];
};

export type PublicExchangeAdapter = {
  id: ExchangeId;
  label: string;
  supportsLivePublicData: boolean;
  getCandles(symbol: string, interval: string, limit?: number): Promise<Candle[]>;
  getOrderBook(symbol: string, limit?: number): Promise<OrderBook>;
  getRecentTrades(symbol: string, limit?: number): Promise<RecentTrade[]>;
};
