import HoverIcon from "@/components/share/hover-icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export function TabFilter() {
  const [popOpen, setPopOpen] = useState(false);

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer items-center gap-1">
          <div className="flex items-center px-1 text-xs leading-[18px] text-title-white">
            Filter
          </div>
          <HoverIcon
            src="/icons/arrow-down.svg"
            hoverSrc="/icons/arrow-down.svg"
            width={20}
            height={20}
            alt="arrow-down"
            className={`${popOpen ? "rotate-180" : ""}`}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-[200px] flex-col items-stretch space-y-2 border-border-black bg-bg-black p-6 text-[12px]"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
        align="end"
      ></PopoverContent>
    </Popover>
  );
}
