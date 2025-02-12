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
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useMemo } from "react";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { CTooltipArrow } from "@/components/share/c-tooltip-arrow";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { reportEvent } from "@/lib/utils/analytics";

export function OfferCard({
  offer,
  handleShowOffer,
}: {
  offer: IOffer;
  handleShowOffer: (offer: IOffer) => void;
}) {
  const T = useTranslations("MyOrders");

  const {
    progress,
    offerValue,
    forValue,
    offerLogo,
    forLogo,
    pointPerPrice,
    tokenTotalPrice,
    orderDuration,
  } = useOfferFormat({
    offer: offer,
  });

  const orderType = offer.entry.direction;

  const showBuy = useMemo(() => {
    return ["virgin", "ongoing"].includes(offer.status);
  }, [offer]);

  const done = useMemo(() => {
    return ["filled", "settled"].includes(offer.status);
  }, [offer]);

  function handleShow() {
    handleShowOffer(offer);
    reportEvent("click_" + orderType === "sell" ? "buy-offer" : "sell-offer", {
      value: offer.entry.id,
    });
  }

  return (
    <div className="h-fit rounded border border-transparent bg-[#222428] px-[10px] pb-3 pt-[10px] hover:border-main">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-[10px]">
          <Image
            src={offer.marketplace.projectLogo}
            width={48}
            height={48}
            alt="project logo"
            className="rounded"
          />

          <div>
            <div className="mb-[2px] leading-6 text-txt-white">
              {offer.marketplace.item_name}
            </div>
            <div className="w-fit rounded border border-border-black bg-border-black px-[5px] py-[2px] text-[10px] leading-4 text-gray">
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
            {T("Offer")}
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
          <div className="mt-[2px] overflow-visible whitespace-nowrap text-xs leading-[18px] text-gray">
            {orderType === "sell" ? (
              <>
                ${formatNum(pointPerPrice, 8)} / {offer.marketplace.market_name}
              </>
            ) : (
              <>${formatNum(tokenTotalPrice, 8)}</>
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
            {T("For")}
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
          <div className="mt-[2px] overflow-visible whitespace-nowrap text-xs leading-[18px] text-gray">
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
        <div className="text-xs leading-[18px] text-gray">{orderDuration}</div>
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
                handleShow();
              }}
            >
              <button className="flex items-center justify-center rounded-full border border-main px-[18px] py-1 text-sm leading-5 text-main hover:border-main-hover hover:text-main-hover">
                {orderType === "sell" ? T("Buy") : T("Sell")}
              </button>
            </WithWalletConnectBtn>
          )}
          {done && (
            <WithWalletConnectBtn
              chain={offer.marketplace.chain}
              onClick={() => handleShow()}
            >
              <button className="flex items-center justify-center rounded-full border border-main px-[18px] py-1 text-sm leading-5 text-main hover:border-main-hover hover:text-main-hover">
                {T("Detail")}
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
    <div className="h-fit rounded-[20px] bg-bg-black p-5 hover:shadow-[4px_4px_20px_0px_rgba(45,46,51,0.05)]">
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
