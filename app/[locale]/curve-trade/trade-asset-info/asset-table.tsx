import { useMemo } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { formatNum } from "@/lib/utils/number";
import { cn } from "@/lib/utils/common";
import { Skeleton } from "@/components/ui/skeleton";
import Sparkline from "@/components/share/snapshot";

const salesData = [
  {
    create_at: 1736350045,
    sales_price: "0.5",
    sales_volume: "18",
  },
  {
    create_at: 1735901528,
    sales_price: "0.533333428571428571428571428571428571",
    sales_volume: "7",
  },
  {
    create_at: 1735564200,
    sales_price: "10.666667",
    sales_volume: "1",
  },
  {
    create_at: 1735553931,
    sales_price: "0.533333375",
    sales_volume: "8",
  },
  {
    create_at: 1735553224,
    sales_price: "8.0645165",
    sales_volume: "2",
  },
  {
    create_at: 1735552786,
    sales_price: "8.0645165",
    sales_volume: "2",
  },
  {
    create_at: 1735550416,
    sales_price: "1",
    sales_volume: "9",
  },
  {
    create_at: 1735470017,
    sales_price: "0.5",
    sales_volume: "5",
  },
  {
    create_at: 1735385345,
    sales_price: "0.02",
    sales_volume: "120",
  },
  {
    create_at: 1735384434,
    sales_price: "0.012",
    sales_volume: "10",
  },
  {
    create_at: 1735384376,
    sales_price: "0.012",
    sales_volume: "10",
  },
  {
    create_at: 1735384270,
    sales_price: "0.012",
    sales_volume: "10",
  },
  {
    create_at: 1735301322,
    sales_price: "0.012",
    sales_volume: "10",
  },
  {
    create_at: 1735301255,
    sales_price: "0.012",
    sales_volume: "10",
  },
  {
    create_at: 1735285567,
    sales_price: "10",
    sales_volume: "10",
  },
  {
    create_at: 1735285541,
    sales_price: "10",
    sales_volume: "10",
  },
  {
    create_at: 1735285480,
    sales_price: "10",
    sales_volume: "10",
  },
  {
    create_at: 1735285431,
    sales_price: "10",
    sales_volume: "10",
  },
  {
    create_at: 1735285102,
    sales_price: "10",
    sales_volume: "60",
  },
  {
    create_at: 1735285053,
    sales_price: "10",
    sales_volume: "10",
  },
  {
    create_at: 1735285031,
    sales_price: "10",
    sales_volume: "10",
  },
  {
    create_at: 1735285018,
    sales_price: "10",
    sales_volume: "10",
  },
  {
    create_at: 1735284902,
    sales_price: "10",
    sales_volume: "10",
  },
];

const Assets = [
  {
    name: "PBC/USDC",
    initialListing: "23",
    AllTimeHigh: 244.5432,
    vol24H: 12312.2323,
    change24H: 12312.2323,
    change24HRate: 0.1234,
    total: 233.3232,
    salesData,
  },
  {
    name: "PBC/USDC",
    initialListing: "23",
    AllTimeHigh: 244.5432,
    vol24H: 12312.2323,
    change24H: -12312.2323,
    change24HRate: -0.1234,
    total: 233.3232,
    salesData,
  },
];

export default function AssetTable() {
  const data = useMemo(() => {
    const orderData = Assets.map((o, index) => {
      return {
        ...o,
        id: index,
      };
    });

    return {
      nodes: orderData,
    };
  }, []);

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

  const COLUMNS = [
    {
      label: "Asset",
      renderCell: (o: any) => <div className="w-fit">{o.name}</div>,
    },
    {
      label: "Initial Listing",
      renderCell: (o: any) => (
        <div className="">${formatNum(o.initialListing)}</div>
      ),
    },
    {
      label: "All-time High",
      renderCell: (o: any) => <div>${formatNum(o.AllTimeHigh)}</div>,
    },
    {
      label: "24h Vol.",
      renderCell: (o: any) => <div>${formatNum(o.vol24H)}</div>,
    },
    {
      label: "24h Change",
      renderCell: (o: any) => {
        const isGt = o.change24H > 0;

        return (
          <div
            className={cn(
              "flex items-center",
              isGt ? "text-green" : "text-red",
            )}
          >
            <span>${formatNum(o.change24H)}</span>/
            <span>${formatNum(o.change24HRate * 100)}%</span>
          </div>
        );
      },
    },
    {
      label: "Total Vol.",
      renderCell: (o: any) => <div>${formatNum(o.total)}</div>,
    },
    {
      label: "Snapshot",
      renderCell: (o: any) => (
        <Snapshot salesData={o.salesData} isLoading={o.isLoading} />
      ),
    },
  ];

  return <CompactTable theme={theme} columns={COLUMNS} data={data} />;
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
