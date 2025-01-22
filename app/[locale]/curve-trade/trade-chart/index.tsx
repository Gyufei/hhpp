import dynamic from "next/dynamic";

const TVChartContainer = dynamic(
  () => import("./trading-view-widget").then((mod) => mod.TradingViewWidget),
  { ssr: false },
);

export function TradingChart({ symbol }: { symbol: string }) {
  return (
    <div className="mt-[2px] flex-1 basis-[560px] rounded bg-bg-black">
      <TVChartContainer symbol={symbol} />
    </div>
  );
}
