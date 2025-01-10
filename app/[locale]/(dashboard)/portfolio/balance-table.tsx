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
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { sortBy } from "lodash";
import { useMyHoldings } from "@/lib/hooks/api/use-my-holdings";

export function BalanceTable() {
  const T = useTranslations("page-MyOrders");

  const { data: balanceData } = useMyHoldings();

  const data = useMemo(() => {
    const offerData = (balanceData || []).map((o) => {
      return {
        ...o,
      };
    });

    const sortData = sortBy(offerData, "create_at").reverse();

    return {
      nodes: sortData,
    };
  }, [balanceData]);

  const theme = useTheme({
    Table: `
    `,
    Header: "",
    Body: "",
    BaseRow: `
      font-size: 14px;
      line-height: 18px;
    `,
    HeaderRow: `
      background: transparent;
    `,
    Row: `
    `,
    BaseCell: `
      &:nth-last-of-type(2) > div,
      &:last-of-type > div {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      &:not(:first-of-type) > div {
        padding-left: 10px;
      }
    `,
    HeaderCell: `
      font-size: 12px;
      font-weight: 400;
      color: #c0c4cc;
      line-height: 18px;

    `,
    Cell: ``,
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
      <div className="flex w-screen flex-1 items-center justify-center text-base text-gray sm:w-full">
        {T("txt-YourOrderAppearHere")}
      </div>
    );
  }

  return (
    <>
      <Table
        data={data}
        theme={theme}
        pagination={pagination}
        className="flex-1 !grid-cols-[200px_repeat(4,minmax(0,1fr))] grid-rows-[40px_repeat(7,64px)] gap-2 text-txt-white"
      >
        {(tableList: Array<any>) => (
          <>
            <Header className="text-xs leading-[18px] text-gray">
              <HeaderRow className="">
                <HeaderCell className="h-10 px-1 py-[11px]">Coin</HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  Total Balance
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  Available Balance
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  USD Value
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">PnL(%)</HeaderCell>
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((off) => (
                <Row
                  key={off.offer_id}
                  item={off}
                  className="h-12 border-none !bg-transparent"
                >
                  <Cell className="h-12 px-1 py-[11px] align-top ">
                    {off.marketplace.item_name}
                  </Cell>

                  <Cell className="h-12 px-1 py-[11px] align-top">
                    {off.marketplace.total_vol}
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    {off.entries[0]?.item_amount}
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    ${off.marketplace.last_price * off.entries[0].item_amount}
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top text-red">
                    -$233.556/-12.34%
                  </Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>

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
