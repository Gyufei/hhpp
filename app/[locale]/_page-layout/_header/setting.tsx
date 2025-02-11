import { useState } from "react";
import HoverIcon from "@/components/share/hover-icon";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Setting() {
  const [popOpen, setPopOpen] = useState(false);

  return (
    <>
      <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
        <PopoverTrigger className="hidden h-9 w-9 items-center justify-center sm:flex">
          <HoverIcon
            src="/icons/setting.svg"
            hoverSrc="/icons/setting.svg"
            width={24}
            height={24}
            active={popOpen}
            alt="setting"
          />
        </PopoverTrigger>
        <PopoverContent
          className="hidden w-[348px] flex-col items-stretch space-y-2 border border-border-black bg-bg-black p-6 text-[12px] sm:flex"
          style={{
            boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
          }}
          align="end"
        ></PopoverContent>
      </Popover>
      <div className="flex h-12 items-center px-5 text-title-white sm:hidden">
        Setting
      </div>
    </>
  );
}
