import { ChainType } from "@/lib/types/chain";
import { useChainTx } from "./help/use-chain-tx";
import { useWithdrawTokenEth } from "./eth/use-withdraw-token-eth";

export type IBalanceType =
  | "taxIncome"
  | "referralBonus"
  | "salesRevenue"
  | "remainingCash"
  | "makerRefund";

export function useWithdrawToken({ chain }: { chain: ChainType }) {
  const chainActionRes = useChainTx(useWithdrawTokenEth, {
    chain,
  });
  return chainActionRes;
}
