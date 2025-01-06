import Image from "next/image";
import { NumericalInput } from "@/components/share/numerical-input";
import { ReactElement } from "react";
import { cn } from "@/lib/utils/common";

export function SwapItemPanel({
  className,
  value,
  onValueChange,
  topText,
  bottomText,
  tokenLogo,
  isCanInput = true,
}: {
  className?: string;
  value: string;
  onValueChange: (_v: string) => void;
  topText: ReactElement;
  bottomText: ReactElement;
  tokenLogo: string;
  isCanInput?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex w-full justify-between rounded-2xl bg-bg-black p-4",
        className,
      )}
    >
      <div className="flex-1">
        <div className="text-xs leading-[18px] text-gray">{topText}</div>
        {isCanInput ? (
          <NumericalInput
            className="mr-1 mt-2 h-9 text-2xl"
            placeholder="Enter Amount"
            value={value}
            onUserInput={onValueChange}
          />
        ) : (
          <div className="mt-2 h-9 text-2xl leading-9">{value}</div>
        )}
        <div className="text-xs leading-[18px] text-gray">{bottomText}</div>
      </div>
      <div className="flex items-center">
        <Image
          src={tokenLogo}
          width={28}
          height={28}
          alt="token"
          className="rounded-full"
        />
      </div>
    </div>
  );
}
