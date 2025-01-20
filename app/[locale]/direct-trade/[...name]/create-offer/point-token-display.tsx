import { IPoint } from "@/lib/types/token";
import { Skeleton } from "@/components/ui/skeleton";
import PointBalance from "@/components/share/point-balance";

export function PointTokenDisplay({ point }: { point: IPoint | null }) {
  return (
    <>
      <PointBalance point={point as IPoint} />
      <div className="flex w-fit cursor-pointer items-center rounded border border-[#474747] px-[10px] py-[6px]">
        {point ? (
          <>
            <div className="overflow-x-hidden whitespace-nowrap pr-[4px] text-xs leading-[18px] text-title-white">
              {point?.symbol || ""}
            </div>
          </>
        ) : (
          <Skeleton className="h-5 w-6" />
        )}
      </div>
    </>
  );
}
