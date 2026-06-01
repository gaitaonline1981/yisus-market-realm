import type { EquippedParts } from "@/types/mmorpg";

const SLOT_LABELS: Record<string, string> = {
  body: "Cuerpo", head: "Cabeza", face: "Rostro", eyes: "Ojos", hair: "Cabello",
  ears: "Orejas", helmet: "Casco", torso: "Torso", arms: "Brazos", gloves: "Guantes",
  legs: "Piernas", boots: "Botas", back: "Espalda", weapon: "Arma", tool: "Herramienta",
  aura: "Aura", pet: "Mascota", emblem: "Emblema", mount: "Montura",
};

export function EquippedPartsPanel({ parts }: { parts: EquippedParts }) {
  const entries = Object.entries(parts).filter(([, v]) => v);
  return (
    <section className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <h2 className="mb-4 text-lg font-bold text-white">Partes equipadas</h2>
      {entries.length === 0 ? (
        <p className="text-xs italic text-zinc-600">Sin partes equipadas</p>
      ) : (
        <div className="grid grid-cols-2 gap-1.5">
          {entries.map(([slot, partId]) => (
            <div key={slot} className="rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-1.5">
              <p className="text-[9px] uppercase tracking-wide text-zinc-600">
                {SLOT_LABELS[slot] ?? slot}
              </p>
              <p className="truncate text-xs font-medium text-zinc-200">{String(partId)}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
