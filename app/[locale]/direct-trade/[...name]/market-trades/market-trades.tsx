"use client";

// import { useState } from "react";
// import { ITradeType, TradeTypeSelect } from "./trade-type-select";
import { TradesTable } from "./trades-table";
import { IMarketplace } from "@/lib/types/marketplace";
import { useTranslations } from "next-intl";

export default function MarketTrades({
  marketplace,
  isLoading = false,
}: {
  marketplace: IMarketplace | undefined;
  isLoading?: boolean;
}) {
  const T = useTranslations("tb-MarketTrades");
  const isLoadingFlag = !marketplace || isLoading;
  // const [tradeType, setTradeType] = useState<ITradeType>("All");

  // function handleTradeTypeChange(t: ITradeType) {
  //   setTradeType(t);
  // }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-xs leading-[18px] text-title-white">
            {T("MarketTrades")}
          </div>
        </div>
        {/* <TradeTypeSelect
          type={tradeType}
          handleTypeChange={handleTradeTypeChange}
        /> */}
      </div>

      <TradesTable
        type={"All"}
        marketplace={marketplace}
        isLoading={isLoadingFlag}
      />
    </div>
  );
}
