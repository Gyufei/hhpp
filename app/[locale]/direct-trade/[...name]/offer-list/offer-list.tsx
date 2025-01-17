"use client";

import { useMemo, useState } from "react";
import { SortSelect } from "@/components/share/sort-select";
import SearchInput from "./search-input";
import { OfferCard, OrderCardSkeleton } from "./offer-card";
// import HoverIcon from "@/components/share/hover-icon";
import { IOffer } from "@/lib/types/offer";
import { useSortOffer } from "@/lib/hooks/offer/use-sort-offer";
import { range } from "lodash";
import OfferDetailDrawer from "../offer-detail/offer-detail-drawer";
import { Skeleton } from "@/components/ui/skeleton";
import Empty from "@/components/share/empty";

export default function OfferList({
  offers,
  isLoading,
  refreshOffers,
}: {
  offers: Array<IOffer>;
  isLoading: boolean;
  refreshOffers: () => void;
}) {
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

  return (
    <div className="flex h-full flex-col">
      {isLoading ? (
        <div className="flex items-center justify-between border-border-black">
          <Skeleton className="h-[30px] w-[100px]" />
          <Skeleton className="h-[30px] w-[30px]" />
        </div>
      ) : offers.length < 1 ? (
        <></>
      ) : (
        <div className="mb-[2px] flex w-full items-center justify-between bg-bg-black pb-[10px] sm:border-b sm:border-border-black">
          <SortSelect
            sortField={sortField}
            sortDir={sortDir}
            handleSortFieldChange={handleSortFieldChange}
            handleSortDirChange={handleSortDirChange}
          />
          <div className="ml-6 flex min-w-[100px] items-center justify-end sm:ml-2">
            <SearchInput handleSearch={handleSearch} />
          </div>
        </div>
      )}

      <div
        className="no-scroll-bar relative mt-[10px] grid flex-1 auto-rows-min grid-cols-1 gap-[10px] overflow-y-auto pb-16 sm:pb-0 xl:grid-cols-2 2xl:grid-cols-3"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        }}
      >
        {isLoading ? (
          range(6).map((i) => <OrderCardSkeleton key={i} />)
        ) : offers.length < 1 ? (
          <div className="absolute inset-0 left-1/2 top-1/2 flex h-full -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <Empty />
          </div>
        ) : (
          (filterOrders || []).map((offer) => (
            <OfferCard
              offer={offer}
              key={offer.offer_id}
              handleShowOffer={handleShowOffer}
            />
          ))
        )}
      </div>

      <OfferDetailDrawer
        offer={showOffer}
        onSuccess={refreshOffers}
        onClose={() => setShowOffer(null)}
      />
    </div>
  );
}
