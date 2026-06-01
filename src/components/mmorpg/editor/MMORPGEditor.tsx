"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { characters } from "@/data/mmorpg/characters";
import { mounts } from "@/data/mmorpg/mounts";
import { useMMORPGStore } from "@/stores/useMMORPGStore";
import { CharacterViewer, type CameraPreset, type EnvironmentPreset } from "@/components/mmorpg/viewer/CharacterViewer";
import { getMountOffset } from "@/lib/mmorpg/mounting";
import { ModelCalibrationPanel, type Transform3D } from "./ModelCalibrationPanel";
import { MountOffsetCalibrationPanel } from "./MountOffsetCalibrationPanel";
import { GraphicsSettingsPanel } from "@/components/mmorpg/settings/GraphicsSettingsPanel";

function StatBar({ label, value }: { label: string; value: number }) {
  const pct = Math.min(Math.max(value / 100, 0), 1);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-400">{label}</span>
        <span className="font-mono font-bold text-cyan-300">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-cyan-400 transition-all duration-300"
          style={{ width: `${pct * 100}%`, opacity: 0.3 + pct * 0.7 }}
        />
      </div>
    </div>
  );
}

const STATS = ["speed", "precision", "riskControl", "liquidityReading", "macroVision", "volumePower"] as const;

const CAMERA_LABELS: Record<CameraPreset, string> = {
  "default": "Default",
  "front": "Front",
  "side": "Side",
  "three-quarter": "3/4",
  "top": "Top",
};

const ENV_LABELS: Record<EnvironmentPreset, string> = {
  "studio": "Studio",
  "night": "Night",
  "sunset": "Sunset",
  "dawn": "Dawn",
  "warehouse": "Warehouse",
  "city": "City",
};

