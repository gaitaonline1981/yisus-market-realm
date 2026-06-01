"use client";

import dynamic from "next/dynamic";

const RealmWorld = dynamic(() => import("@/_pages/realm/RealmWorld").then((m) => ({ default: m.RealmWorld })), { ssr: false });

export default function Page() {
  return <RealmWorld />;
}
