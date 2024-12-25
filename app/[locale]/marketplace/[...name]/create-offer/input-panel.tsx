import { NumericalInput } from "@/components/share/numerical-input";
import { useTranslations } from "next-intl";
import { ReactElement } from "react";

export function InputPanel({
  value,
  onValueChange,
  topText,
  bottomText,
  tokenSelect,
  isCanInput = true,
}: {
  value: string;
  onValueChange: (_v: string) => void;
  topText: ReactElement;
  bottomText: ReactElement;
  tokenSelect: ReactElement;
  isCanInput?: boolean;
}) {
  const cot = useTranslations("Common");

  return (
    <div className="flex w-full justify-between rounded-2xl border border-transparent bg-[#fafafa] p-4 focus-within:border focus-within:border-focus focus-within:bg-white">
      <div className="flex-1">
        <div className="text-xs leading-[18px] text-gray">{topText}</div>
        {isCanInput ? (
          <NumericalInput
            className="mr-1 mt-2 h-9 max-w-[240px] text-left text-2xl placeholder:text-lightgray sm:max-w-full"
            placeholder={cot("pl-EnterAmount")}
            value={value}
            onUserInput={onValueChange}
          />
        ) : (
          <div className="mt-2 h-9 text-2xl">{value}</div>
        )}
        <div className="text-xs leading-[18px] text-gray">{bottomText}</div>
      </div>
      <div className="flex items-end">{tokenSelect}</div>
    </div>
  );
}
