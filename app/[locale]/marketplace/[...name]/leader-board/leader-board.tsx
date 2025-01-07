"use client";

import Image from "next/image";
import { truncateAddr } from "@/lib/utils/web3";
import { formatNum } from "@/lib/utils/number";
import { ILeaderType, LeaderTypeSelect } from "./leader-type-select";
import { useMemo, useState } from "react";
import { IRangeType, LeaderRangeSelect } from "./leader-range-select";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { useTaxIncome } from "@/lib/hooks/api/use-tax-income";
import { range, sortBy } from "lodash";
import { useMakerOrders } from "@/lib/hooks/api/use-maker-orders";
import { useTradingVol } from "@/lib/hooks/api/use-trading-vol";
import { cn } from "@/lib/utils/common";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { ChainType } from "@/lib/types/chain";
import { useWsMsgSub } from "@/lib/hooks/api/use-ws-msgs";
import { useEffect } from "react";

export default function LeaderBoard({
  marketplaceId,
  chain,
  className,
}: {
  marketplaceId: string;
  chain: ChainType;
  className?: string;
}) {
  const t = useTranslations("tb-Leaderboard");
  const [leaderType, setLeaderType] = useState<ILeaderType>("Maker Orders");
  const [timeRange, setTimeRange] = useState<IRangeType>("month");

  const {
    data: taxIncomeData,
    isLoading: taxIncomeLoading,
    mutate: taxIncomeMutate,
  } = useTaxIncome(chain, timeRange);

  const {
    data: makerOrdersData,
    isLoading: makerOrdersLoading,
    mutate: makerOrdersMutate,
  } = useMakerOrders(chain, timeRange);

  const {
    data: tradingVolData,
    isLoading: tradingVolLoading,
    mutate: tradingVolMutate,
  } = useTradingVol(chain, timeRange);

  const isLoadingFlag =
    taxIncomeLoading || makerOrdersLoading || tradingVolLoading;

  const { data: msgEvents } = useWsMsgSub(chain);
  useEffect(() => {
    if (msgEvents && msgEvents.length > 0) {
      const currentMsg = msgEvents[msgEvents.length - 1];
      if (currentMsg.market_id === marketplaceId) {
        taxIncomeMutate();
        makerOrdersMutate();
        tradingVolMutate();
      }
    }
  }, [msgEvents]);

  function handleTradeTypeChange(t: ILeaderType) {
    setLeaderType(t);
  }

  function handleRangeTypeChange(r: IRangeType) {
    setTimeRange(r);
  }

  const data = useMemo(() => {
    switch (leaderType) {
      case "Maker Orders":
        return sortBy(makerOrdersData, [(o) => Number(o.count)]).reverse();
      case "Trading Vol.":
        return sortBy(tradingVolData, [(o) => Number(o.amount)]).reverse();
      case "Maker Bonus":
        return sortBy(taxIncomeData, [(o) => Number(o.amount)]).reverse();
    }
  }, [leaderType, taxIncomeData, makerOrdersData, tradingVolData]);

  const theme = useTheme({
    Table: `
      grid-template-rows: 40px repeat(auto-fit, 40px);
      grid-template-columns: 42px 150px 1fr;
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

      &:first-of-type {
        text-align: left;
      }

      &:nth-of-type(3) {
        text-align: right;
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
            wallet: "",
            amount: "",
            count: "",
          };
        });

      return {
        nodes,
      };
    }

    const nodes = data.map((item: any, index: number) => {
      return {
        id: index + 1,
        no: index + 1,
        wallet: item.wallet,
        amount: item.amount,
        count: item.count,
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
        if (Number(item.no) === 1) {
          return (
            <Image src="/icons/one.svg" width={24} height={24} alt="reward" />
          );
        }
        if (Number(item.no) === 2) {
          return (
            <Image
              src="/icons/two.svg"
              width={24}
              height={24}
              alt="reward"
              className="-translate-y-[1px]"
            />
          );
        }
        if (Number(item.no) === 3) {
          return (
            <Image src="/icons/three.svg" width={24} height={24} alt="reward" />
          );
        }

        return <div className="pl-2">{item.no}</div>;
      },
    },
    {
      label: t("th-Wallet"),
      renderCell: (item: any) =>
        isLoadingFlag ? (
          <Skeleton className="h-[16px] w-[150px]" />
        ) : (
          <div>
            {truncateAddr(item.wallet, {
              nPrefix: 4,
              nSuffix: 4,
            })}
          </div>
        ),
    },
    {
      label: leaderType !== "Maker Orders" ? t("th-Amount") : t("th-Count"),
      renderCell: (item: any) =>
        isLoadingFlag ? (
          <div className="flex justify-end">
            <Skeleton className="h-[16px] w-[60px]" />
          </div>
        ) : (
          <div>
            {leaderType === "Maker Orders"
              ? formatNum(item.count || 0)
              : `$${formatNum(item.amount)}`}
          </div>
        ),
    },
  ];

  return (
    <div className={cn(className, "flex flex-col")}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-lg bg-main"></div>
          <div className="leading-6 text-txt-white">{t("cap-Leaderboard")}</div>
        </div>
        <div className="flex items-center justify-end space-x-3">
          <LeaderTypeSelect
            type={leaderType}
            handleTypeChange={handleTradeTypeChange}
          />
          <LeaderRangeSelect
            type={timeRange}
            handleTypeChange={handleRangeTypeChange}
          />
        </div>
      </div>
      <div className="max-h-auto relative min-h-[187.5px] w-full flex-1 flex-col overflow-y-hidden">
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
