"use client";

import Link from "next/link";
import { CHARACTERS, PLAYABLE_CHARACTERS } from "@/data/characters";
import { MOUNTS, ALL_MOUNTS } from "@/data/mounts";
import { WORLD_ZONES } from "@/data/worldData";

const CHAR_EMOJIS: Record<string, string> = {
  ticker: "📊", volumax: "📈", hedgey: "🛡️", flipper: "⚡",
  maci: "🌍", slyde: "🦊", sproket: "⚙️", waven: "🌊",
};

const CHAR_COLORS: Record<string, string> = {
  ticker: "#2FC7C9", volumax: "#A78BFA", hedgey: "#10B981", flipper: "#F97316",
  maci: "#6366F1", slyde: "#F59E0B", sproket: "#EC4899", waven: "#8B5CF6",
};

const MOUNT_EMOJIS: Record<string, string> = {
  "candle-dragon": "🐉", "liquidity-whale": "🐋", "market-rover": "🚙",
  "moon-hopper": "🐸", "noble-steed": "🐴", "order-block-rhino": "🦏",
  "pocket-rocket": "🚀", "skyward-talon": "🦅", "volatility-falcon": "🦅",
  "wind-dasher": "💨",
};

export function MMORPGHome() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-auto">
      {/* Hero */}
      <div className="relative px-6 pt-24 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(47,199,201,0.08),transparent_70%)]" />
        <h1 className="text-6xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            YISUS MARKET REALM
          </span>
        </h1>
        <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto font-mono">
          MMORPG de trading gamificado. 10 maestros te enseñan a dominar los mercados mientras explorás un universo 3D.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link href="/mmorpg/select" className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-black rounded-xl hover:scale-105 transition-transform text-lg">
            ELEGIR PERSONAJE
          </Link>
          <Link href="/mmorpg/world" className="px-8 py-3.5 border border-white/10 text-white/70 font-bold rounded-xl hover:bg-white/5 transition-colors text-lg">
            ENTRAR DIRECTO
          </Link>
        </div>
        <div className="flex justify-center gap-6 mt-6 text-xs text-zinc-600 font-mono">
          <span>26 NPCs</span>
          <span>10 zonas</span>
          <span>10 monturas</span>
          <span>8 personajes</span>
        </div>
      </div>

      {/* Characters Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-cyan-300">Personajes</h2>
          <p className="text-zinc-500 mt-2">Elegí tu trader y dominá los mercados</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PLAYABLE_CHARACTERS.map((c) => (
            <Link key={c.id} href={`/mmorpg/select`}
              className="group bg-white/3 border border-white/5 rounded-2xl p-5 hover:bg-white/8 hover:border-white/10 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="aspect-square rounded-xl mb-4 flex items-center justify-center relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${CHAR_COLORS[c.id]}15, ${CHAR_COLORS[c.id]}05)` }}>
                <span className="text-6xl group-hover:scale-110 transition-transform">{CHAR_EMOJIS[c.id]}</span>
                <div className="absolute inset-0 border border-white/5 rounded-xl" />
              </div>
              <h3 className="font-black text-lg text-white">{c.name}</h3>
              <p className="text-xs text-zinc-500 mt-1 line-clamp-1">{c.role}</p>
              <div className="flex gap-2 mt-3">
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                  c.rarity === "legendary" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" :
                  c.rarity === "epic" ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" :
                  c.rarity === "rare" ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" :
                  "bg-zinc-500/20 text-zinc-300 border border-zinc-500/30"
                }`}>{c.rarity}</span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/5">
                  {c.tradingSpecialty}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1 mt-3">
                {Object.entries(c.stats).map(([k, v]) => (
                  <div key={k} className="text-center">
                    <div className="text-[9px] text-zinc-600">{k.slice(0, 3)}</div>
                    <div className="text-xs font-bold" style={{ color: CHAR_COLORS[c.id] }}>{v}</div>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Mounts Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-white/5">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-emerald-300">Monturas</h2>
          <p className="text-zinc-500 mt-2">Viajá más rápido con conceptos del mercado</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {ALL_MOUNTS.map((m) => (
            <div key={m.id} className="bg-white/3 border border-white/5 rounded-xl p-4 hover:bg-white/8 transition-all duration-300 text-center">
              <div className="text-4xl mb-2">{MOUNT_EMOJIS[m.id] ?? "🐎"}</div>
              <h3 className="font-bold text-sm text-white">{m.name}</h3>
              <p className="text-[10px] text-zinc-500 mt-0.5">{m.tradingMeaning}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-[10px] text-zinc-500">Vel: {m.speed}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                  m.rarity === "legendary" ? "bg-amber-500/20 text-amber-300" : "bg-purple-500/20 text-purple-300"
                }`}>{m.rarity}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* World Zones */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-white/5">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-purple-300">Zonas del Mundo</h2>
          <p className="text-zinc-500 mt-2">10 regiones para explorar y aprender</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {WORLD_ZONES.map((z) => (
            <div key={z.id} className="flex items-center gap-4 bg-white/3 border border-white/5 rounded-xl px-5 py-4 hover:bg-white/8 transition-all">
              <div className="w-4 h-4 rounded-full flex-shrink-0 shadow-lg" style={{ backgroundColor: z.color, boxShadow: `0 0 12px ${z.color}40` }} />
              <div className="flex-1">
                <h3 className="font-black text-sm text-white">{z.name}</h3>
                <p className="text-[10px] text-zinc-500">{z.concept}</p>
              </div>
              <span className="text-[10px] text-zinc-600 font-mono">Nv.{z.difficulty}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="text-center py-20 border-t border-white/5">
        <p className="text-zinc-700 text-sm font-mono">Crypto Lunáticos · Yisus Market Realm · v1.0</p>
        <p className="text-zinc-800 text-xs mt-1">Built with Next.js · Three.js · React Three Fiber</p>
      </div>
    </div>
  );
}
