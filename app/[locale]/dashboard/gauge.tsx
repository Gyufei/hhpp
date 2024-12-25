"use client";
import dynamic from "next/dynamic";

export const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});
