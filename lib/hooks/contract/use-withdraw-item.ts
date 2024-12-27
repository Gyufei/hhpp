import { useWriteContract } from "wagmi";
import { useChainWallet } from "@/lib/hooks/web3/use-chain-wallet";
import { TokenManagerABI } from "@/lib/abi/eth/TokenManager";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";

export function useWithdrawItem() {
  const evmConfig = ChainConfigs[ChainType.ARB];

  const { address: userAddress } = useChainWallet();

  const { writeContractAsync } = useWriteContract();

  const txAction = async ({ tokenAddress }: { tokenAddress: string }) => {
    const abiAddress = evmConfig.contracts.tokenManager;

    const callParams = {
      abi: TokenManagerABI,
      address: abiAddress as any,
      functionName: "withdrawPlatformFee",
      args: [tokenAddress as any, userAddress],
    };

    const txHash = await writeContractAsync({
      ...callParams,
    });

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
