import Image from "next/image";
import StartTradingButton from "./start-trading-button";

export default function HomeBanner() {
  return (
    <div
      className="mt-14 flex flex-col items-center pb-[118px] pt-[132px]"
      style={{
        backgroundImage: "url('/img/home/banner-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Image src="/icons/simple-logo.svg" width={120} height={90} alt="logo" />
      <div className="mt-5 text-center font-sf text-[80px] font-light leading-[120px] text-title-white">
        Seed market for premium <br /> Hyperliquid assets.
      </div>
      <div className="mt-8 w-[700px] text-center text-[18px] font-light text-title-white">
        Where traders turn their dreams into reality, providing the tools,
        speed, and opportunities to thrive in the world of high-performance
        asset generating and trading. Ample liquidity, lighting-fast trades,
        token deployment success.
      </div>
      <div className="mt-10 flex items-center justify-between space-x-[30px]">
        <StartTradingButton />
        {/* <div className="flex h-10 cursor-pointer items-center rounded-3xl border border-main px-6 text-base font-light text-main">
          Start Building
        </div> */}
      </div>
    </div>
  );
}
