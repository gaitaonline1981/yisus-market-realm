import { useEffect, useRef } from "react";
import { createChart, ColorType, type IChartApi } from "lightweight-charts";
import type { Candle } from "@cl/market-core";

type Props = {
  candles: Candle[];
};

export function ChartPanel({ candles }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || candles.length === 0) return;
    const chart: IChartApi = createChart(containerRef.current, {
      height: 410,
      layout: {
        background: { type: ColorType.Solid, color: "#07110d" },
        textColor: "#9bd7ad"
      },
      grid: {
        vertLines: { color: "rgba(102, 255, 150, 0.08)" },
        horzLines: { color: "rgba(102, 255, 150, 0.08)" }
      },
      rightPriceScale: { borderColor: "rgba(102, 255, 150, 0.18)" },
      timeScale: { borderColor: "rgba(102, 255, 150, 0.18)", timeVisible: true },
      crosshair: { mode: 1 }
    });
    const series = chart.addCandlestickSeries({
      upColor: "#50ff8a",
      downColor: "#ff5370",
      borderVisible: false,
      wickUpColor: "#50ff8a",
      wickDownColor: "#ff5370"
    });
    series.setData(candles.map((candle) => ({
      time: candle.time as never,
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close
    })));
    chart.timeScale().fitContent();
    const resize = () => chart.applyOptions({ width: containerRef.current?.clientWidth ?? 900 });
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      chart.remove();
    };
  }, [candles]);

  return <div className="chart-shell" ref={containerRef} />;
}
