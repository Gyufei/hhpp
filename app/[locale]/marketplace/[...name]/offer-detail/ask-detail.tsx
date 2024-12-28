import NP from "number-precision";
import {
  formatNum,
  toNonExponential,
  bigIntOrNpMinus,
} from "@/lib/utils/number";
import OfferInfo from "./offer-info";
import { useEffect, useMemo, useState } from "react";
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
import { ChainConfigs } from "@/lib/const/chain-configs";
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

  const [receivePointAmount, setReceivePointAmount] = useState(0);

  const [errorText, setErrorText] = useState("");

  const sliderCanMax = useMemo(() => {
    return +bigIntOrNpMinus(offer.item_amount, offer.taken_item_amount);
  }, [offer]);

  const payTokenAmount = useMemo(() => {
    if (!receivePointAmount) return "0";
    const pay = NP.times(
      NP.divide(receivePointAmount, offer.item_amount),
      forValue,
    );
    const payWithFee = NP.times(pay, 1 + platformFee + tradeFee);
    return formatNum(payWithFee, 6);
  }, [receivePointAmount, forValue, offer.item_amount, tradeFee, platformFee]);

  const payTokenTotalPrice = useMemo(() => {
    if (!payTokenAmount) return "0";
    return NP.times(payTokenAmount || 0, tokenPrice);
  }, [payTokenAmount, tokenPrice]);

  const { checkUSDCInsufficient } = useCheckBalance(offer.marketplace);

  useEffect(() => {
    const result = checkUSDCInsufficient(payTokenAmount);
    setErrorText(result);
  }, [payTokenAmount]);

  function handleSliderChange(v: number) {
    setReceivePointAmount(v);
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

          <SliderCard
            topText={
              <>
                {T("txt-YouPay")}
                <StableBalance className="mb-0" />
              </>
            }
            bottomText={<>~${formatNum(payTokenTotalPrice)} </>}
            value={payTokenAmount}
            tokenLogo={forLogo}
            canGoMax={sliderCanMax}
            sliderMax={Number(offer.item_amount)}
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
              <button className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-[#f0f1f5] leading-6 text-black">
                {T("btn-Offer100%Filled")}
              </button>
            </>
          ) : (
            <>
              <div className="mt-3 text-center text-[12px] text-[#FF6262]">
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
                  className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-green leading-6 text-white disabled:cursor-not-allowed disabled:bg-gray"
                >
                  {T("btn-ConfirmTakerOrder")}
                </button>
              </WithWalletConnectBtn>
            </>
          )}
        </div>

        {/* right card */}
        <DetailCard offer={offer} />
      </div>

      <OfferTabs offer={offer} />
    </>
  );
}
