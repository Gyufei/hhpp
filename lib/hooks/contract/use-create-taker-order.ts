import { ChainType } from "@/lib/types/chain";
import { useChainTx } from "./help/use-chain-tx";
import { useCreateTakerOrderEth } from "./eth/use-create-taker-order-eth";

export function useCreateTakerOrder({
  chain,
  marketplaceStr,
  offerStr,
  makerStr,
  originOfferStr,
  originOfferAuthStr,
  preOfferAuthStr,
  referrerStr,
  isNativeToken,
}: {
  chain: ChainType;
  marketplaceStr: string;
  offerStr: string;
  makerStr: string;
  originOfferStr: string;
  originOfferAuthStr: string;
  preOfferAuthStr: string;
  referrerStr: string;
  isNativeToken: boolean;
}) {
  const chainActionRes = useChainTx(useCreateTakerOrderEth, {
    chain,
    marketplaceStr,
    offerStr,
    makerStr,
    originOfferStr,
    originOfferAuthStr,
    preOfferAuthStr,
    referrerStr,
    isNativeToken,
  });

  return chainActionRes;
}
