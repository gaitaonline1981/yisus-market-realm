"use client";

import Link from "next/link";
import { CHARACTERS } from "@/data/characters";
import { MOUNTS } from "@/data/mounts";
import { WORLD_ZONES } from "@/data/worldData";

export function MMORPGHome() {
  return (
    <div className="min-h-screen bg-[#020408] text-white overflow-auto">
      {/* Hero */}
      <div className="relative px-6 pt-20 pb-16 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
        <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
          YISUS MARKET REALM
        </h1>
        <p className="mt-3 text-lg text-zinc-400 max-w-xl mx-auto font-mono">
          MMORPG de trading gamificado. Aprendé a operar mientras explorás un mundo 3D.
        </p>
        <Link
          href="/mmorpg/select"
          className="inline-block mt-8 px-8 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-black rounded-xl hover:scale-105 transition-transform"
        >
          ELEGIR PERSONAJE
        </Link>
      </div>

      {/* Characters */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-cyan-300 mb-6">Personajes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.values(CHARACTERS).map((c) => (
            <div
              key={c.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="aspect-square bg-white/5 rounded-lg mb-3 flex items-center justify-center text-4xl">
                {c.name[0]}
              </div>
              <h3 className="font-bold text-sm">{c.name}</h3>
              <p className="text-xs text-zinc-500 mt-1">{c.role}</p>
              <span className={`text-[10px] mt-2 inline-block px-2 py-0.5 rounded-full ${
                c.rarity === "legendary" ? "bg-amber-500/20 text-amber-300" :
                c.rarity === "epic" ? "bg-purple-500/20 text-purple-300" :
                "bg-cyan-500/20 text-cyan-300"
              }`}>
                {c.rarity}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Mounts */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-emerald-300 mb-6">Monturas</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.values(MOUNTS).slice(0, 10).map((m) => (
            <div
              key={m.id}
              className="bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors"
            >
              <div className="aspect-square bg-white/5 rounded-lg mb-2 flex items-center justify-center text-2xl">
                {m.name[0]}
              </div>
              <h3 className="font-bold text-xs">{m.name}</h3>
              <p className="text-[10px] text-zinc-600 mt-0.5">{m.tradingMeaning}</p>
            </div>
          ))}
        </div>
      </section>

      {/* World Zones */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-purple-300 mb-6">Zonas del Mundo</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {WORLD_ZONES.map((z) => (
            <div
              key={z.id}
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3"
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: z.color }}
              />
              <div>
                <h3 className="font-bold text-sm">{z.name}</h3>
                <p className="text-[10px] text-zinc-500">Nivel {z.difficulty} · {z.concept}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="text-center py-16 text-zinc-700 text-xs font-mono">
        Crypto Lunáticos · Yisus Market Realm · v0.2.0
      </div>
    </div>
  );
}
