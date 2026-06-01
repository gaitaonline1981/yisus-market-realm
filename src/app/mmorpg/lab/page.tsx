"use client";

import dynamic from "next/dynamic";

const LabPage = dynamic(() => import("@/_pages/mmorpg/lab/LabPage").then((m) => ({ default: m.LabPage })), { ssr: false });

export default function Page() {
  return <LabPage />;
}
