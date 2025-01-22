"use client";

import { HolderTable } from "./holder-table";
import { IMarketplace } from "@/lib/types/marketplace";
import { useTranslations } from "next-intl";

export default function MarketHolder({
  marketplace,
  isLoading = false,
}: {
  marketplace: IMarketplace | undefined;
  isLoading?: boolean;
}) {
  const T = useTranslations("Marketplace");
  const isLoadingFlag = !marketplace || isLoading;

  return (
    <div className="flex flex-1 flex-col rounded bg-bg-black sm:mt-[2px] sm:p-[10px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-xs leading-[18px] text-title-white">
            {T("HolderDistribution")}
          </div>
        </div>
      </div>

      <HolderTable marketplace={marketplace} isLoading={isLoadingFlag} />
    </div>
  );
}
