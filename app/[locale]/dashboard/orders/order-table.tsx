import Image from "next/image";

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

import { handleGoScan, truncateAddr } from "@/lib/utils/web3";
import { Pagination } from "@/components/ui/pagination/pagination";
import { useEffect, useMemo, useState } from "react";
import { useMyOffers } from "@/lib/hooks/api/use-my-offers";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { IOffer } from "@/lib/types/offer";
import { formatTimestamp } from "@/lib/utils/time";
import { IStatus } from "./filter-select";
import OfferAboutMineDetailDrawer from "../common/offer-about-mine-detail-drawer";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useTranslations } from "next-intl";
import { sortBy } from "lodash";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";
import { reportEvent } from "@/lib/utils/analytics";
import { formatNum } from "@/lib/utils/number";

export function OrderTable({
  chain,
  status,
}: {
  chain: ChainType;
  status: IStatus;
}) {
  const T = useTranslations("page-MyOrders");

  const { data: offers, mutate: refreshMyOffers } = useMyOffers({
    chain,
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectOfferId, setSelectOfferId] = useState("");
  const selectedOffer = offers?.find((o) => o.offer_id === selectOfferId);

  const data = useMemo(() => {
    const offerData = (offers || [])
      .map((o) => {
        return {
          ...o,
          id: o.offer_id,
        };
      })
      .filter((o) => {
        const isStatus = status === "All" || status.toLowerCase() === o.status;
        return isStatus;
      });

    const sortData = sortBy(offerData, "create_at").reverse();

    return {
      nodes: sortData,
    };
  }, [offers, status]);

  useEffect(() => {
    refreshMyOffers();
  }, [chain, refreshMyOffers]);

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
      
      background: #111a1e;
    `,
    HeaderCell: `
      font-size: 12px;
      font-weight: 400;
      color: #949e9c;
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
    setSelectOfferId(OId);
    setDrawerOpen(true);
  }

  return (
    <>
      <Table
        data={data}
        theme={theme}
        pagination={pagination}
        className="flex-1 !grid-cols-[100px_repeat(6,minmax(0,1fr))] grid-rows-[40px_repeat(7,64px)] gap-2"
      >
        {(tableList: Array<any>) => (
          <>
            <Header className="text-xs leading-[18px] text-gray">
              <HeaderRow className="border-none">
                <HeaderCell className="h-10 px-1 py-[11px]">
                  {T("th-Items")}
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  {T("th-Offer")}
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  {T("th-Type")}
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  {T("th-From/To")}
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
                  className="boffer-none h-12 !bg-transparent"
                >
                  <Cell className="h-12 px-1 py-[11px] align-top text-gray">
                    <OfferItem offer={off} />
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <div>
                      <div className="text-sm leading-5 text-txt-white">
                        {off.marketplace?.market_name}
                      </div>
                      <div className="text-[10px] leading-4 text-gray">
                        #{off.entry.id}
                      </div>
                    </div>
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <OfferRole offer={off} />
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <OfferFromTo offer={off} />
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <OfferHash offer={off} />
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <span className="text-sm leading-5 text-txt-white">
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

function OfferItem({ offer }: { offer: IOffer }) {
  return (
    <div className="relative h-fit w-fit">
      <Image
        src={offer.marketplace?.projectLogo}
        width={32}
        height={32}
        alt="avatar"
        className="rounded-full"
      />
      <div className="boffer boffer-white absolute bottom-0 right-0 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-bg-black">
        <Image
          src={ChainConfigs[offer.marketplace.chain].logo}
          width={14}
          height={14}
          alt="avatar"
          className="rounded-full"
        />
      </div>
    </div>
  );
}

function OfferFromTo({ offer }: { offer: IOffer }) {
  const { offerValue, forValue, offerLogo, forLogo } = useOfferFormat({
    offer: offer,
  });

  return (
    <div className="flex w-fit flex-col items-start">
      <div className="flex items-center space-x-2">
        <Image
          src={offerLogo}
          width={16}
          height={16}
          alt="token"
          className="rounded-full"
        />
        <span className="text-sm leading-5 text-txt-white">
          {formatNum(offerValue, 2, true)}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <Image
          src={forLogo}
          width={16}
          height={16}
          alt="token"
          className="rounded-full"
        />
        <span className="text-sm leading-5 text-txt-white">
          {formatNum(forValue, 2, true)}
        </span>
      </div>
    </div>
  );
}

function OfferRole({ offer }: { offer: IOffer }) {
  const offerRole = offer.status;

  return (
    <div
      data-type={offerRole}
      className="flex h-5 w-fit items-center rounded px-[5px] data-[type=Maker]:bg-[#E9F5FA] data-[type=Taker]:bg-[#FBF2EA] data-[type=Maker]:text-[#4EC4FA] data-[type=Taker]:text-[#FFA95B] "
    >
      {offerRole}
    </div>
  );
}

function OfferHash({ offer }: { offer: IOffer }) {
  const hash = offer.tx_hash;

  return (
    <div className="flex items-center">
      <span className="text-sm leading-5 text-txt-white">
        {truncateAddr(hash || "")}
      </span>
      <Image
        onClick={() => handleGoScan(offer.marketplace.chain, hash || "", "tx")}
        src="/icons/right-45.svg"
        width={16}
        height={16}
        alt="goScan"
        className="cursor-pointer"
      />
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
      <div className="flex h-7 w-full cursor-pointer items-center rounded-full border border-[#eee] px-[14px] text-sm leading-5 text-txt-white hover:border-black">
        {ct("Detail")}
      </div>
    </WithWalletConnectBtn>
  );
}
