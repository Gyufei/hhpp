import { useWriteContract } from "wagmi";
import { generateRandomCode } from "@/lib/utils/common";
import { SystemConfigABI } from "@/lib/abi/eth/SystemConfig";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";

export function useCreateReferral() {
  const evmConfig = ChainConfigs[ChainType.ARB];

  const { writeContractAsync } = useWriteContract();

  const txAction = async (args?: {
    firstAmount?: number;
    secondAmount?: number;
  }) => {
    const { firstAmount = 300000, secondAmount = 0 } = args || {};

    const abiAddress = evmConfig.contracts.systemConfig;
    const RandomCode = generateRandomCode(8);

    const callParams = {
      abi: SystemConfigABI,
      address: abiAddress as any,
      functionName: "createReferralCode",
      args: [RandomCode, BigInt(firstAmount || 0), BigInt(secondAmount || 0)],
    };

    const txHash = await writeContractAsync({
      ...callParams,
    });

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
