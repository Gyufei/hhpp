import dynamic from "next/dynamic";
import Script from "next/script";
import { useState } from "react";

const TVChartContainer = dynamic(
  () => import("./trading-view-widget").then((mod) => mod.TradingViewWidget),
  { ssr: false },
);

export function TradingChart() {
  const [isScriptReady, setIsScriptReady] = useState(false);

  return (
    <div className="mt-[2px] flex-1 basis-[560px] rounded bg-bg-black">
      <Script
        src="/datafeeds/udf/dist/bundle.js"
        strategy="lazyOnload"
        onReady={() => {
          setIsScriptReady(true);
        }}
      />
      {isScriptReady && <TVChartContainer />}
    </div>
  );
}
