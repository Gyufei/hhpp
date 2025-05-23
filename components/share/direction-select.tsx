import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useTranslations } from "next-intl";

export type IDirection = "CALL" | "PUT";

export function DirectionSelect({
  direction,
  handleDirectionChange,
}: {
  direction: IDirection;
  handleDirectionChange: (_d: IDirection) => void;
}) {
  const T = useTranslations("MyOrders");
  const [popOpen, setPopOpen] = useState(false);

  function handleDirectionClick(dir: IDirection) {
    handleDirectionChange(dir);
    setPopOpen(false);
  }

  return (
    <DropdownMenu open={popOpen} onOpenChange={setPopOpen}>
      <DropdownMenuTrigger asChild>
        <div
          data-open={popOpen}
          className="flex cursor-pointer items-center space-x-1 rounded bg-[#222428] px-[10px] py-[5px] outline-none"
        >
          <Image src="/icons/filter.svg" width={20} height={20} alt="direction icon" />
          <div className="overflow-hidden text-clip whitespace-nowrap text-xs leading-[18px] text-title-white">
            {`${T("Direction")}: ${T(direction)}`}
          </div>
          <Image
            data-open={popOpen}
            src="/icons/arrow-down.svg"
            width={20}
            height={20}
            alt="arrow"
            className="data-[open=true]:rotate-180"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[158px] border border-border-black bg-bg-black p-1"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
      >
        <DropdownMenuItem
          data-active={direction === "CALL"}
          className="h-9 cursor-pointer py-[3px] text-txt-white hover:text-main data-[active=true]:text-main"
          onClick={() => handleDirectionClick("CALL")}
        >
          <div className="flex items-center space-x-1">
            <span className="text-xs leading-[18px]">{T("CALL")}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          data-active={direction === "PUT"}
          className="h-9 cursor-pointer py-[3px] text-txt-white hover:text-main data-[active=true]:text-main"
          onClick={() => handleDirectionClick("PUT")}
        >
          <div className="flex items-center space-x-1">
            <span className="text-xs leading-[18px]">{T("PUT")}</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}