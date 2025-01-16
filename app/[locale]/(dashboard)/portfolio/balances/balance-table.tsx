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
import { useMemo, useState } from "react";

import { sortBy } from "lodash";
import { useMyHoldings } from "@/lib/hooks/api/use-my-holdings";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { usePointAmount } from "@/lib/hooks/api/use-point-amount";
import { useCheckSwitchChain } from "@/lib/hooks/web3/use-check-switch-chain";

import { SellContent } from "@/app/[locale]/direct-trade/[...name]/create-offer/sell-content";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { reportEvent } from "@/lib/utils/analytics";
import DrawerTitle from "@/components/share/drawer-title";
import Drawer from "react-modern-drawer";
export function BalanceTable() {
  const T = useTranslations("page-MyBalances");
  const TC = useTranslations("drawer-CreateOffer");
  const TB = useTranslations("page-MyBalances");
  const { checkAndSwitchChain } = useCheckSwitchChain();

  const [marketCreateOffer, setOpenMarketCreateOffer] = useState(null);

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
      grid-template-columns: 100px repeat(4,minmax(0,1fr));
      grid-template-rows: 40px repeat(auto-fit, 56px);
      grid-auto-rows: 56px;
      gap: 2px;
    `,
    Header: "",
    Body: "",
    BaseRow: `
      font-size: 12px;
      line-height: 18px;
    `,
    HeaderRow: `
      background: transparent;
    `,
    Row: `
    `,
    BaseCell: `
      &:first-of-type {
        padding-left: 10px;
      }

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
      color: #949e9c;
      line-height: 18px;

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

  function handleCloseDrawer() {
    setOpenMarketCreateOffer(null);
  }

  if (!data.nodes.length) {
    return (
      <div className="flex w-screen flex-1 items-center justify-center text-base text-gray sm:w-full">
        {T("txt-YourBalanceAppearHere")}
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
                <HeaderCell className="h-10 px-1 py-[11px]">
                  {T("th-Coin")}
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  {T("th-TotalBalance")}
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  {T("th-AvailableBalance")}
                </HeaderCell>
                <HeaderCell className="h-10 px-1 py-[11px]">
                  {T("th-USDValue")}
                </HeaderCell>
                {/* <HeaderCell className="h-10 px-1 py-[11px]">
                  <div className="underline">{T("th-PnL(%)")}</div>
                </HeaderCell> */}
                <HeaderCell className="h-10 px-1 py-[11px]"></HeaderCell>
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((holding) => (
                <Row
                  key={holding.offer_id}
                  item={holding}
                  className="h-12 border-none !bg-transparent"
                >
                  <Cell className="h-12 px-1 py-[11px] align-top ">
                    {holding.marketplace.item_name}
                  </Cell>

                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <BalanceValue
                      type="total"
                      marketAccount={holding.marketplace.market_place_account}
                    />
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <BalanceValue
                      type="free"
                      marketAccount={holding.marketplace.market_place_account}
                    />
                  </Cell>
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    ${holding.marketplace.last_price * 100}
                  </Cell>
                  {/* <Cell className="h-12 px-1 py-[11px] align-top !text-red">
                    -$233.556/-12.34%
                  </Cell> */}
                  <Cell className="h-12 px-1 py-[11px] align-top">
                    <WithWalletConnectBtn
                      chain={holding.marketplace.chain}
                      className="flex w-fit"
                      onClick={() => {
                        checkAndSwitchChain();
                        setOpenMarketCreateOffer(holding.marketplace);
                        reportEvent("click", { value: "createOffer" });
                      }}
                    >
                      <div className="flex h-7 w-full cursor-pointer items-center rounded-full border border-[#eee] px-[14px] hover:border-[#50D2C1] hover:text-[#50D2C1]">
                        {TB("th-List")}
                      </div>
                    </WithWalletConnectBtn>
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
      {marketCreateOffer && (
        <Drawer
          open={true}
          onClose={handleCloseDrawer}
          direction="right"
          size={500}
          className="flex flex-col overflow-y-auto rounded-none border border-border-black !bg-bg-black p-4 sm:p-0"
        >
          <DrawerTitle title={TC("cap-List")} onClose={handleCloseDrawer} />

          <SellContent
            onSuccess={handleCloseDrawer}
            marketplace={marketCreateOffer}
          />
        </Drawer>
      )}
    </>
  );
}

const BalanceValue = ({
  type,
  marketAccount,
}: {
  type: string;
  marketAccount: string;
}) => {
  const { address: wallet } = useChainWallet();
  const { data: pointAmount } = usePointAmount(wallet, marketAccount);

  if (pointAmount) {
    if (type === "free") {
      return <>{pointAmount?.free_amount || 0}</>;
    } else {
      return <>{pointAmount?.locked_amount + pointAmount?.free_amount || 0}</>;
    }
  }
  return <>0</>;
};
