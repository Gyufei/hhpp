import Image from "next/image";
import { formatNum } from "@/lib/utils/number";
import { Slider } from "@/components/ui/slider";
import { ReactElement } from "react";

export default function SliderCard({
  topText,
  value,
  sliderValue,
  sliderMax,
  canGoMax,
  tokenLogo,
  bottomText,
  setSliderValue,
  hasError = false,
}: {
  topText: ReactElement;
  value: string;
  sliderValue: number;
  canGoMax: number;
  sliderMax: number;
  tokenLogo: string;
  bottomText: ReactElement;
  setSliderValue: (_v: number) => void;
  hasError?: boolean;
}) {
  function handleSlider(val: number) {
    if (val > canGoMax) {
      setSliderValue(canGoMax);
      return;
    }

    setSliderValue(val);
  }

  const progress = ((sliderValue / sliderMax) * 100).toFixed();

  return (
    <div
      data-error={hasError}
      className={`mt-5 rounded bg-[#222428] p-[10px] focus-within:border-txt-white ${
        hasError ? "error-blink" : ""
      }`}
    >
      <div className="flex items-center justify-between text-xs leading-[18px] text-gray">
        {topText}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="h-[36px] text-2xl leading-[36px] text-txt-white">
          {formatNum(value, 6)}
        </div>
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
          {progress}%
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
