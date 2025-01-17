import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useTranslations } from "next-intl";

export type ITradeType = "All" | "Sales" | "Listings";
const TradeTypes: ITradeType[] = ["All", "Sales", "Listings"];

export function TradeTypeSelect({
  type,
  handleTypeChange,
}: {
  type: ITradeType;
  handleTypeChange: (_t: ITradeType) => void;
}) {
  const tt = useTranslations("tb-MarketTrades");
  const [popOpen, setPopOpen] = useState(false);

  function handleClickOpt(t: ITradeType) {
    handleTypeChange(t);
    setPopOpen(false);
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer items-center justify-end space-x-1 rounded-full py-[5px] outline-none">
          <div className="text-xs leading-5 text-gray">{tt("" + type)}</div>
          <Image
            data-open={popOpen}
            src="/icons/arrow-down-gray.svg"
            width={16}
            height={16}
            alt="arrow"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex w-20 flex-col items-stretch border border-border-black bg-bg-black p-1"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
      >
        {TradeTypes.map((t) => (
          <div
            key={t}
            data-checked={type === t}
            className="flex cursor-pointer items-center rounded px-3 py-2 data-[checked=true]:bg-bg-black"
            onClick={() => handleClickOpt(t)}
          >
            <div
              data-checked={type === t}
              className="ml-[5px] text-xs leading-[18px] data-[checked=true]:text-txt-white data-[checked=false]:text-gray"
            >
              {tt("" + t)}
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
