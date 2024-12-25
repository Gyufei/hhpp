"use client";

import Image from "next/image";
import { formatNum } from "@/lib/utils/number";
import { useMemo } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { range } from "lodash";
import { cn } from "@/lib/utils/common";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { ProjectDecimalsMap } from "@/lib/const/constant";
import NP from "number-precision";

export default function TrendingAsset({ className }: { className?: string }) {
  const ct = useTranslations("Common");
  const t = useTranslations("page-MarketList");

  const { data, isLoading: isLoadingFlag } = useMarketplaces();

  const theme = useTheme({
    Table: `
      grid-template-rows: 40px repeat(auto-fit, 40px);
      grid-template-columns: 42px 1fr 1fr 1fr;
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
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;

      &:nth-of-type(2),
      &:first-of-type {
        text-align: left;
      }

      text-align: right;
    `,
    HeaderCell: `
      color: #c0c4cc;

      &:first-of-type {
        padding-left: 8px;
      }
      border-bottom: 1px solid #eee;
    `,
    Cell: `
      color: #2d2e33;
      height: 40px;
    `,
  });

  const tableData = useMemo(() => {
    if (isLoadingFlag) {
      const nodes = range(5)
        .fill(0)
        .map((_: any, index: number) => {
          return {
            id: Math.floor(Math.random() * 100000),
            no: index + 1,
          };
        });

      return {
        nodes,
      };
    }

    const nodes = (data || [])
      .filter((m) => m.status !== "offline")
      .map((item: any, index: number) => {
        const pointDecimalNum = ProjectDecimalsMap[item.market_symbol]
          ? 10 ** ProjectDecimalsMap[item.market_symbol]
          : 1;

        const vol24h = item.vol_24h || 0;
        const TotalVol = item.total_vol || 0;
        const lastPricePercent =
          Number(TotalVol) === 0 ? 0 : NP.divide(vol24h, TotalVol);

        return {
          id: item.market_symbol,
          no: index + 1,
          asset: {
            logoURI: item.pointLogo,
            symbol: item.item_name,
          },
          floorPrice: NP.times(item.floor_price, pointDecimalNum),
          change24h: lastPricePercent,
        };
      });

    return {
      nodes,
    };
  }, [data, isLoadingFlag]);

  const COLUMNS = [
    {
      label: "#",
      renderCell: (item: any) => {
        return <div className="pl-2">{item.no}</div>;
      },
    },
    {
      label: t("th-Asset"),
      renderCell: (item: any) =>
        isLoadingFlag ? (
          <Skeleton className="h-[16px] w-[150px]" />
        ) : (
          <div className="flex items-center justify-start space-x-1">
            <Image
              src={item.asset.logoURI}
              width={16}
              height={16}
              alt="token"
              className="rounded-full"
            />
            <div>{item.asset.symbol}</div>
          </div>
        ),
    },
    {
      label: t("th-FloorPrice"),
      renderCell: (item: any) =>
        isLoadingFlag ? (
          <div className="flex justify-end">
            <Skeleton className="h-[16px] w-[60px]" />
          </div>
        ) : (
          <div>${formatNum(item.floorPrice)}</div>
        ),
    },
    {
      label: t("th-24hChange"),
      renderCell: (item: any) =>
        isLoadingFlag ? (
          <div className="flex justify-end">
            <Skeleton className="h-[16px] w-[60px]" />
          </div>
        ) : (
          <PercentText num={item.change24h} />
        ),
    },
  ];

  return (
    <div className={cn(className, "flex flex-col")}>
      <div className="hidden items-center justify-between sm:flex">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-lg bg-yellow"></div>
          <div className="leading-6 text-black">{t("cap-TrendingAssets")}</div>
        </div>
      </div>
      {!tableData.nodes.length ? (
        <>
          <div className="max-h-auto flex min-h-[360px] flex-1 items-center justify-center text-base text-gray">
            {ct("txt-NoData")}
          </div>
        </>
      ) : (
        <div className="max-h-auto relative min-h-[360px] w-full flex-1 flex-col overflow-y-hidden">
          <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-1 flex-col">
            <CompactTable
              columns={COLUMNS}
              data={tableData}
              theme={theme}
              layout={{ fixedHeader: true }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function PercentText({ num }: { num: number }) {
  const isGreater = num > 0;
  return (
    <div
      data-greater={Number(num) === 0 ? "zero" : isGreater}
      className="text-[10px] leading-4 data-[greater=false]:text-red data-[greater=true]:text-green data-[greater=zero]:text-black"
    >
      {Number(num) === 0
        ? "0"
        : `${isGreater ? "+" : "-"}${Math.abs(num).toFixed(2)}`}
      %
    </div>
  );
}
