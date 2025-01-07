"use client";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { usePathname } from "@/i18n/routing";
import Drawer from "react-modern-drawer";

import { useEffect, useMemo, useState } from "react";
import DrawerTitle from "@/components/share/drawer-title";
import MobileDrawerTitle from "@/components/share/drawer-title-mobile";
import { handleGoScan, truncateAddr } from "@/lib/utils/web3";
import { IMsg, useWsMsgSub } from "@/lib/hooks/api/use-ws-msgs";
import { useTranslations } from "next-intl";
import { ChainType } from "@/lib/types/chain";
import { useTokens } from "@/lib/hooks/api/token/use-tokens";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import { formatNum } from "@/lib/utils/number";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";
import { useMarketTrades } from "@/lib/hooks/api/use-market-trades";
import { range, sortBy } from "lodash";

export default function MessageBtn() {
  const t = useTranslations("Header");

  const { data: historyData, isLoading: isLoadingFlag } = useMarketTrades(
    ChainType.HYPER,
    "",
  );

  const { data: msgEvents } = useWsMsgSub(ChainType.HYPER);

  const tradeMsgs = useMemo<any[]>(() => {
    const sortHistory = sortBy(historyData || [], "trade_at").reverse();
    const history = sortHistory.map((item: any) => {
      return {
        ...item,
        timestamp: item.trade_at * 1000,
      };
    });

    const allMsg = sortBy(msgEvents || [], "trade_at")
      .reverse()
      .concat(history || []);

    return allMsg;
  }, [msgEvents, historyData]);

  const data = useMemo(() => {
    if (isLoadingFlag) {
      const nodes = range(6)
        .fill(0)
        .map((_: any) => {
          return {
            id: Math.floor(Math.random() * 100000),
          };
        });

      return nodes;
    }

    const trades = tradeMsgs.map((msg) => {
      const time = (Date.now() - msg.timestamp) / 1000;
      return {
        id: Math.floor(Math.random() * 100000),
        ...msg,
        time: time < 2 ? 2 : time,
      };
    });

    const tableData = trades.length > 30 ? trades.slice(0, 30) : trades;
    return tableData;
  }, [tradeMsgs, isLoadingFlag]);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const showLen = useMemo(() => {
    if (!data) return 0;
    if (data.length < 99) return data.length;
    return "99+";
  }, [data]);

  const pathname = usePathname();

  const { isMobileSize } = useDeviceSize();

  if (pathname === "/") return null;

  return (
    <>
      <div
        onClick={() => setDrawerOpen(true)}
        className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[#303030] hover:border-transparent hover:bg-yellow sm:h-12 sm:w-12 sm:rounded-full"
      >
        <Image
          src="/icons/bell.svg"
          width={isMobileSize ? 20 : 24}
          height={isMobileSize ? 20 : 24}
          alt="bell"
        />
        {(data || []).length > 0 && (
          <Badge
            variant="destructive"
            className="absolute -right-2 -top-2 h-4 min-w-4 px-1 sm:-right-1 sm:-top-1"
          >
            {showLen}
          </Badge>
        )}
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        direction={isMobileSize ? "top" : "right"}
        size={isMobileSize ? "99%" : 500}
        className="overflow-y-auto rounded-b-2xl !bg-bg-black p-6 sm:rounded-l-2xl"
        customIdSuffix="msg-drawer"
      >
        {isMobileSize ? (
          <MobileDrawerTitle
            title={t("cap-MarketTrades")}
            onClose={() => setDrawerOpen(false)}
          />
        ) : (
          <DrawerTitle
            title={t("cap-MarketTrades")}
            onClose={() => setDrawerOpen(false)}
          />
        )}
        {(data || []).map((i, idx) => (
          <MsgRow key={idx} msgDetail={i} />
        ))}
      </Drawer>
    </>
  );
}

function MsgRow({ msgDetail }: { msgDetail: IMsg }) {
  const { data: markets } = useMarketplaces();

  const marketplace = markets?.find(
    (marketplace) => marketplace.market_place_account === msgDetail.market_id,
  );

  const { data: tokens } = useTokens(marketplace?.chain);

  const token = useMemo(() => {
    if (!tokens) return null;
    return tokens.find((i) => i.address === msgDetail.token_mint);
  }, [tokens, msgDetail.token_mint]);

  const direction =
    Number(Number(msgDetail.value).toFixed()) % 2 === 0 ? "sell" : "buy";

  return (
    <div className="flex space-x-3">
      <div className="relative mt-3 h-fit">
        <Image
          src={marketplace?.projectLogo || "/icons/empty.svg"}
          width={48}
          height={48}
          alt="avatar"
          className="rounded-full"
        />
        <div className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-bg-black">
          <Image
            src={token?.logoURI || "/icons/empty.svg"}
            width={8.8}
            height={7.2}
            alt="avatar"
            className="rounded-full"
          />
        </div>
      </div>

      <div
        className="flex flex-1 flex-col space-y-1 py-3"
        style={{
          boxShadow: "inset 0px -1px 0px 0px #EEEEEE",
        }}
      >
        <div className="flex items-start space-x-1">
          <div className="mr-1 leading-6 text-txt-white">
            {marketplace?.market_symbol}
          </div>
          <div className="w-fit rounded-[4px] bg-bg-black px-[5px] py-[2px] text-[10px] leading-4 text-gray">
            #{msgDetail.item_id}
          </div>
        </div>

        <div className="flex items-center text-sm leading-5 text-gray">
          User
          <span className="mx-1 inline-block text-txt-white">
            {truncateAddr(msgDetail.buyer)}
          </span>
          <span
            data-type={direction}
            className="mx-1 inline-block data-[type=buy]:text-green data-[type=sell]:text-red"
          >
            {direction === "sell" ? "listed" : "purchased"}
          </span>
          <span className="mr-1 inline-block text-txt-white">
            {formatNum(msgDetail.amount)} {marketplace?.item_name}
          </span>
          <span className="mx-1 inline-block text-txt-white">
            ({formatNum(msgDetail.token_amount)} {token?.symbol})
          </span>
        </div>

        <div className="flex items-center text-xs leading-[18px] text-lightgray">
          <div className="flex items-center">
            <AgoDisplay timestamp={msgDetail.timestamp} />
            <div className="mx-1">·</div>
            <div
              className="flex cursor-pointer items-center justify-start"
              onClick={() => {
                handleGoScan(
                  marketplace?.chain || ChainType.HYPER,
                  "",
                  // msgDetail?.txHash,
                );
              }}
            >
              {marketplace?.chain === ChainType.HYPER ? "Arbiscan" : ""}
              <Image
                src="/icons/arrow-right-gray.svg"
                width={16}
                height={16}
                alt="right"
                className="ml-1 -rotate-45 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgoDisplay({ timestamp }: { timestamp: number }) {
  const duration = (Date.now() - timestamp) / 1000;

  const [durationStr, setDurationStr] = useState("");

  useEffect(() => {
    function updateDurationStr() {
      if (duration < 60) {
        setDurationStr(`${duration} seconds ago`);
        return;
      }

      if (duration < 3600) {
        setDurationStr(`${Math.floor(duration / 60)} minutes ago`);
        return;
      }

      if (duration < 86400) {
        setDurationStr(`${Math.floor(duration / 3600)} hours ago`);
        return;
      }

      setDurationStr(`${Math.floor(duration / 86400)} days ago`);
    }

    updateDurationStr();

    if (duration < 3600) {
      const interval = setInterval(updateDurationStr, 1000);
      return () => clearInterval(interval);
    }
  }, [duration]);

  return <div>{durationStr}</div>;
}
