"use client";

import { useState, useEffect } from "react";
import { useSkillStore } from "@/stores/useSkillStore";
import { useGameStore } from "@/stores/useGameStore";
import { X, Lock, Unlock } from "lucide-react";

const BRANCH_COLORS: Record<string, string> = {
  analisis: "cyan",
  riesgo: "red",
  velocidad: "orange",
  psicologia: "purple",
};

const BRANCH_LABELS: Record<string, string> = {
  analisis: "Análisis Técnico",
  riesgo: "Gestión de Riesgo",
  velocidad: "Velocidad",
  psicologia: "Psicología",
};

export function SkillTreePanel() {
  const [open, setOpen] = useState(false);
  const skills = useSkillStore((s) => s.skills);
  const unlockSkill = useSkillStore((s) => s.unlockSkill);
  const player = useGameStore((s) => s.player);
  const addXp = useGameStore((s) => s.addXp);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k") setOpen((o) => !o);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  const handleUnlock = (skill: typeof skills[0]) => {
    if (player.xp >= skill.xpCost && !skill.unlocked) {
      unlockSkill(skill.id);
      addXp(-skill.xpCost);
    }
  };

  const branches = ["analisis", "riesgo", "velocidad", "psicologia"] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#0a0f1a] border border-white/10 rounded-2xl p-6 w-full max-w-4xl mx-4 max-h-[85vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            🌳 Skill Tree
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-cyan-300 font-mono">{player.xp} XP</span>
            <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {branches.map((branch) => {
            const branchSkills = skills.filter((s) => s.branch === branch);
            const color = BRANCH_COLORS[branch];
            return (
              <div key={branch}>
                <h3 className={`text-xs font-bold text-${color}-400 uppercase tracking-wider mb-3 text-center`}
                  style={{ color: `var(--color-${color}-400, #${color === "cyan" ? "2FC7C9" : color === "red" ? "EF4444" : color === "orange" ? "F97316" : "A78BFA"})` }}>
                  {BRANCH_LABELS[branch]}
                </h3>
                <div className="space-y-2">
                  {branchSkills
                    .sort((a, b) => a.tier - b.tier)
                    .map((skill) => {
                      const canUnlock = player.xp >= skill.xpCost && !skill.unlocked;
                      const prereq = skill.prerequisite
                        ? skills.find((s) => s.id === skill.prerequisite)
                        : null;
                      const prereqMet = !skill.prerequisite || prereq?.unlocked;

                      return (
                        <button
                          key={skill.id}
                          onClick={() => canUnlock && prereqMet && handleUnlock(skill)}
                          disabled={!canUnlock || !prereqMet}
                          className={`w-full text-left p-3 rounded-lg border transition-all ${
                            skill.unlocked
                              ? "bg-green-500/10 border-green-500/30"
                              : canUnlock && prereqMet
                              ? "bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer"
                              : "bg-white/2 border-white/5 opacity-50 cursor-not-allowed"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {skill.unlocked ? (
                              <Unlock size={14} className="text-green-400" />
                            ) : (
                              <Lock size={14} className="text-white/30" />
                            )}
                            <h4 className="font-bold text-xs text-white">{skill.name}</h4>
                            <span className="text-[9px] text-white/30 ml-auto">T{skill.tier}</span>
                          </div>
                          <p className="text-[10px] text-zinc-500">{skill.description}</p>
                          {!skill.unlocked && (
                            <p className="text-[9px] text-cyan-400 mt-1">
                              {!prereqMet
                                ? `Requiere: ${prereq?.name}`
                                : `${skill.xpCost} XP para desbloquear`}
                            </p>
                          )}
                        </button>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-white/20 text-xs text-center mt-6">Presioná K para cerrar</p>
      </div>
    </div>
  );
}
