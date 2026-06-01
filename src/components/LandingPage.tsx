import { useNavigate } from "react-router-dom"
import { characters } from "@/data/mmorpg/characters"
import { mounts } from "@/data/mmorpg/mounts"
import { tradingMasters } from "@/data/mmorpg/tradingMasters"
import { getMasterAsset } from "@/data/mmorpg/masterAssets"

export function LandingPage() {
  const navigate = useNavigate()

  const featuredChars = characters.slice(0, 4)
  const featuredMounts = mounts.slice(0, 5)
  const featuredMasters = tradingMasters.slice(0, 5)

  return (
    <div className="min-h-screen bg-[#020408] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Crypto Lunáticos</p>
          <h1 className="mb-4 text-[clamp(2rem,5vw,4rem)] font-black tracking-tight">
            <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-amber-300 bg-clip-text text-transparent">
              Yisus Market Realm
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-zinc-500">
            MMORPG educativo de trading. Explorá, aprendé y dominá los mercados con personajes, monturas y maestros.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button onClick={() => navigate("/mmorpg/world")} className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-xs font-bold text-cyan-300 transition hover:bg-cyan-400/20">
              Entrar al Mundo
            </button>
            <button onClick={() => navigate("/")} className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-5 py-2 text-xs font-bold text-emerald-300 transition hover:bg-emerald-400/20">
              Terminal de Trading
            </button>
            <button onClick={() => navigate("/mmorpg/showroom")} className="rounded-lg border border-violet-400/30 bg-violet-400/10 px-5 py-2 text-xs font-bold text-violet-300 transition hover:bg-violet-400/20">
              Showroom 3D
            </button>
          </div>
        </div>
      </section>

      {/* Characters */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Personajes</p>
            <h2 className="text-xl font-black text-white">8 Héroes del Mercado</h2>
          </div>
          <button onClick={() => navigate("/mmorpg/characters")} className="text-xs text-zinc-500 hover:text-cyan-400">
            Ver todos →
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {featuredChars.map((c) => (
            <button key={c.id} onClick={() => navigate(`/mmorpg/showroom?type=character&id=${c.id}`)}
              className="group overflow-hidden rounded-xl border border-white/5 bg-black/30 text-left transition hover:border-cyan-400/30 hover:bg-black/50"
            >
              <div className="flex h-40 items-center justify-center overflow-hidden bg-black/50">
                {c.thumbnailUrl ? (
                  <img src={c.thumbnailUrl} alt={c.name} className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105" />
                ) : (
                  <span className="text-3xl font-black text-zinc-700">{c.name[0]}</span>
                )}
              </div>
              <div className="p-2">
                <p className="text-xs font-bold text-white">{c.name}</p>
                <p className="text-[9px] text-zinc-600">{c.title}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Mounts */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">Monturas</p>
            <h2 className="text-xl font-black text-white">10 Monturas Legendarias</h2>
          </div>
          <button onClick={() => navigate("/mmorpg/mounts")} className="text-xs text-zinc-500 hover:text-amber-400">
            Ver todas →
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {featuredMounts.map((m) => (
            <button key={m.id} onClick={() => navigate(`/mmorpg/showroom?type=mount&id=${m.id}`)}
              className="group overflow-hidden rounded-xl border border-white/5 bg-black/30 text-left transition hover:border-amber-400/30"
            >
              <div className="flex h-24 items-center justify-center overflow-hidden bg-black/50 p-2">
                {m.thumbnailUrl ? (
                  <img src={m.thumbnailUrl} alt={m.name} className="h-full w-full object-contain transition group-hover:scale-105" />
                ) : (
                  <span className="text-lg font-black text-zinc-700">{m.name[0]}</span>
                )}
              </div>
              <div className="p-1.5">
                <p className="truncate text-[10px] font-bold text-white">{m.name}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Masters */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-400">Maestros</p>
            <h2 className="text-xl font-black text-white">10 Maestros del Trading</h2>
          </div>
          <button onClick={() => navigate("/mmorpg/masters")} className="text-xs text-zinc-500 hover:text-violet-400">
            Ver todos →
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {featuredMasters.map((m) => {
            const asset = getMasterAsset(m.id)
            return (
              <button key={m.id} onClick={() => navigate(`/mmorpg/showroom?type=master&id=${m.id}`)}
                className="group overflow-hidden rounded-xl border border-white/5 bg-black/30 text-left transition hover:border-violet-400/30"
              >
                <div className="flex h-24 items-center justify-center overflow-hidden bg-black/50 p-2">
                  {asset?.pngPath ? (
                    <img src={asset.pngPath} alt={m.name} className="h-full w-full object-contain transition group-hover:scale-105" />
                  ) : (
                    <span className="text-lg font-black text-zinc-700">{m.name[0]}</span>
                  )}
                </div>
                <div className="p-1.5">
                  <p className="truncate text-[10px] font-bold text-white">{m.name}</p>
                  <p className="truncate text-[8px] text-zinc-600">{m.specialty}</p>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Quick nav */}
      <section className="border-t border-white/5 bg-black/30 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-2 text-center sm:grid-cols-4">
            <NavBtn label="Mundo 3D" desc="Explorá el Market Realm" href="/mmorpg/world" color="#22D3EE" />
            <NavBtn label="Terminal" desc="Trading en vivo" href="/" color="#10B981" />
            <NavBtn label="Showroom" desc="Modelos 3D" href="/mmorpg/showroom" color="#A78BFA" />
            <NavBtn label="Maestros" desc="Aprendé trading" href="/mmorpg/masters" color="#F59E0B" />
          </div>
        </div>
      </section>
    </div>
  )
}

function NavBtn({ label, desc, href, color }: { label: string; desc: string; href: string; color: string }) {
  const navigate = useNavigate()
  return (
    <button onClick={() => navigate(href)}
      className="rounded-xl border bg-white/[0.02] px-3 py-4 text-left transition hover:bg-white/5"
      style={{ borderColor: `${color}20` }}
    >
      <p className="text-sm font-bold text-white">{label}</p>
      <p className="text-[10px] text-zinc-600">{desc}</p>
    </button>
  )
}
