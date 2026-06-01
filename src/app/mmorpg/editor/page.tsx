"use client";

import dynamic from "next/dynamic";

const EditorPage = dynamic(() => import("@/_pages/mmorpg/editor/EditorPage").then((m) => ({ default: m.EditorPage })), { ssr: false });

export default function Page() {
  return <EditorPage />;
}
