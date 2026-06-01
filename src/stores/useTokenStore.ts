import { create } from "zustand";

export interface TokenTransaction {
  id: string;
  type: "earn" | "spend" | "transfer" | "stake";
  amount: number;
  timestamp: number;
  description: string;
}

interface TokenStore {
  balance: number;
  staked: number;
  transactions: TokenTransaction[];
  earnRate: number; // tokens per minute while playing
  totalEarned: number;
  earnedThisSession: number;

  earnTokens: (amount: number, description: string) => void;
  spendTokens: (amount: number, description: string) => boolean;
  stakeTokens: (amount: number) => boolean;
  unstakeTokens: (amount: number) => boolean;
  getBalance: () => number;
}

const INITIAL_BALANCE = 100;

export const useTokenStore = create<TokenStore>((set, get) => ({
  balance: INITIAL_BALANCE,
  staked: 0,
  transactions: [],
  earnRate: 1,
  totalEarned: INITIAL_BALANCE,
  earnedThisSession: 0,

  earnTokens: (amount, description) =>
    set((s) => ({
      balance: s.balance + amount,
      totalEarned: s.totalEarned + amount,
      earnedThisSession: s.earnedThisSession + amount,
      transactions: [
        {
          id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 4)}`,
          type: "earn",
          amount,
          timestamp: Date.now(),
          description,
        },
        ...s.transactions.slice(0, 99),
      ],
    })),

  spendTokens: (amount, description) => {
    const { balance } = get();
    if (balance < amount) return false;
    set((s) => ({
      balance: s.balance - amount,
      transactions: [
        {
          id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 4)}`,
          type: "spend",
          amount: -amount,
          timestamp: Date.now(),
          description,
        },
        ...s.transactions.slice(0, 99),
      ],
    }));
    return true;
  },

  stakeTokens: (amount) => {
    const { balance } = get();
    if (balance < amount) return false;
    set((s) => ({ balance: s.balance - amount, staked: s.staked + amount }));
    return true;
  },

  unstakeTokens: (amount) => {
    const { staked } = get();
    if (staked < amount) return false;
    set((s) => ({ balance: s.balance + amount, staked: s.staked - amount }));
    return true;
  },

  getBalance: () => get().balance,
}));

// Load from storage
try {
  const saved = localStorage.getItem("yisus-token");
  if (saved) {
    const data = JSON.parse(saved);
    useTokenStore.setState({
      balance: data.balance ?? INITIAL_BALANCE,
      staked: data.staked ?? 0,
      totalEarned: data.totalEarned ?? INITIAL_BALANCE,
    });
  }
} catch {}

// Save to storage periodically
setInterval(() => {
  const s = useTokenStore.getState();
  try {
    localStorage.setItem(
      "yisus-token",
      JSON.stringify({ balance: s.balance, staked: s.staked, totalEarned: s.totalEarned })
    );
  } catch {}
}, 30000);
