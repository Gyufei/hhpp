"use client";

import Image from "next/image";
import { useDeviceSize } from "@/lib/hooks/common/use-device-size";
export default function TradeMore() {
  const { isMobileSize } = useDeviceSize();
  return (
    <div
      className="flex h-[240px] lg:h-[916px] items-center justify-center bg-[#E6FCF9]"
      style={{
        backgroundImage: "url('/img/home/trade-bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center space-y-2 text-[30px] lg:text-[70px] ">
        <div className="flex items-center justify-center space-x-6">
          <span className="font-sf font-light text-bg-black opacity-70">
            Opt for
          </span>
          <div className="flex rounded-full bg-[#7AD5C9] px-4 lg:px-8 py-0 lg:py-2">
            <span className="font-sf font-light text-white text-[24px] lg:text-[30px]">
              Option
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <span className="font-sf font-light text-bg-black opacity-70">
            Hype up with
          </span>
          <Image
            src="/icons/hype-trade.svg"
            width={isMobileSize ? 122 : 252}
            height={isMobileSize ? 30 : 62}
            alt="liquidity"
            className="translate-y-[8px]"
          />
        </div>
      </div>
    </div>
  );
}
