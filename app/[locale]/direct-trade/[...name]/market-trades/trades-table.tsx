import Image from "next/image";
import { truncateAddr } from "@/lib/utils/web3";
import { formatTimeDuration } from "@/lib/utils/time";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { useMemo } from "react";
import { formatNum } from "@/lib/utils/number";
import { ITradeType } from "./trade-type-select";
import { useWsMsgSub } from "@/lib/hooks/api/use-ws-msgs";
import { IMarketplace } from "@/lib/types/marketplace";
import { useMarketTrades } from "@/lib/hooks/api/use-market-trades";
import { range, sortBy } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { useTokens } from "@/lib/hooks/api/token/use-tokens";
import { ChainType } from "@/lib/types/chain";
import { ProjectDecimalsMap } from "@/lib/const/constant";
import NP from "number-precision";

export function TradesTable({
  type,
  marketplace,
  isLoading,
}: {
  type: ITradeType;
  marketplace: IMarketplace | undefined;
  isLoading: boolean;
}) {
  const t = useTranslations("tb-MarketTrades");
  const { data: historyData, isLoading: isHistoryLoading } = useMarketTrades(
    marketplace?.chain || ChainType.HYPER,
    marketplace?.market_place_account || "",
  );

  const { data: tokens } = useTokens(marketplace?.chain || ChainType.HYPER);
  const isLoadingFlag = !marketplace || isLoading || isHistoryLoading;

  const { data: msgEvents } = useWsMsgSub(
    marketplace?.chain || ChainType.HYPER,
  );

  const tradeMsgs = useMemo<any[]>(() => {
    const sortHistory = sortBy(historyData || [], "trade_at").reverse();
    const history = sortHistory.map((item: any) => {
      return {
        ...item,
        timestamp: item.trade_at * 1000,
      };
    });

    const msgAll = (msgEvents || []).filter(
      (msg) => !!msg && msg.market_id === marketplace?.market_place_account,
    );

    const allMsg = sortBy(msgAll || [], "trade_at")
      .reverse()
      .concat(history || [])
      .map((item: any) => {
        const token = tokens?.find(
          (token) => token.address === item.token_mint,
        );

        return {
          ...item,
          token: token || item.token,
        };
      });

    return allMsg;
  }, [msgEvents, historyData, tokens]);

  const data = useMemo(() => {
    if (isLoadingFlag) {
      const nodes = range(6)
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

    const trades = tradeMsgs.map((msg) => {
      const time = (Date.now() - msg.timestamp) / 1000;
      return {
        id: Math.floor(Math.random() * 100000),
        ...msg,
        time: time < 2 ? 2 : time,
      };
    });
    const typeTrades = trades.filter(() => type === "All" || true);

    const tableData =
      typeTrades.length > 30 ? typeTrades.slice(0, 30) : typeTrades;
    return {
      nodes: tableData,
    };
  }, [tradeMsgs, type, isLoadingFlag]);

  const pointDecimalNum = useMemo(() => {
    if (marketplace && ProjectDecimalsMap[marketplace.market_symbol]) {
      const decimal = ProjectDecimalsMap[marketplace.market_symbol];
      return 10 ** decimal;
    }

    return 1;
  }, [marketplace]);

  const theme = useTheme({
    Table: `
      grid-template-rows: 40px repeat(auto-fit, 40px);
      grid-template-columns: 30px 60px minmax(0, max-content) minmax(0, max-content) 1fr;
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
    Row: ``,
    BaseCell: `
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;

      &:nth-of-type(3),
      &:nth-of-type(5) {
        text-align: center;
      }

      background: #111a1e;
    `,
    HeaderCell: `
      color: #f6fefd;
      border-bottom: 1px solid #303030;

      &:nth-of-type(4),
      &:nth-of-type(5) {
        text-align: center;
      }
    `,
    Cell: `
      color: #f6fefd;
      height: 40px;

      &:nth-of-type(3),
      &:nth-of-type(4) {
        text-align: center;
      }
    `,
  });

  const COLUMNS = [
    {
      label: "",
      renderCell: (trade: any) =>
        isLoadingFlag ? (
          <Skeleton className="h-[16px] w-[30px]" />
        ) : (
          <TimeDisplay time={trade.time} />
        ),
    },
    {
      label: t("th-ItemId"),
      renderCell: (trade: any) =>
        isLoadingFlag ? (
          <Skeleton className="h-[16px] w-[80px]" />
        ) : (
          <div className="px-[4px]">#{trade.item_id}</div>
        ),
    },
    {
      label: t("th-Price"),
      renderCell: (trade: any) =>
        isLoadingFlag ? (
          <Skeleton className="h-[16px] w-[100px]" />
        ) : (
          <div className="flex w-full items-center justify-end px-[4px] pr-4">
            <span>
              {formatNum(
                NP.divide(
                  trade.token_amount,
                  NP.divide(trade.amount, pointDecimalNum),
                ),
                2,
                true,
              )}
            </span>
            {trade.token && (
              <Image
                className="ml-1 rounded-full"
                src={trade.token?.logoURI}
                width={12}
                height={12}
                alt="token"
              />
            )}
          </div>
        ),
    },
    {
      label: t("th-Amount"),
      renderCell: (trade: any) =>
        isLoadingFlag ? (
          <Skeleton className="h-[16px] w-[50px]" />
        ) : (
          <div
            className="max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap px-[4px] text-center"
            title={formatNum(NP.divide(trade.amount, pointDecimalNum), 2, true)}
          >
            {formatNum(NP.divide(trade.amount, pointDecimalNum), 2, true)}
          </div>
        ),
    },
    {
      label: t("th-Buyer"),
      renderCell: (trade: any) =>
        isLoadingFlag ? (
          <Skeleton className="h-[16px] w-[60px]" />
        ) : (
          <div className="px-[4px]">{truncateAddr(trade.buyer)}</div>
        ),
    },
  ];

  return (
    <div className="relative flex h-full w-full shrink grow flex-col">
      <Image
        src="/icons/time.svg"
        width={16}
        height={16}
        alt="time"
        className="absolute left-0 top-[10px] z-10"
      />
      <div className="max-h-auto relative w-full flex-1 flex-col overflow-y-hidden pb-0">
        <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-1 flex-col text-txt-white">
          <CompactTable
            columns={COLUMNS}
            data={data}
            theme={theme}
            layout={{ fixedHeader: true }}
          />
        </div>
      </div>
    </div>
  );
}

function TimeDisplay({ time }: { time: number }) {
  return <div>{formatTimeDuration(time)}</div>;
}
