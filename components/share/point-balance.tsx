import { IPoint } from "@/lib/types/token";
import { useTokenBalance } from "@/lib/hooks/api/use-token-balance";
import { ProjectDecimalsMap } from "@/lib/const/constant";
import { formatNum } from "@/lib/utils/number";
import { cn } from "@/lib/utils/common";
import { useEffect, useState } from "react";

export default function PointBalance({
  point,
  className,
}: {
  point: IPoint;
  className?: string;
}) {
  const [balance, setBalance] = useState(0);

  const evmTokenBalance = useTokenBalance({
    abiAddress: point?.marketplace?.project_token_addr,
    decimals: ProjectDecimalsMap[point?.marketplace?.market_symbol],
  });

  useEffect(() => {
    setBalance((prevBalance) => {
      if (prevBalance !== evmTokenBalance) {
        return evmTokenBalance;
      }
      return prevBalance;
    });
  }, [evmTokenBalance]);

  return (
    <div className={cn("mb-6 text-[12px] text-[#99A0AF]", className)}>
      Balance: {formatNum(balance)}
    </div>
  );
}
