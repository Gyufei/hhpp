import { useAccount, useBalance } from "wagmi";
import NP from "number-precision";
import { reportEvent } from "@/lib/utils/analytics";
import { GlobalMessageAtom } from "@/lib/states/global-message";
import { useSetAtom } from "jotai";
import { useTokenBalance } from "@/lib/hooks/api/use-token-balance";
import { formatLeadingZeros } from "@/lib/utils/number";

export function useCheckBnbBalance(token: any) {
  const { address } = useAccount();
  const setGlobalMessage = useSetAtom(GlobalMessageAtom);
  const tokenBalance = useTokenBalance({
    abiAddress: token?.address,
    decimals: token?.decimals,
  });

  const userBalance = useBalance({
    address: address as `0x${string}`,
    token: token?.address as `0x${string}`,
    query: {
      enabled: !!address,
    },
  });
  const balance = userBalance?.data?.value;

  function checkBalanceInsufficient(value: any, showTip = false) {
    if (balance === undefined) return "";

    const nativeBalance = NP.divide(String(balance), 10 ** 18);

    const valueResult = NP.minus(tokenBalance, value) >= 0;
    if (!valueResult) {
      reportEvent("InsufficientBalance-value", {
        value: `${nativeBalance}-${value}`,
      });
      if (showTip) {
        setGlobalMessage({
          type: "error",
          message: `Insufficient Balance: ${value} ${
            token.symbol
          } is needed but only ${formatLeadingZeros(tokenBalance, 6)} ${
            token.symbol
          } in the wallet`,
        });
      }
      return `Insufficient ${token.symbol} to pay`;
    }
    return "";
  }

  return { checkBalanceInsufficient };
}
