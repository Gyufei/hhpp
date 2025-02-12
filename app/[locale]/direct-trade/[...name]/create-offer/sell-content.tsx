import Image from "next/image";
import { useEffect, useState } from "react";

import { InputPanel } from "./input-panel";
import { StableTokenSelectDisplay } from "./stable-token-display";
import NP from "number-precision";

import ArrowBetween from "./arrow-between";
import { WithTip } from "../../../../../components/share/with-tip";
import OrderNoteAndFee from "./order-note-and-fee";
import { IMarketplace } from "@/lib/types/marketplace";
import { useTranslations } from "next-intl";
import { formatNum } from "@/lib/utils/number";
import { useCreateAction } from "./use-create-action";
import { useOptionOfCreate } from "./use-option-of-create";
import { PointTokenDisplay } from "./point-token-display";
import { cn } from "@/lib/utils/common";
import { reportEvent } from "@/lib/utils/analytics";
import { useCheckBalance } from "@/lib/hooks/api/use-check-balance";
import { useCreateOfferMinPrice } from "@/lib/hooks/offer/use-create-offer-min-price";

export function SellContent({
  marketplace,
  onSuccess,
  className,
}: {
  marketplace: IMarketplace;
  onSuccess: () => void;
  className?: string;
}) {
  const T = useTranslations("Offer");
  const { checkMinPrice, checkMaxPrice } = useCreateOfferMinPrice();
  const [hasAutoCalc, setHasAutoCalc] = useState<
    "sell" | "receive" | null | false
  >(null);

  const {
    token: receiveToken,
    point: sellPoint,
    tokenAmount: receiveTokenAmount,
    setTokenAmount: setReceiveAmount,
    pointAmount: sellPointAmount,
    setPointAmount: setSellPointAmount,
    currentMarket,
    pointPrice,

    isCreating,
    handleCreate,
    isCreateSuccess,
    pointDecimalNum,
  } = useCreateAction(marketplace);

  useEffect(() => {
    if (isCreateSuccess) {
      onSuccess();
    }
  }, [isCreateSuccess, onSuccess]);

  const { note, setNote } = useOptionOfCreate();

  const { checkPointInsufficient } = useCheckBalance(marketplace);

  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    let curErrorText = "";
    curErrorText = checkPointInsufficient(sellPointAmount);
    const marketPointPrice = NP.times(
      currentMarket.last_price,
      pointDecimalNum,
    );
    if (!curErrorText && +pointPrice) {
      curErrorText = checkMinPrice(pointPrice, marketPointPrice);

      curErrorText = checkMaxPrice(pointPrice, marketPointPrice);
    }

    setErrorText(curErrorText);
  }, [
    sellPointAmount,
    pointPrice,
    currentMarket.item_name,
    currentMarket.last_price,
    pointDecimalNum,
    checkMinPrice,
    checkMaxPrice,
    checkPointInsufficient,
  ]);

  async function handleConfirmBtnClick() {
    handleCreate();
    reportEvent("click", { value: "confirmOffer-sell" });
  }

  const sellPointAmountChange = (v: string) => {
    setSellPointAmount(v);

    if (hasAutoCalc === "receive" || hasAutoCalc === false) {
      setHasAutoCalc(false);
      return;
    }

    const marketPointPrice = NP.times(
      currentMarket.last_price,
      pointDecimalNum,
    );

    setHasAutoCalc("sell");
    if (v === "") {
      setReceiveAmount("");
      return;
    }

    setReceiveAmount(
      NP.round(
        NP.times(v, marketPointPrice * 1.02),
        receiveToken.decimals || 6,
      ).toString(),
    );
  };

  const receiveTokenAmountChange = (v: string) => {
    setReceiveAmount(v);

    if (hasAutoCalc === "sell" || hasAutoCalc === false) {
      setHasAutoCalc(false);
      return;
    }

    const marketPointPrice = NP.times(
      currentMarket.last_price,
      pointDecimalNum,
    );

    setHasAutoCalc("receive");
    if (v === "") {
      setSellPointAmount("");
      return;
    }

    setSellPointAmount(
      NP.round(
        NP.divide(v, marketPointPrice * 1.02),
        pointDecimalNum || 6,
      ).toString(),
    );
  };

  return (
    <div
      className={cn("flex w-full flex-1 flex-col justify-between", className)}
    >
      <div className="flex flex-1 flex-col p-5">
        <InputPanel
          value={sellPointAmount}
          onValueChange={sellPointAmountChange}
          hasError={!!errorText}
          topText={<>{T("YouWillSell")}</>}
          bottomText={
            <>
              1 {currentMarket.item_name} = ${formatNum(pointPrice, 8)}
            </>
          }
          tokenSelect={<PointTokenDisplay point={sellPoint} />}
        />

        <ArrowBetween className="-my-4 self-center" />

        <InputPanel
          className="pb-4"
          value={receiveTokenAmount}
          onValueChange={receiveTokenAmountChange}
          topText={
            <div className="flex items-center">
              {T("YouDLikeToReceive")}
              <WithTip
                content={
                  <>
                    {T("YouDLikeToReceiveTip", {
                      pointName: currentMarket.item_name,
                    })}
                  </>
                }
              >
                <Image
                  src="/icons/info-tip.svg"
                  height={16}
                  width={16}
                  alt="info"
                  className="ml-2"
                />
              </WithTip>
            </div>
          }
          bottomText={<></>}
          tokenSelect={<StableTokenSelectDisplay token={receiveToken} />}
        />

        <div className="my-5  h-[1px] bg-border-black"></div>

        <OrderNoteAndFee value={note} onValueChange={setNote} />
      </div>

      <div className="relative px-5 py-4">
        <div className="absolute left-1/2 top-1 -translate-x-1/2 text-center text-[10px] leading-[16px] text-red">
          {errorText}
        </div>
        <button
          onClick={handleConfirmBtnClick}
          disabled={isCreating || !!errorText || !receiveTokenAmount}
          data-isCreating={isCreating}
          className={cn(
            "mt-2 flex h-8 w-full items-center justify-center rounded bg-main text-xs leading-[18px] text-bg-black hover:bg-main-hover disabled:cursor-not-allowed disabled:bg-main-inactive",
            isCreating ? "dot-loading" : "",
          )}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
