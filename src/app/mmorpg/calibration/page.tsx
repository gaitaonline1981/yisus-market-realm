"use client";

import dynamic from "next/dynamic";

const CalibrationPage = dynamic(() => import("@/_pages/mmorpg/calibration/CalibrationPage").then((m) => ({ default: m.CalibrationPage })), { ssr: false });

export default function Page() {
  return <CalibrationPage />;
}
