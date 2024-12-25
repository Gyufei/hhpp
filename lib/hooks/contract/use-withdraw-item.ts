import { useChainTx } from "./help/use-chain-tx";
import { useWithdrawItemEth } from "./eth/use-withdraw-item-eth";
import { ChainType } from "@/lib/types/chain";

export function useWithdrawItem({ chain }: { chain: ChainType }) {
  const actionRes = useChainTx(useWithdrawItemEth, {
    chain,
  });
  return actionRes;
}
