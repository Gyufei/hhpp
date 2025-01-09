import { CompactTable } from "@table-library/react-table-library/compact";
import { truncateAddr } from "@/lib/utils/web3";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@table-library/react-table-library/theme";
import { formatNum } from "@/lib/utils/number";
import { cn } from "@/lib/utils/common";

const orders = [
  {
    account: "0x2c989Cf99269E2cE738BcBC8CA991F1e3C89C787",
    type: "buy",
    price: 0.05,
    usdValue: 2324,
    pbc: 23421323,
    date: Date.now(),
    hash: "0x2c989Cf99269E2cE738BcBC8CA991F1e3C89C787",
  },
  {
    account: "0x2c989Cf99269E2cE738BcBC8CA991F1e3C89C787",
    type: "sell",
    price: 0.25,
    usdValue: 2324,
    pbc: 23421323,
    date: Date.now(),
    hash: "0x2c989Cf99269E2cE738BcBC8CA991F1e3C89C787",
  },
];

export function TransactionsTable() {
  const data = useMemo(() => {
    const orderData = orders.map((o, index) => {
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
      margin-top: 10px;
      grid-template-rows: 24px repeat(auto-fit, 40px);
      grid-template-columns: repeat(6, minmax(0, 1fr)) 100px;
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
        background-color: #222428;
      }
    `,
    BaseCell: `
      font-size: 12px;
      text-align: left;

      &:first-child {
        padding-left: 10px;
      }

      &:last-child {
        padding-right: 10px;
      }
    `,
    HeaderCell: `
      font-size: 12px;
      font-weight: 400;
      color: #949e9c;
      line-height: 18px;

      &:last-child {
        text-align: right;
      }
    `,
    Cell: `
      color: #f6fefd;
      
      &:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      &:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    `,
  });

  const COLUMNS = [
    {
      label: "Account",
      renderCell: (o: any) => {
        return (
          <div className="w-fit truncate">{truncateAddr(o.account || "")}</div>
        );
      },
    },
    {
      label: "Type",
      renderCell: (o: any) => {
        const isSell = o.type === "sell";

        return (
          <div
            className={cn(
              "flex h-5 w-8 items-center rounded px-[5px]",
              isSell ? "bg-[#EF535020] text-red" : "bg-[#50D2C120] text-green",
            )}
          >
            {isSell ? "Sell" : "Buy"}
          </div>
        );
      },
    },
    {
      label: "Price",
      renderCell: (o: any) => <div>${formatNum(o.price)}</div>,
    },
    {
      label: "USD Value",
      renderCell: (o: any) => <div>{formatNum(o.usdValue)}</div>,
    },
    {
      label: "PBC",
      renderCell: (o: any) => <div>{formatNum(o.pbc, 2, true)}</div>,
    },
    {
      label: "Date",
      renderCell: (o: any) => <AgoDisplay timestamp={o.date} />,
    },
    {
      label: "Hash",
      renderCell: (o: any) => (
        <div className="flex justify-end">{truncateAddr(o.hash)}</div>
      ),
    },
  ];

  return <CompactTable theme={theme} columns={COLUMNS} data={data} />;
}

function AgoDisplay({ timestamp }: { timestamp: number }) {
  const duration = Date.now() - timestamp;

  const [durationStr, setDurationStr] = useState("");

  useEffect(() => {
    function updateDurationStr() {
      if (duration < 60) {
        setDurationStr(`${duration} s`);
        return;
      }

      if (duration < 3600) {
        setDurationStr(`${Math.floor(duration / 60)} m`);
        return;
      }

      if (duration < 86400) {
        setDurationStr(`${Math.floor(duration / 3600)} h`);
        return;
      }

      setDurationStr(`${Math.floor(duration / 86400)} d`);
    }

    updateDurationStr();

    if (duration < 3600) {
      const interval = setInterval(updateDurationStr, 1000);
      return () => clearInterval(interval);
    }
  }, [duration]);

  return <div>{durationStr}</div>;
}
