import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { formatNum } from "@/lib/utils/number";
import OfferInfo from "@/app/[locale]/direct-trade/[...name]/offer-detail/offer-info";
import OfferTabs from "@/app/[locale]/direct-trade/[...name]/offer-detail/offer-tabs";
import ArrowBetween from "@/app/[locale]/direct-trade/[...name]/create-offer/arrow-between";
import { SwapItemPanel } from "./swap-item-panel";
import MyDetailCard from "./my-detail-card";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useCloseOffer } from "@/lib/hooks/contract/use-close-offer";
import NP from "number-precision";
import { cn } from "@/lib/utils/common";
import { useDelistOffer } from "@/lib/hooks/contract/use-delist-offer";
import { useMakerSettleOffer } from "@/lib/hooks/contract/use-maker-settle-offer";
import { useTakerSettleOffer } from "@/lib/hooks/contract/use-taker-settle-offer";
import { useTakerOrderOfOffers } from "@/lib/hooks/api/use-taker-orders-of-offer";
import { sortBy } from "lodash";
import { useAccountInfo } from "@/lib/hooks/api/use-account-info";

export default function MyAskDetail({
  offer,
  onSuccess,
}: {
  offer: IOffer;
  onSuccess: () => void;
}) {
  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account;

  const T = useTranslations("Offer");
  const {
    tokenTotalPrice,
    progress,
    pointPrice,
    amount,
    offerTokenInfo,
    offerPointInfo,
    isCreated,
    isFilled,
    isCanceled,
    pointDecimalNum,
    isAfterExpiry,
    isDuringExpiry,
  } = useOfferFormat({
    offer,
  });

  const isMaker = offer.role === "maker";
  const isTaker = offer.role === "taker";

  const isOriginOffer = offer.creator === offer.taker;

  const { data: takerOrders } = useTakerOrderOfOffers({
    offerId: String(offer.order_id),
  });

  const isHasTakerOrder = (takerOrders || [])?.length > 0;
  const lastBuyOrder = sortBy(takerOrders, "id")?.reverse()[0];
  const canCancel =
    !isFilled && !isAfterExpiry && isOriginOffer && !isHasTakerOrder;

  const canDelist =
    !isFilled &&
    !isAfterExpiry &&
    !isOriginOffer &&
    isCreated &&
    lastBuyOrder?.wallet === address;

  const canTakerSettle =
    isDuringExpiry && (isFilled || (isHasTakerOrder && isCreated));
  const isTakerCanSettle = canTakerSettle && isTaker;
  const canMakerSettle =
    !isDuringExpiry && isAfterExpiry && (isCreated || isFilled);
  const isMakerCanSettle = canMakerSettle && isMaker;

  const canSettle = isTakerCanSettle || isMakerCanSettle;

  const {
    isLoading: isClosing,
    write: closeAction,
    isSuccess: isCloseSuccess,
  } = useCloseOffer();

  const {
    isLoading: isDelisting,
    write: delistAction,
    isSuccess: isDelistSuccess,
  } = useDelistOffer();

  const {
    isLoading: isMakerSettling,
    write: makerSettleAction,
    isSuccess: isMakerSettleSuccess,
  } = useMakerSettleOffer();

  const {
    isLoading: isTakerSettling,
    write: takerSettleAction,
    isSuccess: isTakerSettleSuccess,
  } = useTakerSettleOffer();

  const isSettling = isMaker ? isMakerSettling : isTakerSettling;

  function handleSettle() {
    if (isMaker) {
      handleMakerSettle();
    } else if (isTaker) {
      handleTakerSettle();
    }
  }

  function handleMakerSettle() {
    if (isMakerSettling) return;

    makerSettleAction?.({
      offerId: offer.order_id,
    });
  }

  function handleTakerSettle() {
    if (isTakerSettling) return;

    takerSettleAction?.({
      offerId: offer.order_id,
    });
  }

  function handleClose() {
    if (isClosing) return;

    closeAction?.({
      offerId: offer.order_id,
    });
  }

  function handleDelist() {
    if (isDelisting) return;

    delistAction?.({
      offerId: offer.order_id,
      marketId: offer.market_place_id,
    });
  }

  useEffect(() => {
    if (
      isCloseSuccess ||
      isDelistSuccess ||
      isMakerSettleSuccess ||
      isTakerSettleSuccess
    ) {
      onSuccess();
    }
  }, [
    isCloseSuccess,
    isDelistSuccess,
    isMakerSettleSuccess,
    isTakerSettleSuccess,
    onSuccess,
  ]);

  return (
    <>
      <div className="flex flex-col justify-between gap-y-4 border-b border-border-black sm:flex-row sm:gap-y-0">
        {/* left card */}
        <div className="flex flex-1 flex-col border-r border-border-black bg-bg-black p-5">
          <OfferInfo
            img1={offer.marketplace.projectLogo}
            name={`${offer.marketplace.token_name}-${offer.marketplace.expiry_date}`}
            no={String(offer.id)}
            progress={progress / 100}
          />

          <SwapItemPanel
            className="mt-5"
            topText={
              <>{isTaker ? T("YouDLikeToReceive") : T("YouHaveToSell")}</>
            }
            bottomText={
              <>
                1 {offer.marketplace.token_name} = ${formatNum(pointPrice, 2)}
              </>
            }
            value={String(NP.divide(offer.shares, pointDecimalNum))}
            tokenName={offerPointInfo.symbol || ""}
            onValueChange={() => {}}
            isCanInput={false}
          />

          <ArrowBetween className="z-[110] -my-4 self-center" />

          <SwapItemPanel
            onValueChange={() => {}}
            isCanInput={false}
            bottomText={<>~${formatNum(tokenTotalPrice, 8)} </>}
            topText={
              <div className="flex items-center">
                {isTaker ? T("YouPay") : T("YouGet")}
              </div>
            }
            value={String(amount)}
            tokenName={offerTokenInfo?.symbol || ""}
          />

          <div className="flex flex-wrap gap-2">
            <>
              {isCanceled ? (
                <button
                  disabled={true}
                  className="mt-4 flex h-8 w-full flex-1 items-center justify-center rounded bg-[#999999] text-xs leading-[18px] text-title-white"
                >
                  {T("OfferClosed")}
                </button>
              ) : canCancel ? (
                <button
                  onClick={handleClose}
                  disabled={isClosing}
                  className={cn(
                    "mt-4 flex h-8 w-full flex-1 items-center justify-center rounded bg-main text-xs leading-6 text-bg-black hover:bg-main-hover disabled:bg-main-inactive",
                    isClosing ? "dot-loading" : "",
                  )}
                >
                  {T("CloseThisOffer")}
                </button>
              ) : canDelist ? (
                <button
                  onClick={handleDelist}
                  disabled={isDelisting}
                  className={cn(
                    "mt-4 flex h-8 w-full flex-1 items-center justify-center rounded bg-main text-xs leading-6 text-bg-black hover:bg-main-hover disabled:bg-main-inactive",
                    isDelisting ? "dot-loading" : "",
                  )}
                >
                  {T("DelistThisOffer")}
                </button>
              ) : canSettle ? (
                <button
                  onClick={handleSettle}
                  disabled={isSettling}
                  className={cn(
                    "mt-4 flex h-8 w-full flex-1 items-center justify-center rounded bg-main text-xs leading-6 text-bg-black hover:bg-main-hover disabled:bg-main-inactive",
                    isSettling ? "dot-loading" : "",
                  )}
                >
                  {isTakerCanSettle
                    ? T("ExerciseThisOption")
                    : T("SettleThisOffer")}
                </button>
              ) : (
                <button className="pointer-events-none mt-4  flex h-8 w-full flex-1 items-center justify-center rounded bg-[#999999] text-xs leading-6 text-title-white">
                  {!isAfterExpiry
                    ? T("WaitingForSettle")
                    : isMaker && canTakerSettle
                    ? T("WaitingForSettle")
                    : T("TradingEnded")}
                </button>
              )}
            </>
          </div>
        </div>

        {/* right card */}
        <MyDetailCard offer={offer} />
      </div>
      <OfferTabs offer={offer} />
    </>
  );
}
