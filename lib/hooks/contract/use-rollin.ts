import { ChainType } from "@/lib/types/chain";
import { useRollinEth } from "./eth/use-rollin-eth";
import { useChainTx } from "./help/use-chain-tx";

export function useRollin(chain: ChainType) {
  const chainActionRes = useChainTx(useRollinEth, {
    chain,
  });

  return chainActionRes;
}
