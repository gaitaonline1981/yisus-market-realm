"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CHARACTERS, PLAYABLE_CHARACTERS } from "@/data/characters";
import { MOUNTS, ALL_MOUNTS } from "@/data/mounts";
import { useGameStore } from "@/stores/useGameStore";
import { CharacterPreview3D } from "@/components/game/CharacterPreview3D";

const RARITY_GLOW: Record<string, string> = {
  common: "shadow-zinc-500/20",
  rare: "shadow-blue-500/20",
  epic: "shadow-purple-500/30",
  legendary: "shadow-amber-500/40",
};

const RARITY_BORDER: Record<string, string> = {
  common: "border-zinc-600",
  rare: "border-blue-500",
  epic: "border-purple-500",
  legendary: "border-amber-400",
};

function StepIndicator({ step }: { step: 1 | 2 }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= 1 ? "bg-cyan-500 text-black" : "bg-white/10 text-white/30"}`}>1</div>
      <div className="w-12 h-px bg-white/10" />
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= 2 ? "bg-cyan-500 text-black" : "bg-white/10 text-white/30"}`}>2</div>
      <span className="text-xs text-white/30 ml-2">{step === 1 ? "Elegí personaje" : "Elegí montura"}</span>
    </div>
  );
}

export default function CharacterSelect() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedChar, setSelectedChar] = useState(PLAYABLE_CHARACTERS[0].id);
  const [selectedMount, setSelectedMount] = useState<string | null>(null);
  const setCharacter = useGameStore((s) => s.setCharacter);
  const setMount = useGameStore((s) => s.setMount);
  const router = useRouter();

  const handleEnter = () => {
    setCharacter(selectedChar);
    setMount(selectedMount);
    router.push("/mmorpg/world");
  };

  const char = CHARACTERS[selectedChar];

  return (
    <div className="min-h-screen bg-[#020408] text-white overflow-auto">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-cyan-400 text-xs font-mono tracking-widest uppercase mb-2">
            Yisus Market Realm
          </p>
          <h1 className="text-3xl font-black">Elegí tu trader</h1>
        </div>

        <StepIndicator step={step} />

        {/* Step 1: Character Selection */}
        {step === 1 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {PLAYABLE_CHARACTERS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedChar(c.id)}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                    selectedChar === c.id
                      ? `${RARITY_BORDER[c.rarity]} bg-white/10 scale-[1.02] ${RARITY_GLOW[c.rarity]}`
                      : "border-white/5 bg-white/3 hover:bg-white/5"
                  }`}
                >
                  <div className="aspect-square bg-white/5 rounded-lg mb-3 flex items-center justify-center text-5xl">
                    {c.name[0]}
                  </div>
                  <h3 className="font-bold text-sm">{c.name}</h3>
                  <p className="text-[10px] text-zinc-500 mt-0.5 line-clamp-2">
                    {c.role}
                  </p>
                  <span
                    className={`text-[9px] mt-2 inline-block px-2 py-0.5 rounded-full ${
                      c.rarity === "legendary" ? "bg-amber-500/20 text-amber-300" :
                      c.rarity === "epic" ? "bg-purple-500/20 text-purple-300" :
                      c.rarity === "rare" ? "bg-blue-500/20 text-blue-300" :
                      "bg-zinc-500/20 text-zinc-300"
                    }`}
                  >
                    {c.rarity}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected char details */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
              <div className="flex gap-4">
                <div className="w-48 flex-shrink-0">
                  <CharacterPreview3D characterId={selectedChar} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{char.name}</h3>
                  <p className="text-sm text-cyan-300">{char.role}</p>
                  <p className="text-xs text-zinc-500 mt-1">{char.description}</p>
                  <div className="flex gap-4 mt-3">
                    {Object.entries(char.stats).map(([key, val]) => (
                      <div key={key} className="text-center">
                        <div className="text-xs text-zinc-500">{key}</div>
                        <div className="text-sm font-bold text-cyan-300">{val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => router.push("/")}
                className="px-6 py-2.5 border border-white/10 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                Volver
              </button>
              <button
                onClick={() => setStep(2)}
                className="px-8 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold rounded-lg text-sm hover:scale-105 transition-transform"
              >
                Elegir montura →
              </button>
            </div>
          </>
        )}

        {/* Step 2: Mount Selection */}
        {step === 2 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
              <button
                onClick={() => setSelectedMount(null)}
                className={`p-3 rounded-xl border transition-all ${
                  selectedMount === null
                    ? "border-cyan-400 bg-white/10"
                    : "border-white/5 bg-white/3 hover:bg-white/5"
                }`}
              >
                <div className="aspect-square bg-white/5 rounded-lg mb-2 flex items-center justify-center text-2xl">
                  🚶
                </div>
                <h3 className="font-bold text-xs">A pie</h3>
                <p className="text-[9px] text-zinc-500">Velocidad base</p>
              </button>
              {ALL_MOUNTS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMount(m.id)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    selectedMount === m.id
                      ? `${RARITY_BORDER[m.rarity]} bg-white/10 scale-[1.02]`
                      : "border-white/5 bg-white/3 hover:bg-white/5"
                  }`}
                >
                  <div className="aspect-square bg-white/5 rounded-lg mb-2 flex items-center justify-center text-2xl">
                    {m.name[0]}
                  </div>
                  <h3 className="font-bold text-xs">{m.name}</h3>
                  <p className="text-[9px] text-zinc-500 mt-0.5">Vel: {m.speed}</p>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2.5 border border-white/10 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                ← Volver
              </button>
              <button
                onClick={handleEnter}
                className="px-10 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-black rounded-xl text-lg hover:scale-105 transition-transform"
              >
                ENTRAR AL MUNDO
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
