import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils/common";
import Image from "next/image";
import { useState } from "react";

const menuItemsClx =
  "flex h-10 items-center rounded-3xl px-[10px] cursor-pointer hover:text-main";

const urlOptions = [
  {
    title: "Testnet",
    url: "",
  },
  {
    title: "Explorer",
    url: "",
  },
  {
    title: "Sub-Accounts",
    url: "",
  },
  {
    title: "API",
    url: "",
  },
  {
    title: "Points",
    url: "",
  },
  {
    title: "Funding Comparison",
    url: "",
  },
  {
    title: "Stats",
    url: "",
  },
  {
    title: "Docs",
    url: "",
  },
];

export default function MoreMenu() {
  const [popOpen, setPopOpen] = useState(false);

  function handleClick(op: (typeof urlOptions)[number]) {
    console.log(op.url);
    if (op.url) {
      window.open(op.url, "_blank");
    }
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <div className={cn(menuItemsClx, "space-x-[10px]")}>
          <span>More</span>
          <Image
            src="/icons/arrow-down.svg"
            width={20}
            height={20}
            alt="arrow-down"
            className={cn("transition-all", popOpen ? "rotate-180" : "")}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-[138px] flex-col items-stretch space-y-2 border-border-black bg-bg-black px-[10px] py-[5px]"
        align="end"
      >
        {urlOptions.map((option) => (
          <div
            className="flex h-8 cursor-pointer items-center whitespace-nowrap break-keep text-[12px] leading-[18px] text-gray hover:text-main"
            key={option.title}
            onClick={() => handleClick(option)}
          >
            {option.title}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
