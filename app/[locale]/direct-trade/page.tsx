"use client";
import { useTranslations } from "next-intl";
import PointMarket from "./point-market";
import TrendingAsset from "./trending-asset";

export default function Marketplace() {
  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col sm:h-[calc(100vh-96px)]">
      <MobileMarketBreadcrumb />
      <div className="flex flex-1 items-stretch">
        <div className="flex flex-1 flex-col overflow-auto pl-4 sm:pl-6">
          <PointMarket />
        </div>
        <div className="flex w-full flex-col px-4 sm:w-[368px] sm:px-6">
          <TrendingAsset />
        </div>
      </div>
    </div>
  );
}

function MobileMarketBreadcrumb() {
  const ht = useTranslations("Header");

  return (
    <div className="mb-[10px] mt-4 flex items-center pl-4 sm:hidden">
      <div className="text-base leading-6 text-[#99a0af]">
        {ht("btn-Marketplace")}
        <span className="inline-block px-2">&gt;</span>
      </div>
    </div>
  );
}
