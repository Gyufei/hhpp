import { NumericalInput } from "@/components/share/numerical-input";
import { ReactElement } from "react";
import { cn } from "@/lib/utils/common";

export function SwapItemPanel({
  className,
  value,
  onValueChange,
  topText,
  bottomText,
  tokenName,
  isCanInput = true,
}: {
  className?: string;
  value: string;
  onValueChange: (_v: string) => void;
  topText: ReactElement;
  bottomText: ReactElement;
  tokenName: string;
  isCanInput?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex w-full justify-between rounded bg-[#222428] p-[10px]",
        className,
      )}
    >
      <div className="flex-1">
        <div className="text-xs leading-[18px] text-gray">{topText}</div>
        {isCanInput ? (
          <NumericalInput
            className="mr-1 mt-2 h-9 text-2xl text-title-white placeholder:text-gray"
            placeholder="Enter Amount"
            value={value}
            onUserInput={onValueChange}
          />
        ) : (
          <div className="mt-2 h-9 text-2xl leading-9 text-title-white">
            {value}
          </div>
        )}
        <div className="text-xs leading-[18px] text-gray">{bottomText}</div>
      </div>
      <div className="flex items-center">
        <div className="text-sm leading-[36px] text-title-white">
          {tokenName}
        </div>
      </div>
    </div>
  );
}