export function MMORPGEditor() {
  const {
    selectedCharacterId,
    selectedMountId,
    equippedParts,
    selectCharacter,
    selectMount,
    resetCharacter,
    exportConfig,
  } = useMMORPGStore();

  const [copied, setCopied] = useState(false);
  const [useRealModels, setUseRealModels] = useState(false);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>("default");
  const [environment, setEnvironment] = useState<EnvironmentPreset>("studio");
  const [autoRotate, setAutoRotate] = useState(true);
const [mountedPreview, setMountedPreview] = useState(false);
const defaultOff = getMountOffset();
const [customMountOffset, setCustomMountOffset] = useState({
  characterPosition: defaultOff.characterPosition,
  characterRotation: defaultOff.characterRotation,
  characterScale: defaultOff.characterScale,
  mountPosition: defaultOff.mountPosition,
  mountRotation: defaultOff.mountRotation,
  mountScale: defaultOff.mountScale,
});

  const [characterTransform, setCharacterTransform] = useState<Transform3D>({
    scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0],
  });
  const [mountTransform, setMountTransform] = useState<Transform3D>({
    scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0],
  });

  const [searchParams] = useSearchParams();
  const characterParam = searchParams.get("character");
  const mountParam = searchParams.get("mount");

  const selectedCharacter = characters.find((c) => c.id === selectedCharacterId);
  const selectedMount = mounts.find((m) => m.id === selectedMountId);
  const compatibleMounts = mounts.filter((m) =>
    m.compatibleCharacterIds.includes(selectedCharacterId)
  );

  useEffect(() => {
    if (!characterParam) return;
    const exists = characters.some((c) => c.id === characterParam);
    if (!exists) return;
    if (characterParam !== selectedCharacterId) {
      selectCharacter(characterParam);
    }
  }, [characterParam, selectedCharacterId, selectCharacter]);

  useEffect(() => {
    if (!mountParam) return;
    const mount = mounts.find((m) => m.id === mountParam);
    if (!mount) return;
    const isCompatible = mount.compatibleCharacterIds.includes(selectedCharacterId);
    if (!isCompatible) return;
    if (mountParam !== selectedMountId) {
      selectMount(mountParam);
    }
  }, [mountParam, selectedCharacterId, selectedMountId, selectMount]);

  useEffect(() => {
    if (!selectedCharacter) return;
    setCharacterTransform({
      scale: selectedCharacter.modelScale ?? [1, 1, 1],
      position: selectedCharacter.modelPosition ?? [0, 0, 0],
      rotation: selectedCharacter.modelRotation ?? [0, 0, 0],
    });
  }, [selectedCharacterId]);

  useEffect(() => {
    if (!selectedMount) return;
    setMountTransform({
      scale: selectedMount.modelScale ?? [1, 1, 1],
      position: selectedMount.modelPosition ?? [0, 0, 0],
      rotation: selectedMount.modelRotation ?? [0, 0, 0],
    });
  }, [selectedMountId]);

  // Load mount offset when mount changes
  useEffect(() => {
    const offset = getMountOffset(selectedMountId);
    setCustomMountOffset({
      characterPosition: offset.characterPosition,
      characterRotation: offset.characterRotation,
      characterScale: offset.characterScale,
      mountPosition: offset.mountPosition,
      mountRotation: offset.mountRotation,
      mountScale: offset.mountScale,
    });
  }, [selectedMountId]);

  const exportedConfig = useMemo(
    () => JSON.stringify(exportConfig(), null, 2),
    [selectedCharacterId, selectedMountId, equippedParts]
  );

  const copyJson = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(exportedConfig);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  }, [exportedConfig]);

  return (
    <main className="min-h-screen bg-zinc-950 p-4 text-white md:p-6">
      <section className="mx-auto max-w-7xl space-y-6">
        <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-indigo-950/60 to-black p-6 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.08),transparent_60%)] pointer-events-none" />
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black tracking-tight md:text-3xl">
                  <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                    Yisus Market Realm
                  </span>
                </h1>
                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-cyan-300">
                  Paso 16
                </span>
              </div>
              <p className="mt-1 text-sm font-semibold tracking-wide text-zinc-400">
                Crypto Lun\u00E1ticos MMORPG Character Lab
              </p>
              <p className="mt-1 max-w-2xl text-xs text-zinc-600">
                Personajes, monturas, c\u00E1mara, entorno y exportaci\u00F3n de configuraci\u00F3n.
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr_340px]">
          <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
            <h2 className="mb-4 text-sm font-bold tracking-wide text-zinc-300">
              Personajes
              <span className="ml-2 text-xs font-normal text-zinc-600">{characters.length}</span>
            </h2>
            <div className="space-y-2">
              {characters.map((c) => {
                const isSelected = selectedCharacterId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => selectCharacter(c.id)}
                    className={`w-full rounded-2xl border p-3 text-left transition ${
                      isSelected
                        ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_12px_rgba(34,211,238,0.12)]"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">{c.name}</p>
                        <p className="truncate text-xs text-zinc-500">{c.title}</p>
                        <span className="mt-1 inline-block rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                          {c.rarity}
                        </span>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        {c.colorPalette.slice(0, 3).map((color, i) => (
                          <span
                            key={i}
                            className="h-2.5 w-2.5 rounded-full border border-white/10"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="space-y-4">
            <div className="overflow-hidden rounded-3xl border border-cyan-400/20 bg-white/5 shadow-[0_0_30px_rgba(47,199,201,0.06)]">
              <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Vista 3D</h3>
                  <span className="text-[10px] text-zinc-600">Modelo 3D generado desde Three.js</span>
                </div>
                <button
                  onClick={() => setUseRealModels((v) => !v)}
                  className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${
                    useRealModels
                      ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                      : "border-amber-400/30 bg-amber-400/10 text-amber-300"
                  }`}
                >
                  <span>{mountedPreview ? "Montado" : "Separado"}</span>
              </button>
              <button
                onClick={() => setMountedPreview((v) => !v)}
                className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${
                  mountedPreview
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                    : "border-white/10 bg-white/5 text-zinc-400"
                }`}
              >
                <span>{useRealModels ? "GLB Real" : "Placeholder 3D"}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase ${
                      useRealModels
                        ? "bg-emerald-400/20 text-emerald-300"
                        : "bg-amber-400/20 text-amber-300"
                    }`}
                  >
                    {useRealModels ? "Activo" : "Fallback"}
                  </span>
                </button>
              </div>

              {useRealModels && (
                <div className="border-b border-white/5 px-4 py-1.5 text-[10px] text-amber-400/80 bg-amber-400/5">
                  Los GLB actuales son modelos est\u00E1ticos: sin rigging, sin animaciones y sin accesorios separados.
                </div>
              )}

              {!useRealModels && (
                <div className="border-b border-white/5 px-4 py-1.5 text-[10px] text-zinc-600">
                  <p>Modo placeholder activado. Activ\u00E1 GLB Real para ver los modelos 3D importados.</p>
                </div>
              )}

              <CharacterViewer
                characterId={selectedCharacterId}
                mountId={selectedMountId}
                characterModelUrl={selectedCharacter?.modelUrl}
                characterModelScale={useRealModels ? characterTransform.scale : selectedCharacter?.modelScale}
                characterModelPosition={useRealModels ? characterTransform.position : selectedCharacter?.modelPosition}
                characterModelRotation={useRealModels ? characterTransform.rotation : selectedCharacter?.modelRotation}
                mountModelUrl={selectedMount?.modelUrl}
                mountModelScale={useRealModels ? mountTransform.scale : selectedMount?.modelScale}
                mountModelPosition={useRealModels ? mountTransform.position : selectedMount?.modelPosition}
                mountModelRotation={useRealModels ? mountTransform.rotation : selectedMount?.modelRotation}
                useRealModels={useRealModels}
                cameraPreset={cameraPreset}
                environment={environment}
                autoRotate={autoRotate}
                mountedPreview={mountedPreview}
                customMountOffset={customMountOffset}
              />
              <div className="flex items-center justify-between border-t border-white/5 px-4 py-2 text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500">Personaje:</span>
                  <span className="font-semibold text-cyan-300">
                    {selectedCharacter?.name ?? "\u2014"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500">Montura:</span>
                  <span className="font-semibold text-amber-300">
                    {selectedMount?.name ?? "\u2014"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">C\u00E1mara</p>
              <div className="flex flex-wrap gap-1.5">
                {(Object.entries(CAMERA_LABELS) as [CameraPreset, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setCameraPreset(key)}
                    className={`rounded-lg border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${
                      cameraPreset === key
                        ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                        : "border-white/5 bg-white/[0.02] text-zinc-500 hover:border-white/10 hover:text-zinc-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="mt-2 mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Entorno</p>
              <div className="flex flex-wrap gap-1.5">
                {(Object.entries(ENV_LABELS) as [EnvironmentPreset, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setEnvironment(key)}
                    className={`rounded-lg border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${
                      environment === key
                        ? "border-violet-400/30 bg-violet-400/10 text-violet-300"
                        : "border-white/5 bg-white/[0.02] text-zinc-500 hover:border-white/10 hover:text-zinc-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setAutoRotate((v) => !v)}
                  className={`rounded-xl border px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition ${
                    autoRotate
                      ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                      : "border-white/5 bg-white/[0.03] text-zinc-500 hover:border-white/10 hover:text-zinc-300"
                  }`}
                >
                  {autoRotate ? "Auto-Rotate ON" : "Auto-Rotate OFF"}
                </button>
              </div>
            </div>

            {useRealModels && selectedCharacter && (
              <ModelCalibrationPanel
                characterTransform={characterTransform}
                mountTransform={mountTransform}
                characterName={selectedCharacter.name}
                mountName={selectedMount?.name}
                onCharacterChange={setCharacterTransform}
                onMountChange={setMountTransform}
              />
            )}
          </section>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              {selectedCharacter ? (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-lg font-black">{selectedCharacter.name}</p>
                        <p className="text-xs text-cyan-300">{selectedCharacter.title}</p>
                      </div>
                      <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        {selectedCharacter.rarity}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                      {selectedCharacter.description}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Stats</p>
                    <div className="space-y-2">
                      {STATS.map((key) => (
                        <StatBar
                          key={key}
                          label={key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                          value={selectedCharacter.stats[key]}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Paleta</p>
                    <div className="flex gap-1.5">
                      {selectedCharacter.colorPalette.map((c, i) => (
                        <span
                          key={i}
                          className="h-5 flex-1 rounded-md border border-white/10"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Partes equipadas</p>
                    <div className="space-y-1">
                      {Object.entries(equippedParts).length > 0 ? (
                        Object.entries(equippedParts).map(([slot, value]) => (
                          <div
                            key={slot}
                            className="flex items-center justify-between rounded-lg bg-black/30 px-2.5 py-1.5 text-[11px]"
                          >
                            <span className="capitalize text-zinc-500">{slot}</span>
                            <span className="font-mono text-zinc-300 truncate ml-2 max-w-[160px]">
                              {String(value)}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-[11px] text-zinc-600">Sin partes equipadas</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-4xl opacity-20">{'\u{1F9D9}'}</p>
                  <p className="mt-3 text-sm font-semibold text-zinc-500">Seleccion\u00E1 un personaje</p>
                  <p className="mt-1 text-xs text-zinc-600">Hac\u00E9 clic en la lista de personajes</p>
                </div>
              )}
            </div>

{mountedPreview && (
  <MountOffsetCalibrationPanel
    mountId={selectedMountId}
    characterName={selectedCharacter?.name}
    mountName={selectedMount?.name}
    offset={customMountOffset}
    onChangeOffset={setCustomMountOffset}
  />
)}

<GraphicsSettingsPanel />

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <p className="mb-1 text-sm font-bold text-zinc-300">Configuraci\u00F3n exportable</p>
              <p className="mb-3 text-xs text-zinc-600">
                Config en JSON lista para guardar o compartir.
              </p>

              <pre className="max-h-40 overflow-auto rounded-xl bg-black/50 p-3 font-mono text-[10px] leading-relaxed text-cyan-200/80">
                {exportedConfig}
              </pre>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={copyJson}
                  className={`flex-1 rounded-xl border px-3 py-2.5 text-xs font-bold transition ${
                    copied
                      ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                      : "border-cyan-400/40 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/20"
                  }`}
                >
                  {copied ? "\u2713 JSON copiado" : "Copiar JSON"}
                </button>
                <button
                  onClick={resetCharacter}
                  className="flex-1 rounded-xl border border-violet-400/30 bg-violet-400/10 px-3 py-2.5 text-xs font-bold text-violet-200 hover:bg-violet-400/20"
                >
                  Reset
                </button>
              </div>
            </div>
          </aside>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
          <h2 className="mb-1 text-sm font-bold tracking-wide text-zinc-300">
            Monturas compatibles
            <span className="ml-2 text-xs font-normal text-zinc-600">
              {compatibleMounts.length}
            </span>
          </h2>
          <p className="mb-3 text-xs text-zinc-600">
            Seleccion\u00E1 una montura compatible con tu personaje para equiparla.
          </p>

          {selectedCharacter ? (
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {compatibleMounts.length > 0 ? (
                compatibleMounts.map((m) => {
                  const isSelected = selectedMountId === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => selectMount(m.id)}
                      className={`rounded-2xl border p-3 text-left transition ${
                        isSelected
                          ? "border-amber-400 bg-amber-400/10 shadow-[0_0_12px_rgba(251,191,36,0.1)]"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <p className="truncate text-sm font-bold">{m.name}</p>
                      <p className="truncate text-[11px] text-zinc-500">{m.type}</p>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-zinc-400">
                          {m.rarity}
                        </span>
                        <div className="flex gap-1">
                          {m.colorPalette.slice(0, 3).map((color, i) => (
                            <span
                              key={i}
                              className="h-2 w-2 rounded-full border border-white/10"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-1 truncate text-[10px] text-zinc-600">{m.specialAbility.name}</p>
                    </button>
                  );
                })
              ) : (
                <p className="col-span-full py-4 text-center text-xs text-zinc-600">
                  Este personaje no tiene monturas compatibles
                </p>
              )}
            </div>
          ) : (
            <p className="py-4 text-center text-xs text-zinc-600">
              Seleccion\u00E1 un personaje para ver sus monturas compatibles
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
