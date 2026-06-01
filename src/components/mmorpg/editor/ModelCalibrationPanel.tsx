"use client";

import { useCallback, useState } from "react";

type Vec3 = [number, number, number];

export interface Transform3D {
  scale: Vec3;
  position: Vec3;
  rotation: Vec3;
}

interface TransformInputsProps {
  label: string;
  value: Vec3;
  step: number;
  onChange: (v: Vec3) => void;
}

function Vec3Inputs({ label, value, step, onChange }: TransformInputsProps) {
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

const DEFAULT_TRANSFORM: Transform3D = {
  scale: [1, 1, 1],
  position: [0, 0, 0],
  rotation: [0, 0, 0],
};

function formatVec3(v: Vec3): string {
  const fmt = (n: number) => {
    if (Number.isInteger(n)) return n.toFixed(1);
    return parseFloat(n.toFixed(4)).toString();
  };
  return `[${v.map(fmt).join(", ")}]`;
}

interface EntityCalibrationProps {
  entityName: string;
  transform: Transform3D;
  onChange: (t: Transform3D) => void;
}

function EntityCalibration({ entityName, transform, onChange }: EntityCalibrationProps) {
  const setScale = useCallback((s: Vec3) => onChange({ ...transform, scale: s }), [transform, onChange]);
  const setPosition = useCallback((p: Vec3) => onChange({ ...transform, position: p }), [transform, onChange]);
  const setRotation = useCallback((r: Vec3) => onChange({ ...transform, rotation: r }), [transform, onChange]);

  const apply = useCallback((partial: Partial<Transform3D>) => {
    onChange({ ...transform, ...partial });
  }, [transform, onChange]);

  return (
    <div className="space-y-2">
      <p className="text-[11px] font-bold uppercase tracking-widest text-cyan-300">{entityName}</p>
      <Vec3Inputs label="Scale" value={transform.scale} step={0.1} onChange={setScale} />
      <Vec3Inputs label="Position" value={transform.position} step={0.1} onChange={setPosition} />
      <Vec3Inputs label="Rotation" value={transform.rotation} step={0.1} onChange={setRotation} />
      <div className="flex flex-wrap gap-1 pt-1">
        <button onClick={() => apply(DEFAULT_TRANSFORM)} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-zinc-400 hover:border-red-400/30 hover:text-red-300">Reset</button>
        <button onClick={() => apply({ position: [0, 0, 0] })} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-zinc-400 hover:border-cyan-400/30 hover:text-cyan-300">Center</button>
        <button onClick={() => apply({ scale: [0.5, 0.5, 0.5] })} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-zinc-400 hover:border-white/20 hover:text-zinc-300">Small</button>
        <button onClick={() => apply({ scale: [1, 1, 1] })} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-zinc-400 hover:border-white/20 hover:text-zinc-300">Medium</button>
        <button onClick={() => apply({ scale: [1.5, 1.5, 1.5] })} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-zinc-400 hover:border-white/20 hover:text-zinc-300">Large</button>
        <button onClick={() => apply({ rotation: [0, Math.PI, 0] })} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-zinc-400 hover:border-amber-400/30 hover:text-amber-300">Rot 180</button>
      </div>
    </div>
  );
}

interface ModelCalibrationPanelProps {
  characterTransform: Transform3D;
  mountTransform: Transform3D;
  characterName?: string;
  mountName?: string;
  onCharacterChange: (t: Transform3D) => void;
  onMountChange: (t: Transform3D) => void;
}

export function ModelCalibrationPanel({
  characterTransform,
  mountTransform,
  characterName,
  mountName,
  onCharacterChange,
  onMountChange,
}: ModelCalibrationPanelProps) {
  const [copiedCal, setCopiedCal] = useState(false);

  const copyCalibration = useCallback(async () => {
    const text = `Personaje actual:\nmodelScale: ${formatVec3(characterTransform.scale)},\nmodelPosition: ${formatVec3(characterTransform.position)},\nmodelRotation: ${formatVec3(characterTransform.rotation)},\n\nMontura actual:\nmodelScale: ${formatVec3(mountTransform.scale)},\nmodelPosition: ${formatVec3(mountTransform.position)},\nmodelRotation: ${formatVec3(mountTransform.rotation)},\n`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCal(true);
      setTimeout(() => setCopiedCal(false), 2000);
    } catch { /* ignore */ }
  }, [characterTransform, mountTransform]);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Calibraci\u00F3n GLB</p>
        <button
          onClick={copyCalibration}
          className={`rounded-lg border px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider transition ${
            copiedCal
              ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
              : "border-cyan-400/30 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20"
          }`}
        >
          {copiedCal ? "Copiado" : "Copiar calibraci\u00F3n"}
        </button>
      </div>

      {characterName && (
        <EntityCalibration entityName={characterName} transform={characterTransform} onChange={onCharacterChange} />
      )}
      {!characterName && (
        <p className="text-[10px] text-zinc-600">Seleccion\u00E1 un personaje para calibrar</p>
      )}

      <div className="border-t border-white/5" />

      {mountName ? (
        <EntityCalibration entityName={mountName} transform={mountTransform} onChange={onMountChange} />
      ) : (
        <p className="text-[10px] text-zinc-600">Seleccion\u00E1 una montura para calibrar</p>
      )}
    </div>
  );
}
