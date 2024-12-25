import { ChainType } from "@/lib/types/chain";
import { useUpdateReferralEth } from "./eth/use-update-referral-eth";
import { useChainTx } from "./help/use-chain-tx";

export function useUpdateReferral({
  chain,
  referrerStr,
  referralCode,
}: {
  chain: ChainType;
  referrerStr: string;
  referralCode: string;
}) {
  const actionRes = useChainTx(useUpdateReferralEth, {
    chain,
    referrerStr,
    referralCode,
  });

  return actionRes;
}
