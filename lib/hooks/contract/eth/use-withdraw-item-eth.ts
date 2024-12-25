import { useWriteContract } from "wagmi";
import { useChainWallet } from "../../web3/use-chain-wallet";
import { TokenManagerABI } from "@/lib/abi/eth/TokenManager";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";
import { useTransactionRecord } from "../../api/use-transactionRecord";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";

export function useWithdrawItemEth({ chain }: { chain: ChainType }) {
  const evmConfig = ChainConfigs["eth"];
  const { getGasParams } = useGasEth();

  const { address: userAddress } = useChainWallet();

  const { recordTransaction } = useTransactionRecord(chain);
  const { writeContractAsync } = useWriteContract();

  const txAction = async ({ tokenAddress }: { tokenAddress: string }) => {
    const abiAddress = evmConfig.contracts.tokenManager;

    const callParams = {
      abi: TokenManagerABI,
      address: abiAddress as any,
      functionName: "withdrawPlatformFee",
      args: [tokenAddress as any, userAddress],
    };

    const gasParams = await getGasParams(callParams);

    const txHash = await writeContractAsync({
      ...callParams,
      ...gasParams,
    });

    await recordTransaction({
      txHash,
      note: "",
    });

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
