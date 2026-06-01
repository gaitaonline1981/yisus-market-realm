"use client";

import { useCallback, useState } from "react";
import { formatCalibrationBlock, formatCalibrationForData } from "@/lib/mmorpg/modelCalibration";

type Vec3 = [number, number, number];

interface ShowroomCalibrationPanelProps {
  transform: {
    scale: Vec3;
    position: Vec3;
    rotation: Vec3;
  };
  onChangeTransform: (t: { scale: Vec3; position: Vec3; rotation: Vec3 }) => void;
  selectedName: string;
  selectedType: "character" | "mount";
}

function Vec3Input({ label, value, step, onChange }: { label: string; value: Vec3; step: number; onChange: (v: Vec3) => void }) {
  const axes = ["X", "Y", "Z"] as const;
  return (
    <div className="flex items-center gap-2 text-[10px]">
      <span className="w-14 shrink-0 font-bold uppercase tracking-wider text-zinc-500">{label}</span>
      {axes.map((axis, i) => (
        <div key={axis} className="flex items-center gap-0.5">
          <span className="w-3 text-zinc-600">{axis}</span>
          <input
            type="number"
            step={step}
            value={Number(value[i].toFixed(4))}
            onChange={(e) => {
              const next: Vec3 = [...value];
              next[i] = parseFloat(e.target.value) || 0;
              onChange(next);
            }}
            className="w-16 rounded-md border border-white/10 bg-black/50 px-1.5 py-1 text-center text-[10px] text-cyan-200 focus:border-cyan-400/50 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
      ))}
    </div>
  );
}

function formatVec3(v: Vec3): string {
  const fmt = (n: number) => {
    if (Number.isInteger(n)) return n.toFixed(1);
    return parseFloat(n.toFixed(4)).toString();
  };
  return `[${v.map(fmt).join(", ")}]`;
}

const DEFAULT: { scale: Vec3; position: Vec3; rotation: Vec3 } = {
  scale: [1, 1, 1],
  position: [0, 0, 0],
  rotation: [0, 0, 0],
};

export function ShowroomCalibrationPanel({ transform, onChangeTransform, selectedName, selectedType }: ShowroomCalibrationPanelProps) {
  const [copied, setCopied] = useState(false);
  const [copyMode, setCopyMode] = useState<"block" | "inline">("block");

  const copyCal = useCallback(async () => {
    const cal = { scale: transform.scale, position: transform.position, rotation: transform.rotation };
    const text = copyMode === "block"
      ? formatCalibrationBlock(selectedName, cal, selectedType)
      : formatCalibrationForData(cal);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  }, [transform, selectedName, selectedType, copyMode]);

  const patch = useCallback((partial: Partial<{ scale: Vec3; position: Vec3; rotation: Vec3 }>) => {
    onChangeTransform({ ...transform, ...partial });
  }, [transform, onChangeTransform]);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-widest text-cyan-300">
          {selectedName}
        </p>
        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-zinc-400">
          {selectedType === "character" ? "Personaje" : "Montura"}
        </span>
      </div>

      <Vec3Input label="Scale" value={transform.scale} step={0.1} onChange={(v) => patch({ scale: v })} />
      <Vec3Input label="Pos" value={transform.position} step={0.1} onChange={(v) => patch({ position: v })} />
      <Vec3Input label="Rot" value={transform.rotation} step={0.1} onChange={(v) => patch({ rotation: v })} />

      <div className="flex flex-wrap gap-1">
        <button onClick={() => patch(DEFAULT)} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-zinc-400 hover:border-red-400/30 hover:text-red-300">Reset</button>
        <button onClick={() => patch({ scale: [0.5, 0.5, 0.5] })} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-zinc-400 hover:border-white/20 hover:text-zinc-300">Small</button>
        <button onClick={() => patch({ scale: [1, 1, 1] })} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-zinc-400 hover:border-white/20 hover:text-zinc-300">Medium</button>
        <button onClick={() => patch({ scale: [1.5, 1.5, 1.5] })} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-zinc-400 hover:border-white/20 hover:text-zinc-300">Large</button>
        <button onClick={() => patch({ rotation: [0, Math.PI, 0] })} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-zinc-400 hover:border-amber-400/30 hover:text-amber-300">Rot 180</button>
        <button onClick={() => patch({ position: [transform.position[0], transform.position[1] + 0.1, transform.position[2]] })} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-zinc-400 hover:border-cyan-400/30 hover:text-cyan-300">Subir</button>
        <button onClick={() => patch({ position: [transform.position[0], transform.position[1] - 0.1, transform.position[2]] })} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-zinc-400 hover:border-cyan-400/30 hover:text-cyan-300">Bajar</button>
        <button onClick={() => patch({ position: [0, 0, 0] })} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-zinc-400 hover:border-cyan-400/30 hover:text-cyan-300">Center</button>
      </div>

      <div className="flex gap-1">
        <button
          onClick={() => setCopyMode("block")}
          className={`rounded-md border px-2 py-1 text-[8px] font-bold uppercase tracking-wider transition ${
            copyMode === "block"
              ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
              : "border-white/10 bg-white/5 text-zinc-400"
          }`}
        >
          Bloque
        </button>
        <button
          onClick={() => setCopyMode("inline")}
          className={`rounded-md border px-2 py-1 text-[8px] font-bold uppercase tracking-wider transition ${
            copyMode === "inline"
              ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
              : "border-white/10 bg-white/5 text-zinc-400"
          }`}
        >
          Inline
        </button>
      </div>

      <button
        onClick={copyCal}
        className={`w-full rounded-lg border px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition ${
          copied
            ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
            : "border-cyan-400/30 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20"
        }`}
      >
        {copied ? "Calibraci\u00F3n copiada" : "Copiar calibraci\u00F3n"}
      </button>
    </div>
  );
}
