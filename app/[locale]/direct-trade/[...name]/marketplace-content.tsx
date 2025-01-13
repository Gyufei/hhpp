"use client";
import { useMemo } from "react";
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

export default function MarketplaceContent({
  marketplace,
}: {
  marketplace: IMarketplace;
}) {
  const { isMobileSize } = useDeviceSize();

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

  return (
    <div className="flex w-full flex-col bg-border-black p-[2px]">
      <div className="flex flex-1 pt-4 sm:pt-0">
        <div className="mr-[2px] flex w-full flex-col sm:w-[320px]">
          <MarketplaceCard
            className="mb-[2px] rounded bg-bg-black px-[10px] pb-5 pt-[10px]"
            marketplace={marketplace}
          />

          <div className="mb-[2px] hidden rounded bg-bg-black px-[10px] py-4 sm:block">
            {marketplace && (
              <CreateOfferBtn
                marketplace={marketplace}
                onSuccess={refreshOffers}
              />
            )}
          </div>

          <div className="box-border hidden flex-1 rounded bg-bg-black sm:block ">
            <MarketCharts marketplace={marketplace} />
          </div>
        </div>
        <div
          className="mr-[2px] flex-1 rounded bg-bg-black p-[10px]"
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
        <div
          className="flex w-full flex-col rounded bg-bg-black px-[10px] sm:w-[320px]"
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
      </div>
    </div>
  );
}
