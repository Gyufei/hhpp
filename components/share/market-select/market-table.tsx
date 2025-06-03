import { useMemo } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { formatNum } from "@/lib/utils/number";
import { Skeleton } from "@/components/ui/skeleton";
import Sparkline from "@/components/share/snapshot";
import { IMarketplace } from "@/lib/types/marketplace";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

export default function MarketTable({
  marketList,
  isLoading,
}: {
  marketList: IMarketplace[];
  isLoading: boolean;
}) {
  const T = useTranslations("Marketplace");
  const router = useRouter();

  const data = useMemo(() => {
    return {
      nodes: marketList,
    };
  }, [marketList]);

  const theme = useTheme({
    Table: `
      width: 100%;
      grid-template-rows: 24px repeat(auto-fit, 40px);
      grid-template-columns: 180px repeat(5, minmax(0, 1fr));
      grid-auto-rows: 40px;
    `,
    Header: "",
    Body: "",
    BaseRow: `
      background: #111a1e;
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
      font-weight: 400;
      color: #949e9c;

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
      label: T("Asset"),
      renderCell: (o: IMarketplace) => {
        return isLoading ? (
          <Skeleton className="h-[16px] w-[60px]" />
        ) : (
          <div className="w-fit">
            {o.token_name}-{o.expiry_date}
          </div>
        );
      },
    },
    {
      label: T("StrikePrice"),
      renderCell: (o: IMarketplace) => {
        return isLoading ? (
          <Skeleton className="h-[16px] w-[60px]" />
        ) : (
          <div className="w-fit">${formatNum(Number(o.strike_price), 3)}</div>
        );
      },
    },
    {
      label: T("InitialListing"),
      renderCell: (item: IMarketplace) => {
        return isLoading ? (
          <Skeleton className="mr-2 h-[16px] w-[40px]" />
        ) : (
          <PriceText num={Number(item.initial_premium_price)} />
        );
      },
    },
    {
      label: T("Vol24h"),
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
      label: T("TotalVol"),
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
        <Snapshot salesData={o?.salesData} isLoading={o.isLoading} />
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
          handleGo(node.id);
        },
      }}
    />
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
