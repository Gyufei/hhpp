import { IMarketplace } from "@/lib/types/marketplace";
import { formatNum, toPercent } from "@/lib/utils/number";
import { Skeleton } from "../ui/skeleton";
import { useTranslations } from "next-intl";
import { ProjectDecimalsMap } from "@/lib/const/constant";
import { useMemo, useState } from "react";
import NP from "number-precision";
import { cn } from "@/lib/utils/common";
import Image from "next/image";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";

export default function MarketplaceOverview({
  marketplace,
  isLoading = false,
}: {
  marketplace: IMarketplace | undefined;
  isLoading?: boolean;
}) {
  const T = useTranslations("Marketplace");
  const isLoadingFlag = !marketplace || isLoading;
  const { isMobileSize } = useDeviceSize();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isColl = isMobileSize && isCollapsed;

  const pointDecimalNum = useMemo(() => {
    if (marketplace && ProjectDecimalsMap[marketplace.market_symbol]) {
      const decimal = ProjectDecimalsMap[marketplace.market_symbol];
      return 10 ** decimal;
    }

    return 1;
  }, [marketplace]);

  return (
    <>
      <div className="absolute right-[10px] top-[30px] sm:hidden">
        {isLoadingFlag ? (
          <ValueSkeleton />
        ) : (
          <div className="flex items-center gap-x-1">
            <Change24H rate={+marketplace.change_rate_24h} />
            <Image
              onClick={() => setIsCollapsed(!isCollapsed)}
              src="/icons/down.svg"
              width={20}
              height={20}
              alt="arrow"
              className={cn("cursor-pointer", isColl ? "rotate-180" : "")}
            />
          </div>
        )}
      </div>

      <div
        className={cn(
          "relative flex-col space-y-[10px] px-[10px] pb-5 pt-0 text-[12px] sm:pt-4",
          isColl ? "h-0 pb-0" : "h-fit",
        )}
      >
        {!isColl && (
          <>
            <div className="flex justify-between">
              <LabelText isLoading={isLoadingFlag}>
                {T("InitialListing")}
              </LabelText>
              {isLoadingFlag ? (
                <ValueSkeleton />
              ) : (
                <div className="flex items-center leading-5 text-title-white">
                  $
                  {formatNum(
                    NP.times(
                      marketplace.initial_listing_price,
                      pointDecimalNum,
                    ),
                    3,
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <LabelText isLoading={isLoadingFlag}>
                {T("AllTimeHigh")}
              </LabelText>
              {isLoadingFlag ? (
                <ValueSkeleton />
              ) : (
                <div className="flex items-center leading-5 text-title-white">
                  $
                  {formatNum(
                    Number(
                      NP.times(
                        marketplace.all_time_high_price,
                        pointDecimalNum,
                      ),
                    ),
                    3,
                  )}
                </div>
              )}
            </div>

            <div className="hidden justify-between sm:flex">
              <LabelText isLoading={isLoadingFlag}>
                {T("24hChange")}
              </LabelText>
              {isLoadingFlag ? (
                <ValueSkeleton />
              ) : (
                <Change24H rate={+marketplace.change_rate_24h} />
              )}
            </div>

            <div className="flex justify-between">
              <LabelText isLoading={isLoadingFlag}>
                {T("FilledOrders")}
              </LabelText>
              {isLoadingFlag ? (
                <ValueSkeleton />
              ) : (
                <div className="flex items-center leading-5 text-title-white">
                  {formatNum(marketplace!.filled_orders || 0)}
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <LabelText isLoading={isLoadingFlag}>
                {T("ListedSupply")}
              </LabelText>
              {isLoadingFlag ? (
                <ValueSkeleton />
              ) : (
                <div className="leading-6 text-title-white">
                  {formatNum(
                    NP.divide(marketplace!.listed_supply, pointDecimalNum),
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between ">
              <LabelText isLoading={isLoadingFlag}>
                {T("ActiveWallets")}
              </LabelText>
              {isLoadingFlag ? (
                <ValueSkeleton />
              ) : (
                <div className="flex items-center leading-6 text-title-white">
                  {formatNum(marketplace!.active_wallets)}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

function Change24H({ rate }: { rate: number }) {
  const isUp = rate > 0;
  const isZero = rate === 0;
  const isDown = rate < 0;

  return (
    <div
      className={cn(
        "text-xl leading-[30px] sm:text-xs sm:leading-[18px]",
        isUp && "text-green",
        isDown && "text-red",
        isZero && "text-title-white",
      )}
    >
      {isZero ? null : isUp ? "+ " : "- "}
      {isZero ? 0 : toPercent(rate)}%
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
  return <Skeleton className="h-[16px] w-[100px] rounded-sm" />;
}
