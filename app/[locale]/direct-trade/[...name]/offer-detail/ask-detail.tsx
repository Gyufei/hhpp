import NP from "number-precision";
import {
  formatNum,
  toNonExponential,
  bigIntOrNpMinus,
} from "@/lib/utils/number";
import OfferInfo from "./offer-info";
import { useCallback, useEffect, useMemo, useState } from "react";
import SliderCard from "./slider-card";
import ReceiveCard from "./receive-card";
import DetailCard from "./detail-card";
import OfferTabs from "./offer-tabs";
import { useCreateTakerOrder } from "@/lib/hooks/contract/use-create-taker-order";
import { IOffer } from "@/lib/types/offer";
import { useOfferFormat } from "@/lib/hooks/offer/use-offer-format";
import { useGlobalConfig } from "@/lib/hooks/use-global-config";
import WithWalletConnectBtn from "@/components/share/with-wallet-connect-btn";
import { useTranslations } from "next-intl";
import { reportEvent } from "@/lib/utils/analytics";
import { useCheckBalance } from "@/lib/hooks/api/use-check-balance";
import ArrowBetween from "../create-offer/arrow-between";
import { StableBalance } from "@/components/share/stable-balance";

export default function AskDetail({
  offer,
  onSuccess,
}: {
  offer: IOffer;
  onSuccess: (_o: Record<string, any>) => void;
}) {
  const T = useTranslations("drawer-OfferDetail");

  const { platformFee } = useGlobalConfig();

  const { checkUSDCInsufficient } = useCheckBalance(offer.marketplace);

  const {
    tokenPrice,
    progress,
    offerLogo,
    forValue,
    forLogo,
    pointPerPrice,
    isFilled,
    offerTokenInfo,
    pointDecimalNum,
  } = useOfferFormat({
    offer,
  });

  const tradeFee = useMemo(() => {
    return NP.divide(offer?.trade_tax_pct || 0, 10000);
  }, [offer]);

  const {
    data: txHash,
    isLoading: isDepositLoading,
    isSuccess,
    write: writeAction,
  } = useCreateTakerOrder();

  const [payTokenAmount, setPayTokenAmount] = useState(0);
  const [receivePointAmount, setReceivePointAmount] = useState(0);

  const [errorText, setErrorText] = useState("");

  const sliderCanMax = useMemo(() => {
    return +bigIntOrNpMinus(offer.item_amount, offer.taken_item_amount);
  }, [offer]);

  const calcPayAmountByReceive = useCallback(
    (receiveNum: number) => {
      if (!receiveNum) return 0;

      const pay = NP.times(NP.divide(receiveNum, offer.item_amount), forValue);
      const payWithFee = NP.times(pay, 1 + platformFee + tradeFee);
      return payWithFee;
    },

    [forValue, offer.item_amount, tradeFee, platformFee],
  );

  const calcReceiveByPayAmount = useCallback(
    (payAmountNum: number) => {
      if (!payAmountNum) return "0";

      const wantPay = Number(payAmountNum);
      const realPay = NP.divide(wantPay, 1 + platformFee + tradeFee);
      const payPercent = NP.divide(realPay, forValue);
      const receive = NP.times(payPercent, offer.item_amount);
      return receive;
    },
    [forValue, offer.item_amount, tradeFee, platformFee],
  );

  const payTokenTotalPrice = useMemo(() => {
    if (!payTokenAmount) return "0";
    return NP.times(payTokenAmount || 0, tokenPrice);
  }, [payTokenAmount, tokenPrice]);

  useEffect(() => {
    let errorText = "";
    errorText = checkUSDCInsufficient(payTokenAmount);

    if (!errorText && receivePointAmount > sliderCanMax) {
      errorText = `Insufficient ${offer.marketplace.item_name} to Buy`;
    }

    setErrorText(errorText);
  }, [
    payTokenAmount,
    receivePointAmount,
    sliderCanMax,
    checkUSDCInsufficient,
    offer.marketplace.item_name,
  ]);

  function handleSliderChange(v: number) {
    setReceivePointAmount(v);

    const pay = calcPayAmountByReceive(v);
    setPayTokenAmount(Number(pay));
  }

  function handleInputPayTokenAmount(v: string) {
    setPayTokenAmount(Number(v));
    const receive = calcReceiveByPayAmount(Number(v));
    setReceivePointAmount(Number(receive));
  }

  async function handleConfirmTakerOrder() {
    if (isDepositLoading || !receivePointAmount) return;

    reportEvent("click", { value: "confirmOffer-ask" });
    await writeAction({
      offerId: offer.offer_id,
      itemAmount: toNonExponential(receivePointAmount),
    });
  }

  useEffect(() => {
    if (isSuccess) {
      onSuccess({
        no: "",
        pay: payTokenAmount,
        tx: txHash,
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
            name={offer.marketplace.market_name}
            no={String(offer.entry.id)}
            progress={progress}
          />

          <SliderCard
            topText={
              <>
                {T("txt-YouPay")}
                <StableBalance className="mb-0" />
              </>
            }
            bottomText={<>~${formatNum(payTokenTotalPrice)} </>}
            tokenLogo={forLogo}
            value={String(payTokenAmount)}
            onUserInput={handleInputPayTokenAmount}
            canGoMax={sliderCanMax}
            canInput={!isFilled}
            sliderMax={sliderCanMax}
            sliderValue={receivePointAmount}
            setSliderValue={handleSliderChange}
            hasError={!!errorText}
          />

          <ArrowBetween className="-my-4 self-center" />

          <ReceiveCard
            topText={<>{T("txt-YouGet")}</>}
            bottomText={
              <>
                1 {offer.marketplace.item_name} = ${formatNum(pointPerPrice)}
              </>
            }
            value={String(NP.divide(receivePointAmount, pointDecimalNum))}
            tokenLogo={offerLogo}
          />

          {isFilled ? (
            <>
              <button className="mt-4 flex h-8 w-full items-center justify-center rounded bg-[#D1D4DC] text-xs leading-[18px] text-bg-black">
                {T("btn-Offer100%Filled")}
              </button>
            </>
          ) : (
            <div className="relative mt-4">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[10px] leading-[16px] text-red">
                {errorText}
              </div>
              <WithWalletConnectBtn
                chain={offer.marketplace.chain}
                onClick={handleConfirmTakerOrder}
              >
                <button
                  disabled={
                    isDepositLoading || !receivePointAmount || !!errorText
                  }
                  className="mt-1 flex h-8 w-full items-center justify-center rounded bg-main text-xs leading-[18px] hover:bg-main-hover disabled:cursor-not-allowed disabled:bg-main-inactive"
                >
                  {T("btn-ConfirmOrder")}
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
