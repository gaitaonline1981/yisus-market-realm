"use client";

import dynamic from "next/dynamic";

const WorldPage = dynamic(() => import("./page-content"), { ssr: false });

export default function Page() {
  return <WorldPage />;
}
