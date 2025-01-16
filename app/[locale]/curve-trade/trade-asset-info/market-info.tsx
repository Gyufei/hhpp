import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

const tokenInfo = {
  name: "USD Coin",
  symbol: "USDC",
  decimals: 0,
  address: "0x2222222222222222222222222222222222222222",
  logoURI:
    "https://preview-hypes-cdn.aggregation.top/images/token/0x2222222222222222222222222222222222222222.png",
};

const isLoadingFlag = false;

export default function MarketInfo() {
  return (
    <>
      {isLoadingFlag ? (
        <Skeleton className="h-5 w-5 rounded-full" />
      ) : (
        <Image
          src={tokenInfo.logoURI}
          width={20}
          height={20}
          alt={tokenInfo.symbol}
        />
      )}
      {isLoadingFlag ? (
        <>
          <Skeleton className="my-[2px] h-4 w-[100px] rounded bg-bg-black" />
        </>
      ) : (
        <div className="mx-[10px] flex items-center text-[20px] leading-[30px] text-title-white">
          <span>{tokenInfo.symbol}</span>/<span>{tokenInfo.symbol}</span>
        </div>
      )}
    </>
  );
}
