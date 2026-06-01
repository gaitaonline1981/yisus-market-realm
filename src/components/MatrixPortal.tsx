"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

export function MatrixPortal() {
  const navigate = useNavigate()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hovered, setHovered] = useState(false)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let w = (canvas.width = 120)
    let h = (canvas.height = 40)
    const cols = Math.floor(w / 10)
    const drops: number[] = Array.from({ length: cols }, () => Math.random() * h)
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789"

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)"
      ctx.fillRect(0, 0, w, h)
      ctx.font = "10px monospace"
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * 10
        const y = drops[i] * 10
        ctx.fillStyle = i % 3 === 0 ? "#22D3EE" : "#0EA5E9"
        ctx.globalAlpha = hovered ? 0.9 : 0.5
        ctx.fillText(char, x, y)
        if (y > h && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [hovered])

  const handleClick = useCallback(() => {
    navigate("/mmorpg/world")
  }, [navigate])

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-black/80 shadow-lg backdrop-blur transition-all hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
      >
        <canvas
          ref={canvasRef}
          width={120}
          height={40}
          className="block opacity-60 transition-opacity group-hover:opacity-100"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-xl bg-black/60 px-3 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">
              Enter MMORPG
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  )
}
