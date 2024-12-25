import { useChainSendTx } from "../help/use-chain-send-tx";
import { useEndPoint } from "../../api/use-endpoint";
import { dataApiFetcher } from "@/lib/fetcher";
import { useDataApiTransactionRecord } from "../../api/use-transactionRecord";
import useTxStatus from "../help/use-tx-status";
import { ChainType } from "@/lib/types/chain";
import { useGasEth } from "../help/use-gas-eth";

export function useListEth({ chain }: { chain: ChainType }) {
  const { submitTransaction } = useDataApiTransactionRecord();
  const { dataApiEndPoint } = useEndPoint();
  const { sendTx } = useChainSendTx();
  const { ApiCallGas } = useGasEth();

  const txAction = async (args: {
    price: string;
    totalItemAmount: string;
    entryIds: Array<string>;
  }) => {
    const { price, totalItemAmount, entryIds } = args;
    const reqData = {
      price,
      total_item_amount: totalItemAmount,
      entry_ids: entryIds,
    };
    const res = await dataApiFetcher(`${dataApiEndPoint}/holding/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });

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
      txType: "list",
      txData: null,
    });

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
