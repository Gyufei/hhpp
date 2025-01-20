import NP from "number-precision";
import { useUsdcTokenBalance } from "./use-usdc-balance";
import { usePointAmount } from "./use-point-amount";
import { IMarketplace } from "@/lib/types/marketplace";
import { useCallback } from "react";
import { useAccountInfo } from "./use-account-info";

export function useCheckBalance(market: IMarketplace) {
  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_wallet || "";

  const { data: usdcBalanceData } = useUsdcTokenBalance(address);
  const usdcBalance = usdcBalanceData?.usdc_balance || "0";

  const checkUSDCInsufficient = useCallback(
    (value: string | number) => {
      if (usdcBalance === undefined) return "";

      const valueResult = NP.minus(usdcBalance, value) >= 0;
      if (!valueResult) {
        return `Insufficient USDC to pay`;
      }
      return "";
    },
    [usdcBalance],
  );

  const { data: pointAmountData } = usePointAmount(
    address,
    market.market_place_account,
  );
  const pointAmount = pointAmountData?.free_amount || "0";

  const checkPointInsufficient = useCallback(
    (value: string | number) => {
      if (pointAmount === undefined) return "";

      const valueResult = NP.minus(pointAmount, value) >= 0;
      if (!valueResult) {
        return `Insufficient ${market.item_name} to sell`;
      }
      return "";
    },
    [pointAmount, market.item_name],
  );

  return { checkUSDCInsufficient, checkPointInsufficient };
}
