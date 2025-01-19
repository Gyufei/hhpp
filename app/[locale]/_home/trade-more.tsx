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
      <div className="flex flex-col items-start space-y-2">
        <div className="flex items-center space-x-6">
          <span className="text-[70px] font-thin text-[#072722]">
            Get in Early
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <span className="text-[70px] font-thin text-[#072722]">
            Succeed with
          </span>
          <Image
            src="/icons/liquid.svg"
            width={318}
            height={64}
            alt="liquidity"
            className="translate-y-[8px]"
          />
        </div>
      </div>
    </div>
  );
}
