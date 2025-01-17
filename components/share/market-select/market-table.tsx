import { useMemo } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { formatNum } from "@/lib/utils/number";
import { Skeleton } from "@/components/ui/skeleton";
import Sparkline from "@/components/share/snapshot";
import { IMarketplace } from "@/lib/types/marketplace";
import { ProjectDecimalsMap } from "@/lib/const/constant";
import NP from "number-precision";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

export default function MarketTable({
  marketList,
  isLoading,
}: {
  marketList: IMarketplace[];
  isLoading: boolean;
}) {
  const t = useTranslations("page-MarketList");
  const router = useRouter();

  const data = useMemo(() => {
    const orderData = marketList.map((o, index) => {
      return {
        ...o,
        id: index,
      };
    });

    return {
      nodes: orderData,
    };
  }, [marketList]);

  const theme = useTheme({
    Table: `
      width: 100%;
      grid-template-rows: 24px repeat(auto-fit, 40px);
      grid-template-columns: 100px repeat(3, minmax(0, 1fr)) 200px repeat(2, minmax(0, 1fr));
      font-weight: 400;
      grid-auto-rows: 40px;
    `,
    Header: "",
    Body: "",
    BaseRow: `
      background: transparent;
      padding: 0 10px;
    `,
    HeaderRow: ``,
    Row: `
      border-radius: 4px;
      &:hover {
        background: #222428;
        cursor: pointer;
      }
    `,
    BaseCell: `
      font-size: 12px;
      text-align: left;

      &:first-of-type {
        padding-left: 10px;
      }

      &:last-of-type {
        padding-right: 10px;
      }
    `,
    HeaderCell: `
      font-size: 12px;
      font-weight: 400;
      color: #949e9c;
      line-height: 18px;

      &:last-of-type {
        text-align: right;
      }
    `,
    Cell: `
      color: #f6fefd;
    `,
  });

  if (!data.nodes.length) {
    return (
      <div className="flex w-screen flex-1 items-center justify-center text-xs text-gray sm:w-full">
        No market found...
      </div>
    );
  }

  const COLUMNS = [
    {
      label: t("Asset"),
      renderCell: (o: any) => {
        return isLoading ? (
          <Skeleton className="h-[16px] w-[60px]" />
        ) : (
          <div className="w-fit">{o.market_name}</div>
        );
      },
    },
    {
      label: t("InitialListing"),
      renderCell: (item: IMarketplace) => {
        const pointDecimalNum = ProjectDecimalsMap[item.market_symbol]
          ? 10 ** ProjectDecimalsMap[item.market_symbol]
          : 1;

        return isLoading ? (
          <Skeleton className="mr-2 h-[16px] w-[40px]" />
        ) : (
          <PriceText
            num={Number(NP.times(item.initial_listing_price, pointDecimalNum))}
          />
        );
      },
    },
    {
      label: t("AllTimeHigh"),
      renderCell: (item: IMarketplace) => {
        const pointDecimalNum = ProjectDecimalsMap[item.market_symbol]
          ? 10 ** ProjectDecimalsMap[item.market_symbol]
          : 1;

        return isLoading ? (
          <div className="flex">
            <Skeleton className="h-[16px] w-[60px]" />
          </div>
        ) : (
          <PriceText
            num={Number(NP.times(item.all_time_high_price, pointDecimalNum))}
          />
        );
      },
    },
    {
      label: t("Vol24h"),
      renderCell: (item: IMarketplace) => {
        return isLoading ? (
          <div className="flex">
            <Skeleton className="h-[16px] w-[60px]" />
          </div>
        ) : (
          <PriceText num={Number(item.vol_24h)} />
        );
      },
    },
    {
      label: t("24hChange"),
      renderCell: (item: IMarketplace) => {
        const pointDecimalNum = ProjectDecimalsMap[item.market_symbol]
          ? 10 ** ProjectDecimalsMap[item.market_symbol]
          : 1;
        return isLoading ? (
          <div className="flex">
            <Skeleton className="h-[16px] w-[60px]" />
          </div>
        ) : (
          <ChangeText
            vol={NP.times(item.last_price, pointDecimalNum)}
            percent={+item.change_rate_24h}
          />
        );
      },
    },
    {
      label: t("TotalVol"),
      renderCell: (item: IMarketplace) => {
        return isLoading ? (
          <div className="flex">
            <Skeleton className="h-[16px] w-[60px]" />
          </div>
        ) : (
          <PriceText num={Number(item.total_vol)} />
        );
      },
    },
    {
      label: "Snapshot",
      renderCell: (o: any) => (
        <Snapshot salesData={o.salesData} isLoading={o.isLoading} />
      ),
    },
  ];

  function handleGo(id: string) {
    router.push(`/direct-trade/${id}`);
  }

  return (
    <CompactTable
      theme={theme}
      columns={COLUMNS}
      data={data}
      rowProps={{
        onClick: (node: any) => {
          handleGo(node.market_symbol);
        },
      }}
    />
  );
}

function ChangeText({ vol, percent }: { vol: number; percent: number }) {
  const isGreater = percent > 0;
  const prev = isGreater ? "+" : "-";
  return (
    <div
      data-greater={percent === 0 ? "zero" : isGreater}
      className="text-xs leading-[18px] data-[greater=false]:text-red data-[greater=true]:text-green data-[greater=zero]:text-title-white"
    >
      {Number(vol) === 0
        ? "$0"
        : `${percent === 0 ? "" : prev}$${formatNum(vol, 3)}`}
      /{Number(percent) === 0 ? "0" : `${prev}${Math.abs(percent).toFixed(2)}`}%
    </div>
  );
}

function PriceText({ num }: { num: number }) {
  return (
    <div className="text-xs leading-[18px] text-title-white">
      ${formatNum(num, 3)}
    </div>
  );
}

function Snapshot({
  salesData,
  isLoading,
}: {
  salesData: any[];
  isLoading: boolean;
}) {
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
        <Sparkline width={100} height={10} data={data || []} />
      </div>
    </div>
  );
}
