"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "motion/react"
import { ChartPanel } from "./ChartPanel"
import { useMarketData } from "../hooks/useMarketData"
import { DraggableCalculator } from "./DraggableCalculator"
import { MatrixPortal } from "./MatrixPortal"
import { AudioAmbience } from "./AudioAmbience"

const formatUsd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 })
const formatNumber = new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 })

function ParticlesBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = canvasRef.current; if (!c) return
    const ctx = c.getContext("2d"); if (!ctx) return
    let w = c.width = window.innerWidth, h = c.height = window.innerHeight
    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = []
    for (let i = 0; i < 60; i++) particles.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: Math.random() * 1.5 + 0.5 })

    function draw() {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(34, 211, 238, 0.3)"; ctx.fill()
      }
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - dist / 150) * 0.15})`
            ctx.stroke()
          }
        }
      }
      requestAnimationFrame(draw)
    }
    draw()
    const onResize = () => { w = c.width = window.innerWidth; h = c.height = window.innerHeight }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])
  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" />
}

function DataTicker() {
  const prices = ["BTC", "ETH", "SOL", "BNB", "DOGE", "ADA", "XRP", "DOT"]
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setOffset((o) => (o + 1) % prices.length), 2000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/5 bg-black/60 backdrop-blur-md">
      <div className="flex items-center gap-6 overflow-hidden px-4 py-1.5">
        {prices.map((p, i) => (
          <motion.span key={p} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-[11px] font-mono">
            <span className="font-bold text-zinc-300">{p}</span>
            <span className="text-emerald-400">${(Math.random() * 100000).toFixed(2)}</span>
            <span className="text-emerald-500">+{(Math.random() * 5).toFixed(2)}%</span>
          </motion.span>
        ))}
      </div>
    </div>
  )
}

function PriceGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = canvasRef.current; if (!c) return
    const ctx = c.getContext("2d"); if (!ctx) return
    c.width = 200; c.height = 200
    let angle = 0
    function draw() {
      angle += 0.02
      ctx.clearRect(0, 0, 200, 200)
      // Glow
      const grad = ctx.createRadialGradient(100, 100, 0, 100, 100, 80)
      grad.addColorStop(0, "rgba(34, 211, 238, 0.15)")
      grad.addColorStop(1, "rgba(34, 211, 238, 0)")
      ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(100, 100, 80, 0, Math.PI * 2); ctx.fill()
      // Orbit rings
      for (let i = 0; i < 3; i++) {
        ctx.beginPath(); ctx.ellipse(100, 100, 60 + i * 10, 25 + i * 5, angle + i, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.15 - i * 0.04})`
        ctx.stroke()
      }
      // Dots on orbit
      for (let i = 0; i < 8; i++) {
        const a = angle * 0.5 + (i / 8) * Math.PI * 2
        const x = 100 + Math.cos(a) * 65
        const y = 100 + Math.sin(a) * 28
        ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(34, 211, 238, 0.6)"; ctx.fill()
      }
      requestAnimationFrame(draw)
    }
    draw()
  }, [])
  return <canvas ref={canvasRef} width={200} height={200} className="shrink-0" />
}

