"use client";

import { TradeAssetInfo } from "./trade-asset-info";
import { TradeTabs } from "./trade-tabs";
import { TradingChart } from "./trading-chart";

export default function Page() {
  return (
    <div className="flex items-stretch justify-between bg-border-black pl-[2px] pt-[2px]">
      <div className="flex flex-1 flex-col">
        <TradeAssetInfo />
        <TradingChart />
        <TradeTabs />
      </div>

      <div className="w-[320px]"></div>
    </div>
  );
}
