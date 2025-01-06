"use client";

import Image from "next/image";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { IMarketplace } from "@/lib/types/marketplace";
import { useRouter } from "@/app/navigation";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { formatNum, toPercent } from "@/lib/utils/number";
import { Skeleton } from "@/components/ui/skeleton";
import NP from "number-precision";
import { ProjectDecimalsMap } from "@/lib/const/constant";

export default function TrendingProject() {
  const t = useTranslations("Home");
  const { data: marketplaceData, isLoading: isLoadingFlag } = useMarketplaces();

  const markets = useMemo(() => {
    return (marketplaceData || []).filter((m) => m.status !== "offline");
  }, [marketplaceData]);

  return (
    <div className="flex flex-col items-center pt-20">
      <div className="text-[40px] leading-10 text-txt-white">
        {t("cap-TrendingProjects")}
      </div>
      <div className="mt-6 flex w-full flex-col items-start gap-x-5 gap-y-9 px-4 py-5 sm:grid sm:grid-cols-4 sm:flex-row sm:items-stretch sm:overflow-x-hidden">
        {(markets || []).map((marketplace) => (
          <ItemCard
            key={marketplace.market_place_account}
            marketplace={marketplace}
            isLoadingFlag={isLoadingFlag}
          />
        ))}
      </div>
    </div>
  );
}

function ItemCard({
  marketplace,
  isLoadingFlag,
}: {
  marketplace: IMarketplace;
  isLoadingFlag: boolean;
}) {
  const t = useTranslations("card-Marketplace");
  const router = useRouter();

  const pointDecimalNum = useMemo(() => {
    if (marketplace && ProjectDecimalsMap[marketplace.market_symbol]) {
      const decimal = ProjectDecimalsMap[marketplace.market_symbol];
      return 10 ** decimal;
    }

    return 1;
  }, [marketplace]);

  function handleGo() {
    router.push(`/marketplace/${marketplace.market_symbol}`);
  }

  return (
    <div
      className="relative w-full cursor-pointer rounded-3xl p-5 pt-3 sm:w-auto sm:min-w-fit"
      onClick={handleGo}
      style={{
        background:
          "linear-gradient(180deg, #F0F1F5 0%, rgba(240, 241, 245, 0.5) 100%)",
      }}
    >
      <Image
        src={marketplace.projectLogo}
        width={72}
        height={72}
        className="absolute -top-4 left-4 rounded-3xl"
        alt="marketplace"
      />

      <div className="flex items-start justify-between pl-20">
        <div className="flex space-x-3">
          <div className="flex flex-col">
            <div className="w-[140px] overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-[20px] text-txt-white">
              {marketplace.item_name}
            </div>
            <div className="h-[18px] text-xs leading-[18px] text-gray"></div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <LabelText isLoading={isLoadingFlag}>
              {t("lb-InitialListing")}
            </LabelText>
            {isLoadingFlag ? (
              <ValueSkeleton />
            ) : (
              <div className="flex items-center text-sm leading-5 text-txt-white">
                $
                {formatNum(
                  NP.times(marketplace.initial_listing_price, pointDecimalNum),
                  3,
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col items-end">
            <LabelText isLoading={isLoadingFlag}>
              {t("lb-AllTimeHigh")}
            </LabelText>
            {isLoadingFlag ? (
              <ValueSkeleton />
            ) : (
              <div className="flex items-center text-sm leading-5 text-txt-white">
                $
                {formatNum(
                  NP.times(marketplace.all_time_high_price, pointDecimalNum),
                  3,
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <LabelText isLoading={isLoadingFlag}>{t("lb-24hChange")}</LabelText>
            {isLoadingFlag ? (
              <ValueSkeleton />
            ) : (
              <div
                data-up={
                  +marketplace.change_rate_24h === 0
                    ? "zero"
                    : +marketplace.change_rate_24h > 0
                }
                className="text-sm leading-5 data-[up=false]:text-red data-[up=true]:text-green data-[up=zero]:text-txt-white"
              >
                {+marketplace.change_rate_24h === 0
                  ? null
                  : +marketplace.change_rate_24h > 0
                  ? "+ "
                  : "- "}
                {+marketplace.change_rate_24h === 0
                  ? 0
                  : toPercent(+marketplace.change_rate_24h)}
                %
              </div>
            )}
          </div>

          <div className="flex flex-col items-end">
            <LabelText isLoading={isLoadingFlag}>
              {t("lb-FilledOrders")}
            </LabelText>
            {isLoadingFlag ? (
              <ValueSkeleton />
            ) : (
              <div className="flex items-center text-sm leading-5 text-txt-white">
                {formatNum(marketplace!.filled_orders || 0)}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <LabelText isLoading={isLoadingFlag}>
              {t("lb-ListedSupply")}
            </LabelText>
            {isLoadingFlag ? (
              <ValueSkeleton />
            ) : (
              <div className="leading-6 text-txt-white">
                {formatNum(
                  NP.divide(marketplace!.listed_supply, pointDecimalNum),
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col items-end">
            <LabelText isLoading={isLoadingFlag}>
              {t("lb-ActiveWallets")}
            </LabelText>
            {isLoadingFlag ? (
              <ValueSkeleton />
            ) : (
              <div className="flex items-center leading-6 text-txt-white">
                {formatNum(marketplace!.active_wallets)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LabelText({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
}) {
  return isLoading ? (
    <Skeleton className="my-[3px] h-[12px] w-[80px] bg-bg-black" />
  ) : (
    <div className="text-xs leading-[18px] text-gray">{children}</div>
  );
}

function ValueSkeleton() {
  return <Skeleton className="h-[16px] w-[100px] rounded-sm bg-bg-black" />;
}
