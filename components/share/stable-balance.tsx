import { formatNum } from "@/lib/utils/number";
import { cn } from "@/lib/utils/common";
import { useUsdcTokenBalance } from "@/lib/hooks/api/use-usdc-balance";
import { useAccountInfo } from "@/lib/hooks/api/use-account-info";

export function StableBalance({ className }: { className?: string }) {
  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account || "";

  const { data: usdcBalanceData } = useUsdcTokenBalance(address);
  const usdcBalance = usdcBalanceData?.usdc_balance || "0";

  return (
    <div className={cn("mb-6 text-[12px] leading-[18px] text-gray", className)}>
      Balance: {formatNum(usdcBalance)}
    </div>
  );
}
