import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { ReactElement } from "react";
import { formatNum } from "@/lib/utils/number";

export default function SliderCard({
  topText,
  value,
  sliderValue,
  sliderMax,
  canGoMax,
  tokenLogo,
  bottomText,
  setSliderValue,
}: {
  topText: ReactElement;
  value: string;
  sliderValue: number;
  canGoMax: number;
  sliderMax: number;
  tokenLogo: string;
  bottomText: ReactElement;
  setSliderValue: (_v: number) => void;
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
    <div className="mt-5 rounded-2xl bg-white p-4">
      <div className="text-xs leading-[18px] text-gray">{topText}</div>
      <div className="mt-2 flex items-center justify-between">
        <div className="h-[36px] text-2xl leading-[36px]">
          {formatNum(value, 4)}
        </div>
        <Image
          src={tokenLogo}
          width={28}
          height={28}
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
        <div className="ml-4 mr-3 flex h-5 items-center rounded-full border border-[#eee] px-[10px] text-[10px] leading-4 text-black">
          {progress}%
        </div>
        <div
          onClick={() => setSliderValue(canGoMax)}
          className="flex h-5 cursor-pointer items-center rounded-full bg-yellow px-[10px] text-[10px] leading-4 text-black"
        >
          Max
        </div>
      </div>
      <div className="text-xs leading-[18px] text-gray">{bottomText}</div>
    </div>
  );
}
