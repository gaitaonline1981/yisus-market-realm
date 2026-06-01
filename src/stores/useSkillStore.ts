import { create } from "zustand";

export interface Skill {
  id: string;
  name: string;
  description: string;
  branch: "analisis" | "riesgo" | "velocidad" | "psicologia";
  tier: 1 | 2 | 3;
  xpCost: number;
  prerequisite?: string;
  unlocked: boolean;
}

const SKILL_TREE: Skill[] = [
  { id: "lectura-velas", name: "Lectura de Velas", description: "Identificás patrones de velas básicos", branch: "analisis", tier: 1, xpCost: 100, unlocked: false },
  { id: "soporte-resistencia", name: "Soporte y Resistencia", description: "Trazás niveles clave en el gráfico", branch: "analisis", tier: 1, xpCost: 100, unlocked: false },
  { id: "wyckoff-basico", name: "Wyckoff Básico", description: "Identificás acumulación y distribución", branch: "analisis", tier: 2, xpCost: 300, prerequisite: "lectura-velas", unlocked: false },
  { id: "elliott-basico", name: "Elliott Básico", description: "Contás ondas 1-2-3-4-5", branch: "analisis", tier: 2, xpCost: 300, prerequisite: "soporte-resistencia", unlocked: false },
  { id: "wyckoff-avanzado", name: "Wyckoff Avanzado", description: "Identificás springs y upthrusts", branch: "analisis", tier: 3, xpCost: 600, prerequisite: "wyckoff-basico", unlocked: false },
  { id: "stop-loss", name: "Stop Loss", description: "Colocás stops automáticamente", branch: "riesgo", tier: 1, xpCost: 100, unlocked: false },
  { id: "position-sizing", name: "Position Sizing", description: "Calculás tamaño de posición ideal", branch: "riesgo", tier: 2, xpCost: 250, prerequisite: "stop-loss", unlocked: false },
  { id: "risk-master", name: "Risk Master", description: "Nunca arriesgás más del 1%", branch: "riesgo", tier: 3, xpCost: 500, prerequisite: "position-sizing", unlocked: false },
  { id: "scalping", name: "Scalping", description: "Ejecutás entradas y salidas rápidas", branch: "velocidad", tier: 1, xpCost: 150, unlocked: false },
  { id: "day-trading", name: "Day Trading", description: "Operás en timeframes de 5-15min", branch: "velocidad", tier: 2, xpCost: 350, prerequisite: "scalping", unlocked: false },
  { id: "disciplina", name: "Disciplina", description: "Seguís tu plan sin desviarte", branch: "psicologia", tier: 1, xpCost: 100, unlocked: false },
  { id: "paciencia", name: "Paciencia", description: "Esperás el setup perfecto", branch: "psicologia", tier: 2, xpCost: 250, prerequisite: "disciplina", unlocked: false },
];

interface SkillStore {
  skills: Skill[];
  unlockSkill: (id: string) => void;
  getSkill: (id: string) => Skill | undefined;
  unlockedCount: number;
}

export const useSkillStore = create<SkillStore>((set, get) => ({
  skills: SKILL_TREE,
  unlockSkill: (id) =>
    set((s) => ({
      skills: s.skills.map((sk) => (sk.id === id ? { ...sk, unlocked: true } : sk)),
    })),
  getSkill: (id) => get().skills.find((s) => s.id === id),
  unlockedCount: 0,
}));
