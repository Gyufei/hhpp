import { IPoint } from "@/lib/types/token";
import { formatNum } from "@/lib/utils/number";
import { cn } from "@/lib/utils/common";
import { usePointAmount } from "@/lib/hooks/api/use-point-amount";
import { useAccountInfo } from "@/lib/hooks/api/use-account-info";

export default function PointBalance({
  point,
  className,
}: {
  point: IPoint;
  className?: string;
}) {
  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account || "";

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
