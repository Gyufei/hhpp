import { useState } from "react";
import SwitchTab from "./switch-tab";
import { NumericalInput } from "@/components/share/numerical-input";
import Image from "next/image";

const btnClx =
  "flex items-center justify-center h-6 rounded bg-[#222428] text-gray px-2 cursor-pointer text-xs leading-[18px]";

const tokenSymbol = "PBC";
const stableToken = "SOL";

export default function SellBuy() {
  const [activeTab, setActiveTab] = useState("Buy");
  const [amount, setAmount] = useState("");

  return (
    <div className="mt-[2px] flex-1 bg-bg-black p-[10px]">
      <SwitchTab
        tabs={["Buy", "Sell"]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="mt-[10px] flex justify-between">
        <div className={btnClx}>Switch to {tokenSymbol}</div>
        <div className={btnClx}>Set max slippage</div>
      </div>
      <div className="mt-5 text-xs leading-[18px] text-title-white">
        Amount ({stableToken})
      </div>
      <div className="relative mt-5 w-full">
        <NumericalInput
          data-error={false}
          value={amount}
          onUserInput={(value) => setAmount(value)}
          placeholder="0.00"
          className="h-8 w-full rounded border border-[#474747] py-[7px] pl-[10px] pr-[100px] text-xs leading-[18px] focus:border-text-white disabled:cursor-not-allowed data-[error=true]:!border-red"
        />
        <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1 text-xs leading-[18px] text-title-white">
          <div>{stableToken}</div>
          <Image
            src="/icons/eth.svg"
            alt="stable"
            width={20}
            height={20}
            className="rounded-full border border-border-black"
          />
        </div>
      </div>
      <div className="mt-[10px] flex items-center space-x-[5px]">
        <div className={btnClx}>Reset</div>
        <div className={btnClx}>0.1 {stableToken}</div>
        <div className={btnClx}>0.5 {stableToken}</div>
        <div className={btnClx}>1 {stableToken}</div>
      </div>

      <div className="mt-5 flex h-8 cursor-pointer items-center justify-center rounded bg-main hover:bg-main-hover text-xs leading-[18px] text-bg-black hover:brightness-90">
        Place trade
      </div>
    </div>
  );
}