export function TerminalPage() {
  const [symbol, setSymbol] = useState("BTCUSDT")
  const [interval, setInterval] = useState("15m")
  const [entry, setEntry] = useState(65000)
  const [stop, setStop] = useState(63700)
  const [equity, setEquity] = useState(10000)
  const [riskPercent, setRiskPercent] = useState(0.75)
  const [leverage, setLeverage] = useState(3)
  const { snapshot, intelligence, opportunities, status } = useMarketData(symbol, interval)

  const latest = (snapshot ? snapshot.candles[snapshot.candles.length - 1]?.close : undefined) ?? entry
  const risk = useMemo(() => calculateRisk({ equity, riskPercent, entry, stop, leverage }), [equity, riskPercent, entry, stop, leverage])
  const bid = snapshot?.orderBook.bids[0]?.price ?? 0
  const ask = snapshot?.orderBook.asks[0]?.price ?? 0
  const spread = bid && ask ? ((ask - bid) / latest) * 100 : 0

  const [tip, setTip] = useState(0)
  const tips = [
    "Usá F cerca de un maestro para hablar con IA",
    "Wyckoff: acumulación antes del markup",
    "El volumen confirma la ruptura",
    "Gestioná el riesgo antes de la ganancia",
  ]
  useEffect(() => { const t = setInterval(() => setTip((i) => (i + 1) % tips.length), 5000); return () => clearInterval(t) }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020408] text-white">
      <ParticlesBg />
      <AudioAmbience />
      <DataTicker />

      {/* Top HUD bar */}
      <div className="relative z-10 border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1560px] items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <PriceGlobe />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">Crypto Lunáticos</p>
              <h1 className="text-lg font-black tracking-tight text-white">WAR ROOM</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.05)]">
              {status}
            </motion.div>
            <div className="flex gap-1 text-[10px]">
              {(["1m","5m","15m","1h","4h"]).map((t) => (
                <button key={t} onClick={() => setInterval(t)}
                  className={`rounded px-2 py-1 font-bold uppercase tracking-wider transition ${interval === t ? "bg-cyan-400/15 text-cyan-300" : "text-zinc-600 hover:text-zinc-400"}`}
                >{t}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-[1560px] p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_320px]">
          {/* Left column */}
          <div className="grid gap-3">
            {/* Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="group rounded-lg border border-white/5 bg-black/30 p-3 backdrop-blur-sm transition hover:border-cyan-400/20">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-cyan-400/60">Price Action</p>
                  <p className="text-sm font-bold text-white">{symbol}</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-zinc-600">Last: <span className="text-white font-bold">{formatUsd.format(latest)}</span></span>
                  <span className="text-zinc-600">Spread: <span className="text-cyan-400">{spread.toFixed(3)}%</span></span>
                </div>
              </div>
              {snapshot ? <ChartPanel candles={snapshot.candles} /> : <div className="flex h-[300px] items-center justify-center text-zinc-700">Loading chart...</div>}
            </motion.div>

            {/* Bottom panels */}
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { title: "Market Regime", data: { label: intelligence?.regime.label ?? "—", score: intelligence?.regime.trendScore ?? 0, summary: intelligence?.regime.summary ?? "Waiting..." }, color: "cyan", icon: "◈" },
                { title: "Setup", data: { label: intelligence?.setup.grade ?? "-", score: intelligence?.setup.score ?? 0, positives: intelligence?.setup.positives ?? [] }, color: "emerald", icon: "◆" },
                { title: "Scanner", data: { items: opportunities.slice(0, 3) }, color: "violet", icon: "◇" },
              ].map((section, i) => (
                <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                  className="rounded-lg border border-white/5 bg-black/30 p-3 backdrop-blur-sm transition hover:border-cyan-400/20">
                  <p className="mb-2 text-[9px] font-bold uppercase tracking-widest text-zinc-600">{section.icon} {section.title}</p>
                  {"label" in section.data ? (
                    <>
                      <p className="text-lg font-black text-white">{section.data.label}</p>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${section.data.score}%` }} transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400" />
                      </div>
                      {"summary" in section.data && <p className="mt-1 text-[10px] text-zinc-600">{section.data.summary}</p>}
                      {"positives" in section.data && section.data.positives && (
                        <ul className="mt-1 space-y-0.5">{section.data.positives.slice(0, 3).map((p, j) => <li key={j} className="text-[10px] text-zinc-500">{p}</li>)}</ul>
                      )}
                    </>
                  ) : (
                    <div className="space-y-1">
                      {section.data.items.map((item: any, j: number) => (
                        <div key={item.symbol} className="flex justify-between text-[11px]">
                          <span className="text-white font-bold">{item.symbol}</span>
                          <span className="text-zinc-500">{item.changePercent?.toFixed(2)}%</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <aside className="grid gap-3">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="rounded-lg border border-white/5 bg-black/30 p-3 backdrop-blur-sm">
              <p className="mb-2 text-[9px] font-bold uppercase tracking-widest text-zinc-600">⚡ Order Book</p>
              <div className="space-y-0.5 text-sm font-mono">
                {snapshot?.orderBook.asks.slice(0, 6).reverse().map((l) => (
                  <div key={l.price} className="flex justify-between"><span className="text-red-400">{formatUsd.format(l.price)}</span><span className="text-zinc-600">{formatNumber.format(l.quantity)}</span></div>
                ))}
                <div className="border-y border-cyan-400/20 py-1.5 text-center text-base font-black text-white">{formatUsd.format(latest)}</div>
                {snapshot?.orderBook.bids.slice(0, 6).map((l) => (
                  <div key={l.price} className="flex justify-between"><span className="text-emerald-400">{formatUsd.format(l.price)}</span><span className="text-zinc-600">{formatNumber.format(l.quantity)}</span></div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="rounded-lg border border-white/5 bg-black/30 p-3 backdrop-blur-sm">
              <p className="mb-2 text-[9px] font-bold uppercase tracking-widest text-zinc-600">📊 Tape</p>
              <div className="grid grid-cols-2 gap-0.5 text-xs font-mono">
                {snapshot?.trades.slice(0, 10).map((t) => (
                  <span key={t.id} className={t.side === "buy" ? "text-emerald-400" : "text-red-400"}>
                    {formatUsd.format(t.price)} <span className="text-zinc-700">{formatNumber.format(t.quantity)}</span>
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="rounded-lg border border-white/5 bg-black/30 p-3 backdrop-blur-sm">
              <p className="mb-2 text-[9px] font-bold uppercase tracking-widest text-zinc-600">🛡️ Risk</p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between"><span className="text-zinc-600">Entry</span><span className="text-white font-bold">{formatUsd.format(entry)}</span></div>
                <div className="flex justify-between"><span className="text-zinc-600">Stop</span><span className="text-red-400">{formatUsd.format(stop)}</span></div>
                <div className="flex justify-between"><span className="text-zinc-600">Risk</span><span className="text-amber-400">{formatUsd.format(risk.riskAmount)}</span></div>
                <div className="flex justify-between"><span className="text-zinc-600">Size</span><span className="text-cyan-400">{formatNumber.format(risk.positionSize)}</span></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="rounded-lg border border-white/5 bg-black/20 p-2 backdrop-blur-sm">
              <p className="text-[8px] text-zinc-700 italic text-center animate-pulse">{tips[tip]}</p>
            </motion.div>
          </aside>
        </div>
      </div>

      <DraggableCalculator />
      <MatrixPortal />
    </main>
  )
}

import { calculateRisk } from "@cl/market-core"
