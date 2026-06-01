"use client";

import { useEffect, useRef, useCallback } from "react";

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.3;
      this.masterGain.connect(this.ctx.destination);
      this.startAmbient();
    } catch {}
  }

  private startAmbient() {
    if (!this.ctx || !this.masterGain) return;
    // Deep ambient drone
    this.droneOsc = this.ctx.createOscillator();
    this.droneGain = this.ctx.createGain();
    this.droneOsc.type = "sine";
    this.droneOsc.frequency.value = 55;
    this.droneGain.gain.value = 0.08;
    this.droneOsc.connect(this.droneGain);
    this.droneGain.connect(this.masterGain!);
    this.droneOsc.start();

    // LFO for atmosphere
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.value = 0.08;
    lfoGain.gain.value = 3;
    lfo.connect(lfoGain);
    lfoGain.connect(this.droneOsc.frequency);
    lfo.start();

    // Wind layer
    const wind = this.ctx.createOscillator();
    const windGain = this.ctx.createGain();
    wind.type = "sawtooth";
    wind.frequency.value = 80;
    windGain.gain.value = 0.02;
    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = "lowpass";
    windFilter.frequency.value = 200;
    wind.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.masterGain!);
    wind.start();

    // Wind modulation
    const windLfo = this.ctx.createOscillator();
    const windLfoGain = this.ctx.createGain();
    windLfo.frequency.value = 0.15;
    windLfoGain.gain.value = 40;
    windLfo.connect(windLfoGain);
    windLfoGain.connect(wind.frequency);
    windLfo.start();
  }

  private playTone(freq: number, duration: number, type: OscillatorType = "sine", vol = 0.1) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playFootstep() { this.playTone(200 + Math.random() * 80, 0.08, "square", 0.03); }
  playUIClick() { this.playTone(800, 0.05, "sine", 0.06); this.playTone(1200, 0.03, "sine", 0.04); }
  playQuestAccept() { this.playTone(523, 0.15, "sine", 0.08); setTimeout(() => this.playTone(659, 0.15, "sine", 0.08), 100); setTimeout(() => this.playTone(784, 0.2, "sine", 0.08), 200); }
  playQuestComplete() { this.playTone(784, 0.1, "sine", 0.1); setTimeout(() => this.playTone(988, 0.1, "sine", 0.1), 80); setTimeout(() => this.playTone(1175, 0.15, "sine", 0.1), 160); setTimeout(() => this.playTone(1568, 0.3, "sine", 0.12), 240); }
  playLevelUp() { for (let i = 0; i < 5; i++) setTimeout(() => this.playTone(440 * Math.pow(1.2, i), 0.2, "sine", 0.1), i * 80); }
  playTradeBuy() { this.playTone(600, 0.1, "square", 0.06); setTimeout(() => this.playTone(900, 0.15, "square", 0.06), 60); }
  playTradeSell() { this.playTone(900, 0.1, "square", 0.06); setTimeout(() => this.playTone(600, 0.15, "square", 0.06), 60); }
  playAchievement() { for (let i = 0; i < 3; i++) setTimeout(() => this.playTone(600 + i * 200, 0.2, "triangle", 0.08), i * 120); }
  playChat() { this.playTone(1000, 0.06, "sine", 0.04); }
  playMount() { for (let i = 0; i < 3; i++) setTimeout(() => this.playTone(300 + i * 150, 0.1, "triangle", 0.05), i * 100); }
  playError() { this.playTone(200, 0.2, "sawtooth", 0.06); }
}

let engine: SoundEngine | null = null;

export function getSoundEngine(): SoundEngine {
  if (!engine) {
    engine = new SoundEngine();
    engine.init();
  }
  return engine;
}

export function useSoundEngine() {
  const initRef = useRef(false);

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      // Init on first user interaction to bypass autoplay policy
      const handler = () => {
        getSoundEngine();
        document.removeEventListener("click", handler);
        document.removeEventListener("keydown", handler);
      };
      document.addEventListener("click", handler);
      document.addEventListener("keydown", handler);
    }
  }, []);

  return { engine: getSoundEngine() };
}
