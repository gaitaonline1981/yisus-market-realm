"use client";

import dynamic from "next/dynamic";

const MastersPage = dynamic(() => import("@/_pages/mmorpg/masters/MastersPage").then((m) => ({ default: m.MastersPage })), { ssr: false });

export default function Page() {
  return <MastersPage />;
}
