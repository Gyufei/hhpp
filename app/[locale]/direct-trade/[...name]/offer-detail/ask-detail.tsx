import NP from "number-precision";
import { formatNum } from "@/lib/utils/number";
import OfferInfo from "./offer-info";
import { useEffect, useMemo, useState } from "react";
import SliderCard from "./slider-card";
import ReceiveCard from "./receive-card";
import DetailCard from "./detail-card";
import OfferTabs from "./offer-tabs";
import { useCreateTakerOrder } from "@/lib/hooks/contract/use-create-taker-order";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useTranslations } from "next-intl";
import { useCheckBalance } from "@/lib/hooks/api/use-check-balance";
import ArrowBetween from "../create-offer/arrow-between";
import { StableBalance } from "@/components/share/stable-balance";
import { cn } from "@/lib/utils/common";
import { usePremiumPrice } from "@/lib/hooks/api/use-premium-price";

export default function AskDetail({
  offer,
  onSuccess,
}: {
  offer: IOffer;
  onSuccess: (_o: Record<string, any>) => void;
}) {
  const T = useTranslations("Offer");

  const { data: premiumPriceData } = usePremiumPrice(
    offer.marketplace.token_name,
    offer.marketplace.strike_price,
    offer.marketplace.expiry_date,
  );

  const premiumPrice = premiumPriceData?.current_premium_price || 0;

  const { checkUSDTInsufficient } = useCheckBalance(offer.marketplace);

  const {
    progress,
    pointPrice,
    isNotCanBuy,
    isFilled,
    isCanceled,
    isSettled,
    offerPointInfo,
    offerTokenInfo,
    pointDecimalNum,
  } = useOfferFormat({
    offer,
  });

  const {
    // data: txHash,
    isLoading: isTaking,
    isSuccess,
    write: writeAction,
  } = useCreateTakerOrder();

  const payTokenAmount = useMemo(() => {
    return NP.times(premiumPrice, NP.divide(offer.shares, pointDecimalNum));
  }, [premiumPrice, offer.shares, pointDecimalNum]);

  const receivePointAmount = useMemo(
    () => NP.divide(offer.shares, pointDecimalNum),
    [offer.shares, pointDecimalNum],
  );

  const [errorText, setErrorText] = useState("");

  const payTokenTotalPrice = useMemo(() => {
    if (!payTokenAmount) return "0";
    return NP.times(payTokenAmount || 0, offerTokenInfo?.price || 0);
  }, [payTokenAmount, offerTokenInfo]);

  useEffect(() => {
    if (isNotCanBuy) return;
    let errorText = "";
    errorText = checkUSDTInsufficient(payTokenAmount);

    setErrorText(errorText);
  }, [payTokenAmount, receivePointAmount, checkUSDTInsufficient, isNotCanBuy]);

  async function handleConfirmTakerOrder() {
    if (isTaking || !receivePointAmount) return;

    const withSlippage = String(
      Math.floor(
        NP.times(
          NP.times(payTokenAmount, 1.01),
          10 ** (offerTokenInfo?.decimals || 0),
        ),
      ),
    );

    await writeAction({
      offerId: offer.order_id,
      maxPremiumAmount: withSlippage,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      onSuccess({
        no: offer.id,
        pay: payTokenAmount,
        tx: offer.creator,
        token: offerTokenInfo,
      });
    }
  }, [isSuccess]);

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

          <SliderCard
            topText={
              <>
                {T("YouPayPremium")}
                <StableBalance className="mb-0" />
              </>
            }
            bottomText={<>~${formatNum(payTokenTotalPrice, 8)} </>}
            tokenName={offerTokenInfo?.symbol || ""}
            value={String(payTokenAmount)}
            onUserInput={() => {}}
            canInput={false}
            hasError={!!errorText}
          />

          <ArrowBetween className="-my-4 self-center" />

          <ReceiveCard
            topText={<>{T("YouGet")}</>}
            bottomText={
              <>
                1 {offer.marketplace.token_name} = ${formatNum(pointPrice, 8)}
              </>
            }
            value={String(receivePointAmount)}
            tokenName={offerPointInfo?.symbol || ""}
          />

          {isFilled || isSettled || isCanceled ? (
            <>
              <button className="mt-4 flex h-8 w-full cursor-not-allowed items-center justify-center rounded bg-[#D1D4DC] text-xs leading-[18px] text-bg-black">
                {isFilled && T("OfferBePurchased")}
                {isSettled && T("TradingEnded")}
                {isCanceled && T("OfferClosed")}
              </button>
            </>
          ) : (
            <div className="relative mt-4">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[10px] leading-[16px] text-red">
                {errorText}
              </div>
              <WithWalletConnectBtn onClick={handleConfirmTakerOrder}>
                <button
                  disabled={isTaking || !+receivePointAmount || !!errorText}
                  className={cn(
                    "mt-1 flex h-8 w-full items-center justify-center rounded bg-main text-xs leading-[18px] hover:bg-main-hover disabled:cursor-not-allowed disabled:bg-main-inactive",
                    isTaking ? "dot-loading" : "",
                  )}
                >
                  {T("ConfirmOrder")}
                </button>
              </WithWalletConnectBtn>
            </div>
          )}
        </div>

        {/* right card */}
        <DetailCard offer={offer} />
      </div>

      <OfferTabs offer={offer} />
    </>
  );
}
