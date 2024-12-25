import { ChainType } from "@/lib/types/chain";
import { useRemoveReferralEth } from "./eth/use-remove-referral-eth";
import { useChainTx } from "./help/use-chain-tx";

export function useRemoveReferral(chain: ChainType) {
  const chainActionRes = useChainTx(useRemoveReferralEth, {
    chain,
  });
  return chainActionRes;
}
