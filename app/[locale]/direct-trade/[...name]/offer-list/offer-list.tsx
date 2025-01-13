"use client";

import { useMemo, useState } from "react";
import { SortSelect } from "@/components/share/sort-select";
import SearchInput from "./search-input";
import { OfferCard, OrderCardSkeleton } from "./offer-card";
// import HoverIcon from "@/components/share/hover-icon";
import { IOffer } from "@/lib/types/offer";
import { useSortOffer } from "@/lib/hooks/offer/use-sort-offer";
import { range } from "lodash";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";
import OfferDetailDrawer from "../offer-detail/offer-detail-drawer";

export default function OfferList({
  offers,
  isLoading,
  refreshOffers,
}: {
  offers: Array<IOffer>;
  isLoading: boolean;
  refreshOffers: () => void;
}) {
  const { isMobileSize } = useDeviceSize();
  const {
    sortField,
    sortDir,
    handleSortFieldChange,
    handleSortDirChange,
    sortOffers,
  } = useSortOffer(offers || []);

  const [searchText, setSearchText] = useState("");
  const [showOffer, setShowOffer] = useState<IOffer | null>(null);

  const filterOrders = useMemo(() => {
    if (!searchText) {
      return sortOffers;
    }

    return sortOffers?.filter((o: IOffer) => {
      const isIdMatch = String(o.entry.id) === String(searchText);

      return isIdMatch;
    });
  }, [sortOffers, searchText]);

  function handleSearch(text: string) {
    setSearchText(text);
  }

  function handleShowOffer(offer: IOffer) {
    setShowOffer(offer);
  }

  const isOffChainFungiblePoint =
    filterOrders?.[0]?.marketplace?.market_catagory ===
    "offchain_fungible_point";
  const isPointToken =
    filterOrders?.[0]?.marketplace?.market_catagory === "point_token";

  return (
    <div className="flex h-full flex-col">
      <div className="mb-[2px] flex w-full items-center justify-between border-b border-border-black bg-bg-black pb-[10px]">
        <div className="no-scroll-bar flex w-[calc(100vw-170px)] flex-1 items-center space-x-4 overflow-x-scroll sm:w-auto sm:overflow-hidden">
          <SortSelect
            sortField={sortField}
            sortDir={sortDir}
            handleSortFieldChange={handleSortFieldChange}
            handleSortDirChange={handleSortDirChange}
            showCollateral={!(isOffChainFungiblePoint || isPointToken)}
          />
        </div>
        <div
          style={{
            background: isMobileSize
              ? "linear-gradient(270deg, #FAFAFA 0%, #FAFAFA 71%, rgba(250, 250, 250, 0) 107%)"
              : "none",
          }}
          className="ml-6 flex min-w-[100px] items-center justify-end sm:ml-2"
        >
          <SearchInput handleSearch={handleSearch} />
        </div>
      </div>

      <div
        className="no-scroll-bar mt-[10px] grid flex-1 auto-rows-min grid-cols-1 gap-[10px] overflow-y-auto xl:grid-cols-2 2xl:grid-cols-3"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        }}
      >
        {isLoading
          ? range(6).map((i) => <OrderCardSkeleton key={i} />)
          : (filterOrders || []).map((offer) => (
              <OfferCard
                offer={offer}
                key={offer.offer_id}
                handleShowOffer={handleShowOffer}
              />
            ))}
      </div>
      <OfferDetailDrawer
        offer={showOffer}
        onSuccess={refreshOffers}
        onClose={() => setShowOffer(null)}
      />
    </div>
  );
}
