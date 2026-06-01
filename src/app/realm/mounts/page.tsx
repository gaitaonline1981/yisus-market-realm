"use client";

import dynamic from "next/dynamic";

const RealmMounts = dynamic(() => import("@/_pages/realm/RealmMounts").then((m) => ({ default: m.RealmMounts })), { ssr: false });

export default function Page() {
  return <RealmMounts />;
}
