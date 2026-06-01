export interface GameCharacter {
  id: string;
  name: string;
  role: string;
  modelPath: string;
  previewImage: string;
  description: string;
  tradingSpecialty: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  stats: {
    speed: number;
    analysis: number;
    risk: number;
    intuition: number;
  };
  isPlayable: boolean;
  modelScale: number;
}

export interface GameMount {
  id: string;
  name: string;
  modelPath: string;
  previewImage: string;
  speed: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlockCondition: string;
  tradingMeaning: string;
  modelScale: number;
}

export interface WorldZone {
  id: string;
  name: string;
  difficulty: number;
  concept: string;
  position: [number, number, number];
  size: [number, number];
  color: string;
}

export interface GameQuest {
  id: string;
  title: string;
  type: "education" | "trading" | "exploration" | "combat";
  npcId: string;
  objective: string;
  reward: { xp: number; item?: string };
}

export interface PlayerState {
  characterId: string;
  mountId: string | null;
  position: [number, number, number];
  rotation: number;
  xp: number;
  level: number;
}
