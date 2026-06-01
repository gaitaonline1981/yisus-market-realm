"use client";

import dynamic from "next/dynamic";

const RealmLab = dynamic(() => import("@/_pages/realm/RealmLab").then((m) => ({ default: m.RealmLab })), { ssr: false });

export default function Page() {
  return <RealmLab />;
}
