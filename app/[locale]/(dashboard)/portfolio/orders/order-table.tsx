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

import { truncateAddr } from "@/lib/utils/web3";
import { Pagination } from "@/components/ui/pagination/pagination";
import { useMemo } from "react";
import { useMyOffers } from "@/lib/hooks/api/use-my-offers";
import { IOffer } from "@/lib/types/offer";
import { formatTimestamp } from "@/lib/utils/time";
import { IRole, IStatus } from "./filter-select";
// import OfferAboutMineDetailDrawer from "../common/offer-about-mine-detail-drawer";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useTranslations } from "next-intl";
import { sortBy } from "lodash";
import { ChainType } from "@/lib/types/chain";

export function OrderTable({
  role,
  status,
  types,
}: {
  role: IRole;
  status: IStatus;
  types: Array<any>;
}) {
  const T = useTranslations("page-MyOrders");

  const { data: offers } = useMyOffers({
    market_symbol: "abc",
    chain: ChainType.HYPER,
  });

  // const [drawerOpen, setDrawerOpen] = useState(false);

  // const [selectOfferId, setSelectOfferId] = useState("");

  const data = useMemo(() => {
    const offerData = (offers || [])
      .map((o) => {
        return {
          ...o,
          id: o.offer_id,
        };
      })
      .filter((o) => {
        // console.log("🚀 ~ .filter ~ o:", o, types, status);
        // const oType = o?.entry?.direction;
        // const isStatus = status === "All" || status.toLowerCase() === o.status;

        // return types.includes(oType as any) && isStatus;
        return true;
      });

    const sortData = sortBy(offerData, "create_at").reverse();

    return {
      nodes: sortData,
    };
  }, [offers, role, status, types]);

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
    // setSelectOfferId(OId);
    // setDrawerOpen(true);
  }

  return (
    <>
      <Table
        data={data}
        theme={theme}
        pagination={pagination}
        className="flex-1 !grid-cols-[100px_repeat(7,minmax(0,1fr))] grid-rows-[40px_repeat(7,64px)] gap-2 text-txt-white"
      >
        {(tableList: Array<any>) => (
          <>
            <Header className="text-xs leading-[18px] text-gray">
              <HeaderRow className="boffer-none">
                <HeaderCell className="h-10 px-1 py-[11px]">Coin</HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  {T("th-Offer")}
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  {T("th-Type")}
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">Price</HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  USD Value(Snapshot)
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  {T("th-Tx")}
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  {T("th-CreatedTime")}
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]"></HeaderCell>
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
                    {/* <OfferItem offer={off} /> */}
                    {off.marketplace.item_name}
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top text-gray">
                    <div>
                      {/* <div className="text-sm leading-5 ">
                        {off.marketplace?.market_name}
                      </div> */}
                      <div className="leading-4 text-gray">#{off.entry.id}</div>
                    </div>
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    {/* <OfferRole offer={off} /> */}
                    <div className="h-[20px] w-[46px] rounded bg-[rgba(78,196,250,0.2)] text-center text-[##4EC4FA]">
                      Maker
                    </div>
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    ${off.price}
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    {/* <OfferFromTo offer={off} /> */}$
                    {off.price * off.item_amount}
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <OfferHash offer={off} />
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <span className="text-sm leading-5">
                      {formatTimestamp(off.create_at * 1000)}
                    </span>
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <DetailBtn
                      chain={off.marketplace.chain}
                      onClick={() => handleOpenOfferDrawer(off.offer_id)}
                    ></DetailBtn>
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

      {/* <OfferAboutMineDetailDrawer
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
      /> */}
    </>
  );
}

function OfferHash({ offer }: { offer: IOffer }) {
  const hash = offer.tx_hash || "0x1224352435234u243ui23456";

  return (
    <div className="flex items-center">
      <span className="text-sm leading-5 ">
        {truncateAddr(hash || "", { nPrefix: 4, nSuffix: 4 })}
      </span>
      {/* <Image
        onClick={() => handleGoScan(offer.marketplace.chain, hash || "", "tx")}
        src="/icons/right-45.svg"
        width={16}
        height={16}
        alt="goScan"
        className="cursor-pointer"
      /> */}
    </div>
  );
}

function DetailBtn({
  onClick,
  chain,
}: {
  chain: ChainType;
  onClick: () => void;
}) {
  const ct = useTranslations("Common");
  return (
    <WithWalletConnectBtn
      chain={chain}
      className="flex w-fit"
      onClick={onClick}
    >
      <div className="flex h-7 w-full cursor-pointer items-center rounded-full border border-[#eee] px-[14px] text-sm leading-5  hover:border-[#50D2C1] hover:text-[#50D2C1]">
        {ct("Detail")}
      </div>
    </WithWalletConnectBtn>
  );
}
