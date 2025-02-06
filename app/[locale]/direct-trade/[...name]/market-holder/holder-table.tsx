import { truncateAddr } from "@/lib/utils/web3";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { useMemo } from "react";
import { IMarketplace } from "@/lib/types/marketplace";
import { useMarketHolder } from "@/lib/hooks/api/use-market-holder";
import { range } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { ChainType } from "@/lib/types/chain";
import { IHolderDistribution } from "@/lib/types/holding";

export function HolderTable({
  marketplace,
  isLoading,
}: {
  marketplace: IMarketplace | undefined;
  isLoading: boolean;
}) {
  const T = useTranslations("Marketplace");
  const { data: holderData, isLoading: isHolderLoading } = useMarketHolder(
    marketplace?.chain || ChainType.HYPER,
    marketplace?.market_place_account || "",
  );

  const isLoadingFlag = !marketplace || isLoading || isHolderLoading;

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

    const holder = holderData.map(
      (holder: IHolderDistribution, index: number) => {
        return {
          id: Math.floor(Math.random() * 100000),
          ...holder,
          rank: index + 1,
        };
      },
    );

    return {
      nodes: holder,
    };
  }, [isLoadingFlag, holderData]);

  const theme = useTheme({
    Table: `
      grid-template-rows: 40px repeat(auto-fit, 40px);
      grid-template-columns: 100px minmax(0, max-content) 1fr;
      font-weight: 400;

      &::-webkit-scrollbar {
        display: none;
      }
    `,
    Header: "",
    Body: "",
    BaseRow: `
      font-size: 12px;
      line-height: 18px;
      background: #111a1e;
    `,
    HeaderRow: `
      background: #fff;
    `,
    Row: ``,
    BaseCell: `

      &:nth-of-type(3) {
        text-align: right;
      }

      background: #111a1e;
    `,
    HeaderCell: `
      color: #949E9C;
      border-bottom: 1px solid #474747;
      font-weight: 400;


      &:nth-of-type(3){
        text-align: right;
      }
    `,
    Cell: `
      color: #f6fefd;
      height: 40px;

      &:nth-of-type(3) {
        text-align: right;
        padding-right: 16px;
      }
    `,
  });

  const COLUMNS = [
    {
      label: T("Rank"),
      renderCell: (holder: any) =>
        isLoadingFlag ? (
          <Skeleton className="h-[16px] w-[80px]" />
        ) : (
          <div className="px-[4px]">{holder.rank}</div>
        ),
    },
    {
      label: T("Address"),
      renderCell: (holder: any) =>
        isLoadingFlag ? (
          <Skeleton className="h-[16px] w-[60px]" />
        ) : (
          <div className="px-[4px]">{truncateAddr(holder.address)}</div>
        ),
    },
    {
      label: T("Percentage"),
      renderCell: (holder: any) =>
        isLoadingFlag ? (
          <Skeleton className="h-[16px] w-[50px]" />
        ) : (
          <div className="">{holder.percentage}%</div>
        ),
    },
  ];

  return (
    <div className="relative flex h-full w-full shrink grow flex-col">
      <div className="max-h-auto relative w-full flex-1 flex-col overflow-y-hidden pb-0">
        <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-1 flex-col">
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
