import { IToken } from "@/lib/types/token";
import { StableBalance } from "@/components/share/stable-balance";

export function StableTokenSelectDisplay({
  token,
  showBalance,
}: {
  token: IToken;
  showBalance?: boolean;
}) {
  return (
    <>
      {showBalance ? <StableBalance /> : <div></div>}
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
