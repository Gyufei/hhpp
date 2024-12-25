import { PreMarketABI } from "@/lib/abi/eth/PreMarkets";
import { useWriteContract } from "wagmi";
import { useGasEth } from "../help/use-gas-eth";
import useTxStatus from "../help/use-tx-status";
import { useTransactionRecord } from "../../api/use-transactionRecord";
import { ChainType } from "@/lib/types/chain";
import { ChainConfigs } from "@/lib/const/chain-configs";

export function useRelistEth({
  chain,
  offerStr,
  holdingStr,
}: {
  chain: ChainType;
  offerStr: string;
  holdingStr: string;
}) {
  const evmConfig = ChainConfigs[chain];
  const { getGasParams } = useGasEth();

  const { recordTransaction } = useTransactionRecord(chain);
  const { writeContractAsync } = useWriteContract();

  const txAction = async () => {
    const abiAddress = evmConfig.contracts.preMarkets;

    const callParams = {
      abi: PreMarketABI,
      address: abiAddress as any,
      functionName: "relistHolding",
      args: [holdingStr as any, offerStr as any],
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
