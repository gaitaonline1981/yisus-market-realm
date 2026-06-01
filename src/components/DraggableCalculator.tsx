"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Calculator, Minus, Plus, GripHorizontal } from "lucide-react"

const RISK = { label: "Risk", id: "riskAmount", suffix: "" }
const SIZE = { label: "Size", id: "positionSize", suffix: "" }
const MARGIN = { label: "Margin", id: "marginEstimate", suffix: "" }

const intlUSD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
const intlNum = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 })

function format(v: number, t: "usd" | "num") {
  return t === "usd" ? intlUSD.format(v) : intlNum.format(v)
}

interface CalcState {
  equity: number; riskPercent: number; leverage: number
}

function calcRisk(s: CalcState) {
  const r = s.equity * (s.riskPercent / 100)
  const ps = r / (s.leverage || 1)
  return {
    riskAmount: Math.round(r * 100) / 100,
    positionSize: Math.round(ps * 100) / 100,
    marginEstimate: Math.round(ps * 100) / 100,
  }
}

export function DraggableCalculator() {
  const panelRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ isDragging: false, startX: 0, startY: 0, origX: 0, origY: 0 })
  const [pos, setPos] = useState({ x: window.innerWidth - 340, y: 120 })
  const [collapsed, setCollapsed] = useState(false)
  const [visible, setVisible] = useState(true)
  const [state, setState] = useState<CalcState>({ equity: 10000, riskPercent: 0.75, leverage: 3 })

  const risk = calcRisk(state)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const d = dragRef.current
    d.isDragging = true
    d.startX = e.clientX
    d.startY = e.clientY
    d.origX = pos.x
    d.origY = pos.y
    document.body.style.cursor = "grabbing"
    document.body.style.userSelect = "none"
  }, [pos])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const d = dragRef.current
      if (!d.isDragging) return
      setPos({ x: d.origX + e.clientX - d.startX, y: d.origY + e.clientY - d.startY })
    }
    const handleMouseUp = () => {
      dragRef.current.isDragging = false
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  if (!visible) {
    return (
      <button onClick={() => setVisible(true)}
        className="fixed bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-black/80 text-cyan-400 shadow-lg backdrop-blur hover:bg-cyan-400/20"
        title="Open CL-Culin"
      >
        <Calculator size={18} />
      </button>
    )
  }

  return (
    <div
      ref={panelRef}
      className="fixed z-50 w-[280px] rounded-2xl border border-cyan-400/20 bg-black/90 shadow-2xl backdrop-blur-xl"
      style={{ left: pos.x, top: pos.y }}
    >
      <div
        onMouseDown={handleMouseDown}
        className="flex cursor-grab items-center justify-between border-b border-white/5 px-3 py-2 active:cursor-grabbing"
      >
        <div className="flex items-center gap-2">
          <GripHorizontal size={14} className="text-zinc-600" />
          <Calculator size={14} className="text-cyan-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">CL-Culin</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setCollapsed(!collapsed)} className="rounded p-0.5 text-zinc-600 hover:text-zinc-300">
            {collapsed ? <Plus size={14} /> : <Minus size={14} />}
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="space-y-3 p-3">
          <div className="grid grid-cols-3 gap-2">
            {(["equity", "riskPercent", "leverage"] as const).map((field) => (
              <label key={field} className="flex flex-col gap-0.5">
                <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-600">
                  {field === "equity" ? "Equity" : field === "riskPercent" ? "Risk %" : "Lev"}
                </span>
                <input
                  type="number"
                  value={state[field]}
                  onChange={(e) => setState({ ...state, [field]: Number(e.target.value) })}
                  className="w-full rounded-lg border border-white/10 bg-black/50 px-2 py-1 text-[11px] text-cyan-200 focus:border-cyan-400/50 focus:outline-none"
                  step={field === "riskPercent" ? 0.05 : 1}
                />
              </label>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-2 py-2">
            {[RISK, SIZE, MARGIN].map((item) => {
              const key = item.id as keyof typeof risk
              return (
                <div key={item.id} className="text-center">
                  <p className="text-[8px] font-bold uppercase tracking-wider text-zinc-600">{item.label}</p>
                  <p className="truncate text-[11px] font-bold text-cyan-300">
                    {String(key === "riskAmount" ? format(risk[key] as number, "usd") : format(risk[key] as number, "num"))}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
