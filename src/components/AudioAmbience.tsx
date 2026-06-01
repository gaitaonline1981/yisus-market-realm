"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"

export function AudioAmbience() {
  const [playing, setPlaying] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const start = useCallback(() => {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    gain.gain.value = 0.02
    osc.type = "sine"
    osc.frequency.value = 55 + Math.random() * 10
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()

    // Slow frequency modulation
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 0.1
    lfoGain.gain.value = 3
    lfo.connect(lfoGain)
    lfoGain.connect(osc.frequency)
    lfo.start()

    ctxRef.current = ctx
    oscRef.current = osc
    gainRef.current = gain
    setPlaying(true)
  }, [])

  const stop = useCallback(() => {
    oscRef.current?.stop()
    ctxRef.current?.close()
    ctxRef.current = null
    oscRef.current = null
    gainRef.current = null
    setPlaying(false)
  }, [])

  useEffect(() => {
    return () => { if (ctxRef.current) { oscRef.current?.stop(); ctxRef.current.close() } }
  }, [])

  return (
    <button onClick={playing ? stop : start}
      className="fixed bottom-4 left-4 z-50 flex h-8 w-8 items-center justify-center rounded border border-white/10 bg-black/50 text-zinc-500 transition hover:text-white"
      title={playing ? "Silenciar" : "Activar ambiente"}
    >
      {playing ? <Volume2 size={14} /> : <VolumeX size={14} />}
    </button>
  )
}
