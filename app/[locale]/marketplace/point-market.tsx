"use client";

import NP from "number-precision";
import { useMemo } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { range } from "lodash";
import { cn } from "@/lib/utils/common";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { TokenPairImg } from "@/components/share/token-pair-img";
import { formatNum } from "@/lib/utils/number";
import { format } from "date-fns";
import { useRouter } from "@/i18n/routing";
import { IMarketplace } from "@/lib/types/marketplace";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ProjectDecimalsMap } from "@/lib/const/constant";
import Sparkline from "@/components/share/snapshot";
import { useSalesVolume } from "@/lib/hooks/api/use-sales-volume";

export default function PointMarket({ className }: { className?: string }) {
  const t = useTranslations("page-MarketList");

  const router = useRouter();

  const { data, isLoading: isLoadingFlag } = useMarketplaces();

  const theme = useTheme({
    Table: `
      grid-template-rows: 40px repeat(auto-fit, 64px);
      grid-template-columns: repeat(7,minmax(0,1fr)),
      font-weight: 400;

      &::-webkit-scrollbar {
        display: none;
      }
    `,
    Header: "",
    Body: "",
    BaseRow: `
    `,
    HeaderRow: `
      background: #fff;
    `,
    Row: `
    `,
    BaseCell: `
      font-size: 14px;
      font-weight: normal;
      text-align: right;

      &:first-of-type {
        text-align: left;
      }

      background: #111a1e;
    `,
    HeaderCell: `
      color: #949e9c;
      &:first-of-type {
        padding-left: 8px;
      }
      border-bottom: 1px solid #303030;
    `,
    Cell: `
      color: #D1D4DC;
      height: 64px;
    `,
  });

  const tableData = useMemo(() => {
    if (isLoadingFlag) {
      const nodes = range(4)
        .fill(0)
        .map((_: any) => {
          return {
            id: Math.floor(Math.random() * 100000),
          };
        });

      return {
        nodes,
      };
    }

    const nodes = (data || [])
      .filter((m) => m.status !== "offline")
      .map((item: any, index: number) => {
        return {
          id: index + 1,
          ...item,
        };
      });

    return {
      nodes,
    };
  }, [data, isLoadingFlag]);

  function handleGo(marketId: string) {
    const path = `/marketplace/${marketId}`;

    router.push(path);
  }

  const COLUMNS = [
    {
      label: t("th-Asset"),
      renderCell: (item: IMarketplace) => {
        const chainInfo = ChainConfigs[item.chain];

        return isLoadingFlag ? (
          <div className="flex items-center">
            <Skeleton className="h-[32px] w-[32px] rounded-full" />
            <div className="ml-3 flex flex-col">
              <Skeleton className="h-[18px] w-[80px] sm:w-[100px]" />
              <Skeleton className="mt-2 h-[16px] w-[60px] sm:w-[80px]" />
            </div>
          </div>
        ) : (
          <div
            className="flex w-[120px] cursor-pointer items-center pl-2"
            onClick={() => handleGo(item.market_symbol)}
          >
            <TokenPairImg
              src1={item?.projectLogo}
              src2={chainInfo?.logo}
              width1={32}
              height1={32}
              width2={14}
              height2={14}
            />
            <div className="ml-3 flex flex-col">
              <div className="text-sm leading-5 text-txt-white">
                {item.market_name}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      label: t("th-InitialListing"),
      renderCell: (item: IMarketplace) => {
        const pointDecimalNum = ProjectDecimalsMap[item.market_symbol]
          ? 10 ** ProjectDecimalsMap[item.market_symbol]
          : 1;

        return isLoadingFlag ? (
          <Skeleton className="h-[16px] w-[120px]" />
        ) : (
          <div className="flex flex-col items-end">
            <PriceText
              num={Number(
                NP.times(item.initial_listing_price, pointDecimalNum),
              )}
            />
          </div>
        );
      },
    },
    {
      label: t("th-AllTimeHigh"),
      renderCell: (item: IMarketplace) => {
        const pointDecimalNum = ProjectDecimalsMap[item.market_symbol]
          ? 10 ** ProjectDecimalsMap[item.market_symbol]
          : 1;
        return isLoadingFlag ? (
          <div className="flex justify-end">
            <Skeleton className="h-[16px] w-[60px]" />
          </div>
        ) : (
          <div className="flex flex-col items-end">
            <PriceText
              num={Number(NP.times(item.all_time_high_price, pointDecimalNum))}
            />
          </div>
        );
      },
    },
    {
      label: t("th-Vol24h"),
      renderCell: (item: IMarketplace) => {
        return isLoadingFlag ? (
          <div className="flex justify-end">
            <Skeleton className="h-[16px] w-[60px]" />
          </div>
        ) : (
          <div className="flex flex-col items-end">
            <PriceText num={Number(item.vol_24h)} />
          </div>
        );
      },
    },
    {
      label: t("th-24hChange"),
      renderCell: (item: IMarketplace) => {
        const pointDecimalNum = ProjectDecimalsMap[item.market_symbol]
          ? 10 ** ProjectDecimalsMap[item.market_symbol]
          : 1;
        return isLoadingFlag ? (
          <div className="flex justify-end">
            <Skeleton className="h-[16px] w-[60px]" />
          </div>
        ) : (
          <div className="flex items-center justify-end">
            <ChangeText
              vol={NP.times(item.last_price, pointDecimalNum)}
              percent={+item.change_rate_24h}
            />
          </div>
        );
      },
    },
    {
      label: t("th-TotalVol"),
      renderCell: (item: IMarketplace) => {
        return isLoadingFlag ? (
          <div className="flex justify-end">
            <Skeleton className="h-[16px] w-[60px]" />
          </div>
        ) : (
          <div className="flex flex-col items-end">
            <PriceText num={Number(item.total_vol)} />
          </div>
        );
      },
    },
    {
      label: t("th-TradingEnds"),
      renderCell: (item: IMarketplace) =>
        isLoadingFlag ? (
          <div className="flex justify-end">
            <Skeleton className="h-[16px] w-[60px]" />
          </div>
        ) : (
          <div className="flex flex-col items-end">
            {item.trading_ends_at === "0" ? (
              <div>N/A</div>
            ) : (
              <>
                <div className="text-sm leading-5 text-txt-white">
                  {format(Number(item.trading_ends_at) * 1000, "dd/MM/yyyy")}
                </div>
                <div className="text-[10px] leading-4 text-gray">
                  {format(Number(item.trading_ends_at) * 1000, "HH:mm a")}
                </div>
              </>
            )}
          </div>
        ),
    },
    {
      label: t("th-Snapshot"),
      renderCell: (item: IMarketplace) => <Snapshot marketplace={item} />,
    },
  ];

  if (!tableData.nodes.length) {
    return (
      <div className="flex flex-1 items-center justify-center text-base text-gray">
        {t("txt-NoMarketData")}
      </div>
    );
  }

  return (
    <div
      className={cn(
        className,
        "flex max-w-[100vw] flex-1 flex-col overflow-x-scroll pr-6 sm:min-w-[900px] sm:max-w-none sm:overflow-x-hidden sm:pr-0",
      )}
    >
      <div className="hidden items-center justify-between sm:flex">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-lg bg-yellow"></div>
          <div className="leading-6 text-txt-white">{t("cap-PointMarket")}</div>
        </div>
      </div>
      <div className="max-h-auto relative min-h-[296px] w-[820px] flex-1 flex-col overflow-y-hidden sm:w-full sm:min-w-0">
        <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-1 flex-col">
          <CompactTable
            columns={COLUMNS}
            data={tableData}
            theme={theme}
            layout={{ fixedHeader: true }}
          />
        </div>
      </div>
    </div>
  );
}

function PriceText({ num }: { num: number }) {
  return (
    <div className="text-sm leading-5 text-txt-white ">${formatNum(num, 3)}</div>
  );
}

function ChangeText({ vol, percent }: { vol: number; percent: number }) {
  const isGreater = percent > 0;
  const prev = isGreater ? "+" : "-";
  return (
    <div
      data-greater={percent === 0 ? "zero" : isGreater}
      className="text-sm leading-4 data-[greater=false]:text-red data-[greater=true]:text-green data-[greater=zero]:text-txt-white"
    >
      {Number(vol) === 0
        ? "$0"
        : `${percent === 0 ? "" : prev}$${formatNum(vol, 3)}`}
      /{Number(percent) === 0 ? "0" : `${prev}${Math.abs(percent).toFixed(2)}`}%
    </div>
  );
}

function Snapshot({ marketplace }: { marketplace: IMarketplace }) {
  const { data: salesData, isLoading } = useSalesVolume(
    marketplace.chain,
    marketplace?.market_place_account,
  );
  const data = useMemo(() => {
    const showData = (salesData || [])
      ?.filter((item) => {
        return item.create_at > new Date().getTime() - 3600 * 1000 * 24;
      })
      ?.map((o) => Number(o.sales_price));
    if (showData?.length < 2) {
      return [10, 10];
    }
    return showData;
  }, [salesData]);
  return isLoading ? (
    <div className="flex justify-end">
      <Skeleton className="h-[16px] w-[60px]" />
    </div>
  ) : (
    <div className="flex justify-end">
      <div className="flex items-center justify-end">
        <Sparkline data={data || []} />
      </div>
    </div>
  );
}
