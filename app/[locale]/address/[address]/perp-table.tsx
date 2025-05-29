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

export function PerpTable() {
  const marketplaceData: any[] = [{}];

  const data = useMemo(() => {
    return {
      nodes: marketplaceData || [],
    };
  }, [marketplaceData]);

  const theme = useTheme({
    Table: `
      grid-template-columns: 100px repeat(9,minmax(80px,1fr));
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
      <div className="flex w-full flex-1 items-center justify-center text-base text-gray">
        Your Options will appear here
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-x-auto scrollbar-hide">
        <Table
          data={data}
          theme={theme}
          pagination={pagination}
          className="no-scroll-bar flex-1"
        >
          {(tableList: Array<any>) => (
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
                {tableList.map((marketplace) => (
                  <Row key={marketplace.id} item={marketplace}>
                    <Cell>
                      <div
                        className={cn(
                          "font-medium whitespace-nowrap",
                          marketplace.side === "CALL"
                            ? "text-green-500"
                            : "text-red-500",
                        )}
                      >
                        {marketplace.side}
                      </div>
                    </Cell>

                    <Cell>
                      <div className="whitespace-nowrap">{marketplace.asset}</div>
                    </Cell>

                    <Cell>
                      <div className="whitespace-nowrap">{marketplace.expiryDate}</div>
                    </Cell>

                    <Cell>
                      <div className="whitespace-nowrap">{marketplace.strikePrice}</div>
                    </Cell>

                    <Cell>
                      <div className="whitespace-nowrap">{marketplace.leverage}</div>
                    </Cell>

                    <Cell>
                      <div className="whitespace-nowrap">{marketplace.value}</div>
                    </Cell>

                    <Cell>
                      <div className="whitespace-nowrap">{marketplace.amount}</div>
                    </Cell>

                    <Cell>
                      <div className="whitespace-nowrap">{marketplace.entryPrice}</div>
                    </Cell>

                    <Cell>
                      <div className="whitespace-nowrap">{marketplace.markPrice}</div>
                    </Cell>

                    <Cell>
                      <div className="whitespace-nowrap">{marketplace.pnl}</div>
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
