import { cn } from "@/lib/utils/common";
import { formatNum } from "@/lib/utils/number";
import Image from "next/image";

const percent = 0.6;

export default function InfoDisplay() {
  return (
    <div className="flex flex-col rounded bg-bg-black p-[10px]">
      <div className="h-[172px] w-full rounded bg-[#222428]"></div>
      <div className="flex flex-col items-center space-y-[5px] py-4">
        <div className="text-sm leading-5 text-title-white">PepeBull(PBC)</div>
        <div className="text-center text-xs leading-[18px] text-gray">
          Meet PepeBull-your golden ticket to unstoppable crypto gains! This
          dazzling Pepe ignites epic FOMO and powers an energized
          community.Don&apos;t just watch join the ride and watch your wealth
          shine. Seize the moment and conquer tomorrow with PepeBull!
        </div>
      </div>
      <div className="rounded border border-border-black"></div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs leading-[18px] text-title-white">
          Bonding curve progress: {formatNum(percent * 100)}%
        </div>
        <Image src="/icons/info.svg" width={16} height={16} alt="info" />
      </div>
      <ArrowProgress percent={percent} />
      <div className="mt-[10px] text-xs leading-[18px] text-gray">
        Graduate this coin to raydium at $89,223 market capthere is 57.4 SOL in
        the bonding curve.
      </div>
    </div>
  );
}

function ArrowProgress({ percent }: { percent: number }) {
  return (
    <div className="relative mt-5 w-full">
      <div
        className="flex w-full items-center justify-between rounded bg-main"
        style={{
          flexBasis: `${percent * 100}%`,
        }}
      >
        <div
          className={cn("h-2 rounded-l bg-transparent")}
          style={{
            flexBasis: `${percent * 100}%`,
          }}
        ></div>
        <div className={cn("h-2 grow rounded-r bg-[#222428]")}></div>
      </div>

      <div
        className="absolute -top-[14px] flex flex-col items-center"
        style={{
          transform: "translateX(-50%)",
          left: `${percent * 100}%`,
        }}
      >
        <div className="flex h-3 w-3 items-center justify-center">
          <div className="h-0 w-0 border-x-[6px] border-t-[8px] border-[#d1d4dc] border-x-transparent"></div>
        </div>
        <div className="h-3 w-[2px] bg-[#d1d4dc]"></div>
      </div>
    </div>
  );
}
