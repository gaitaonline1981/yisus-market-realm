"use client";

import dynamic from "next/dynamic";

const SelectPage = dynamic(() => import("./page-content"), { ssr: false });

export default function Page() {
  return <SelectPage />;
}
