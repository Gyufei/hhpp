import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { formatNum } from "@/lib/utils/number";
import OfferInfo from "@/app/[locale]/direct-trade/[...name]/offer-detail/offer-info";
import OfferTabs from "@/app/[locale]/direct-trade/[...name]/offer-detail/offer-tabs";
import ArrowBetween from "@/app/[locale]/direct-trade/[...name]/create-offer/arrow-between";
import { WithTip } from "@/components/share/with-tip";
import { SwapItemPanel } from "./swap-item-panel";
import MyDetailCard from "./my-detail-card";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useCloseOffer } from "@/lib/hooks/contract/use-close-offer";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import NP from "number-precision";
import { reportEvent } from "@/lib/utils/analytics";
import { cn } from "@/lib/utils/common";

export default function MyAskDetail({
  holdingId,
  offer,
  onSuccess,
}: {
  holdingId: string;
  offer: IOffer;
  onSuccess: () => void;
}) {
  const ot = useTranslations("drawer-OfferDetail");
  const {
    tokenTotalPrice,
    progress,
    pointPerPrice,
    amount,
    offerTokenInfo,
    offerPointInfo,
    isClosed,
    isCanceled,
    pointDecimalNum,
  } = useOfferFormat({
    offer,
  });

  const {
    isLoading: isClosing,
    write: closeAction,
    isSuccess: isCloseSuccess,
  } = useCloseOffer();

  function handleClose() {
    if (isClosing) return;

    reportEvent("click", { value: `closeOffer-${holdingId}` });

    closeAction?.({
      offerId: offer.offer_id,
    });
  }

  useEffect(() => {
    if (isCloseSuccess) {
      onSuccess();
    }
  }, [isCloseSuccess, onSuccess]);

  return (
    <>
      <div className="flex flex-col justify-between gap-y-4 border-b border-border-black sm:flex-row sm:gap-y-0">
        {/* left card */}
        <div className="flex flex-1 flex-col border-r border-border-black bg-bg-black p-5">
          <OfferInfo
            img1={offer.marketplace.projectLogo}
            name={offer.marketplace.market_name}
            no={String(offer.entry.id)}
            progress={progress}
          />

          <SwapItemPanel
            className="mt-5"
            topText={<>{ot("txt-YouHaveToSell")}</>}
            bottomText={<>~${formatNum(tokenTotalPrice)} </>}
            value={String(NP.divide(offer.item_amount, pointDecimalNum))}
            tokenLogo={offerPointInfo.logoURI}
            onValueChange={() => {}}
            isCanInput={false}
          />

          <ArrowBetween className="z-[110] -my-4 self-center" />

          <SwapItemPanel
            onValueChange={() => {}}
            isCanInput={false}
            bottomText={
              <>
                1 {offer.marketplace.item_name} = ${pointPerPrice}
              </>
            }
            topText={
              <div className="flex items-center">
                {ot("txt-YouGet")}
                <WithTip align="start">
                  {ot("tip-YouGet", {
                    pointName: offer.marketplace.item_name,
                  })}
                </WithTip>
              </div>
            }
            value={String(amount)}
            tokenLogo={offerTokenInfo?.logoURI || "/icons/empty.png"}
          />

          <div className="flex flex-wrap gap-2">
            <>
              {isCanceled ? (
                <button
                  disabled={true}
                  className="mt-4 flex h-8 w-full flex-1 items-center justify-center rounded bg-[#999999] text-xs leading-[18px] text-title-white"
                >
                  {ot("btn-OfferClosed")}
                </button>
              ) : isClosed ? (
                <button className="pointer-events-none mt-4  flex h-8 w-full flex-1 items-center justify-center rounded bg-[#999999] text-xs leading-6 text-title-white">
                  {ot("btn-TradingEnded")}
                </button>
              ) : (
                <>
                  <WithWalletConnectBtn
                    className="flex-1"
                    chain={offer?.marketplace.chain}
                    onClick={handleClose}
                  >
                    <button
                      disabled={isClosing}
                      className={cn(
                        "mt-4 flex h-8 w-full items-center justify-center rounded bg-main text-xs leading-6 text-bg-black hover:bg-main-hover disabled:bg-main-inactive",
                        isClosing ? "dot-loading" : "",
                      )}
                    >
                      {ot("btn-CloseThisOffer")}
                    </button>
                  </WithWalletConnectBtn>
                  <div className="mt-2 rounded bg-[#FBF2EA] px-3 py-2 text-xs leading-5 text-[#FFA95B]">
                    {ot("txt-YouHaveTheOptionToClose")}
                  </div>
                </>
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
