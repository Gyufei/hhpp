import NP from "number-precision";
import { IMarketplace } from "@/lib/types/marketplace";
import { useCallback } from "react";
import { useAccountInfo } from "./use-account-info";
import { useUserBalance } from "./use-user-balance";

export function useCheckBalance(market: IMarketplace) {
  const { data: accountInfo } = useAccountInfo();
  const address = accountInfo?.dest_account || "";

  const { data: userBalance } = useUserBalance(address);

  const usdcBalanceObj = userBalance?.find((b) => b.token.symbol === "USDT");

  const usdtBalance = usdcBalanceObj?.available_balance_num || "0";

  const checkUSDTInsufficient = useCallback(
    (value: string | number) => {
      if (usdtBalance === undefined) return "";

      const valueResult = NP.minus(usdtBalance, value) >= 0;

      if (!valueResult) {
        return `Insufficient USDT to pay`;
      }
      return "";
    },
    [usdtBalance],
  );

  const pointAmountObj = userBalance?.find(
    (b) => b.token.symbol === market.token_name,
  );

  const pointBalance = pointAmountObj?.available_balance_num || "0";

  const checkPointInsufficient = useCallback(
    (value: string | number) => {
      if (pointBalance === undefined) return "";

      const valueResult = NP.minus(pointBalance, value) >= 0;

      if (!valueResult) {
        return `Insufficient ${market.token_name} to sell`;
      }
      return "";
    },
    [pointBalance, market.token_name],
  );

  return {
    usdtBalance,
    pointAmount: pointBalance,
    checkUSDTInsufficient,
    checkPointInsufficient,
  };
}
