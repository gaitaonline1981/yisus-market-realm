"use client"

const COLOR = "#22D3EE"

interface Props { items: string[]; compatible: string[] }

export function CompatibilityList({ items, compatible }: Props) {
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item) => {
        const isCompatible = compatible.includes(item)
        return (
          <span key={item}
            className="rounded-full px-2 py-0.5 text-[9px] font-bold transition"
            style={{
              background: isCompatible ? `${COLOR}15` : "rgba(255,255,255,0.03)",
              color: isCompatible ? COLOR : "#64748B",
              border: `1px solid ${isCompatible ? `${COLOR}30` : "rgba(255,255,255,0.05)"}`,
            }}
          >
            {item}
          </span>
        )
      })}
    </div>
  )
}
