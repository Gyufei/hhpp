import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { ReactElement, useMemo } from "react";
import { NumericalInput } from "@/components/share/numerical-input";
import { formatNum } from "@/lib/utils/number";

export default function SliderCard({
  topText,
  value,
  onUserInput,
  sliderValue,
  sliderMax,
  canGoMax,
  tokenLogo,
  bottomText,
  setSliderValue,
  hasError = false,
  canInput = true,
}: {
  topText: ReactElement;
  value: string;
  onUserInput: (_v: string) => void;
  sliderValue: number;
  canGoMax: number;
  sliderMax: number;
  tokenLogo: string;
  bottomText: ReactElement;
  setSliderValue: (_v: number) => void;
  hasError?: boolean;
  canInput?: boolean;
}) {
  function handleSlider(val: number) {
    if (val > canGoMax) {
      setSliderValue(canGoMax);
      return;
    }

    setSliderValue(val);
  }

  const progress = useMemo(() => {
    if (!sliderMax) return 0;
    return ((sliderValue / sliderMax) * 100).toFixed();
  }, [sliderValue, sliderMax]);

  return (
    <div
      data-error={hasError}
      className={`mt-5 rounded border border-transparent bg-[#222428] p-[10px] focus-within:border-txt-white ${
        hasError ? "error-blink" : ""
      }`}
    >
      <div className="flex items-center justify-between text-xs leading-[18px] text-gray">
        {topText}
      </div>
      <div className="mt-2 flex items-center justify-between">
        {canInput ? (
          <NumericalInput
            className="mr-1 mt-2 h-9 max-w-[240px] text-left text-2xl leading-9 text-title-white placeholder:text-gray sm:max-w-full"
            placeholder="Enter Amount"
            value={value}
            onUserInput={(v) => onUserInput(v)}
          />
        ) : (
          <div className="h-[36px] text-2xl leading-[36px] text-title-white">
            {formatNum(Number(value), 6)}
          </div>
        )}
        <Image
          src={tokenLogo}
          width={24}
          height={24}
          alt="stable token"
          className="rounded-full"
        />
      </div>
      <div className="mt-3 flex">
        <Slider
          value={[sliderValue]}
          onValueChange={(val) => handleSlider(val[0])}
          max={sliderMax}
          step={1}
        />
        <div className="ml-4 mr-3 flex h-5 items-center rounded-full border border-border-black px-[10px] text-[10px] leading-4 text-title-white">
          {Number(progress) > 100 ? ">100" : progress}%
        </div>
        <div
          onClick={() => setSliderValue(canGoMax)}
          className="flex h-5 cursor-pointer items-center rounded-full border border-main px-[10px] text-[10px] leading-4 text-main hover:border-main-hover hover:text-main-hover"
        >
          Max
        </div>
      </div>
      <div className="mt-[10px] text-xs leading-[18px] text-gray">
        {bottomText}
      </div>
    </div>
  );
}
