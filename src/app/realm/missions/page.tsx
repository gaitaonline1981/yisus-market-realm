"use client";

import dynamic from "next/dynamic";

const RealmMissions = dynamic(() => import("@/_pages/realm/RealmMissions").then((m) => ({ default: m.RealmMissions })), { ssr: false });

export default function Page() {
  return <RealmMissions />;
}
