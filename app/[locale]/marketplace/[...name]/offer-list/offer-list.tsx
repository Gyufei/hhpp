"use client";

import { useMemo, useState } from "react";
import {
  IOfferType,
  OfferTypeSelect,
} from "@/components/share/offer-type-select";
import { SortSelect } from "@/components/share/sort-select";
import SearchInput from "./search-input";
import { OfferCard, OrderCardSkeleton } from "./offer-card";
// import HoverIcon from "@/components/share/hover-icon";
import { IOffer } from "@/lib/types/offer";
import { useSortOffer } from "@/lib/hooks/offer/use-sort-offer";
import { range } from "lodash";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";

export default function OfferList({
  offers,
  isLoading,
}: {
  offers: Array<IOffer>;
  isLoading: boolean;
}) {
  const [orderTypes, setOrderTypes] = useState<Array<IOfferType>>(["sell"]);
  const [searchText, setSearchText] = useState("");

  const { isMobileSize } = useDeviceSize();
  const {
    sortField,
    sortDir,
    handleSortFieldChange,
    handleSortDirChange,
    sortOffers,
  } = useSortOffer(offers || []);

  const filterOrders = useMemo(() => {
    const typeOrders = (sortOffers || [])?.filter((o: IOffer) =>
      orderTypes.includes(o.entry.direction as IOfferType),
    );

    if (!searchText) {
      return typeOrders;
    }

    return typeOrders?.filter((o: IOffer) => {
      const isIdMatch = String(o.entry.id) === String(searchText);

      return isIdMatch;
    });
  }, [sortOffers, orderTypes, searchText]);

  // const [layout, setLayout] = useState<"grid" | "list">("grid");

  function handleTypeChange(t: Array<IOfferType>) {
    setOrderTypes(t);
  }

  function handleSearch(text: string) {
    setSearchText(text);
  }

  const isOffChainFungiblePoint =
    filterOrders?.[0]?.marketplace?.market_catagory ===
    "offchain_fungible_point";
  const isPointToken =
    filterOrders?.[0]?.marketplace?.market_catagory === "point_token";

  return (
    <div className="flex h-full flex-col rounded-none bg-[#fafafa] p-5 sm:rounded-3xl">
      <div className="flex w-full items-center justify-between border-b border-[#d8d8d8] pb-5">
        <div className="no-scroll-bar flex w-[calc(100vw-170px)] flex-1 items-center space-x-4 overflow-x-scroll sm:w-auto sm:overflow-hidden">
          <OfferTypeSelect
            types={orderTypes}
            handleTypeChange={handleTypeChange}
          />
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
          {/* <div
            data-active={layout === "list"}
            className="ml-2 hidden h-8 w-8 min-w-8 cursor-pointer items-center justify-center rounded-full data-[active=true]:bg-white sm:flex"
          >
            <HoverIcon
              src="/icons/menu-gray.svg"
              hoverSrc="/icons/menu.svg"
              active={layout === "list"}
              width={20}
              height={20}
              onClick={() => setLayout("list")}
              alt="menu"
            />
          </div>
          <div
            data-active={layout === "grid"}
            className="ml-2 flex h-8 w-8 min-w-8 cursor-pointer items-center justify-center rounded-full data-[active=true]:bg-white"
          >
            <HoverIcon
              src="/icons/grid-gray.svg"
              hoverSrc="/icons/grid.svg"
              active={layout === "grid"}
              width={20}
              height={20}
              onClick={() => setLayout("grid")}
              alt="menu"
            />
          </div> */}
        </div>
      </div>

      <div
        className="no-scroll-bar mt-5 grid flex-1 auto-rows-min grid-cols-1 gap-5 overflow-y-auto xl:grid-cols-2 2xl:grid-cols-3"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        }}
      >
        {isLoading
          ? range(6).map((i) => <OrderCardSkeleton key={i} />)
          : (filterOrders || []).map((offer) => (
              <OfferCard offer={offer} key={offer.offer_id} />
            ))}
      </div>
    </div>
  );
}
