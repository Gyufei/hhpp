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
import OfferAboutMineDetailDrawer from "../offer-about-mine-detail-drawer";
import { useTranslations } from "next-intl";
import { sortBy } from "lodash";
import { formatNum } from "@/lib/utils/number";
import { IOffer } from "@/lib/types/offer";
import NP from "number-precision";
import { format } from "date-fns";

export function OrderTable() {
  const T = useTranslations("MyOrders");

  const { data: offers, mutate: refreshMyOffers } = useMyOffers();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectOfferId, setSelectOfferId] = useState("");
  const selectedOffer = offers?.find((o) => o.order_id === selectOfferId);

  const data = useMemo(() => {
    const sortData = sortBy(offers, "create_at").reverse();

    return {
      nodes: sortData,
    };
  }, [offers]);

  const theme = useTheme({
    Table: `
      grid-template-columns: 160px repeat(6,minmax(0,1fr));
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
        {T("YourOrderAppearHere")}
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
        {(tableList: Array<IOffer>) => (
          <>
            <Header className="text-xs leading-[18px] text-gray">
              <HeaderRow className="border-none">
                <HeaderCell>{T("Option")}</HeaderCell>
                <HeaderCell>{T("Offer")}</HeaderCell>
                <HeaderCell>{T("Type")}</HeaderCell>
                <HeaderCell>{T("Price")}</HeaderCell>
                <HeaderCell>{T("USDValue(Snapshot)")}</HeaderCell>
                <HeaderCell>{T("CreatedTime")}</HeaderCell>
                <HeaderCell></HeaderCell>
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((off) => (
                <Row key={off.order_id} item={off} className="h-12 border-none">
                  <Cell>
                    <div>
                      {off.marketplace.token_name}-{off.marketplace.expiry_date}
                    </div>
                  </Cell>
                  <Cell>
                    <div>#{off.id}</div>
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
                    <div>${formatNum(off.marketplace.strike_price, 6)}</div>
                  </Cell>
                  <Cell>
                    <div>
                      $
                      {formatNum(
                        NP.times(
                          NP.divide(
                            off.shares,
                            10 ** off.marketplace.token.decimals,
                          ),
                          off.marketplace.strike_price,
                        ),
                        6,
                      )}
                    </div>
                  </Cell>
                  <Cell>
                    <div>
                      {format(new Date(off.create_at), "yyyy-MM-dd HH:mm:ss")}
                    </div>
                  </Cell>
                  <Cell>
                    <div>
                      {
                        <DetailBtn
                          onClick={() => handleOpenOfferDrawer(off.order_id)}
                        ></DetailBtn>
                      }
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
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        offer={selectedOffer as IOffer}
        onSuccess={() => {
          refreshMyOffers();
        }}
      />
    </>
  );
}

function DetailBtn({ onClick }: { onClick: () => void }) {
  const CT = useTranslations("Common");
  return (
    <div
      onClick={onClick}
      className="flex h-7 w-fit cursor-pointer items-center rounded-full border border-[#eee] px-[14px] hover:border-[#50D2C1] hover:text-[#50D2C1]"
    >
      {CT("Detail")}
    </div>
  );
}
