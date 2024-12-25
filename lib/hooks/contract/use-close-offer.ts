import { useCloseOfferEth } from "./eth/use-close-offer-eth";
import { useChainTx } from "./help/use-chain-tx";
import { ChainType } from "@/lib/types/chain";

export function useCloseOffer({
  chain,
  marketplaceStr,
  makerStr,
  offerStr,
  holdingStr,
  isNativeToken,
}: {
  chain: ChainType;
  marketplaceStr: string;
  makerStr: string;
  offerStr: string;
  holdingStr: string;
  isNativeToken: boolean;
}) {
  const chainActionRes = useChainTx(useCloseOfferEth, {
    chain,
    marketplaceStr,
    makerStr,
    offerStr,
    holdingStr,
    isNativeToken,
  });

  return chainActionRes;
}
