"use client";

import { useEffect, useRef, useState } from "react";
import { useTradingStore } from "@/stores/useTradingStore";
import { useGameStore } from "@/stores/useGameStore";
import { createChart, type IChartApi } from "lightweight-charts";
import { X, TrendingUp, DollarSign } from "lucide-react";

function TradingChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candles = useTradingStore((s) => s.candles);

  useEffect(() => {
    if (!containerRef.current) return;
    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 280,
      layout: { background: { color: "#0a0f1a" }, textColor: "#64748B" },
      grid: { vertLines: { color: "#1e293b" }, horzLines: { color: "#1e293b" } },
      timeScale: { timeVisible: true, borderColor: "#1e293b" },
    });
    chartRef.current = chart;
    const candleSeries = chart.addCandlestickSeries({
      upColor: "#10B981", downColor: "#EF4444",
      borderUpColor: "#10B981", borderDownColor: "#EF4444",
      wickUpColor: "#10B981", wickDownColor: "#EF4444",
    });
    candleSeries.setData(candles);
    chart.timeScale().fitContent();

    return () => chart.remove();
  }, []);

  // Update data
  useEffect(() => {
    if (!chartRef.current || candles.length === 0) return;
    const series = chartRef.current.series()[0];
    const last = candles[candles.length - 1];
    series.update(last as any);
  }, [candles]);

  return <div ref={containerRef} className="w-full h-[280px]" />;
}

export function TradingPanel() {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const currentPrice = useTradingStore((s) => s.currentPrice);
  const balance = useTradingStore((s) => s.balance);
  const openTrades = useTradingStore((s) => s.openTrades);
  const totalPnl = useTradingStore((s) => s.totalPnl);
  const generateCandles = useTradingStore((s) => s.generateCandles);
  const openTrade = useTradingStore((s) => s.openTrade);
  const closeTrade = useTradingStore((s) => s.closeTrade);
  const addXp = useGameStore((s) => s.addXp);
  const currentPriceRef = useRef(currentPrice);
  currentPriceRef.current = currentPrice;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "c") {
        setOpen((o) => {
          if (!o) generateCandles();
          return !o;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [generateCandles]);

  // Live price updates
  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      useTradingStore.getState().updatePrice();
    }, 1000);
    return () => clearInterval(interval);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#0a0f1a] border border-white/10 rounded-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp size={18} className="text-cyan-400" />
            Terminal de Trading
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-cyan-300">
              BTCUSDT ${currentPrice.toFixed(2)}
            </span>
            <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="p-4">
          <TradingChart />
        </div>

        {/* Trading controls */}
        <div className="p-4 border-t border-white/10 grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <DollarSign size={14} className="text-zinc-500" />
              <span className="text-sm text-zinc-400">Balance:</span>
              <span className="text-sm font-bold text-white">${balance.toFixed(2)}</span>
              <span className={`text-xs ml-auto ${totalPnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                P&L: ${totalPnl.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-zinc-500">Cantidad:</label>
              <input
                type="number"
                min={0.01}
                step={0.01}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-24 px-2 py-1 bg-white/5 border border-white/10 rounded text-sm text-white"
              />
              <span className="text-xs text-zinc-600">
                ≈ ${(currentPrice * quantity).toFixed(0)}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openTrade("buy", quantity)}
                className="flex-1 py-2.5 bg-green-500/20 border border-green-500/40 text-green-300 font-bold rounded-lg hover:bg-green-500/30 text-sm"
              >
                COMPRAR
              </button>
              <button
                onClick={() => openTrade("sell", quantity)}
                className="flex-1 py-2.5 bg-red-500/20 border border-red-500/40 text-red-300 font-bold rounded-lg hover:bg-red-500/30 text-sm"
              >
                VENDER
              </button>
            </div>
          </div>

          {/* Open positions */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-3">
            <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2">
              Posiciones ({openTrades.length})
            </h3>
            {openTrades.length === 0 ? (
              <p className="text-xs text-zinc-600 text-center py-4">Sin posiciones abiertas</p>
            ) : (
              <div className="space-y-1 max-h-[140px] overflow-auto">
                {openTrades.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between text-xs py-1 px-2 rounded bg-white/5"
                  >
                    <span className={t.side === "buy" ? "text-green-400" : "text-red-400"}>
                      {t.side.toUpperCase()} {t.quantity}
                    </span>
                    <span className="text-zinc-500">@{t.entryPrice.toFixed(0)}</span>
                    <span className={(t.pnl ?? 0) >= 0 ? "text-green-300" : "text-red-300"}>
                      {(t.pnl ?? 0) >= 0 ? "+" : ""}${(t.pnl ?? 0).toFixed(2)}
                    </span>
                    <button
                      onClick={() => { closeTrade(t.id); if ((t.pnl ?? 0) > 0) addXp(Math.floor(t.pnl ?? 0)); }}
                      className="px-2 py-0.5 bg-white/10 rounded text-white/60 hover:bg-white/20 text-[10px]"
                    >
                      Cerrar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="text-white/20 text-xs text-center pb-4">Presioná C para cerrar · Precios simulados</p>
      </div>
    </div>
  );
}
