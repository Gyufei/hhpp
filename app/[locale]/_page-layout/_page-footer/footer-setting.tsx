import Image from "next/image";
import { useState } from "react";
import HoverIcon from "@/components/share/hover-icon";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslations } from "next-intl";
import RpcManage from "./rpc-manage";

export default function FooterSetting() {
  const ct = useTranslations("pop-Setting");

  const [popOpen, setPopOpen] = useState(false);

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger>
        <HoverIcon
          src="/icons/setting-gray.svg"
          hoverSrc="/icons/setting.svg"
          width={24}
          height={24}
          active={popOpen}
          alt="setting"
        />
      </PopoverTrigger>
      <PopoverContent
        className="flex w-[348px] flex-col items-stretch space-y-2 border-none bg-white p-6 text-[12px] text-[#2D2E33]"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
      >
        <div className="ml-30 flex items-center">
          <div className="flex flex-1 justify-center text-xl leading-[30px]">
            {ct("cap-NetworkSetting")}
          </div>
          <Image
            onClick={() => setPopOpen(false)}
            src="/icons/close.svg"
            width={24}
            height={24}
            alt="close"
            className="cursor-pointer"
          />
        </div>

        <RpcManage />
      </PopoverContent>
    </Popover>
  );
}
