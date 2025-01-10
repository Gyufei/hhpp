import Image from "next/image";
import { IPoint } from "@/lib/types/token";
import { Skeleton } from "@/components/ui/skeleton";
import PointBalance from "@/components/share/point-balance";

export function PointTokenDisplay({
  point,
  showArrow = false,
  showBalance = false,
}: {
  point: IPoint | null;
  showArrow?: boolean;
  showBalance?: boolean;
}) {
  return (
    <>
      {showBalance ? <PointBalance point={point as IPoint} /> : <div></div>}
      <div className="flex h-8 w-fit cursor-pointer items-center rounded border border-[#474747] px-[10px] py-[6px]">
        {point ? (
          <>
            <Image
              width={24}
              height={24}
              src={point?.logoURI || ""}
              alt="select token"
              className="mr-2 rounded-full"
            ></Image>
            <div className="overflow-x-hidden whitespace-nowrap pr-[4px] text-sm leading-5 text-title-white">
              {point?.symbol || ""}
            </div>
          </>
        ) : (
          <>
            <Skeleton className="mr-2 h-6 w-6 rounded-full" />
            <div className="h-5 w-6"></div>
          </>
        )}
        {showArrow && (
          <div className="flex h-6 w-6 items-center justify-center">
            <Image src="/icons/down.svg" width={16} height={16} alt="arrow" />
          </div>
        )}
      </div>
    </>
  );
}
