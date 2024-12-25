import Image from "next/image";
import { IPoint } from "@/lib/types/token";
import { Skeleton } from "@/components/ui/skeleton";

export function PointTokenDisplay({
  point,
  showArrow = false,
}: {
  point: IPoint | null;
  showArrow?: boolean;
}) {
  return (
    <div className="flex cursor-pointer items-center rounded-full bg-[#F0F1F5] p-2">
      {point ? (
        <>
          <Image
            width={24}
            height={24}
            src={point?.logoURI || ""}
            alt="select token"
            className="mr-2 rounded-full"
          ></Image>
          <div className="overflow-x-hidden whitespace-nowrap pr-[4px] text-sm leading-5 text-black">
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
  );
}
