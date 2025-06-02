import { formatNum } from "@/lib/utils/number";
import { cn } from "@/lib/utils/common";
import { useUserBalance } from "@/lib/hooks/api/use-user-balance";

export function StableBalance({ className }: { className?: string }) {
  const { data: userBalance } = useUserBalance();

  const usdcBalanceObj = userBalance?.find((b) => b.token.symbol === "USDT");

  const usdtBalance = usdcBalanceObj?.available_balance_num || "0";

  return (
    <div className={cn("mb-6 text-[12px] leading-[18px] text-gray", className)}>
      Balance: {formatNum(usdtBalance)}
    </div>
  );
}
