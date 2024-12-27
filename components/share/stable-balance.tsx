import { useAccount, useBalance } from "wagmi";
import NP from "number-precision";
import { formatNum } from "@/lib/utils/number";
import { IToken } from "@/lib/types/token";
import { cn } from "@/lib/utils/common";
import { useEffect, useState } from "react";

export function StableBalance({
  token,
  className,
}: {
  token: IToken;
  className?: string;
}) {
  const [balance, setBalance] = useState(0);
  const { address } = useAccount();

  const userBalance = useBalance({
    address: address as `0x${string}`,
    token: token?.address as `0x${string}`,
    query: {
      enabled: !!address,
    },
  });

  const nativeBalance = userBalance?.data?.value || "0";
  const evmBalance = NP.divide(String(nativeBalance), 10 ** 18);

  useEffect(() => {
    setBalance((prevBalance) => {
      if (prevBalance !== evmBalance) {
        return evmBalance;
      }
      return prevBalance;
    });
  }, [evmBalance]);

  return (
    <div className={cn("mb-6 text-[12px] text-[#99A0AF]", className)}>
      Balance: {formatNum(balance)}
    </div>
  );
}
