import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export type IRangeType = "hour" | "day" | "month";
const TradeTypes: Array<{
  label: string;
  value: IRangeType;
}> = [
  {
    label: "1h",
    value: "hour",
  },
  {
    label: "1d",
    value: "day",
  },
  {
    label: "30d",
    value: "month",
  },
];

export function LeaderRangeSelect({
  type,
  handleTypeChange,
}: {
  type: IRangeType;
  handleTypeChange: (_t: IRangeType) => void;
}) {
  const [popOpen, setPopOpen] = useState(false);

  function handleClickOpt(t: IRangeType) {
    handleTypeChange(t);
    setPopOpen(false);
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer items-center justify-end space-x-1 rounded-full py-[5px] outline-none">
          <div className="text-xs leading-5 text-gray">
            {TradeTypes.find((t) => t.value === type)?.label}
          </div>
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
        className="flex w-20 flex-col items-stretch border-0 bg-white p-1"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
      >
        {TradeTypes.map((t) => (
          <div
            key={t.value}
            data-checked={type === t.value}
            className="flex cursor-pointer items-center rounded-xl px-3 py-2 data-[checked=true]:bg-[#FAFAFA]"
            onClick={() => handleClickOpt(t.value)}
          >
            <div
              data-checked={type === t.value}
              className="ml-[5px] text-xs leading-[18px] data-[checked=true]:text-black data-[checked=false]:text-gray"
            >
              {t.label}
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
