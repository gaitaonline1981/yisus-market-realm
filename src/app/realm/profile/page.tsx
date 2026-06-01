"use client";

import dynamic from "next/dynamic";

const RealmProfile = dynamic(() => import("@/_pages/realm/RealmProfile").then((m) => ({ default: m.RealmProfile })), { ssr: false });

export default function Page() {
  return <RealmProfile />;
}
