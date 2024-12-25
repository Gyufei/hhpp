import { ChainType } from "@/lib/types/chain";
import { useEndPoint } from "@/lib/hooks/api/use-endpoint";
import { useDataApiTransactionRecord } from "@/lib/hooks/api/use-transactionRecord";
import { useChainSendTx } from "@/lib/hooks/contract/help/use-chain-send-tx";
import useTxStatus from "@/lib/hooks/contract/help/use-tx-status";
import { dataApiFetcher } from "@/lib/fetcher";
import { useGasEth } from "../help/use-gas-eth";

export function useAbortAskOfferEth({ chain }: { chain: ChainType }) {
  const { submitTransaction } = useDataApiTransactionRecord();
  const { dataApiEndPoint } = useEndPoint();
  const { sendTx } = useChainSendTx();
  const { ApiCallGas } = useGasEth();

  const txAction = async (args: { offerId: string }) => {
    const { offerId } = args;
    const res = await dataApiFetcher(
      `${dataApiEndPoint}/offer/${offerId}/abort?chain=${chain}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
      },
    );

    if (!res.tx_data) {
      throw new Error("Invalid transaction data");
      return null;
    }

    const callParams = {
      ...res.tx_data,
      ...ApiCallGas,
    };

    const txHash = await sendTx({
      ...callParams,
    });

    await submitTransaction({
      chain,
      txHash,
      txType: "abortOffer",
      txData: null,
    });

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
