"use client";

import dynamic from "next/dynamic";

const MountsPage = dynamic(() => import("@/_pages/mmorpg/mounts/MountsPage").then((m) => ({ default: m.MountsPage })), { ssr: false });

export default function Page() {
  return <MountsPage />;
}
