import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { kebabCase } from "lodash";

export type ILeaderType = "Maker Orders" | "Maker Bonus" | "Trading Vol.";
const TradeTypes: ILeaderType[] = [
  "Maker Orders",
  "Trading Vol.",
  "Maker Bonus",
];

export function LeaderTypeSelect({
  type,
  handleTypeChange,
}: {
  type: ILeaderType;
  handleTypeChange: (_t: ILeaderType) => void;
}) {
  const mt = useTranslations("tb-Leaderboard");
  const [popOpen, setPopOpen] = useState(false);

  function handleClickOpt(t: ILeaderType) {
    handleTypeChange(t);
    setPopOpen(false);
  }

  function getI18nText(t: ILeaderType) {
    return "sl-" + t.replace(" ", "").replace(".", "");
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer items-center justify-end space-x-1 rounded-full py-[5px] outline-none">
          <div className="text-xs leading-5 text-gray">
            <OptionIcon type={type} active={false} />
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
        className="flex w-[158px] flex-col items-stretch border border-border-black bg-bg-black p-1"
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
            <OptionIcon type={t} active={type === t} />
            <div
              data-checked={type === t}
              className="ml-[5px] text-xs leading-[18px] data-[checked=false]:text-gray data-[checked=true]:text-txt-white"
            >
              {mt(getI18nText(t))}
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}

function OptionIcon({ type, active }: { type: ILeaderType; active: boolean }) {
  const imageName = useMemo(() => {
    let imageName = kebabCase(type);
    if (imageName === "maker-bonus") {
      imageName = "bonus";
    }
    if (!active) {
      return imageName + "-gray";
    }
    return imageName;
  }, [type, active]);

  return (
    <Image src={`/icons/${imageName}.svg`} width={16} height={16} alt="maker" />
  );
}
