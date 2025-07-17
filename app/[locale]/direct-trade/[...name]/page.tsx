"use client";
import Image from "next/image";
import MarketplacePage from "./marketplace-page";
import { useWsMsg } from "@/lib/hooks/api/use-ws-msgs";
import { useEffect } from "react";
import { parseMarketUrlField } from "@/lib/utils/other";
import { useMarketInfo } from "@/lib/hooks/api/use-market-info";

export default function Marketplace({ params }: { params: { name: string } }) {
  const marketParamsStr = decodeURIComponent(params.name[0]);

  const marketParams = parseMarketUrlField(marketParamsStr);

  const {
    data: marketplace,
    mutate,
  } = useMarketInfo({
    token_name: marketParams.token,
    strike_price: marketParams.strikePrice,
    expiry_date: marketParams.expiryDate,
  });

  const { data: wsData } = useWsMsg();

  useEffect(() => {
    if (wsData && wsData?.length > 0) {
      const currentMsg = wsData[wsData.length - 1];
      if (currentMsg.market_id === String(marketplace?.market_place_id)) {
        mutate();
      }
    }
  }, [wsData, marketplace?.market_place_id, mutate]);

  if (marketplace === undefined || !marketParamsStr) return null;

  if (marketplace === null) {
    return (
      <div className="flex h-[calc(100vh-56px)] w-full items-center justify-center">
        <Image src="/img/404.png" width={480} height={360} alt="404" />
      </div>
    );
  }

  return <MarketplacePage marketplace={marketplace} />;
}
