import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { formatNum } from "@/lib/utils/number";
import { truncateAddr } from "@/lib/utils/web3";

export function TradeAssetInfo() {
  return (
    <div className="flex h-[80px] items-center justify-start rounded bg-bg-black px-[10px]">
      <TradeAssetSelect />
      <AssetTag />
      <InfoOptions />
    </div>
  );
}

function TradeAssetSelect() {
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
      <PopoverContent className="flex w-[956px] border border-border-black bg-bg-black p-6 text-[12px] text-txt-white"></PopoverContent>
    </Popover>
  );
}

function AssetTag() {
  return (
    <div className="ml-[10px] mr-[30px] rounded bg-[#50D2C120] px-[5px] py-[1px] text-xs text-green">
      Spot
    </div>
  );
}

function InfoOptions() {
  const info = {
    price: "3.2136",
    change: 0.00234,
    changeRate: 0.0333,
    vol: 1023131,
    cap: 2342341232131,
    contract: "0x2222222222222222222222222222222222222222",
    holders: 100,
  };

  const labelValueLayoutClx = "flex flex-col gap-y-1";
  const labelClx = "text-xs leading-[18px] text-gray underline";
  const valueClx = "text-xs leading-[18px] text-title-white";

  return (
    <div className="flex items-center gap-x-[30px]">
      <div className={labelValueLayoutClx}>
        <div className={labelClx}>Price</div>
        <div className={valueClx}>{formatNum(info.price)}</div>
      </div>

      <div className={labelValueLayoutClx}>
        <div className={labelClx}>24h Change</div>
        <div className={valueClx}>
          <GreenRedText
            value={info.change}
            display={formatNum(info.change) + "/"}
          />
          <GreenRedText
            value={info.changeRate}
            display={formatNum(info.changeRate * 100)}
          />
        </div>
      </div>

      <div className={labelValueLayoutClx}>
        <div className={labelClx}>24h Volume</div>
        <div className={valueClx}>{`$${formatNum(info.vol)}`}</div>
      </div>

      <div className={labelValueLayoutClx}>
        <div className={labelClx}>Market Cap</div>
        <div className={valueClx}>{`$${formatNum(info.cap)}`}</div>
      </div>

      <div className={labelValueLayoutClx}>
        <div className={labelClx}>Contract</div>
        <div className={valueClx}>
          {truncateAddr(info.contract, { nPrefix: 6, nSuffix: 4 })}
        </div>
      </div>

      <div className={labelValueLayoutClx}>
        <div className={labelClx}>Holders</div>
        <div className={valueClx}>{info.holders.toString()}</div>
      </div>
    </div>
  );
}

function GreenRedText({
  value,
  display,
}: {
  value: string | number;
  display?: string;
}) {
  if (Number(value) > 0) {
    return <span className="text-green">+{display || value}</span>;
  }

  return <span className="text-red">-{display || value}</span>;
}
