import NP from "number-precision";
import { GlobalMessageAtom } from "@/lib/states/global-message";
import { useSetAtom } from "jotai";
import { formatLeadingZeros } from "@/lib/utils/number";
import { useChainWallet } from "../web3/use-chain-wallet";
import { useUsdcTokenBalance } from "./use-usdc-balance";
import { usePointAmount } from "./use-point-amount";
import { IMarketplace } from "@/lib/types/marketplace";

export function useCheckBalance(market: IMarketplace) {
  const { address } = useChainWallet();

  const setGlobalMessage = useSetAtom(GlobalMessageAtom);
  const { data: usdcBalanceData } = useUsdcTokenBalance(address);
  const usdcBalance = usdcBalanceData?.usdc_balance || "0";

  function checkUSDCInsufficient(value: string | number, showTip = false) {
    if (usdcBalance === undefined) return "";

    const valueResult = NP.minus(usdcBalance, value) >= 0;
    if (!valueResult) {
      if (showTip) {
        setGlobalMessage({
          type: "error",
          message: `Insufficient Balance: ${value} USDC is needed but only ${formatLeadingZeros(
            Number(usdcBalance),
            6,
          )} USDC in the wallet`,
        });
      }
      return `Insufficient USDC to pay`;
    }
    return "";
  }

  const { data: pointAmountData } = usePointAmount(
    address,
    market.market_place_account,
  );
  const pointAmount = pointAmountData?.free_amount || "0";

  function checkPointInsufficient(value: string | number, showTip = false) {
    if (pointAmount === undefined) return "";

    const valueResult = NP.minus(pointAmount, value) >= 0;
    if (!valueResult) {
      if (showTip) {
        setGlobalMessage({
          type: "error",
          message: `Insufficient Balance: ${value} ${
            market.item_name
          } is needed but only ${formatLeadingZeros(Number(pointAmount), 6)} ${
            market.item_name
          } in the wallet`,
        });
      }
      return `Insufficient ${market.item_name} to pay`;
    }
    return "";
  }

  return { checkUSDCInsufficient, checkPointInsufficient };
}
