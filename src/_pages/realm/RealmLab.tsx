import { useNavigate } from "react-router-dom"
import { RealmHUD } from "@/components/realm/RealmHUD"
import { realmAgents } from "@/data/realm/agents"

export function RealmLab() {
  const navigate = useNavigate()
  const agents = realmAgents.filter((a) => a.status === "active")

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <RealmHUD />
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-violet-300">Laboratorio IA</p>
          <h1 className="text-2xl font-black text-white md:text-3xl">Agentes del Market Realm</h1>
          <p className="mt-1 text-sm text-zinc-500">NPCs impulsados por IA que te guían en el mundo del trading.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <div key={agent.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-violet-400/30">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10 text-sm font-black text-violet-300">
                  {agent.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{agent.name}</p>
                  <p className="text-[10px] text-zinc-500">{agent.role}</p>
                </div>
              </div>
              <p className="mb-2 text-xs leading-relaxed text-zinc-400">{agent.description}</p>
              <div className="flex flex-wrap gap-1">
                <span className="rounded bg-cyan-400/10 px-2 py-0.5 text-[8px] font-bold text-cyan-400">{agent.model}</span>
                <span className="rounded bg-white/10 px-2 py-0.5 text-[8px] text-zinc-500">{agent.category}</span>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => navigate("/realm")}
          className="mt-6 inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-zinc-400 transition hover:bg-white/10 hover:text-white cursor-pointer"
        >
          ← Volver al inicio
        </button>
      </section>
    </main>
  )
}
