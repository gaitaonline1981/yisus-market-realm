"use client";

import { useEffect, useRef } from "react";

export function AudioSystem() {
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      ctxRef.current = new AudioContext();
      const ctx = ctxRef.current;

      // Gentle ambient drone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(55, ctx.currentTime); // Low A
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      // Slow frequency modulation for atmosphere
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.1, ctx.currentTime);
      lfoGain.gain.setValueAtTime(5, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      return () => {
        osc.stop();
        lfo.stop();
        ctx.close();
      };
    } catch {}
  }, []);

  return null;
}
