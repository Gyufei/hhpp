import { useWriteContract } from "wagmi";
import { SystemConfigABI } from "@/lib/abi/eth/SystemConfig";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";
import { useTransactionRecord } from "../../api/use-transactionRecord";
import { ChainConfigs } from "@/lib/const/chain-configs";
import { ChainType } from "@/lib/types/chain";

export function useUpdateReferralEth({
  chain,
  referralCode,
}: {
  chain: ChainType;
  referralCode: string;
}) {
  const evmConfig = ChainConfigs["eth"];
  const { getGasParams } = useGasEth();

  const { recordTransaction } = useTransactionRecord(chain);
  const { writeContractAsync } = useWriteContract();

  const txAction = async () => {
    const abiAddress = evmConfig.contracts.systemConfig;

    const callParams = {
      abi: SystemConfigABI,
      address: abiAddress as any,
      functionName: "updateReferrerInfo",
      args: [referralCode],
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
