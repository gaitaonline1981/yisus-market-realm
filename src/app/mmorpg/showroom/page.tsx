"use client";

import dynamic from "next/dynamic";

const ShowroomPage = dynamic(() => import("@/_pages/mmorpg/showroom/ShowroomPage").then((m) => ({ default: m.ShowroomPage })), { ssr: false });

export default function Page() {
  return <ShowroomPage />;
}
