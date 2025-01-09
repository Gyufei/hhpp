"use client";

import { TradeAssetInfo } from "./trade-asset-info";
import { TradeTabs } from "./trade-tabs";
import { TradingChart } from "./trade-chart";
import TradePanel from "./trade-panel";

export default function Page() {
  return (
    <div className="flex items-stretch justify-between bg-border-black px-[2px] py-[2px]">
      <div className="flex flex-1 flex-col">
        <TradeAssetInfo />
        <TradingChart />
        <TradeTabs />
      </div>

      <TradePanel />
    </div>
  );
}
