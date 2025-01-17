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
import { useMemo, useState } from "react";
import { useMyOffers } from "@/lib/hooks/api/use-my-offers";
import { useMyOrders } from "@/lib/hooks/api/use-my-orders";
import { formatTimestamp } from "@/lib/utils/time";
import OfferAboutMineDetailDrawer from "../offer-about-mine-detail-drawer";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useTranslations } from "next-intl";
import { sortBy } from "lodash";
import { ChainType } from "@/lib/types/chain";
import { reportEvent } from "@/lib/utils/analytics";
import { formatNum } from "@/lib/utils/number";
// import Image from "next/image";
// import { handleGoScan, truncateAddr } from "@/lib/utils/web3";
// import { IOffer } from "@/lib/types/offer";

export function OrderTable() {
  const T = useTranslations("MyOrders");

  const { data: offers, mutate: refreshMyOffers } = useMyOffers({
    market_symbol: null,
    chain: ChainType.HYPER,
  });
  const { data: orders = [] } = useMyOrders({
    market_symbol: null,
    chain: ChainType.HYPER,
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectOfferId, setSelectOfferId] = useState("");
  const selectedOffer = offers?.find((o) => o.offer_id === selectOfferId);

  const data = useMemo(() => {
    const offerData = (offers || []).map((o) => {
      return {
        ...o,
        id: o.offer_id,
      };
    });

    const orderData = (orders || []).map((o) => {
      return {
        ...o,
        id: o.order_id,
      };
    });

    const sortData = sortBy(
      [...offerData, ...orderData],
      "create_at",
    ).reverse();

    return {
      nodes: sortData,
    };
  }, [offers, orders]);

  const theme = useTheme({
    Table: `
      grid-template-columns: 100px repeat(6,minmax(0,1fr));
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

  const pagination = usePagination(data, {
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

  function handleOpenOfferDrawer(OId: string) {
    setSelectOfferId(OId);
    setDrawerOpen(true);
  }

  return (
    <>
      <Table
        data={data}
        theme={theme}
        pagination={pagination}
        className="no-scroll-bar flex-1"
      >
        {(tableList: Array<any>) => (
          <>
            <Header className="text-xs leading-[18px] text-gray">
              <HeaderRow className="boffer-none">
                <HeaderCell>{T("Coin")}</HeaderCell>
                <HeaderCell>{T("Offer")}</HeaderCell>
                <HeaderCell>{T("Type")}</HeaderCell>
                <HeaderCell>{T("Price")}</HeaderCell>
                <HeaderCell>{T("USDValue(Snapshot)")}</HeaderCell>
                {/* <HeaderCell>
                  {T("Tx")}
                </HeaderCell> */}
                <HeaderCell>{T("CreatedTime")}</HeaderCell>
                <HeaderCell></HeaderCell>
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((off) => (
                <Row key={off.offer_id} item={off} className="h-12 border-none">
                  <Cell>
                    <div>{off.marketplace.item_name}</div>
                  </Cell>
                  <Cell>
                    <div>#{off.entry.id}</div>
                  </Cell>
                  <Cell>
                    <div
                      data-type={off.role}
                      className="h-[20px] w-[46px] rounded bg-[rgba(78,196,250,0.2)] text-center leading-5 text-[#4EC4FA] data-[type=taker]:bg-[rgba(255,169,91,0.2)] data-[type=taker]:text-[#FFA95B]"
                    >
                      {off.role === "taker" ? "Taker" : "Maker"}
                    </div>
                  </Cell>
                  <Cell>
                    <div>${formatNum(off.price, 6)}</div>
                  </Cell>
                  <Cell>
                    <div>${formatNum(off.price * off.item_amount, 6)}</div>
                  </Cell>
                  {/* <Cell>
                    <OfferHash offer={off} />
                  </Cell> */}
                  <Cell>
                    <div>{formatTimestamp(off.create_at * 1000)}</div>
                  </Cell>
                  <Cell>
                    <div>
                      {off.role !== "taker" && (
                        <DetailBtn
                          chain={off.marketplace.chain}
                          onClick={() => handleOpenOfferDrawer(off.offer_id)}
                        ></DetailBtn>
                      )}
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

      <OfferAboutMineDetailDrawer
        holdingId={selectOfferId}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        offer={selectedOffer}
        onSuccess={() => {
          if (selectOfferId) {
            reportEvent("offerDetailActionSuccess", {
              value: selectOfferId.slice(-8),
            });
          }
          refreshMyOffers();
        }}
      />
    </>
  );
}

// function OfferHash({ offer }: { offer: IOffer }) {
//   const hash = offer.tx_hash;
//   if (!hash) {
//     return <span className="leading-5">N/A</span>;
//   }
//   return (
//     <div className="flex items-center">
//       <span className="leading-5 ">
//         {truncateAddr(hash || "", { nPrefix: 4, nSuffix: 4 })}
//       </span>
//       <Image
//         onClick={() => handleGoScan(offer.marketplace.chain, hash || "", "tx")}
//         src="/icons/right-45.svg"
//         width={16}
//         height={16}
//         alt="goScan"
//         className="cursor-pointer"
//       />
//     </div>
//   );
// }

function DetailBtn({
  onClick,
  chain,
}: {
  chain: ChainType;
  onClick: () => void;
}) {
  const CT = useTranslations("Common");
  return (
    <WithWalletConnectBtn
      chain={chain}
      className="flex w-fit"
      onClick={onClick}
    >
      <div className="flex h-7 w-full cursor-pointer items-center rounded-full border border-[#eee] px-[14px] hover:border-[#50D2C1] hover:text-[#50D2C1]">
        {CT("Detail")}
      </div>
    </WithWalletConnectBtn>
  );
}
