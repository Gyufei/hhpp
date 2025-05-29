import { IPoint } from "@/lib/types/token";
import { Skeleton } from "@/components/ui/skeleton";

export function PointTokenDisplay({ point }: { point: IPoint | null }) {
  return (
    <>
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
