import { useAccount, useBalance } from "wagmi";
import NP from "number-precision";
import { reportEvent } from "@/lib/utils/analytics";
import { GlobalMessageAtom } from "@/lib/states/global-message";
import { useSetAtom } from "jotai";
import { useTokenBalance } from "@/lib/hooks/api/use-token-balance";
import { checkIsNativeToken } from "@/lib/utils/web3";
import { ChainType } from "@/lib/types/chain";
import { formatLeadingZeros } from "@/lib/utils/number";

export function useCheckBnbBalance(chain: ChainType, token: any) {
  const { address } = useAccount();
  const setGlobalMessage = useSetAtom(GlobalMessageAtom);
  const tokenBalance = useTokenBalance({
    abiAddress: token?.address,
    decimals: token?.decimals,
  });
  const isNativeToken = checkIsNativeToken(chain, token || null);

  const userBalance = useBalance({
    address: address as `0x${string}`,
  });
  const balance = userBalance?.data?.value || "0";

  function checkBalance(value: any) {
    const gas = 0.0005;
    const nativeBalance = NP.divide(String(balance), 10 ** 18);

    if (isNativeToken) {
      const total = NP.plus(gas, value);
      const result = NP.minus(nativeBalance, total) >= 0;
      if (!result) {
        reportEvent("InsufficientBalance", {
          value: `${balance}-${total}`,
        });
        setGlobalMessage({
          type: "error",
          message: `Insufficient Balance: ${total} ${
            token.symbol
          } is needed but only ${formatLeadingZeros(nativeBalance, 6)} ${
            token.symbol
          } in the wallet`,
        });
      }
      return result;
    } else {
      const gasResult = NP.minus(nativeBalance, gas) >= 0;
      if (!gasResult) {
        reportEvent("InsufficientBalance-gas", {
          value: `${nativeBalance}-${gas}`,
        });
        setGlobalMessage({
          type: "error",
          message: `Insufficient Balance: ${gas.toFixed(9)} ${
            token.symbol
          } is needed but only ${formatLeadingZeros(nativeBalance, 6)} ${
            token.symbol
          } in the wallet`,
        });
        return false;
      }
      const valueResult = NP.minus(tokenBalance, value) >= 0;
      if (!valueResult) {
        reportEvent("InsufficientBalance-value", {
          value: `${nativeBalance}-${value}`,
        });
        setGlobalMessage({
          type: "error",
          message: `Insufficient Balance: ${value} ${
            token.symbol
          } is needed but only ${formatLeadingZeros(tokenBalance, 6)} ${
            token.symbol
          } in the wallet`,
        });
        return false;
      }
      return true;
    }
  }

  return { checkBalance };
}
