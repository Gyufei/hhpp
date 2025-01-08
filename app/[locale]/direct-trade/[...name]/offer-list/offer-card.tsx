import NP from "number-precision";
import Image from "next/image";
import { CircleProgress } from "@/components/share/circle-progress";
import { formatNum } from "@/lib/utils/number";
import HoverIcon from "@/components/share/hover-icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IOffer } from "@/lib/types/offer";
import { TokenPairImg } from "@/components/share/token-pair-img";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useMemo } from "react";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { CTooltipArrow } from "@/components/share/c-tooltip-arrow";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useAnchor } from "@/lib/hooks/common/use-anchor";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { reportEvent } from "@/lib/utils/analytics";
import { useCheckSwitchChain } from "@/lib/hooks/web3/use-check-switch-chain";

export function OfferCard({ offer }: { offer: IOffer }) {
  const t = useTranslations("cd-Order");
  const { setAnchorValue } = useAnchor();
  const {
    progress,
    offerValue,
    forValue,
    offerLogo,
    forLogo,
    pointPerPrice,
    tokenTotalPrice,
  } = useOfferFormat({
    offer: offer,
  });

  const { checkAndSwitchChain } = useCheckSwitchChain();

  const orderType = offer.entry.direction;

  const showBuy = useMemo(() => {
    return ["virgin", "ongoing"].includes(offer.status);
  }, [offer]);

  const done = useMemo(() => {
    return ["filled", "settled"].includes(offer.status);
  }, [offer]);

  function handleShowOffer(oId: string) {
    setAnchorValue(oId);
    reportEvent("click_" + orderType === "sell" ? "buy-offer" : "sell-offer", {
      value: offer.entry.id,
    });
  }

  return (
    <div className="bg-bg-black h-fit rounded-[20px] p-5 hover:shadow-[4px_4px_20px_0px_rgba(45,46,51,0.05)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <TokenPairImg
            src1={offer.marketplace.projectLogo}
            src2={ChainConfigs[offer.marketplace.chain]?.logo}
            width1={48}
            height1={48}
          />

          <div>
            <div className="mb-[2px] leading-6 text-txt-white">
              {offer.marketplace.item_name}
            </div>
            <div className="bg-bg-black w-fit rounded px-[5px] py-[2px] text-[10px] leading-4 text-gray">
              #{offer.entry.id}
            </div>
          </div>
        </div>

        <div className="relative">
          <CircleProgress
            percentage={Number(formatNum(progress * 100))}
            className="scale-[1.1429]"
          />
          <div
            data-zero={Number(progress) === 0 ? true : false}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs leading-[18px] data-[zero=false]:text-txt-white data-[zero=true]:text-gray"
          >
            {formatNum(NP.times(progress, 100))}%
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-b border-border-black pb-5">
        <div className="flex flex-1 grow flex-col">
          <div className="mb-[2px] text-xs leading-[18px] text-gray">
            {t("lb-Offer")}
          </div>
          <div className="flex items-center leading-6 text-txt-white">
            {formatNum(offerValue, 2, true)}
            <Image
              src={offerLogo}
              width={16}
              height={16}
              alt="stable"
              className="ml-1 rounded-full"
            />
          </div>
          <div className="overflow-visible whitespace-nowrap text-xs leading-[18px] text-lightgray">
            {orderType === "sell" ? (
              <>
                ${formatNum(pointPerPrice, 6)} / {offer.marketplace.market_name}
              </>
            ) : (
              <>${formatNum(tokenTotalPrice)}</>
            )}
          </div>
        </div>
        <div className="flex grow-0 items-center justify-center">
          <Image
            src="/icons/arrow-right-gray.svg"
            width={20}
            height={20}
            alt="arrow"
          />
        </div>
        <div className="flex flex-1 grow flex-col items-end">
          <div className="mb-[2px] text-xs leading-[18px] text-gray">
            {t("lb-For")}
          </div>
          <div className="flex items-center leading-6 text-txt-white">
            {formatNum(forValue, 2, true)}
            <Image
              src={forLogo}
              width={16}
              height={16}
              alt="stable"
              className="ml-1 rounded-full"
            />
          </div>
          <div className="overflow-visible whitespace-nowrap text-xs leading-[18px] text-lightgray">
            {orderType === "sell" ? (
              <>${formatNum(tokenTotalPrice)}</>
            ) : (
              <>
                ${formatNum(pointPerPrice, 6)} / {offer.marketplace.item_name}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3">
        <div className="text-xs leading-[18px] text-lightgray">
          {/* {orderDuration} */}
        </div>
        <div className="flex items-center">
          {offer.note && (
            <div
              data-right={showBuy}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full data-[right=true]:mr-3"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HoverIcon
                      src="/icons/msg-gray.svg"
                      hoverSrc="/icons/msg-gray.svg"
                      width={16}
                      height={16}
                      alt="msg"
                    />
                  </TooltipTrigger>
                  <TooltipContent className="w-[200px]">
                    <p className="text-xs leading-[18px]">{offer.note}</p>
                    <TooltipArrow asChild>
                      <CTooltipArrow />
                    </TooltipArrow>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
          {showBuy && (
            <WithWalletConnectBtn
              chain={offer.marketplace.chain}
              onClick={() => {
                checkAndSwitchChain();
                handleShowOffer(String(offer.entry.id));
              }}
            >
              <button className="flex items-center justify-center rounded-full border border-border-black px-[18px] py-1 text-sm leading-5 text-[#d1d4dc] hover:border-transparent hover:bg-main">
                {orderType === "sell" ? t("btn-Buy") : t("btn-Sell")}
              </button>
            </WithWalletConnectBtn>
          )}
          {done && (
            <WithWalletConnectBtn
              chain={offer.marketplace.chain}
              onClick={() => handleShowOffer(String(offer.entry.id))}
            >
              <button className="flex items-center justify-center rounded-full border border-border-black px-[18px] py-1 text-sm leading-5 text-txt-white hover:border-transparent hover:bg-main">
                {t("btn-Detail")}
              </button>
            </WithWalletConnectBtn>
          )}
        </div>
      </div>
    </div>
  );
}

export function OrderCardSkeleton() {
  return (
    <div className="bg-bg-black h-fit rounded-[20px] p-5 hover:shadow-[4px_4px_20px_0px_rgba(45,46,51,0.05)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-12 w-12 rounded-full" />

          <div>
            <Skeleton className="my-1 h-4 w-[160px]" />
            <Skeleton className="my-1 h-4 w-[88px]" />
          </div>
        </div>

        <div className="relative">
          <CircleProgress percentage={0} className="scale-[1.1429]" />
          <div
            data-zero={true}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs leading-[18px] data-[zero=false]:text-txt-white data-[zero=true]:text-gray"
          >
            0%
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-b border-[#F0F1F5] pb-5">
        <div className="flex flex-1 grow flex-col">
          <Skeleton className="h-3 w-[60px]" />
          <Skeleton className="my-2 h-4 w-[120px]" />
          <Skeleton className="h-4 w-[60px]" />
        </div>
        <div className="flex grow-0 items-center justify-center">
          <Image
            src="/icons/arrow-right-gray.svg"
            width={20}
            height={20}
            alt="arrow"
          />
        </div>
        <div className="flex flex-1 grow flex-col items-end">
          <Skeleton className="h-3 w-[60px]" />
          <Skeleton className="my-2 h-4 w-[120px]" />
          <Skeleton className="h-4 w-[60px]" />
        </div>
      </div>

      <div className="flex items-center justify-between pt-3">
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-4 w-[120px]" />
      </div>
    </div>
  );
}
