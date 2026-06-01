"use client";

import { useEffect } from "react";
import { useTokenStore } from "@/stores/useTokenStore";

export function TokenEarner() {
  const earnTokens = useTokenStore((s) => s.earnTokens);

  // Passive earning while playing: 1 YISUS per minute
  useEffect(() => {
    const interval = setInterval(() => {
      earnTokens(1, "Jugando Yisus Market Realm");
    }, 60000);
    return () => clearInterval(interval);
  }, [earnTokens]);

  return null;
}
