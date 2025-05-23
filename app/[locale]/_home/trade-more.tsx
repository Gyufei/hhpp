import Image from "next/image";

export default function TradeMore() {
  return (
    <div
      className="flex h-[916px] items-center justify-center bg-[#E6FCF9]"
      style={{
        backgroundImage: "url('/img/home/trade-bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center justify-center space-x-6">
          <span className="font-sf text-[70px] font-light text-bg-black opacity-70">
            Opt for
          </span>
          <div className="rounded-full bg-[#7AD5C9] px-8 py-2">
            <span className="font-sf text-[70px] font-light text-white">
              Option
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <span className="font-sf text-[70px] font-light text-bg-black opacity-70">
            Hype up with
          </span>
          <Image
            src="/icons/hype-trade.svg"
            width={252}
            height={62}
            alt="liquidity"
            className="translate-y-[8px]"
          />
        </div>
      </div>
    </div>
  );
}
