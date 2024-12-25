import { useChainSendTx } from "../help/use-chain-send-tx";
import { useEndPoint } from "../../api/use-endpoint";
import { dataApiFetcher } from "@/lib/fetcher";
import { useDataApiTransactionRecord } from "../../api/use-transactionRecord";
import useTxStatus from "../help/use-tx-status";
import { useChainWallet } from "../../web3/use-chain-wallet";
import { ChainType } from "@/lib/types/chain";
import { useGasEth } from "../help/use-gas-eth";
export function useCreateTakerOrderEth({ chain }: { chain: ChainType }) {
  const { address } = useChainWallet();
  const { submitTransaction } = useDataApiTransactionRecord();
  const { dataApiEndPoint } = useEndPoint();
  const { sendTx } = useChainSendTx();
  const { ApiCallGas } = useGasEth();

  const txAction = async (args: { offerId: string; itemAmount: string }) => {
    const { offerId, itemAmount } = args;

    const reqData = {
      taker: address,
      item_amount: itemAmount,
    };
    const res = await dataApiFetcher(
      `${dataApiEndPoint}/offer/${offerId}/take?chain=${chain}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      },
    );

    if (!res.tx_data) {
      throw new Error("Invalid transaction data");
      return null;
    }

    const callParams = {
      ...res.tx_data,
      ...ApiCallGas,
      from: address,
    };

    const txHash = await sendTx({
      ...callParams,
    });

    await submitTransaction({
      chain,
      txHash,
      txType: "createTakerOrder",
      txData: null,
    });

    return txHash;
  };

  const wrapRes = useTxStatus(txAction);

  return wrapRes;
}
