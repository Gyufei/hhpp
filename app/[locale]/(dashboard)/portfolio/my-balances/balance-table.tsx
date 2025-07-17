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
import { useEffect, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

import { useAccountInfo } from "@/lib/hooks/api/use-account-info";
import NP from "number-precision";
import { useOffers } from "@/lib/hooks/api/use-offers";
import { useRelist } from "@/lib/hooks/contract/use-relist";
import { IOffer } from "@/lib/types/offer";
import { cn } from "@/lib/utils";
import { checkIsAfterExpiry } from "@/lib/hooks/offer/use-offer-format";
import { sortBy } from "lodash";
import { useTakerOffersWithTakerOrder } from "./use-taker-offers-with-taker-order";

export function BalanceTable() {
  const BT = useTranslations("MyBalances");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account || "";

  const { data: myTakeOffersData, mutate: mutateMyTakeOffers } = useOffers(
    {
      taker: address,
    },
    address ? `my-take-offer-${address}` : "",
  );

  const { data: offersWithTakerOrder } = useTakerOffersWithTakerOrder(
    myTakeOffersData || [],
  );

  const myTakeOffers = useMemo(() => {
    if (!myTakeOffersData?.length || !offersWithTakerOrder) return [];

    const myBuy = myTakeOffersData?.filter((o) => o.creator !== o.taker);
    const belongMe = myBuy?.filter((o) => {
      const takerOrder = offersWithTakerOrder?.[o.order_id];
      const isLastBuy = sortBy(takerOrder, "id")?.reverse()[0];
      return isLastBuy?.wallet === address;
    });

    return belongMe;
  }, [myTakeOffersData, offersWithTakerOrder, address]);

  const {
    write: relistAction,
    isLoading: isRelisting,
    isSuccess: isRelistSuccess,
  } = useRelist();

  const selectedOffers = useMemo(() => {
    return myTakeOffers?.filter((offer) => selectedRows.has(offer.order_id));
  }, [myTakeOffers, selectedRows]);

  const isCanCombineList = useMemo(() => {
    return selectedOffers?.every(
      (offer) => offer.market_place_id === selectedOffers?.[0]?.market_place_id,
    );
  }, [selectedOffers]);

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
    if (isRelisting) return;

    relistAction?.({
      offerIds: [o.order_id],
      marketId: o.market_place_id,
    });
  }

  function handleRelistCheckRow() {
    if (selectedRows.size === 0) return;
    if (isRelisting) return;

    const offerIds = Array.from(selectedRows);

    relistAction?.({
      offerIds,
      marketId: selectedOffers?.[0]?.market_place_id,
    });
  }

  const handleSelectRow = (orderId: string) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

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
                <HeaderCell>
                  {selectedRows.size > 1 && (
                    <div
                      onClick={() => handleRelistCheckRow()}
                      className={cn(
                        "flex h-6 w-fit cursor-pointer items-center rounded-full border border-[#eee] px-[14px] transition-opacity hover:border-[#50D2C1] hover:text-[#50D2C1]",
                        !isCanCombineList && "opacity-50",
                      )}
                    >
                      {BT("CombineList")}
                    </div>
                  )}
                </HeaderCell>
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((offer) => (
                <Row key={offer.id} item={offer}>
                  <Cell>
                    <RowCheck
                      offer={offer}
                      takerOrders={offersWithTakerOrder?.[offer.order_id]}
                      selectedRows={selectedRows}
                      handleSelectRow={handleSelectRow}
                    />
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
                    <RowOpBtn
                      offer={offer}
                      takerOrders={offersWithTakerOrder?.[offer.order_id]}
                      handleRelist={handleRelist}
                    />
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

function RowCheck({
  offer,
  takerOrders,
  selectedRows,
  handleSelectRow,
}: {
  offer: IOffer;
  takerOrders: any[];
  selectedRows: Set<string>;
  handleSelectRow: (orderId: string) => void;
}) {
  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account || "";

  const lastBuyOrder = sortBy(takerOrders, "id")?.reverse()[0];

  const lastBuyWallet = lastBuyOrder?.wallet;

  const isCanRelist = lastBuyWallet === address;
  const isHasRelist = offer.order_status === "created";
  const isAfterExpiry = checkIsAfterExpiry(offer.marketplace.expiry_date);

  return (
    <div className="flex items-center gap-2">
      {isCanRelist && !isHasRelist && !isAfterExpiry ? (
        <Checkbox
          checked={selectedRows.has(offer.order_id)}
          onCheckedChange={() => handleSelectRow(offer.order_id)}
        />
      ) : (
        <div className="h-4 w-4"></div>
      )}
      {offer.marketplace.token_name}-{offer.marketplace.expiry_date}-
      {offer.marketplace.strike_price}
    </div>
  );
}

function RowOpBtn({
  offer,
  takerOrders,
  handleRelist,
}: {
  offer: IOffer;
  takerOrders: any[];
  handleRelist: (o: IOffer) => void;
}) {
  const BT = useTranslations("MyBalances");

  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account || "";

  const lastBuyOrder = sortBy(takerOrders, "id")?.reverse()[0];

  const lastBuyWallet = lastBuyOrder?.wallet;

  const isCanRelist = lastBuyWallet === address;
  const isHasRelist = offer.order_status === "created";
  const isAfterExpiry = checkIsAfterExpiry(offer.marketplace.expiry_date);

  if (!isCanRelist || isAfterExpiry) return null;

  return isHasRelist ? (
    <div className="px-[10px] text-xs">{BT("Relisted")}</div>
  ) : (
    <div
      onClick={() => handleRelist(offer)}
      className="flex h-7 w-fit cursor-pointer items-center rounded-full border border-[#eee] px-[14px] transition-opacity hover:border-[#50D2C1] hover:text-[#50D2C1]"
    >
      {BT("List")}
    </div>
  );
}
