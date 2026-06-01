"use client";

import { useState, useEffect } from "react";
import { useInventoryStore } from "@/stores/useInventoryStore";
import { X } from "lucide-react";

const TYPE_ICONS: Record<string, string> = {
  badge: "🏅",
  scroll: "📜",
  lens: "🔍",
  mount: "🐎",
  consumable: "🧪",
};

export function InventoryPanel() {
  const [open, setOpen] = useState(false);
  const items = useInventoryStore((s) => s.items);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "i") setOpen((o) => !o);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-black/90 border border-white/10 rounded-2xl p-6 w-full max-w-md mx-4 max-h-[70vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            🎒 Inventario
          </h2>
          <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-zinc-500 text-sm text-center py-8">
            Vacío. Completá misiones para obtener items.
          </p>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-xl">
                  {TYPE_ICONS[item.type] ?? "📦"}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-white">{item.name}</h3>
                  <p className="text-xs text-zinc-500 truncate">{item.description}</p>
                  <span className={`text-[9px] mt-1 inline-block px-2 py-0.5 rounded-full ${
                    item.rarity === "legendary" ? "bg-amber-500/20 text-amber-300" :
                    item.rarity === "epic" ? "bg-purple-500/20 text-purple-300" :
                    "bg-cyan-500/20 text-cyan-300"
                  }`}>
                    {item.rarity}
                  </span>
                </div>
                {item.quantity > 1 && (
                  <span className="text-white/60 text-sm font-bold">x{item.quantity}</span>
                )}
              </div>
            ))}
          </div>
        )}

        <p className="text-white/20 text-xs text-center mt-4">Presioná I para cerrar</p>
      </div>
    </div>
  );
}
