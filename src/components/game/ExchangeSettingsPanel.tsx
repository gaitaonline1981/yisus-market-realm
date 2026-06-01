"use client";

import { useState, useEffect } from "react";
import { useExchangeStore } from "@/stores/useExchangeStore";
import { EXCHANGE_LIST, type ExchangeConfig } from "@/game/trading/exchangeAdapter";
import { X, Wifi, WifiOff, Settings, Eye, EyeOff } from "lucide-react";

export function ExchangeSettingsPanel() {
  const [open, setOpen] = useState(false);
  const exchanges = useExchangeStore((s) => s.exchanges);
  const updateExchange = useExchangeStore((s) => s.updateExchange);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formKey, setFormKey] = useState("");
  const [formSecret, setFormSecret] = useState("");
  const [formTestnet, setFormTestnet] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "x") setOpen((o) => !o);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  const handleSave = (id: string) => {
    updateExchange(id, { apiKey: formKey, secretKey: formSecret, testnet: formTestnet });
    setEditingId(null);
  };

  const handleToggle = (id: string, enabled: boolean) => {
    updateExchange(id, { enabled });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#0a0f1a] border border-white/10 rounded-2xl p-6 w-full max-w-lg mx-4 max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Settings size={18} className="text-cyan-400" /> Exchanges
          </h2>
          <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <p className="text-xs text-zinc-500 mb-4">
          Conectá tus exchanges con API keys. Las keys se guardan SOLO en tu navegador.
          Para datos públicos (gráficos) no necesitás key.
        </p>

        <div className="space-y-3">
          {EXCHANGE_LIST.map((ex) => {
            const config = exchanges.find((e) => e.id === ex.id) || { enabled: false, apiKey: "", secretKey: "", testnet: false };
            const hasKey = config.apiKey.length > 0;
            const isEditing = editingId === ex.id;

            return (
              <div key={ex.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{ex.icon}</span>
                    <div>
                      <h3 className="font-bold text-sm text-white">{ex.name}</h3>
                      <p className="text-[10px] text-zinc-500">{ex.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasKey ? (
                      <Wifi size={14} className="text-green-400" />
                    ) : (
                      <WifiOff size={14} className="text-zinc-600" />
                    )}
                    <button
                      onClick={() => handleToggle(ex.id, !config.enabled)}
                      className={`px-2 py-1 rounded text-[10px] font-bold ${
                        config.enabled ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/40"
                      }`}
                    >
                      {config.enabled ? "ON" : "OFF"}
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-2 mt-3">
                    <input
                      type={showKeys[ex.id] ? "text" : "password"}
                      value={formKey}
                      onChange={(e) => setFormKey(e.target.value)}
                      placeholder="API Key"
                      className="w-full px-3 py-1.5 bg-black/50 border border-white/10 rounded text-xs text-white"
                    />
                    <input
                      type={showKeys[ex.id] ? "text" : "password"}
                      value={formSecret}
                      onChange={(e) => setFormSecret(e.target.value)}
                      placeholder="Secret Key"
                      className="w-full px-3 py-1.5 bg-black/50 border border-white/10 rounded text-xs text-white"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowKeys((s) => ({ ...s, [ex.id]: !s[ex.id] }))}
                        className="text-xs text-zinc-500 hover:text-white"
                      >
                        {showKeys[ex.id] ? <EyeOff size={12} /> : <Eye size={12} />}
                      </button>
                      <label className="flex items-center gap-1 text-[10px] text-zinc-500">
                        <input
                          type="checkbox"
                          checked={formTestnet}
                          onChange={(e) => setFormTestnet(e.target.checked)}
                          className="rounded"
                        />
                        Testnet
                      </label>
                      <button
                        onClick={() => handleSave(ex.id)}
                        className="ml-auto px-3 py-1 bg-cyan-500 text-black text-[10px] font-bold rounded"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-2 py-1 text-[10px] text-zinc-500"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(ex.id);
                      setFormKey(config.apiKey);
                      setFormSecret(config.secretKey);
                      setFormTestnet(config.testnet);
                    }}
                    className="w-full text-left text-xs text-cyan-400 hover:underline mt-2"
                  >
                    {hasKey ? "Cambiar API keys" : "Agregar API key..."}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <p className="text-[10px] text-amber-300 font-bold">⚠️ Seguridad</p>
          <p className="text-[10px] text-amber-200/70 mt-1">
            Las API keys se guardan solo en localStorage de tu navegador. Nunca se envían a nuestros servidores.
            Usá keys con permisos de SOLO LECTURA. Nunca compartas tus secret keys.
          </p>
        </div>

        <p className="text-white/20 text-xs text-center mt-4">Presioná X para cerrar</p>
      </div>
    </div>
  );
}
