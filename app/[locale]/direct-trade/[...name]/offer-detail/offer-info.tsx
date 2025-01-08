import NP from "number-precision";
import { CircleProgress } from "@/components/share/circle-progress";
import { TokenPairImg } from "@/components/share/token-pair-img";
import { formatNum } from "@/lib/utils/number";

export default function OfferInfo({
  img1,
  img2,
  name,
  no,
  progress,
}: {
  img1: string;
  img2: string;
  name: string;
  no: string;
  progress: number;
}) {
  return (
    <div className="flex items-center justify-between">
      {/* avatar and name number */}
      <div className="flex items-center">
        <div className="flex items-center space-x-4">
          <TokenPairImg
            src1={img1}
            src2={img2}
            width1={60}
            height1={60}
            width2={11}
            height2={9}
          />

          <div>
            <div className="mb-[2px] text-2xl leading-9 text-txt-white">{name}</div>
            <div className="w-fit rounded bg-bg-black px-[5px] py-[2px] text-[10px] leading-4 text-gray">
              #{no}
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <CircleProgress
          className="scale-[1.4285]"
          percentage={progress * 100}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm leading-[20px] text-txt-white">
          {formatNum(NP.times(progress, 100))}%
        </div>
      </div>
    </div>
  );
}
