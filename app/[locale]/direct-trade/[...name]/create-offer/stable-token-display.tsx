import { IToken } from "@/lib/types/token";

export function StableTokenSelectDisplay({ token }: { token: IToken }) {
  return (
    <>
      <div className="flex w-fit cursor-pointer items-center rounded border border-[#474747] bg-[#222428] px-[10px] py-[6px]">
        {token && (
          <div className="pr-[4px] text-xs leading-[18px] text-title-white">
            {token?.symbol}
          </div>
        )}
      </div>
    </>
  );
}
