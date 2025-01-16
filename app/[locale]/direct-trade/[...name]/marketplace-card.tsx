"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import HoverIcon from "@/components/share/hover-icon";

import { IMarketplace } from "@/lib/types/marketplace";
import MarketplaceOverview from "@/components/share/market-place-overview";
import { cn } from "@/lib/utils/common";
import { Skeleton } from "@/components/ui/skeleton";
import { useMarketInfo } from "@/lib/hooks/api/use-market-info";
import { ChainType } from "@/lib/types/chain";
import { toast } from "react-hot-toast";
import MarketFoldPop from "./market-fold-pop";

export default function MarketplaceCard({
  marketplace,
  className,
}: {
  marketplace: IMarketplace | undefined;
  className?: string;
}) {
  const isLoadingFlag = !marketplace;

  const [isStar, setIsStar] = useState(false);
  const { data: marketInfos } = useMarketInfo(
    marketplace?.chain || ChainType.HYPER,
  );

  const projectInfo = useMemo(() => {
    if (!marketplace || !marketInfos) return;
    const projectInfo = marketInfos[marketplace.market_symbol];

    return projectInfo;
  }, [marketplace, marketInfos]);

  function handleStar() {
    if (isStar) {
      setIsStar(false);
    } else {
      setIsStar(true);
    }
  }

  const handleCopy = () => {
    if (isLoadingFlag) return;
    if (!marketplace.market_name) return;

    navigator.clipboard.writeText(marketplace.market_name);

    toast.success("Copied to clipboard");
  };

  return (
    <div className={cn(className, "relative")}>
      <div className="mx-[10px] flex items-center justify-start pb-4 pt-[10px] sm:justify-between sm:border-b sm:border-[#303030]">
        <div className="flex items-center justify-start space-x-[10px]">
          {isLoadingFlag ? (
            <Skeleton className="h-14 w-14 rounded-full" />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full sm:border-[1.5px] sm:border-[#303030]">
              <Image
                src={marketplace?.projectLogo}
                width={48}
                height={48}
                alt="token1"
                className="rounded-full"
              />
            </div>
          )}

          <div className="relative mt-[3px] flex items-center space-x-3">
            <div className="flex flex-col justify-center">
              {isLoadingFlag ? (
                <>
                  <Skeleton className="my-[2px] h-4 w-[100px] rounded-sm bg-bg-black" />
                  <Skeleton className="my-[2px] h-4 w-[80px] rounded-sm bg-bg-black" />
                </>
              ) : (
                <>
                  <div className="w-[120px] overflow-hidden text-ellipsis whitespace-nowrap text-xl leading-[30px] text-title-white">
                    {marketplace.item_name}
                  </div>
                  <OverviewIcons
                    isStar={isStar}
                    handleStar={handleStar}
                    handleCopy={handleCopy}
                    twitter={projectInfo?.twitter}
                    discord={projectInfo?.discord}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        {isLoadingFlag ? (
          <Skeleton className="h-8 w-8 rounded-full bg-bg-black" />
        ) : (
          <MarketFoldPop />
        )}
      </div>

      <MarketplaceOverview
        marketplace={marketplace}
        isLoading={isLoadingFlag}
      />
    </div>
  );
}

function OverviewIcons({
  twitter,
  discord,
}: {
  twitter: string | undefined;
  discord: string | undefined;
  [key: string]: any;
}) {
  const handleGoTwitter = () => {
    if (!twitter) return;
    window.open(twitter, "_blank");
  };

  const handleGoDiscord = () => {
    if (!discord) return;
    window.open(discord, "_blank");
  };

  if (!twitter && !discord) return null;

  return (
    <div className="flex h-5 items-center space-x-1">
      {twitter && (
        <HoverIcon
          onClick={handleGoTwitter}
          src="/icons/twitter-gray.svg"
          hoverSrc="/icons/twitter.svg"
          width={20}
          height={20}
          alt="x"
        />
      )}

      {discord && (
        <HoverIcon
          onClick={handleGoDiscord}
          src="/icons/discord-gray.svg"
          hoverSrc="/icons/discord.svg"
          width={20}
          height={20}
          alt="discord"
        />
      )}
    </div>
  );
}
