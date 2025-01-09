import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import AssetTable from "./asset-table";

export default function AssetSelect() {
  const [popOpen, setPopOpen] = useState(false);

  const tokenInfo = {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 0,
    address: "0x2222222222222222222222222222222222222222",
    logoURI:
      "https://preview-hypes-cdn.aggregation.top/images/token/0x2222222222222222222222222222222222222222.png",
  };

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger className="flex items-center">
        <Image
          src={tokenInfo.logoURI}
          width={20}
          height={20}
          alt={tokenInfo.symbol}
        />
        <div className="mx-[10px] flex items-center text-[20px] leading-[30px] text-title-white">
          <span>{tokenInfo.symbol}</span>/<span>{tokenInfo.symbol}</span>
        </div>
        <Image src={"/icons/fold-gray.svg"} width={20} height={20} alt="fold" />
      </PopoverTrigger>
      <PopoverContent className="ml-2 mt-4 flex w-[956px] border border-border-black bg-bg-black p-6">
        <AssetTable />
      </PopoverContent>
    </Popover>
  );
}
