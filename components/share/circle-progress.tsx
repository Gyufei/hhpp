import { cn } from "@/lib/utils/common";
import React from "react";

const cleanPercentage = (percentage: any) => {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0;
  const tooHigh = percentage > 100;
  return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const Circle = ({ colour, pct }: { colour: string; pct?: number }) => {
  const r = 21;
  const circ = 2 * Math.PI * r;
  const strokePct = pct ? ((100 - pct) * circ) / 100 : 1;

  return (
    <circle
      r={r}
      cx="24"
      cy="24"
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""}
      strokeWidth="4px"
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};

export const CircleProgress = ({
  percentage,
  className,
}: {
  percentage: number;
  className?: string;
}) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg className={cn("h-12 w-12", className)}>
      <g transform={`rotate(-90 ${"24 24"})`}>
        <Circle colour="#F0F1F5" />
        {pct !== 0 && <Circle colour="#50D2C1" pct={pct} />}
      </g>
    </svg>
  );
};
