import dynamic from "next/dynamic";

const TVChartContainer = dynamic(
  () =>
    import("../../../curve-trade/trade-chart/trading-view-widget").then(
      (mod) => mod.TradingViewWidget,
    ),
  { ssr: false },
);

export function TradingChart() {
  return (
    <div className="mt-[2px] h-full flex-1 rounded bg-bg-black">
      <TVChartContainer />
    </div>
  );
}
