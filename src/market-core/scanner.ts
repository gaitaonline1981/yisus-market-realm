import { percentChange } from "./intelligence";
import type { Candle, PublicExchangeAdapter } from "./types";

export type Opportunity = {
  symbol: string;
  changePercent: number;
  volumeScore: number;
  note: string;
};

export async function scanPublicMomentum(adapter: PublicExchangeAdapter, symbols: string[], interval = "15m"): Promise<Opportunity[]> {
  const rows = await Promise.all(symbols.map(async (symbol) => {
    try {
      const candles: Candle[] = await adapter.getCandles(symbol, interval, 64);
      const changePercent = percentChange(candles, 24);
      const recentVolume = candles.slice(-12).reduce((sum, candle) => sum + candle.volume, 0);
      const priorVolume = candles.slice(-24, -12).reduce((sum, candle) => sum + candle.volume, 0) || 1;
      const volumeScore = Math.round(Math.min(100, (recentVolume / priorVolume) * 50));
      return {
        symbol,
        changePercent,
        volumeScore,
        note: changePercent > 1.5 && volumeScore > 58 ? "Momentum plus volume expansion" : "Watchlist candidate"
      };
    } catch {
      return null;
    }
  }));
  return rows.filter((row): row is Opportunity => Boolean(row)).sort((a, b) => b.volumeScore + Math.abs(b.changePercent) - (a.volumeScore + Math.abs(a.changePercent))).slice(0, 5);
}
