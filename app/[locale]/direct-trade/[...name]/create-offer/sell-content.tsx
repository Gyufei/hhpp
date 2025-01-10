import Image from "next/image";
import { useEffect, useState } from "react";

import { InputPanel } from "./input-panel";
import { StableTokenSelectDisplay } from "./stable-token-display";

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

export function SellContent({
  marketplace,
  onSuccess,
  className,
}: {
  marketplace: IMarketplace;
  onSuccess: () => void;
  className?: string;
}) {
  const T = useTranslations("drawer-CreateOffer");

  const {
    token: receiveToken,
    setToken: setReceiveToken,
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
    const result = checkPointInsufficient(sellPointAmount);
    setErrorText(result);
  }, [sellPointAmount]);

  async function handleConfirmBtnClick() {
    handleCreate();
    reportEvent("click", { value: "confirmOffer-sell" });
  }

  return (
    <div className={cn("flex flex-1 flex-col justify-between p-5", className)}>
      <div className="flex flex-1 flex-col">
        <InputPanel
          value={sellPointAmount}
          onValueChange={setSellPointAmount}
          hasError={!!errorText}
          topText={<>{T("txt-YouWillSell")}</>}
          bottomText={
            <>
              1 {currentMarket.item_name} = ${formatNum(pointPrice)}
            </>
          }
          tokenSelect={<PointTokenDisplay point={sellPoint} showBalance />}
        />

        <ArrowBetween className="-my-4 self-center" />

        <InputPanel
          className="pb-4"
          value={receiveTokenAmount}
          onValueChange={setReceiveAmount}
          topText={
            <div className="flex items-center">
              {T("txt-YouDLikeToReceive")}
              <WithTip align="start">
                <div className="relative">
                  {T("tip-YouDLikeToReceive", {
                    pointName: currentMarket.item_name,
                  })}
                  <Image
                    src="/icons/info-tip.svg"
                    height={30}
                    width={30}
                    alt="info"
                    className="absolute -bottom-[14px] -right-[18px] !text-main"
                  />
                </div>
              </WithTip>
            </div>
          }
          bottomText={<></>}
          tokenSelect={
            <StableTokenSelectDisplay
              chain={currentMarket.chain}
              token={receiveToken}
              setToken={setReceiveToken}
            />
          }
        />

        <div className="my-5  h-[1px] bg-border-black"></div>

        <OrderNoteAndFee value={note} onValueChange={setNote} type={"sell"} />
      </div>

      <button
        onClick={handleConfirmBtnClick}
        disabled={isCreating || !!errorText || !receiveTokenAmount}
        className="mt-2 flex h-8 w-full items-center justify-center rounded bg-main text-xs leading-[18px] text-bg-black hover:bg-main-hover disabled:cursor-not-allowed disabled:bg-main-inactive"
      >
        {T("btn-ConfirmMakerOrder")}
      </button>
    </div>
  );
}
