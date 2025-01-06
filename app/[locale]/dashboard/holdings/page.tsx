"use client";
import { useMyHoldings } from "@/lib/hooks/api/use-my-holdings";
import { SortSelect } from "@/components/share/sort-select";
import HoldingCard from "./holding-card";
import { useSortHolding } from "@/lib/hooks/holding/use-sort-holding";
import { useTranslations } from "next-intl";

export default function MyHoldings() {
  const T = useTranslations("page-MyStocks");

  const { data: holdings } = useMyHoldings();

  const {
    sortField,
    sortDir,
    handleSortFieldChange,
    handleSortDirChange,
    sortOffers,
  } = useSortHolding(holdings || []);

  const isOffChainFungiblePoint =
    sortOffers?.[0]?.marketplace?.market_catagory === "offchain_fungible_point";

  const isPointToken =
    sortOffers?.[0]?.marketplace?.market_catagory === "point_token";

  return (
    <div className="flex flex-1 flex-col p-4 sm:ml-5 sm:p-0">
      <div className="flex items-center justify-between">
        <div className="hidden text-xl leading-[30px] text-txt-white sm:flex">
          {T("cap-MyStocks")}
        </div>
        <div className="flex items-center justify-end space-x-6">
          <SortSelect
            sortField={sortField}
            sortDir={sortDir}
            handleSortFieldChange={handleSortFieldChange}
            handleSortDirChange={handleSortDirChange}
            showCollateral={!(isOffChainFungiblePoint || isPointToken)}
          />
        </div>
      </div>

      {sortOffers.length ? (
        <div className="no-scroll-bar mt-5 grid max-h-[calc(100vh-248px)] flex-1 auto-rows-min grid-cols-1 gap-5 overflow-y-auto border-t border-[#eee] pt-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {(sortOffers || []).map((holding) => {
            return <HoldingCard key={holding.holding_id} holding={holding} />;
          })}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center text-base text-gray">
          {T("txt-YourStockAppearHere")}
        </div>
      )}
    </div>
  );
}
