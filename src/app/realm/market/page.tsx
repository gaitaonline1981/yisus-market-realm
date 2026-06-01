"use client";

import dynamic from "next/dynamic";

const RealmMarket = dynamic(() => import("@/_pages/realm/RealmMarket").then((m) => ({ default: m.RealmMarket })), { ssr: false });

export default function Page() {
  return <RealmMarket />;
}
