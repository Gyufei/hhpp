import Image from "next/image";
import { IToken } from "@/lib/types/token";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useStableToken } from "@/lib/hooks/api/token/use-stable-token";
import { ChainType } from "@/lib/types/chain";
import { StableBalance } from "@/components/share/stable-balance";

export function StableTokenSelectDisplay({
  token,
  setToken,
  chain,
  showBalance,
}: {
  chain: ChainType;
  token: IToken;
  setToken: (_t: IToken) => void;
  showBalance?: boolean;
}) {
  const { data: tokens } = useStableToken(chain);
  const [popOpen, setPopOpen] = useState(false);

  const handleSelectToken = (t: IToken) => {
    setToken(t);
    setPopOpen(false);
  };

  return (
    <>
      {showBalance ? <StableBalance /> : <div></div>}
      <Popover open={popOpen} onOpenChange={(isOpen) => setPopOpen(isOpen)}>
        <PopoverTrigger>
          <div className="flex w-fit cursor-pointer items-center rounded border border-[#474747] bg-[#222428] px-[10px] py-[6px]">
            {token && (
              <>
                <Image
                  width={20}
                  height={20}
                  src={token?.logoURI}
                  alt="selected token"
                  className="mr-2 rounded-full"
                ></Image>
                <div className="pr-[4px] text-xs leading-[18px] text-title-white">
                  {token?.symbol}
                </div>
                <div className="flex h-5 w-5 items-center justify-center">
                  <Image
                    src="/icons/down.svg"
                    width={16}
                    height={16}
                    alt="arrow"
                  />
                </div>
              </>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="z-[103] flex w-[100px] flex-col items-stretch border border-border-black bg-bg-black px-2 py-1 shadow-[0px_4px_8px_9px_rgba(14,4,62,0.08)]"
        >
          {tokens.map((t) => (
            <div
              key={t.symbol}
              onClick={() => handleSelectToken(t)}
              className="flex cursor-pointer items-center rounded px-1 text-xs leading-[18px] text-title-white hover:text-main"
            >
              <Image
                width={20}
                height={20}
                src={t.logoURI}
                alt="token option"
                className="mr-2 rounded-full"
              ></Image>
              {t.symbol}
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </>
  );
}
