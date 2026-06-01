"use client"

import { useEffect, useRef } from "react"

export function SpaceBackground({ intensity = 1 }: { intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    const stars: { x: number; y: number; r: number; a: number; s: number; hue: number }[] = []
    const count = Math.floor(120 * intensity)

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        a: Math.random() * 0.5 + 0.1,
        s: Math.random() * 0.3 + 0.05,
        hue: Math.random() * 60 + 160, // cyan to teal range
      })
    }

    let frame = 0
    const draw = () => {
      frame++
      ctx.clearRect(0, 0, w, h)

      for (const star of stars) {
        const pulse = Math.sin(frame * star.s + star.x) * 0.3 + 0.7
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${star.hue}, 70%, 60%, ${star.a * pulse})`
        ctx.fill()

        // glow
        if (star.r > 1) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.r * 3, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${star.hue}, 70%, 60%, ${star.a * 0.1 * pulse})`
          ctx.fill()
        }
      }
    }

    let animId = setInterval(draw, 50)
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight }
    window.addEventListener("resize", onResize)

    return () => { clearInterval(animId); window.removeEventListener("resize", onResize) }
  }, [intensity])

  return (
    <canvas ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background: "transparent" }}
    />
  )
}
