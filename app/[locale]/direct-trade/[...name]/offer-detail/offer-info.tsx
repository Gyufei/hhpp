import NP from "number-precision";
import { CircleProgress } from "@/components/share/circle-progress";
import Image from "next/image";
import { formatNum } from "@/lib/utils/number";

export default function OfferInfo({
  img1,
  name,
  no,
  progress,
}: {
  img1: string;
  name: string;
  no: string;
  progress: number;
}) {
  return (
    <div className="flex items-center justify-between ">
      {/* avatar and name number */}
      <div className="flex items-center">
        <div className="flex items-center space-x-[10px]">
          <Image
            src={img1}
            width={48}
            height={48}
            alt="symbol"
            className="rounded-full"
          />

          <div>
            <div className="mb-[2px] text-base leading-6 text-txt-white">
              {name}
            </div>
            <div className="w-fit rounded bg-border-black px-[5px] py-[2px] text-[10px] leading-4 text-gray">
              #{no}
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <CircleProgress className="scale-[1.15]" percentage={progress * 100} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm leading-[20px] text-txt-white">
          {formatNum(NP.times(progress, 100))}%
        </div>
      </div>
    </div>
  );
}
