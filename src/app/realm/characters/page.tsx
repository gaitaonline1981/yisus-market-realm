"use client";

import dynamic from "next/dynamic";

const RealmCharacters = dynamic(() => import("@/_pages/realm/RealmCharacters").then((m) => ({ default: m.RealmCharacters })), { ssr: false });

export default function Page() {
  return <RealmCharacters />;
}
