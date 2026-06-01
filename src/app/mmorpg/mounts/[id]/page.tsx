"use client";

import dynamic from "next/dynamic";

const MountProfilePage = dynamic(
  () =>
    import("@/_pages/mmorpg/mounts/MountProfilePage").then((m) => ({
      default: m.MountProfilePage,
    })),
  { ssr: false }
);

export default function Page() {
  return <MountProfilePage />;
}
