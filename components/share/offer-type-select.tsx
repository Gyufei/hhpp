import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslations } from "next-intl";

export type IOfferType = "sell" | "buy";

export const OfferTypes: { label: string; value: IOfferType }[] = [
  {
    label: "Sells / Asks",
    value: "sell",
  },
  {
    label: "Buys / Bids",
    value: "buy",
  },
];

export function OfferTypeSelect({
  types,
  handleTypeChange,
}: {
  types: Array<IOfferType>;
  handleTypeChange: (_ts: Array<IOfferType>) => void;
}) {
  const t = useTranslations("sl-OfferType");
  const [popOpen, setPopOpen] = useState(false);

  const currentTypeObj = useMemo(() => {
    if (types.length === 1) {
      const t = OfferTypes.find((t) => t.value === types[0]);
      return {
        label: getI18nLabel(t?.label || ""),
      };
    } else {
      return {
        label: `${t("sl-Sells")} / ${t("sl-Buys")}`,
      };
    }
  }, [types]);

  function handleClickOpt(t: IOfferType) {
    if (types.includes(t)) {
      if (types.includes(t) && types.length === 2) {
        handleTypeChange(types.filter((_t) => _t !== t));
        setPopOpen(false);
      }
    } else {
      handleTypeChange([...types, t]);
      setPopOpen(false);
    }
  }

  function getI18nLabel(label: string) {
    if (label === "Sells / Asks") {
      return `${t("sl-Sells")} / ${t("sl-Asks")}`;
    }

    if (label === "Buys / Bids") {
      return `${t("sl-Buys")} / ${t("sl-Bids")}`;
    }
  }

  return (
    <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
      <PopoverTrigger asChild>
        <div
          data-open={popOpen}
          className="flex cursor-pointer items-center space-x-1 rounded-full border border-[#D3D4D6] px-[16px] py-[5px] outline-none data-[open=true]:border-yellow data-[open=true]:bg-yellow"
        >
          <Image
            src={types[0] === "sell" ? "/icons/buys.svg" : "/icons/sells.svg"}
            width={20}
            height={20}
            alt="type icon"
          />
          <div className="overflow-hidden text-clip whitespace-nowrap text-sm leading-5 text-black">
            {currentTypeObj?.label}
          </div>
          <Image
            data-open={popOpen}
            src="/icons/arrow-down.svg"
            width={16}
            height={16}
            alt="arrow"
            className="data-[open=true]:rotate-180"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-[160px] flex-col items-stretch border-0 bg-white p-1"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(45, 46, 51, 0.1)",
        }}
      >
        {OfferTypes.map((t) => (
          <div
            key={t.value}
            data-checked={types.includes(t.value)}
            className="flex cursor-pointer items-center rounded-xl px-3 py-2 data-[checked=true]:bg-[#FAFAFA]"
            onClick={() => handleClickOpt(t.value)}
          >
            {t.value === "buy" ? (
              <Image
                src={
                  types[0] === "sell"
                    ? "/icons/sells.svg"
                    : "/icons/sells-gray.svg"
                }
                width={20}
                height={20}
                alt="type icon"
              />
            ) : (
              <Image
                src={
                  types[0] === "buy"
                    ? "/icons/buys.svg"
                    : "/icons/buys-gray.svg"
                }
                width={20}
                height={20}
                alt="type icon"
              />
            )}
            <div className="flex flex-1 items-center justify-between">
              <div
                data-checked={types.includes(t.value)}
                className="ml-[5px] text-xs leading-[18px] data-[checked=false]:text-gray data-[checked=true]:text-black"
              >
                {getI18nLabel(t.label)}
              </div>
              <Checkbox
                checked={types.includes(t.value)}
                onCheckedChange={() => handleClickOpt(t.value)}
                className="rounded-full"
              />
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
