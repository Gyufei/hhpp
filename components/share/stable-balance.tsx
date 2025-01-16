import { formatNum } from "@/lib/utils/number";
import { cn } from "@/lib/utils/common";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { useUsdcTokenBalance } from "@/lib/hooks/api/use-usdc-balance";

export function StableBalance({ className }: { className?: string }) {
  const { address } = useChainWallet();

  const { data: usdcBalanceData } = useUsdcTokenBalance(address);
  const usdcBalance = usdcBalanceData?.usdc_balance || "0";

  return (
    <div className={cn("mb-6 text-[12px] leading-[18px] text-gray", className)}>
      Balance: {formatNum(usdcBalance)}
    </div>
  );
}
