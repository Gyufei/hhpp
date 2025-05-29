"use client";
import Image from "next/image";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import MarketplacePage from "./marketplace-page";
import { useWsMsg } from "@/lib/hooks/api/use-ws-msgs";
import { useEffect } from "react";

export default function Marketplace({ params }: { params: { name: string } }) {
  const mId = decodeURIComponent(params.name[0]);
  const { data: markets, mutate } = useMarketplaces();

  const marketplace = markets?.find(
    (marketplace) => String(marketplace.id) === mId,
  );

  const { data: wsData } = useWsMsg();

  useEffect(() => {
    if (wsData && wsData?.length > 0) {
      const currentMsg = wsData[wsData.length - 1];
      if (currentMsg.market_id === String(marketplace?.market_place_id)) {
        mutate();
      }
    }
  }, [wsData, marketplace?.market_place_id, mutate]);

  if (!markets || !mId) return null;

  if (!marketplace) {
    return (
      <div className="flex h-[calc(100vh-56px)] w-full items-center justify-center">
        <Image src="/img/404.png" width={480} height={360} alt="404" />
      </div>
    );
  }

  return <MarketplacePage marketplace={marketplace} />;
}
