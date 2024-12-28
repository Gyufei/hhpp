import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { formatNum } from "@/lib/utils/number";
import OfferInfo from "@/app/[locale]/marketplace/[...name]/offer-detail/offer-info";
import OfferTabs from "@/app/[locale]/marketplace/[...name]/offer-detail/offer-tabs";
import ArrowBetween from "@/app/[locale]/marketplace/[...name]/create-offer/arrow-between";
import { WithTip } from "@/components/share/with-tip";
import { SwapItemPanel } from "./swap-item-panel";
import MyDetailCard from "./my-detail-card";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useCloseOffer } from "@/lib/hooks/contract/use-close-offer";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { ChainConfigs } from "@/lib/const/chain-configs";
import NP from "number-precision";
import { reportEvent } from "@/lib/utils/analytics";

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
    isFilled,
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
      <div className="flex flex-col justify-between gap-y-4 sm:flex-row sm:gap-y-0">
        {/* left card */}
        <div className="flex flex-1 flex-col rounded-[20px] bg-[#fafafa] p-4">
          <OfferInfo
            img1={offer.marketplace.projectLogo}
            img2={ChainConfigs[offer.marketplace.chain].logo}
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

          <div className="flex items-center justify-between gap-2">
            {
              <>
                {
                  <>
                    {isCanceled ? (
                      <button
                        disabled={true}
                        className="mt-4 flex h-12 w-full flex-1 items-center justify-center rounded-2xl bg-[#99A0AF] leading-6 text-white"
                      >
                        {ot("btn-OfferClosed")}
                      </button>
                    ) : (
                      <>
                        {
                          <>
                            <WithWalletConnectBtn
                              className="flex-1"
                              chain={offer?.marketplace.chain}
                              onClick={handleClose}
                            >
                              <button
                                disabled={isClosing}
                                className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#f0f1f5] leading-6 text-black"
                              >
                                {ot("btn-CloseThisOffer")}
                              </button>
                            </WithWalletConnectBtn>

                            {isFilled && (
                              <div className="mt-3 rounded-2xl bg-[#FBF2EA] px-4 py-3 leading-5 text-[#FFA95B]">
                                {ot("txt-YouHaveTheOptionToClose")}
                              </div>
                            )}
                          </>
                        }
                      </>
                    )}
                  </>
                }
              </>
            }
          </div>
        </div>

        {/* right card */}
        <MyDetailCard offer={offer} />
      </div>
      <OfferTabs offer={offer} />
    </>
  );
}
