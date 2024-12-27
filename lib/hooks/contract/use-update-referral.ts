import { useWriteContract } from "wagmi";
import { SystemConfigABI } from "@/lib/abi/eth/SystemConfig";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";

export function useUpdateReferral({ referralCode }: { referralCode: string }) {
  const evmConfig = ChainConfigs[ChainType.ARB];

  const { writeContractAsync } = useWriteContract();

  const txAction = async () => {
    const abiAddress = evmConfig.contracts.systemConfig;

    const callParams = {
      abi: SystemConfigABI,
      address: abiAddress as any,
      functionName: "updateReferrerInfo",
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
