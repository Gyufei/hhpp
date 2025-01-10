import { IPoint } from "@/lib/types/token";
import { formatNum } from "@/lib/utils/number";
import { cn } from "@/lib/utils/common";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { usePointAmount } from "@/lib/hooks/api/use-point-amount";

export default function PointBalance({
  point,
  className,
}: {
  point: IPoint;
  className?: string;
}) {
  const { address } = useChainWallet();

  const { data: pointAmountData } = usePointAmount(
    address,
    point?.marketplace?.market_place_account,
  );

  const balance = pointAmountData?.free_amount || 0;

  return (
    <div className={cn("text-[12px] text-gray", className)}>
      Balance: {formatNum(balance)}
    </div>
  );
}
