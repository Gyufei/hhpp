import { formatNum } from "@/lib/utils/number";
import { ReactElement } from "react";
import { cn } from "@/lib/utils/common";

export default function ReceiveCard({
  topText,
  bottomText,
  value,
  tokenName,
}: {
  topText: ReactElement;
  bottomText: ReactElement;
  value: string;
  tokenName: string;
}) {
  return (
    <div className="rounded bg-[#222428] p-[10px] focus-within:border-txt-white">
      <div className="text-xs leading-[18px] text-gray">{topText}</div>
      <div className="mt-2 flex justify-between">
        <div
          className={cn(
            "h-[36px] text-2xl leading-[36px] text-title-white",
            value.length > 18
              ? "text-lg"
              : value.length > 24
              ? "text-base"
              : "text-2xl",
          )}
        >
          {formatNum(value, 4)}
        </div>
        <div className="text-sm leading-[36px] text-title-white">
          {tokenName}
        </div>
      </div>
      <div className="mt-[2px] text-xs leading-[18px] text-gray">
        {bottomText}
      </div>
    </div>
  );
}
