"use client";

import { useState, useEffect } from "react";
import { useTokenStore } from "@/stores/useTokenStore";
import { X, Coins, TrendingUp, History, ArrowUpRight, ArrowDownRight } from "lucide-react";

export function TokenWallet() {
  const [open, setOpen] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(10);
  const balance = useTokenStore((s) => s.balance);
  const staked = useTokenStore((s) => s.staked);
  const transactions = useTokenStore((s) => s.transactions);
  const totalEarned = useTokenStore((s) => s.totalEarned);
  const stakeTokens = useTokenStore((s) => s.stakeTokens);
  const unstakeTokens = useTokenStore((s) => s.unstakeTokens);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "b") setOpen((o) => !o);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#0a0f1a] border border-white/10 rounded-2xl p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Coins size={18} className="text-amber-400" /> $YISUS Wallet
          </h2>
          <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Balance card */}
        <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-500/30 rounded-2xl p-6 mb-4 text-center">
          <p className="text-xs text-amber-300/60 uppercase tracking-wider mb-1">Balance</p>
          <p className="text-4xl font-black text-amber-300 font-mono">
            {balance.toFixed(0)}
          </p>
          <p className="text-xs text-amber-400/60 mt-1">$YISUS</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <p className="text-[10px] text-zinc-500">Stakeado</p>
            <p className="text-sm font-bold text-purple-300">{staked.toFixed(0)}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <p className="text-[10px] text-zinc-500">Total ganado</p>
            <p className="text-sm font-bold text-green-300">{totalEarned.toFixed(0)}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <p className="text-[10px] text-zinc-500">APY Stake</p>
            <p className="text-sm font-bold text-cyan-300">12%</p>
          </div>
        </div>

        {/* Staking */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
          <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider mb-3 flex items-center gap-1">
            <TrendingUp size={12} /> Staking
          </h3>
          <div className="flex gap-2">
            <input
              type="number"
              min={1}
              value={stakeAmount}
              onChange={(e) => setStakeAmount(Number(e.target.value))}
              className="flex-1 px-3 py-1.5 bg-black/50 border border-white/10 rounded-lg text-sm text-white"
            />
            <button
              onClick={() => stakeTokens(stakeAmount)}
              disabled={balance < stakeAmount}
              className="px-4 py-1.5 bg-purple-500/20 border border-purple-500/40 text-purple-300 rounded-lg text-xs font-bold disabled:opacity-30"
            >
              Stake
            </button>
            <button
              onClick={() => unstakeTokens(stakeAmount)}
              disabled={staked < stakeAmount}
              className="px-4 py-1.5 bg-white/10 border border-white/10 text-white/60 rounded-lg text-xs font-bold disabled:opacity-30"
            >
              Unstake
            </button>
          </div>
          <p className="text-[9px] text-zinc-600 mt-2">Stakeando ganás 12% APY. Se acredita cada hora.</p>
        </div>

        {/* How to earn */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
          <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2">Cómo ganar $YISUS</h3>
          <div className="space-y-1 text-xs text-zinc-400">
            <p>🎮 1/min por jugar</p>
            <p>📈 +10 por trade rentable</p>
            <p>📚 +5 por lección completada</p>
            <p>🏆 +20 por logro desbloqueado</p>
            <p>⚔️ +15 por misión completada</p>
          </div>
        </div>

        {/* Recent transactions */}
        {transactions.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider mb-3 flex items-center gap-1">
              <History size={12} /> Historial
            </h3>
            <div className="space-y-1 max-h-32 overflow-auto">
              {transactions.slice(0, 10).map((tx) => (
                <div key={tx.id} className="flex items-center justify-between text-xs py-1">
                  <div className="flex items-center gap-1">
                    {tx.amount > 0 ? (
                      <ArrowUpRight size={10} className="text-green-400" />
                    ) : (
                      <ArrowDownRight size={10} className="text-red-400" />
                    )}
                    <span className="text-zinc-400 truncate max-w-[180px]">{tx.description}</span>
                  </div>
                  <span className={`font-mono ${tx.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount} YISUS
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-white/20 text-xs text-center mt-4">Presioná B para cerrar</p>
      </div>
    </div>
  );
}
