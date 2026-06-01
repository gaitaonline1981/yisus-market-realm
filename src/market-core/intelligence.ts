import type { Candle, MarketSnapshot } from "./types";

export type MarketRegime = {
  label: string;
  tone: "constructive" | "neutral" | "defensive";
  trendScore: number;
  volatilityScore: number;
  summary: string;
};

export type SetupQuality = {
  grade: "A" | "B" | "C" | "D";
  score: number;
  positives: string[];
  cautions: string[];
};

function average(values: number[]): number {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

export function percentChange(candles: Candle[], lookback = 24): number {
  if (candles.length < 2) return 0;
  const end = candles[candles.length - 1].close;
  const start = candles[Math.max(0, candles.length - lookback)].close;
  return ((end - start) / start) * 100;
}

export function summarizeMarketRegime(candles: Candle[]): MarketRegime {
  const recent = candles.slice(-48);
  const change = percentChange(recent, 48);
  const ranges = recent.map((candle) => ((candle.high - candle.low) / candle.close) * 100);
  const volatilityScore = Math.min(100, Math.round(average(ranges) * 28));
  const closes = recent.map((candle) => candle.close);
  const fast = average(closes.slice(-12));
  const slow = average(closes.slice(-36));
  const trendScore = Math.max(0, Math.min(100, Math.round(50 + change * 4 + (fast > slow ? 12 : -12))));
  const tone = trendScore > 62 ? "constructive" : trendScore < 42 ? "defensive" : "neutral";
  const label = tone === "constructive" ? "Momentum constructive" : tone === "defensive" ? "Risk-off rotation" : "Balanced auction";
  const summary = `${change >= 0 ? "+" : ""}${change.toFixed(2)}% lookback, ${volatilityScore > 58 ? "expanded" : "contained"} realized range, ${fast > slow ? "fast average above" : "fast average below"} slow average.`;
  return { label, tone, trendScore, volatilityScore, summary };
}

export function evaluateSetupQuality(snapshot: MarketSnapshot): SetupQuality {
  const candles = snapshot.candles;
  const latest = candles[candles.length - 1];
  const regime = summarizeMarketRegime(candles);
  const spread = snapshot.orderBook.asks[0] && snapshot.orderBook.bids[0]
    ? ((snapshot.orderBook.asks[0].price - snapshot.orderBook.bids[0].price) / latest.close) * 100
    : 0;
  const buyFlow = snapshot.trades.filter((trade) => trade.side === "buy").reduce((sum, trade) => sum + trade.quantity, 0);
  const sellFlow = snapshot.trades.filter((trade) => trade.side === "sell").reduce((sum, trade) => sum + trade.quantity, 0);
  let score = 50;
  if (regime.tone === "constructive") score += 18;
  if (regime.tone === "defensive") score -= 14;
  if (spread < 0.03) score += 8;
  if (buyFlow > sellFlow * 1.1) score += 10;
  if (regime.volatilityScore > 70) score -= 12;
  score = Math.max(0, Math.min(100, Math.round(score)));
  const grade = score >= 82 ? "A" : score >= 68 ? "B" : score >= 52 ? "C" : "D";
  return {
    grade,
    score,
    positives: [
      spread < 0.03 ? "Tight public-book spread" : "Spread is acceptable for observation",
      buyFlow >= sellFlow ? "Recent tape leans buyer-active" : "Seller activity is visible but measured",
      regime.tone === "constructive" ? "Trend context supports continuation setups" : "Context favors selective execution"
    ],
    cautions: [
      "Prototype signals are educational and not financial advice.",
      regime.volatilityScore > 70 ? "Volatility expansion can invalidate tight stops." : "Confirm liquidity and news context before action."
    ]
  };
}
