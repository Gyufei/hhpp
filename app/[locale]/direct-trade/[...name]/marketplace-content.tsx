"use client";
import Image from "next/image";
import { useMemo } from "react";
import { sortBy } from "lodash";

import OfferList from "@/app/[locale]/direct-trade/[...name]/offer-list/offer-list";
import MarketplaceCard from "./marketplace-card";
import OfferDetailDrawer from "./offer-detail/offer-detail-drawer";
import CreateOfferBtn from "./create-offer-btn";
import MarketTrades from "@/app/[locale]/direct-trade/[...name]/market-trades/market-trades";
import MarketCharts from "./chart/market-charts";

import { useAnchor } from "@/lib/hooks/common/use-anchor";
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

  const { anchor: offerId } = useAnchor();

  const anchorOffer = useMemo(() => {
    return offers?.find((o) => String(o.entry.id) === offerId);
  }, [offers, offerId]);

  if (marketplace && offers && offerId && !anchorOffer) {
    return (
      <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center sm:h-[calc(100vh-96px)]">
        <Image src="/img/404.png" width={480} height={360} alt="404" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col sm:h-[calc(100vh-96px)]">
      <div className="relative block sm:hidden">
        {marketplace && (
          <CreateOfferBtn marketplace={marketplace} onSuccess={refreshOffers} />
        )}
      </div>
      <div className="flex flex-1 items-stretch pt-4 sm:pt-0">
        <div className="flex w-full flex-col space-y-6 px-6 sm:w-[348px]">
          <MarketplaceCard
            className="basic-[218px] h-[218px] shrink-0 grow-0"
            marketplace={marketplace}
          />

          <div className="hidden sm:block">
            {marketplace && (
              <CreateOfferBtn
                marketplace={marketplace}
                onSuccess={refreshOffers}
              />
            )}
          </div>

          <div className="hidden sm:block">
            <MarketCharts marketplace={marketplace} />
          </div>
        </div>
        <div
          className="flex-1"
          style={{
            minHeight: isMobileSize
              ? "calc(100vh - 175px)"
              : "min(calc(100vh - 156px), 691px)",
            maxHeight: isMobileSize
              ? "calc(100vh - 175px)"
              : "max(calc(100vh - 156px), 691px)",
          }}
        >
          <OfferList offers={canBuyOffers || []} isLoading={isOffersLoading} />
          <OfferDetailDrawer offers={offers || []} onSuccess={refreshOffers} />
        </div>
        <div className="flex w-full flex-col px-6 sm:hidden">
          <MarketTrades marketplace={marketplace} />

          <div className="hidden h-[80px] py-4 sm:block">
            {marketplace && (
              <CreateOfferBtn
                marketplace={marketplace}
                onSuccess={refreshOffers}
              />
            )}
          </div>

          <MarketCharts marketplace={marketplace} />
        </div>
      </div>
    </div>
  );
}
