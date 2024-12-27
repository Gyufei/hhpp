import { useWriteContract } from "wagmi";
import { SystemConfigABI } from "@/lib/abi/eth/SystemConfig";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";

export function useRemoveReferral() {
  const { writeContractAsync } = useWriteContract();

  const txAction = async ({ referralCode }: { referralCode: string }) => {
    const callParams = {
      abi: SystemConfigABI,
      address: "1" as any,
      functionName: "removeReferralCode",
      args: [referralCode],
    };

    const txHash = await writeContractAsync({
      ...callParams,
    });

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
