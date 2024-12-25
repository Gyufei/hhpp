import React, { useEffect, useRef } from "react";
import { sparkline } from "@fnando/sparkline";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  strokeWidth?: number;
  className?: string;
  isRedColor?: boolean;
}

const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 100,
  height = 40,
  strokeWidth = 3,
  className = "",
  isRedColor = false,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      sparkline(svgRef.current, data, { strokeWidth });
    }
  }, [data, strokeWidth]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      strokeWidth={strokeWidth}
      className={className}
      style={{
        fill: "none",
        stroke: isRedColor ? "red" : "green",
      }}
    />
  );
};

export default Sparkline;
