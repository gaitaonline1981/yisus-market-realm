"use client";

import dynamic from "next/dynamic";

const MMORPGHome = dynamic(() => import("@/components/mmorpg/home/MMORPGHome").then((m) => ({ default: m.MMORPGHome })), { ssr: false });

export default function Page() {
  return <MMORPGHome />;
}
