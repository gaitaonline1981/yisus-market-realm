"use client"

import { characters } from "@/data/mmorpg/characters"
import { mounts } from "@/data/mmorpg/mounts"
import { tradingMasters } from "@/data/mmorpg/tradingMasters"
import { getMasterAsset } from "@/data/mmorpg/masterAssets"

interface Props { selectedType: "character" | "mount" | "master"; selectedId: string; onSelectType: (t: "character" | "mount" | "master") => void; onSelectId: (id: string) => void }

const TABS = [
  { id: "character" as const, label: "Personajes", color: "#22D3EE" },
  { id: "mount" as const, label: "Monturas", color: "#F59E0B" },
  { id: "master" as const, label: "Maestros", color: "#A78BFA" },
]

export function ShowroomItemSelector({ selectedType, selectedId, onSelectType, onSelectId }: Props) {
  const items = selectedType === "character" ? characters : selectedType === "mount" ? mounts : tradingMasters

  return (
    <div>
      <div className="flex border-b border-white/5 bg-black/20">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => onSelectType(t.id)}
            className="flex-1 px-2 py-2 text-[10px] font-bold uppercase tracking-wider transition"
            style={{
              color: selectedType === t.id ? t.color : "#475569",
              borderBottom: selectedType === t.id ? `2px solid ${t.color}` : "2px solid transparent",
              background: selectedType === t.id ? `${t.color}08` : "transparent",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="divide-y divide-white/5">
        {items.map((item: any) => {
          const sel = selectedId === item.id
          const asset = selectedType === "master" ? getMasterAsset(item.id) : null
          const thumb = selectedType === "master" ? asset?.thumbnailPath : item.thumbnailUrl
          return (
            <button key={item.id} onClick={() => onSelectId(item.id)}
              className="flex w-full items-center gap-2 px-3 py-2 text-left transition"
              style={{ background: sel ? "rgba(34,211,238,0.08)" : "transparent" }}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded border border-white/5 bg-black/30">
                {thumb ? <img src={thumb} alt="" className="h-full w-full object-cover" />
                : <span className="text-[10px] font-bold text-zinc-600">{item.name?.[0] || "?"}</span>}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-bold text-zinc-200">{item.name}</p>
                <p className="truncate text-[8px] text-zinc-600">
                  {selectedType === "character" ? item.title : selectedType === "mount" ? item.type : item.alias || ""}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
