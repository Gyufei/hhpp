"use client";
import { useMemo, useState } from "react";
import { sortBy } from "lodash";

import OfferList from "@/app/[locale]/direct-trade/[...name]/offer-list/offer-list";
import MarketplaceCard from "./marketplace-card";
import CreateOfferBtn from "./create-offer-btn";
import MarketCharts from "./chart/market-charts";
import MarketTrades from "./market-trades/market-trades";

import { useMarketOffers } from "@/lib/hooks/api/use-market-offers";
import { IOffer } from "@/lib/types/offer";

import { IMarketplace } from "@/lib/types/marketplace";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";
import { cn } from "@/lib/utils/common";

export default function MarketplaceContent({
  marketplace,
}: {
  marketplace: IMarketplace;
}) {
  const { isMobileSize } = useDeviceSize();
  const [currentTab, setCurrentTab] = useState<ITab>("Items");

  const {
    data: offers,
    mutate: refreshOffers,
    isLoading: isOffersLoading,
  } = useMarketOffers({
    marketSymbol: marketplace?.market_symbol || "",
    marketChain: marketplace.chain,
  });

  const canBuyOffers = useMemo(() => {
    const showOffer = (offers || [])?.filter((ord: IOffer) =>
      ["virgin", "ongoing", "filled"].includes(ord.status),
    );
    const sortO = sortBy(showOffer, "status");

    return sortO;
  }, [offers]);

  const showItems = !isMobileSize || (isMobileSize && currentTab === "Items");
  const showTrades = !isMobileSize || (isMobileSize && currentTab === "Trades");
  const showChart = isMobileSize && currentTab === "Chart";

  return (
    <div className="flex min-h-[calc(100vh-56px)] w-full flex-col bg-border-black p-[2px] sm:flex-row">
      <div className="mr-[2px] flex w-full flex-col sm:w-[320px]">
        <MarketplaceCard
          className="mb-[2px] rounded bg-bg-black"
          marketplace={marketplace}
        />

        <div className="fixed bottom-0 z-50 mb-0 w-full rounded border-t border-border-black bg-bg-black px-[10px] py-2 sm:static sm:mb-[2px] sm:block sm:border-none sm:py-4">
          {marketplace && (
            <CreateOfferBtn
              marketplace={marketplace}
              onSuccess={refreshOffers}
            />
          )}
        </div>

        <div className="box-border hidden flex-1 rounded bg-bg-black sm:block">
          <MarketCharts marketplace={marketplace} />
        </div>
      </div>

      <MobileSwitchTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {showChart && (
        <div className="flex w-full flex-1 flex-col rounded bg-bg-black px-[10px]">
          <MarketCharts marketplace={marketplace} />
        </div>
      )}

      {showItems && (
        <div
          className="mr-[2px] flex-1 rounded bg-bg-black p-[10px] pt-4 sm:pt-[10px]"
          style={{
            minHeight: isMobileSize
              ? "calc(100vh - 175px)"
              : "min(calc(100vh - 60px), 708px)",
            maxHeight: isMobileSize
              ? "calc(100vh - 175px)"
              : "max(calc(100vh - 60px), 708px)",
          }}
        >
          <OfferList
            offers={canBuyOffers || []}
            isLoading={isOffersLoading}
            refreshOffers={refreshOffers}
          />
        </div>
      )}

      {showTrades && (
        <div
          className="flex w-full flex-col rounded bg-bg-black px-[10px] pb-16 pt-4 sm:w-[320px] sm:pb-0 sm:pt-0"
          style={{
            minHeight: isMobileSize
              ? "calc(100vh - 175px)"
              : "min(calc(100vh - 60px), 691px)",
            maxHeight: isMobileSize
              ? "calc(100vh - 175px)"
              : "max(calc(100vh - 60px), 691px)",
          }}
        >
          <MarketTrades marketplace={marketplace} />
        </div>
      )}
    </div>
  );
}

type ITab = "Items" | "Chart" | "Trades";
const MobilePageTab: ITab[] = ["Items", "Chart", "Trades"];

function MobileSwitchTabs({
  currentTab,
  setCurrentTab,
}: {
  currentTab: ITab;
  setCurrentTab: (tab: ITab) => void;
}) {
  const handleTabClick = (tab: ITab) => {
    setCurrentTab(tab);
  };

  return (
    <div className="w-full bg-bg-black sm:hidden">
      <div className="relative mx-[10px] mt-[10px] flex items-center justify-start">
        {MobilePageTab.map((tab) => (
          <div
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={cn(
              "z-10 flex items-center justify-center px-5 py-[10px] text-gray transition-all",
              currentTab === tab && "border-b border-main text-title-white",
            )}
          >
            {tab}
          </div>
        ))}
        <div className="absolute bottom-[1px] h-1 w-full border-b border-border-black"></div>
      </div>
    </div>
  );
}
