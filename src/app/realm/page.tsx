"use client";

import dynamic from "next/dynamic";

const RealmLanding = dynamic(() => import("@/_pages/realm/RealmLanding").then((m) => ({ default: m.RealmLanding })), { ssr: false });

export default function Page() {
  return <RealmLanding />;
}
