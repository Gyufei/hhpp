import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import Image from "next/image";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useTheme } from "@table-library/react-table-library/theme";
import { Pagination } from "@/components/ui/pagination/pagination";
import { useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";

import { useAccountInfo } from "@/lib/hooks/api/use-account-info";
import NP from "number-precision";
import { useOffers } from "@/lib/hooks/api/use-offers";
import { useRelist } from "@/lib/hooks/contract/use-relist";
import { IOffer } from "@/lib/types/offer";

export function BalanceTable() {
  const BT = useTranslations("MyBalances");

  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account || "";

  const { data: myTakeOffers, mutate: mutateMyTakeOffers } = useOffers(
    {
      taker: address,
      // taker: "0x8C3A4f7D55fcbff9be9d53529D0f9184B3718c28",
    },
    address ? `my-take-offer-${address}` : "",
  );

  const {
    write: relistAction,
    isLoading: isRelisting,
    isSuccess: isRelistSuccess,
  } = useRelist();

  const data = useMemo(() => {
    return {
      nodes: myTakeOffers || [],
    };
  }, [myTakeOffers]);

  const theme = useTheme({
    Table: `
      grid-template-columns: 180px repeat(3,minmax(0,1fr));
      grid-template-rows: 40px repeat(auto-fit, 56px);
      grid-auto-rows: 56px;
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

  function handleRelist(o: IOffer) {
    console.log("relist");
    if (isRelisting) return;

    relistAction?.({
      offerIds: [o.order_id],
      marketId: o.market_place_id,
    });
  }

  useEffect(() => {
    if (isRelistSuccess) {
      mutateMyTakeOffers();
    }
  }, [isRelistSuccess, mutateMyTakeOffers]);

  if (!data.nodes.length) {
    return (
      <div className="flex w-screen flex-1 items-center justify-center text-base text-gray sm:w-full">
        {BT("YourBalanceAppearHere")}
      </div>
    );
  }

  return (
    <>
      <Table
        data={data}
        theme={theme}
        pagination={pagination}
        className="no-scroll-bar flex-1 "
      >
        {(tableList: Array<any>) => (
          <>
            <Header className="text-xs leading-[18px] text-gray">
              <HeaderRow className="">
                <HeaderCell>{BT("Option")}</HeaderCell>
                <HeaderCell>{BT("TotalBalance")}</HeaderCell>
                <HeaderCell>{BT("USDValue")}</HeaderCell>
                <HeaderCell></HeaderCell>
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((offer) => (
                <Row key={offer.id} item={offer}>
                  <Cell>
                    <div>
                      {offer.marketplace.token_name}-
                      {offer.marketplace.expiry_date}-
                      {offer.marketplace.strike_price}
                    </div>
                  </Cell>

                  <Cell>
                    <div className="flex items-center gap-2">
                      <span>
                        {NP.divide(
                          offer.shares,
                          10 ** offer.marketplace.token.decimals,
                        )}
                      </span>
                      <Image
                        src={offer.marketplace.token.logoURI}
                        alt={offer.marketplace.token_name}
                        width={20}
                        height={20}
                      />
                    </div>
                  </Cell>

                  <Cell>
                    {NP.times(
                      NP.divide(
                        offer.shares,
                        10 ** offer.marketplace.token.decimals,
                      ),
                      offer.marketplace.strike_price,
                    )}
                  </Cell>

                  <Cell>
                    <div
                      onClick={() => handleRelist(offer)}
                      className="flex h-7 w-fit cursor-pointer items-center rounded-full border border-[#eee] px-[14px] hover:border-[#50D2C1] hover:text-[#50D2C1]"
                    >
                      {BT("List")}
                    </div>
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
