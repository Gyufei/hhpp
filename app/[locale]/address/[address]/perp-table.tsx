import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useTheme } from "@table-library/react-table-library/theme";
import { Pagination } from "@/components/ui/pagination/pagination";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useMyOffers } from "@/lib/hooks/api/use-my-offers";
import { coverExpiryDate } from "@/lib/utils/time";
import { format } from "date-fns";
import NP from "number-precision";
import { formatNum } from "@/lib/utils/number";

interface ITableData {
  id: string;
  side: "CALL" | "PUT";
  asset: string;
  expiryDate: string;
  strikePrice: string;
  leverage: number;
  value: number;
  amount: number;
  entryPrice: string;
  markPrice: string;
  pnl: number;
  pnlPercent: number;
}

export function PerpTable() {
  const { data: offers, isLoading: isLoadingOffers } = useMyOffers();

  const tableData: ITableData[] = useMemo(() => {
    if (isLoadingOffers || !offers?.length) return [];

    return offers?.map((offer) => {
      const shares = NP.divide(
        offer.shares,
        10 ** (offer.marketplace?.token?.decimals || 18),
      );

      const strikeAmount = NP.times(
        shares,
        offer?.marketplace?.strike_price || 0,
      );
      const tokenAmount = NP.times(
        shares,
        offer?.marketplace?.token?.price || 0,
      );

      const leverage = NP.divide(strikeAmount, tokenAmount);

      const pnl = NP.minus(strikeAmount, tokenAmount);
      const pnlPercent =
        NP.divide(NP.minus(strikeAmount, tokenAmount), strikeAmount) * 100;

      return {
        id: offer.order_id,
        asset: `${offer.marketplace?.token?.symbol}-${
          offer.marketplace?.expiry_date || ""
        }`,
        expiryDate: format(
          coverExpiryDate(offer.marketplace?.expiry_date || "").date,
          "MM/dd/yyyy",
        ),
        strikePrice: offer.marketplace?.strike_price || "0",
        leverage: leverage,
        amount: shares,
        value: tokenAmount,
        entryPrice: offer.marketplace?.strike_price || "0",
        markPrice: offer.marketplace?.token?.price || "0",
        pnl: pnl,
        pnlPercent: pnlPercent,
        side:
          offer.marketplace?.strike_price > offer.marketplace?.token?.price
            ? "CALL"
            : "PUT",
      };
    });
  }, [isLoadingOffers, offers]);

  const data = useMemo(() => {
    return {
      nodes: tableData || [],
    };
  }, [tableData]);

  const theme = useTheme({
    Table: `
      grid-template-columns: 100px repeat(7,minmax(80px,1fr)) 100px 150px;
      grid-template-rows: 40px repeat(auto-fit, 56px);
      grid-auto-rows: 56px;
      min-width: 800px;
      max-width: 100%;
      width: 100%;
    `,
    Header: "",
    Body: "",
    BaseRow: `
      font-size: 12px;
      line-height: 18px;
      background: #111a1e;
    `,
    HeaderRow: `
    `,
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
      }

      &:nth-last-of-type(2) > div,
      &:last-of-type > div {
        display: flex;
        justify-content: flex-end;
        align-items: center;
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

  const pagination = usePagination(data as any, {
    state: {
      page: 0,
      size: 9,
    },
    onChange: () => {},
  });

  const handlePageChange = (page: number) => {
    pagination.fns.onSetPage(page);
  };

  if (!data.nodes.length) {
    return (
      <div className="mt-10 flex w-full flex-1 items-center justify-center text-base text-gray">
        Your Options will appear here
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="scrollbar-hide overflow-x-auto">
        <Table
          data={data}
          theme={theme}
          pagination={pagination}
          className="no-scroll-bar flex-1"
        >
          {(tableList: Array<ITableData>) => (
            <>
              <Header className="text-xs leading-[18px] text-gray">
                <HeaderRow className="">
                  <HeaderCell>Side</HeaderCell>
                  <HeaderCell>Asset</HeaderCell>
                  <HeaderCell>Expiry Date</HeaderCell>
                  <HeaderCell>Strike Price</HeaderCell>
                  <HeaderCell>Leverage</HeaderCell>
                  <HeaderCell>Value</HeaderCell>
                  <HeaderCell>Amount</HeaderCell>
                  <HeaderCell>Entry Price</HeaderCell>
                  <HeaderCell>Mark Price</HeaderCell>
                  <HeaderCell>PnL</HeaderCell>
                </HeaderRow>
              </Header>
              <Body>
                {tableList.map((row) => (
                  <Row key={row.id} item={row}>
                    <Cell>
                      <div
                        className={cn(
                          "whitespace-nowrap font-medium",
                          row.side === "CALL" ? "text-green" : "text-red",
                        )}
                      >
                        {row.side}
                      </div>
                    </Cell>

                    <Cell>
                      <div className="whitespace-nowrap">{row.asset}</div>
                    </Cell>

                    <Cell>
                      <div className="whitespace-nowrap">${row.expiryDate}</div>
                    </Cell>

                    <Cell>
                      <div className="whitespace-nowrap">
                        ${row.strikePrice}
                      </div>
                    </Cell>

                    <Cell>
                      <div className="whitespace-nowrap">
                        {formatNum(row.leverage, 2)}
                      </div>
                    </Cell>

                    <Cell>
                      <div className="whitespace-nowrap">
                        ${formatNum(row.value, 2)}
                      </div>
                    </Cell>

                    <Cell>
                      <div className="whitespace-nowrap">
                        {formatNum(row.amount)}
                      </div>
                    </Cell>

                    <Cell>
                      <div className="whitespace-nowrap">
                        ${formatNum(row.entryPrice)}
                      </div>
                    </Cell>

                    <Cell>
                      <div className="whitespace-nowrap">
                        ${formatNum(row.markPrice)}
                      </div>
                    </Cell>

                    <Cell>
                      <div
                        className={cn(
                          "whitespace-nowrap",
                          row.pnl > 0 ? "text-green" : "text-red",
                        )}
                      >
                        {formatNum(row.pnl)}({formatNum(row.pnlPercent)}%)
                      </div>
                    </Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </div>

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
    </div>
  );
}
