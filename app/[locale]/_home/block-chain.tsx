"use client"

import { getFormatUnit } from "@/lib/utils/number";
// import {useTradingData} from "@/lib/hooks/api/use-trading-data";
export default function BlockChain() {
  // const { data = {} as any, isLoading } = useTradingData();

  return (
    <div className="flex h-[916px] items-center justify-center bg-bg-black">
      <div className=" relative flex h-[748px] w-[748px] items-center justify-center rounded-full border-[2px] border-border-black">
        <div className="relative flex h-[480px] w-[480px] flex-col items-center justify-center rounded-full border-[2px] border-border-black">
          <div className="font-sf text-[120px] font-light leading-[120px] text-title-white">
            {formatValue(69000000)}
            {/* {formatValue(data?.deposit)} */}
          </div>
          <div className="text-[18px] leading-6 text-title-white">Deposit</div>
          <div className="mt-5 flex h-10 cursor-pointer items-center justify-center rounded-full bg-main px-[34px] text-bg-black hover:bg-main-hover">
            HypeTrade
          </div>
          <div className="absolute left-0 top-1/2 h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-main"></div>
        </div>

        {/* <div className="absolute left-0 top-0 flex -translate-x-1/2 flex-col items-center">
          <div className="font-sf text-[80px] font-light leading-[120px] text-title-white">
            ${formatValue(data?.trading_volume)}
          </div>
          <div className="text-[18px] leading-6 text-title-white">
            Trading Volume
          </div>
        </div>

        <div className="absolute right-0 top-[10px] flex translate-x-1/2 flex-col items-center">
          <div className="font-sf text-[80px] font-light leading-[120px] text-title-white">
            {formatValue(data?.transactions)}
          </div>
          <div className="text-[18px] leading-6 text-title-white">
            Transactions
          </div>
        </div>

        <div className="absolute bottom-0 left-0 flex -translate-x-full flex-col items-center">
          <div className="font-sf text-[80px] font-light leading-[120px] text-title-white">
            {formatValue(data?.active_users)}
          </div>
          <div className="text-[18px] leading-6 text-title-white">
            Active Users
          </div>
        </div>

        <div className="absolute -right-[110px] bottom-0 flex translate-x-full flex-col items-center">
          <div className="font-sf text-[80px] font-light leading-[120px] text-title-white">
            {formatValue(data?.tokens)}
          </div>
          <div className="text-[18px] leading-6 text-title-white">Tokens</div>
        </div> */}
      </div>
    </div>
  );
}

const formatValue = (value: number) => {
  const { number, unit } = getFormatUnit(value.toFixed(1) || 0);
  return `${number}${unit}${unit ? "+": ""}`;
};