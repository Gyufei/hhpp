"use client";
import Image from "next/image";
import { useMarketplaces } from "@/lib/hooks/api/use-marketplaces";
import MarketplaceContent from "./marketplace-content";
import { useWsMsgSub } from "@/lib/hooks/api/use-ws-msgs";
import { useEffect } from "react";
import { ChainType } from "@/lib/types/chain";
import VConsole from "vconsole";
import { isProduction } from "@/lib/PathMap";
if (!isProduction) {
  new VConsole();
}
export default function Marketplace({ params }: { params: { name: string } }) {
  const marketplaceName = decodeURIComponent(params.name[0]);
  const { data: markets, mutate } = useMarketplaces();

  const marketplace = markets?.find(
    (marketplace) => marketplace.market_symbol === marketplaceName,
  );

  const { data } = useWsMsgSub(marketplace?.chain || ChainType.ARB);

  useEffect(() => {
    if (data && data?.length > 0) {
      const currentMsg = data[data.length - 1];
      if (currentMsg.market_id === marketplace?.market_place_account) {
        mutate();
      }
    }
  }, [data, marketplace, mutate]);

  if (!markets || !marketplaceName) return null;

  if (!marketplace) {
    return (
      <div className="flex h-[calc(100vh-96px)] w-full items-center justify-center">
        <Image src="/img/404.png" width={480} height={360} alt="404" />
      </div>
    );
  }

  return <MarketplaceContent marketplace={marketplace} />;
}
