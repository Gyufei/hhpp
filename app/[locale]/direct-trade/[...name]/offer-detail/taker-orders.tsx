import NP from "number-precision";
import Image from "next/image";
import { CompactTable } from "@table-library/react-table-library/compact";
import { usePagination } from "@table-library/react-table-library/pagination";
import { truncateAddr } from "@/lib/utils/web3";
import { useMemo } from "react";
import { Pagination } from "@/components/ui/pagination/pagination";
import { useTheme } from "@table-library/react-table-library/theme";
import { formatNum } from "@/lib/utils/number";
import { useTranslations } from "next-intl";
import { ITakerOrder } from "@/lib/hooks/api/use-taker-orders-of-offer";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { format } from "date-fns";

export function TakerOrders({
  orders,
  offer,
}: {
  orders: Array<ITakerOrder>;
  offer: IOffer;
}) {
  const T = useTranslations("Offer");

  const { pointDecimalNum, offerTokenInfo, offerPointInfo } = useOfferFormat({
    offer: offer,
  });

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
  }, [orders]);

  const theme = useTheme({
    Table: `
      grid-template-rows: repeat(auto-fit, 40px);
      grid-template-columns: 160px repeat(3, minmax(0, 1fr));
      font-weight: 400;
      grid-auto-rows: 40px;
    `,
    Header: "",
    Body: "",
    BaseRow: `
      font-size: 12px;
      background-color: #111a1e;
      line-height: 18px;
    `,
    HeaderRow: ``,
    Row: `
      border-radius: 4px;

      &:hover {
        background: #222428;
      }
    `,
    BaseCell: `
      &:first-of-type {
        padding-left: 10px;
      }

      &:last-of-type {
        padding-right: 10px;
        text-align: right;
      }
    `,
    HeaderCell: `
      color: #949e9c;
      font-weight: 400;
      
    `,
    Cell: `
      color: #F6FEFD;
    `,
  });

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 5,
    },
    onChange: () => {},
  });

  const handlePageChange = (page: number) => {
    pagination.fns.onSetPage(page);
  };

  const COLUMNS = [
    {
      label: T("SubNo"),
      renderCell: (o: any) => {
        return truncateAddr(o.order_id || "");
      },
    },
    {
      label: T("FillAmount"),
      renderCell: (o: any) => {
        const points = o.shares;
        const totalPoints = offer.shares;
        const percent = formatNum(NP.divide(points, totalPoints) * 100);

        return (
          <div className="flex items-center justify-start space-x-1">
            <div>
              {formatNum(NP.divide(points, pointDecimalNum))}({percent}%)
            </div>
            <Image
              src={offerPointInfo.logoURI}
              width={16}
              height={16}
              alt="token"
              className="rounded-full"
            />
          </div>
        );
      },
    },
    {
      label: T("Deposits"),
      renderCell: (o: ITakerOrder) => {
        const amount = NP.divide(
          o.premium_amount,
          10 ** (offerTokenInfo?.decimals || 0),
        );

        return (
          <div className="flex items-center justify-start space-x-1">
            <span>{formatNum(amount)}</span>
            <Image
              src={offerTokenInfo?.logoURI || ""}
              width={16}
              height={16}
              alt="token"
            />
          </div>
        );
      },
    },
    {
      label: T("Time"),
      renderCell: (o: ITakerOrder) => (
        <div className="flex items-center justify-end">
          {format(new Date(o.create_at), "yyyy-MM-dd HH:mm:ss")}
        </div>
      ),
    },
  ];

  return (
    <>
      <CompactTable
        theme={theme}
        columns={COLUMNS}
        data={data}
        pagination={pagination}
      />
      {pagination.state.getTotalPages(data.nodes) > 1 && (
        <Pagination
          totalPages={pagination.state.getTotalPages(data.nodes)}
          edgePageCount={3}
          middlePagesSiblingCount={1}
          currentPage={pagination.state.page}
          setCurrentPage={handlePageChange}
        >
          <Pagination.PrevButton />

          <nav className="mx-2 flex items-center justify-center">
            <ul className="flex items-center gap-2">
              <Pagination.PageButton
                activeClassName=""
                inactiveClassName=""
                className=""
              />
            </ul>
          </nav>

          <Pagination.NextButton />
        </Pagination>
      )}
    </>
  );
}
