import { useEffect, useMemo, useState } from "react";
import { binanceAdapter, evaluateSetupQuality, scanPublicMomentum, summarizeMarketRegime, type MarketSnapshot, type Opportunity } from "@cl/market-core";

export function useMarketData(symbol: string, interval: string) {
  const [snapshot, setSnapshot] = useState<MarketSnapshot | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [status, setStatus] = useState("Loading public market data");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setStatus("Loading public market data");
        const [candles, orderBook, trades, scanner] = await Promise.all([
          binanceAdapter.getCandles(symbol, interval, 180),
          binanceAdapter.getOrderBook(symbol, 20),
          binanceAdapter.getRecentTrades(symbol, 26),
          scanPublicMomentum(binanceAdapter, ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT"], "15m")
        ]);
        if (!cancelled) {
          setSnapshot({ exchange: "binance", symbol, candles, orderBook, trades });
          setOpportunities(scanner);
          setStatus("Live public data from Binance Spot");
        }
      } catch (error) {
        if (!cancelled) setStatus(error instanceof Error ? error.message : "Unable to load market data");
      }
    }
    load();
    const timer = window.setInterval(load, 30000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [symbol, interval]);

  const intelligence = useMemo(() => {
    if (!snapshot) return null;
    return {
      regime: summarizeMarketRegime(snapshot.candles),
      setup: evaluateSetupQuality(snapshot)
    };
  }, [snapshot]);

  return { snapshot, opportunities, intelligence, status };
}
